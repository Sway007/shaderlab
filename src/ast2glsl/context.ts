import { ASCII_RESET, ASCII_WARN_COLOR } from '../constants';
import { config } from './config';
import { extractObj } from './utils';
import { IAttribute, ILineStatement } from './types';

interface IMainFn {
  name: string;
  type: 'frag' | 'vert';
}

export default class RuntimeContext {
  // pass global variables: uniforms
  variables: Array<{ name: string; text: string }>;
  private passAst: any;
  private fnAstStack: Array<any> = [];
  // current main function name
  mainFn?: IMainFn;
  varyingList: Array<{ variable: string; text: string; used: boolean }> = [];
  // vertex shader varying type
  varyingStructName: string = '';
  varyingObjName: string = '';
  // @ts-ignore
  attributes: Array<IAttribute> = [];

  constructor() {
    this.variables = [];
  }

  resetVariables() {
    this.variables = [];
  }

  setShaderMainFn(fn: IMainFn) {
    this.mainFn = fn;
  }

  setPassAst(ast: any) {
    this.passAst = ast;
  }

  resetVaryingList() {
    this.varyingObjName = '';
    this.varyingStructName = '';
    this.varyingList = [];
  }

  setMainFn(fn: IMainFn) {
    this.mainFn = fn;
  }

  pushAttribute(attr: IAttribute) {
    this.attributes.push(attr);
  }

  pushFnAst(ast: any) {
    this.fnAstStack.push(ast);
  }

  popFnAst() {
    return this.fnAstStack.pop();
  }

  get fnAst(): any {
    return this.fnAstStack[this.fnAstStack.length - 1];
  }

  addVarying(v: { variable: string; text: string }) {
    this.varyingList.push({ ...v, used: false });
  }

  findLocalVariable(variable: string) {
    for (const declare of this.fnAst.body.statements ?? []) {
      if (declare.hasOwnProperty('RuleFnVariableDeclaration')) {
        if (declare.RuleFnVariableDeclaration.variable === variable)
          return declare.RuleFnVariableDeclaration;
      }
    }
  }

  /**
   * @returns global variable ast
   */
  findGlobal(variable: string, opts?: { pushToCtx: boolean }): any {
    const { passAst } = this;
    const pushToCtx = opts?.pushToCtx ?? true;
    const pushed =
      pushToCtx && this.variables.some((item: any) => item.name === variable);

    let ret: Object | undefined;
    for (const struct of passAst.structs ?? []) {
      if (struct.name === variable) {
        if (pushToCtx && !pushed) {
          const str = this.serializeFnStruct(struct);
          this.variables.push({ name: variable, text: str });
        }
        ret = struct;
        break;
      }
    }
    if (!ret) {
      for (const df of passAst.defines ?? []) {
        if (df.variable === variable) {
          if (pushToCtx && !pushed) {
            const dv = df.value
              ? this.serializeRuleFnAtomicExpr(df.value).content
              : '';
            const str = `#define ${df.variable} ${dv}`;
            this.variables.push({ name: variable, text: str });
          }
        }
      }
    }
    // if (!ret) {
    //   for (const uniform of passAst.uniforms ?? []) {
    //     if (uniform.name === variable) {
    //       if (!pushed) {
    //         const str = this.serializeUniform(uniform);
    //         this.variables.push({ name: variable, text: str });
    //       }
    //       ret = uniform;
    //       break;
    //     }
    //   }
    // }
    if (!ret)
      for (const v of passAst.variables ?? []) {
        if (v.variable === variable) {
          if (pushToCtx && !pushed) {
            const str =
              'uniform ' + this.serializeRuleFnVariableDeclaration(v).content;
            this.variables.push({ name: variable, text: str });
          }
          ret = v;
          break;
        }
      }
    if (!ret)
      for (const fn of passAst.functions ?? []) {
        if (fn.name === variable) {
          ret = fn;
          if (pushToCtx && !pushed) {
            const str = this.serializeFunction(fn);
            this.variables.push({ name: variable, text: str });
          }
          break;
        }
      }
    if (!ret) {
      if (config.debug) {
        throw `not found global variable: ${variable}`;
      } else {
        console.warn(
          ASCII_WARN_COLOR,
          'not found global variable: ',
          variable,
          ASCII_RESET
        );
      }
    }
    return ret;
  }

  clear() {
    this.variables = [];
    this.passAst = null;
  }

  serializeUniform(uniform: any): string {
    return `uniform ${uniform.type.text} ${uniform.name};`;
  }

  serializeVariableType(type: any): string {
    if (type.isCustom) {
      this.findGlobal(type.text, {
        /** attribute */
        pushToCtx: this.mainFn?.name !== this.fnAst.name,
      });
    }
    return type.text;
  }

  serializeFnStruct(struct: any): string {
    return `struct ${struct.name} {
      ${struct.variables
        .map(
          (item: any) =>
            `${this.serializeVariableType(item.type)} ${item.variable};`
        )
        .join('\n')}
    };`;
  }

