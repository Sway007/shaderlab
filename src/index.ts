import {
  IShaderInfo,
  astExtract,
  defineConfig,
  config,
  IException,
} from './ast2glsl';
import ShaderVisitor, { parser } from './visitor';
export { IRecognitionException } from 'chevrotain';

export { IShaderInfo, defineConfig, IException };

export function parseShader(input: string) {
  parser.parse(input);
  const cst = (parser as any).RuleShader();
  if (parser.errors.length > 0) {
    config.debug && console.log(parser.errors);
    throw parser.errors;
  }

  const visitor = new ShaderVisitor();
  const ast = visitor.visit(cst);
  console.dir(ast);
  return astExtract(ast);
}
