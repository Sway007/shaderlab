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
  return args.map((arg: any) => `${arg.type} ${arg.name}`).join(',');
}

function serializeByType(type: string, info: any) {
  let content = '!!!NOT IMPLEMENTE';
  let line = info.line ?? 0;
  switch (type) {
    case 'RuleFnVariableDeclaration':
      content = `${info.type} ${info.variable}${
        info.default ? `= ${serializeStatement(info.default)?.content}` : ''
      };`;
      break;
    case 'RuleFnAssignStatement':
      content = `${info.asignee.text.join('.')} = ${
        serializeStatement(info.value)?.content
      };`;
      break;
    case 'RuleFnCall':
      content = `${info.function}(${info.args.join(',')})`;
      break;
    case 'RuleFnReturnStatement':
      content = `return ${info.value}`;
      break;
    case 'RuleFnMacroCondition':
      content = `${info.command} ${info.identifier} 
      ${serializeFnBody(info.body)}
      #endif`;
      break;
    case 'RuleFnVariable':
      content = info.text.join(',');
      break;
    case 'RuleNumber':
      content = info;
      break;
    case 'RuleFnConditionStatement':
      content = `if (${
        serializeStatement(info.relation.operands[0])?.content
      }} ${info.relation.operator} ${
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
    default:
      content = `${type} NOT IMPLEMENT!!!`;
  }

  return {
    line,
    content,
  };
}

function serializeStatement(statement: any): ILineStatement | null {
  if (!statement) return null;
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
  return `${fn.returnType} ${fn.name}(${serializeFnArgs(fn.args)}) {
    ${serializeFnBody(fn.body)}
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

  ret.name = ast.name;
  ret.tags = extractObj(ast.tags, { kn: 'tag' });
  ret.renderStates = {};
  ast.propterties.forEach((p: { type: string | number; value: string }) => {
    switch (p.type) {
      case 'VertexShader':
        ret.vert = extractPassGlobal(ast, p.value);
        break;
      case 'FragmentShader':
        ret.frag = extractPassGlobal(ast, p.value);
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
