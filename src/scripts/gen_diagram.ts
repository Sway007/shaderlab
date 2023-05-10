import { createSyntaxDiagramsCode } from 'chevrotain';
import path from 'path';
import ShaderParser from '../parser';
import fs from 'fs';
import { exec } from 'child_process';

export default function generateDiagram(opts?: {
  outDir?: string;
  pattern?: RegExp;
}) {
  const out = opts?.outDir ?? path.join(__dirname, '../..');
  const parser = new ShaderParser();

  const serializeGrammar = parser.getSerializedGastProductions();
  const html = createSyntaxDiagramsCode(
    serializeGrammar.filter((grammer) =>
      (opts?.pattern ?? /^(?<!(Tuple|Assignment))/).test(
        (grammer as any).name as string
      )
    )
  );
  const outFile = path.join(out, 'diagrams.html');
  fs.writeFileSync(outFile, html, { flag: 'w' });
  console.log('diagram written to ', outFile);

  exec(`open ${outFile}`);
}
