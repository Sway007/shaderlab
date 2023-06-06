import fs from 'fs';
import ShaderParser from '../src/parser';
import path from 'path';
import { exit } from 'process';
import ShaderVisitor from '../src/visitor';
import { astExtract, defineConfig } from '../src/ast2glsl';

const commonShaders: Record<string, string> = {};
const dir = path.join(__dirname, './commonShaders');
const files = fs.readdirSync(dir);
files.forEach((f) => {
  commonShaders[f] = fs.readFileSync(path.join(dir, f)).toString();
});

defineConfig({
  include(name) {
    const ret = commonShaders[name];
    if (!ret) throw `not found include file: ${name}`;
    return ret;
  },
});

const input = fs.readFileSync(path.join(__dirname, 't2.shader')).toString();
const parser: ShaderParser = new ShaderParser();
parser.parse(input);
const cst = (parser as any).RuleShader();
if (parser.errors.length > 0) {
  console.log('errors: ', parser.errors);
  exit();
}

const visitor = new ShaderVisitor();
const ast = visitor.visit(cst);

console.dir(ast, { depth: null });
// config.debug = true;
const result = astExtract(ast);
console.dir(result, { depth: null });

const outDir = path.resolve(__dirname, '../out');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir);
}
result.subShaders.forEach((item) =>
  item.passes.forEach((pass) => {
    const shaderDir = path.join(outDir, item.name);
    if (!fs.existsSync(shaderDir)) {
      fs.mkdirSync(shaderDir);
    }
    fs.writeFileSync(path.join(shaderDir, `${item.name}.vert`), pass.vert, {
      flag: 'w+',
    });
    fs.writeFileSync(path.join(shaderDir, `${item.name}.frag`), pass.frag, {
      flag: 'w+',
    });
  })
);