  serializeRenderState(state: any) {
    return extractObj(state.properties);
  }

  serializeRuleFnVariable(variable: any): ILineStatement {
    const vn = variable.text[0];
    let content = variable.text.join('.');

    // varying or attribute, remove prefix
    if (vn === this.varyingObjName) {
      const usedV = this.varyingList.find(
        (item) => item.variable === variable.text[1]
      );
      usedV && (usedV.used = true);
      content = variable.text.slice(1).join('.');
    } else if (this.attributes.some((item) => item.objVariable === vn)) {
      const usedA = this.attributes.find(
        (item) => item.variable === variable.text[1]
      );
      usedA && (usedA.used = true);
      content = variable.text.slice(1).join('.');
    }
    // find variable declaration
    else if (!this.findLocalVariable(vn)) {
      this.findGlobal(vn);
    }

    return {
      line: variable.line,
      content,
    };
  }

  serializeFnCallArg(arg: any): string {
    if (typeof arg === 'string') return arg;
    for (const k in arg) {
      const v = arg[k];
      return this.serializeByType(k, v).content;
    }

    return arg;
  }

  serializeFnCall(fn: any): ILineStatement {
    if (fn.isCustom) {
      this.findGlobal(fn.function);
    }
    const content = `${fn.function}(${fn.args
      .map((item: any) => this.serializeFnCallArg(item))
      .join(',')})`;
    return {
      line: fn.line,
      content,
    };
  }

  serializeExpression(expr: any): ILineStatement | undefined {
    if (expr.RuleFnVariable)
      return this.serializeRuleFnVariable(expr.RuleFnVariable);
    else if (expr.operator) {
      return {
        line: expr.operator.line,
        content: `${this.serializeStatement(expr.operands[0])?.content} ${
          expr.operator.text
        } ${this.serializeStatement(expr.operands[1])?.content}`,
      };
    }
    return this.serializeStatement(expr);
  }

  serializeReturnStatement(ret: any): ILineStatement {
    let expr = 'NOT IMPLEMENTED!!';
    if (ret.value.ValueString) expr = ret.value.ValueString;
    else if (ret.value.RuleFnExpression)
      expr = this.serializeExpression(ret.value.RuleFnExpression)!.content;
    else if (ret.value.RuleBoolean) expr = ret.value.RuleBoolean;

    let content = `return ${expr};`;
    if (this.fnAst.name === this.mainFn?.name) {
      content = '';
    }

    return {
      line: ret.line,
      content,
    };
  }

  serializeRuleFnVariableDeclaration(declare: any): ILineStatement {
    // discard varying struct declaration. e.g. v2f 0;
    if (declare.type.text === this.varyingStructName) {
      this.varyingObjName = declare.variable;
      return {
        line: -1,
        content: '',
      };
    }
    return {
      line: declare.line,
      content: `${this.serializeVariableType(declare.type)} ${
        declare.variable
      }${
        declare.default
          ? ` = ${this.serializeExpression(declare.default)?.content}`
          : ''
      };`,
    };
  }

  serializeFnAsignee(asignee: any): ILineStatement {
    if (asignee.RuleFnVariable) {
      return this.serializeRuleFnVariable(asignee.RuleFnVariable);
    }

    let content = asignee.text.join('.');
    // if (asignee.text[0] === this.varyingObjName) {
    //   content = asignee.text.slice(1).join('.');
    // }

    return {
      line: asignee.line,
      content,
    };
  }

  serializeRuleFnAddExpr(expr: any) {
    if (expr.operands?.length > 0) {
      let content = this.serializeStatement(expr.operands[0])!.content;
      for (let i = 1; i < expr.operands.length; i++) {
        content += ` ${expr.operators[i - 1].text} ${
          this.serializeStatement(expr.operands[i])!.content
        }`;
      }
      return {
        line: expr.operators[0].line,
        content,
      };
    }
    return this.serializeStatement(expr);
  }

  serializeByType(type: string, info: any) {
    let content = '!!!NOT IMPLEMENTE';
    if (!info) {
      debugger;
    }
    let line = info.line ?? 0;
    switch (type) {
      case 'RuleFnVariableDeclaration':
        content = this.serializeRuleFnVariableDeclaration(info).content;
        break;
      case 'RuleFnExpression':
        return this.serializeExpression(info)!;
      case 'RuleFnAssignStatement':
        content = `${this.serializeFnAsignee(info.asignee).content} ${
          info.operator
        } ${this.serializeStatement(info.value)?.content};`;
        break;
      case 'RuleFnCall':
        content = this.serializeFnCall(info).content;
        break;
      case 'RuleFnReturnStatement':
        content = this.serializeReturnStatement(info).content;
        break;
      case 'RuleFnMacroCondition':
        content = `${info.command} ${info.identifier} 
        ${this.serializeFnBody(info.body)}
        #endif`;
        break;
      case 'RuleNumber':
        content = info;
        break;
      case 'RuleFnConditionStatement':
        content = this.serializeRuleFnConditionStatement(info).content;
        break;
      case 'discard':
        content = 'discard;';
        break;
      case 'RuleFnAtomicExpr':
        content = this.serializeRuleFnAtomicExpr(info).content;
        break;
      case 'RuleFnVariable':
        content = this.serializeRuleFnVariable(info).content;
        break;
      case 'RuleAddOperator':
        content = info.text;
        break;
      case 'RuleFnParenthesisExpr':
        content = `(${
          this.serializeRuleFnAddExpr(info.RuleFnAddExpr)?.content
        })`;
        break;
      case 'RuleFnAddExpr':
      case 'RuleFnMultiplicationExpr':
        content = this.serializeRuleFnAddExpr(info)!.content;
        break;
      default:
        content = `${type} NOT IMPLEMENT!!!`;
    }

    return {
      line,
      content,
    };
  }

