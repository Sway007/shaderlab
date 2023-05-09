import fs from 'fs';
import ShaderParser from '../src/parser';
import path from 'path';
import { exit } from 'process';

const input = fs.readFileSync(path.join(__dirname, 'demo.txt')).toString();
const parser: ShaderParser = new ShaderParser();
parser.parse(input);
console.log((parser as any).RuleShader());
if (parser.errors.length > 0) {
  console.log('errors: ', parser.errors);
  exit();
}

console.log('success!');
