import fs from 'fs';
import ShaderParser from '../src/parser';
import path from 'path';
import { exit } from 'process';
import ShaderVisitor from '../src/visitor';

const input = fs.readFileSync(path.join(__dirname, 'demo.shader')).toString();
const parser: ShaderParser = new ShaderParser();
parser.parse(input);
const cst = (parser as any).RuleShader();
if (parser.errors.length > 0) {
  console.log('errors: ', parser.errors);
  exit();
}

const visitor = new ShaderVisitor();
const ast = visitor.visit(cst);

console.log(ast);