  serializeRuleFnConditionStatement(statement: any): ILineStatement {
    const line = statement.line;
    let content = `if (${
      this.serializeStatement(statement.relation.operands[0])?.content
    } ${statement.relation.operator.text} ${
      this.serializeStatement(statement.relation.operands[1])?.content
    }){
      ${this.serializeFnBody(statement.elseBranches[0])}
    }`;

    if (statement.elseIfBranches?.length > 0) {
      const elifBranches = statement.elseIfBranches.map((item: any) => {
        return `else ${this.serializeRuleFnConditionStatement(item)}`;
      });
      content += elifBranches.join('\n');
    }

    if (statement.elseBranches[1]) {
      content += `else {
        ${this.serializeFnBody(statement.elseBranches[1])}
      }`;
    }

    return { line, content };
  }

  serializeRuleFnAtomicExpr(expr: any): ILineStatement {
    const ret: string[] = [];
    let line = -1;
    for (const k in expr) {
      const info = this.serializeByType(k, expr[k]);
      ret.push(info.content);
      info.line > 0 && (line = info.line);
    }
    return { line, content: ret.join(' ') };
  }

  serializeStatement(statement: any): ILineStatement | undefined {
    if (!statement) return;
    let content = '!!!NOT IMPLEMENTE';
    let line = 0;
    for (const k in statement) {
      const v = statement[k];
      if (!v) continue;
      return this.serializeByType(k, v);
    }
    return { line, content };
  }

  serializeMarco(marco: any): ILineStatement {
    let content = '!!!NOT IMPLEMENTE';
    let line = 0;

    for (const k in marco) {
      const v = marco[k];
      return this.serializeByType(k, v);
    }

    return {
      line,
      content,
    };
  }

  serializeFnBody(body: any): string {
    const ret: Array<{ line: number; content: string }> = [];
    if (!body) {
      debugger;
    }
    for (const statement of body.statements ?? []) {
      const info = this.serializeStatement(statement);
      info && ret.push(info);
    }

    for (const marco of body.marcos ?? []) {
      ret.push(this.serializeMarco(marco));
    }

    return ret
      .sort((a, b) => a.line - b.line)
      .map((item) => item.content)
      .filter((item) => item)
      .join('\n');
  }

  serializeVarying(returnType: any) {
    if (!returnType.isCustom) return;
    this.varyingStructName = returnType.text;
    const struct = this.findGlobal(returnType.text, { pushToCtx: false });
    if (struct?.variables) {
      struct.variables.forEach((v: any) => {
        this.addVarying({
          variable: v.variable,
          text: `varying ${v.type.text} ${v.variable};`,
        });
      });
    }
  }

  serializeFnArgs(args: any): string {
    // vertex or fragment main
    if (this.mainFn?.name === this.fnAst.name) {
      args.forEach((arg: any) => {
        if (arg.type.isCustom) {
          const struct = this.findGlobal(arg.type.text, { pushToCtx: false });
          if (struct?.variables) {
            struct.variables.forEach((v: any) => {
              this.pushAttribute({
                type: v.type.text,
                variable: v.variable,
                objVariable: arg.name,
                content: `attribute ${v.type.text} ${v.variable};`,
                used: false,
              });
            });
          }
        } else {
          this.pushAttribute({
            type: arg.type.text,
            variable: arg.name,
            content: `attribute ${arg.type.text} ${arg.name};`,
            used: false,
          });
        }
      });
      return '';
    }
    return args
      .map((arg: any) => `${this.serializeVariableType(arg.type)} ${arg.name}`)
      .join(',');
  }

  serializeFunction(fn: any): string {
    this.pushFnAst(fn);
    let args = this.serializeFnArgs(fn.args);
    let fnName = fn.name;
    let returnType = fn.returnType;
    if (fn.name && fn.name === this.mainFn?.name) {
      // vertex or fragment main
      fnName = 'main';
      returnType = 'void';
      this.serializeVarying(fn.returnType);
    } else {
      returnType = fn.returnType.text;
    }
    const body = this.serializeFnBody(fn.body);
    this.popFnAst();
    return `${returnType} ${fnName}(${args}) {
      ${body}
    }`;
  }
}
