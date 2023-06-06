// target: glsl 100

import { defineConfig, config } from './config';
export * from './config';
import RuntimeContext from './context';
import { extractObj } from './utils';

const context = new RuntimeContext();

function extractPass(ast: any): IShaderPass {
  const ret = {} as IShaderPass;
  context.clear();
  context.setPassAst(ast);

  ret.name = ast.name;
  ret.tags = extractObj(ast.tags, { kn: 'tag' });
  ret.renderStates = {};
  ast.propterties.forEach((p: { type: string | number; value: string }) => {
    switch (p.type) {
      case 'VertexShader':
        context.resetVaryingList();
        context.resetVariables();
        context.setMainFn({ name: p.value, type: 'vert' });
        const vertFunc = context.findGlobal(p.value, { pushToCtx: false });
        const vert = context.serializeFunction(vertFunc);
        ret.vert =
          context.attributes.map((item) => item.content).join('\n') +
          '\n' +
          context.varyingList.join('\n') +
          '\n' +
          context.variables.map((item) => item.text).join('\n') +
          '\n' +
          vert;
        break;
      case 'FragmentShader':
        context.setMainFn({ name: p.value, type: 'frag' });
        context.resetVariables();
        const fragFunc = context.findGlobal(p.value, { pushToCtx: false });
        const frag = context.serializeFunction(fragFunc);
        ret.frag =
          context.varyingList.join('\n') +
          '\n' +
          context.variables.map((item) => item.text).join('\n') +
          '\n' +
          frag;
        break;
      default:
        ret.renderStates[p.type] = context.findGlobal(p.value, {
          pushToCtx: false,
        });
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
