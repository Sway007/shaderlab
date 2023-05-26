import { ASCII_RESET, ASCII_WARN_COLOR } from './constants';

interface IShaderInfo {
  name: string;
  subShaders: Array<ISubShader>;
  // editorProperties:
}

interface ISubShader {
  name: string;
  passes: Array<IShaderPass>;
  tags: IShaderTag;
}

interface IShaderPass {
  name: string;
  vert: string;
  frag: string;
  tags?: IShaderTag;
  renderStates: IRenderState;
}

type IShaderTag = Record<string, any>;
type IRenderState = Record<string, any>;

interface ILineStatement {
  line: number;
  content: string;
}

class ScopeVariableCollector {
  variables: Array<{ name: string; text: string }>;
  private passAst: any;
  private fnAstStack: Array<any> = [];

  constructor() {
    this.variables = [];
  }

  setPassAst(ast: any) {
    this.passAst = ast;
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

  findLocalVariable(variable: string) {
    for (const declare of this.fnAst.body.statements ?? []) {
      if (declare.hasOwnProperty('RuleFnVariableDeclaration')) {
        if (declare.RuleFnVariableDeclaration.variable === variable)
          return declare.RuleFnVariableDeclaration;
      }
    }
  }

  addGlobal(variable: string) {
    const { passAst } = this;
    if (this.variables.some((item: any) => item.name === variable))
      return 'exist';
    let ret = '';
    for (const struct of passAst.structs) {
      if (struct.name === variable) {
        ret = serializeFnStruct(struct);
        this.variables.push({ name: variable, text: ret });
        break;
      }
    }
    if (!ret)
      for (const v of passAst.variables) {
        if (v.variable === variable) {
          ret = serializeFnVarDeclaration(v).content;
          this.variables.push({ name: variable, text: ret });
          break;
        }
      }
    if (!ret)
      for (const fn of passAst.functions) {
        if (fn.name === variable) {
          ret = serializeFunction(fn);
          this.variables.push({ name: variable, text: ret });
          break;
        }
      }
    if (!ret)
      console.warn(
        ASCII_WARN_COLOR,
        'not found global variable: ',
        variable,
        ASCII_RESET
      );
    return ret;
  }

  clear() {
    this.variables = [];
    this.passAst = null;
  }
}

const scopeCollector = new ScopeVariableCollector();

function extractObj(
  info: any,
  opts: { kn?: string; vn?: string; fv?: (info: any) => any } = {}
): Record<string, any> {
  const ret = {} as IShaderTag;
  const { kn = 'name', vn = 'value', fv } = opts;
  info.forEach((item: any) => {
    ret[item[kn]] = fv?.(item) ?? item[vn];
  });
  return ret;
}

function serializeRenderState(state: any) {
  return extractObj(state.properties);
}

function serializeFnArgs(args: any): string {
  return args
    .map((arg: any) => `${serializeVariableType(arg.type)} ${arg.name}`)
    .join(',');
}

function serializeFnStruct(struct: any): string {
  return `struct ${struct.name} {
    ${struct.variables
      .map(
        (item: any) => `${item.variable} ${serializeVariableType(item.type)};`
      )
      .join('\n')}
  }`;
}

function serializeVariableType(type: any): string {
  if (type.isCustom) {
    scopeCollector.addGlobal(type.text);
  }
  return type.text;
}

function serializeFnVairable(variable: any): ILineStatement {
  const vn = variable.text[0];
  // find variable declaration
  if (!scopeCollector.findLocalVariable(vn)) {
    scopeCollector.addGlobal(vn);
  }

  return {
    line: variable.line,
    content: variable.text.join('.'),
  };
}

function serializeFnCallArg(arg: any): string {
  if (arg.function) {
    return serializeFnCall(arg).content;
  }
  return arg;
}

function serializeFnCall(fn: any): ILineStatement {
  if (fn.isCustom) {
    scopeCollector.addGlobal(fn.function);
  }
  return {
    line: fn.line,
    content: `${fn.function}(${fn.args
      .map((item: any) => serializeFnCallArg(item))
      .join(',')})`,
  };
}

function serizlizeExpression(expr: any): ILineStatement | undefined {
  if (expr.RuleFnVariable) return serializeFnVairable(expr.RuleFnVariable);
  else if (expr.operator) {
    return {
      line: expr.operator.line,
      content: `${serializeStatement(expr.operands[0])?.content} ${
        expr.operator.text
      } ${serializeStatement(expr.operands[1])?.content}`,
    };
  }
  return serializeStatement(expr);
}

function serializeReturnStatement(ret: any): ILineStatement {
  let expr = 'NOT IMPLEMENTED!!';
  if (ret.value.ValueString) expr = ret.value.ValueString;
  else if (ret.value.RuleFnExpression)
    expr = serizlizeExpression(ret.value.RuleFnExpression)!.content;
  else if (ret.value.RuleBoolean) expr = ret.value.RuleBoolean;

  return {
    line: ret.line,
    content: `return ${expr};`,
  };
}

function serializeFnVarDeclaration(declare: any): ILineStatement {
  return {
    line: declare.line,
    content: `${serializeVariableType(declare.type)} ${declare.variable}${
      declare.default
        ? ` = ${serizlizeExpression(declare.default)?.content}`
        : ''
    };`,
  };
}

function serializeByType(type: string, info: any) {
  let content = '!!!NOT IMPLEMENTE';
  let line = info.line ?? 0;
  switch (type) {
    case 'RuleFnVariableDeclaration':
      content = serializeFnVarDeclaration(info).content;
      break;
    case 'RuleFnExpression':
      return serizlizeExpression(info)!;
    case 'RuleFnAssignStatement':
      content = `${info.asignee.text.join('.')} = ${
        serializeStatement(info.value)?.content
      };`;
      break;
    case 'RuleFnCall':
      content = serializeFnCall(info).content;
      break;
    case 'RuleFnReturnStatement':
      content = serializeReturnStatement(info).content;
      break;
    case 'RuleFnMacroCondition':
      content = `${info.command} ${info.identifier} 
      ${serializeFnBody(info.body)}
      #endif`;
      break;
    case 'RuleNumber':
      content = info;
      break;
    case 'RuleFnConditionStatement':
      content = `if (${
        serializeStatement(info.relation.operands[0])?.content
      } ${info.relation.operator.text} ${
        serializeStatement(info.relation.operands[1])?.content
      }){
        ${serializeFnBody(info.body)}
      }`;
      break;
    case 'discard':
      content = 'discard;';
      break;
    case 'RuleFnMacroInclude':
      content = `#include ${info.name}`;
      break;
    case 'RuleFnVariable':
      content = serializeFnVairable(info).content;
      break;
    default:
      content = `${type} NOT IMPLEMENT!!!`;
  }

  return {
    line,
    content,
  };
}

function serializeStatement(statement: any): ILineStatement | undefined {
  if (!statement) return;
  let content = '!!!NOT IMPLEMENTE';
  let line = 0;
  for (const k in statement) {
    const v = statement[k];
    return serializeByType(k, v);
  }
  return { line, content };
}

function serializeMarco(marco: any): ILineStatement {
  let content = '!!!NOT IMPLEMENTE';
  let line = 0;

  for (const k in marco) {
    const v = marco[k];
    return serializeByType(k, v);
  }

  return {
    line,
    content,
  };
}

function serializeFnBody(body: any): string {
  const ret: Array<{ line: number; content: string }> = [];
  for (const statement of body.statements ?? []) {
    const info = serializeStatement(statement);
    info && ret.push(info);
  }

  for (const marco of body.marcos ?? []) {
    ret.push(serializeMarco(marco));
  }

  return ret
    .sort((a, b) => a.line - b.line)
    .map((item) => item.content)
    .join('\n');
}

function serializeFunction(fn: any): string {
  const args = serializeFnArgs(fn.args);
  scopeCollector.pushFnAst(fn);
  const body = serializeFnBody(fn.body);
  scopeCollector.popFnAst();
  return `${fn.returnType} ${fn.name}(${args}) {
    ${body}
  }`;
}

function extractPassGlobal(passAst: any, variable: string) {
  for (const struct of passAst.structs) {
    if (struct.name === variable) return struct;
  }
  for (const v of passAst.variables) {
    if (v.variable === variable) return v;
  }
  for (const state of passAst.renderStates) {
    if (state.name === variable) return serializeRenderState(state);
  }
  for (const fn of passAst.functions) {
    if (fn.name === variable) return serializeFunction(fn);
  }
}

function extractPass(ast: any): IShaderPass {
  const ret = {} as IShaderPass;
  scopeCollector.clear();
  scopeCollector.setPassAst(ast);

  ret.name = ast.name;
  ret.tags = extractObj(ast.tags, { kn: 'tag' });
  ret.renderStates = {};
  ast.propterties.forEach((p: { type: string | number; value: string }) => {
    switch (p.type) {
      case 'VertexShader':
        const vert = extractPassGlobal(ast, p.value);
        ret.vert =
          scopeCollector.variables.map((item) => item.text).join('\n') +
          '\n' +
          vert;
        break;
      case 'FragmentShader':
        const frag = extractPassGlobal(ast, p.value);
        ret.frag =
          scopeCollector.variables.map((item) => item.text).join('\n') +
          '\n' +
          frag;
        break;
      default:
        ret.renderStates[p.type] = extractPassGlobal(ast, p.value);
    }
  });
  return ret;
}

function extractSubShader(ast: any): ISubShader {
  const ret = {} as ISubShader;
  ret.name = ast.name;
  ret.tags = extractObj(ast.tags, { kn: 'tag' });
  ret.passes = ast.pass.map((item: any) => extractPass(item));
  return ret;
}

export function astExtract(ast: any): IShaderInfo {
  const ret = {} as IShaderInfo;
  ret.name = ast.name;
  ret.subShaders = ast.subShader?.map((item: any) => extractSubShader(item));

  return ret;
}
