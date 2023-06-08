import { IShaderInfo, astExtract, defineConfig } from './ast2glsl';
import ShaderParser from './parser';
import ShaderVisitor from './visitor';

export { IShaderInfo, defineConfig };

const parser = new ShaderParser();

export function parseShader(input: string) {
  parser.parse(input);
  const cst = (parser as any).RuleShader();
  if (parser.errors.length > 0) {
    throw parser.errors;
  }

  const visitor = new ShaderVisitor();
  const ast = visitor.visit(cst);
  console.dir(ast);
  return astExtract(ast);
}
