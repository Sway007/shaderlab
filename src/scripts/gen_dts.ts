import { generateCstDts } from 'chevrotain';
import path from 'path';
import ShaderParser from '../parser';
import fs from 'fs';

export default function (opts?: { outDir?: string }) {
  const parser = new ShaderParser();
  const productions = parser.getGAstProductions();
  const dtsContent = generateCstDts(productions);
  const out = opts?.outDir ?? path.resolve(__dirname, '..');
  const dtsPath = path.resolve(out, './types.ts');
  fs.writeFileSync(dtsPath, dtsContent, { flag: 'w' });
  console.log('dst written to file ', dtsPath);
}
