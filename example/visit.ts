import fs from 'fs';
import path from 'path';
import { exit } from 'process';
import { parseShader } from '../src';
import { defineConfig } from '../src/ast2glsl';

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

try {
  const result = parseShader(input);
  const outDir = path.resolve(__dirname, '../out');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir);
  }
  const ast = result.ast;
  fs.writeFileSync(
    path.join(outDir, 'ast.json'),
    JSON.stringify(ast, null, 2),
    {
      flag: 'w+',
    }
  );

  console.dir(result.shader, { depth: null });

  result.shader.subShaders.forEach((item) =>
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
} catch (e) {
  console.log('errors: ', e);
  exit();
}
