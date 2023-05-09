import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import { defineConfig } from 'rollup';
import shebang from 'rollup-plugin-preserve-shebang';

export default defineConfig([
  {
    input: 'src/parser.ts',
    output: {
      file: 'dist/parser.bundle.js',
      format: 'umd',
      name: 'ShaderParser',
      sourcemap: true,
    },
    plugins: [typescript({ module: 'esnext' }), terser()],
  },
  {
    input: 'bin/gen_diagram.ts',
    output: {
      file: 'dist/gen_diagram.bundle.js',
      format: 'umd',
      name: 'gen_diagram',
      sourcemap: true,
    },
    plugins: [
      typescript({ module: 'esnext' }),
      shebang({ shebang: '#!/usr/bin/env node' }),
      terser(),
    ],
  },
]);
