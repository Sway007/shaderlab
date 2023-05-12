import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import { defineConfig } from 'rollup';
import shebang from 'rollup-plugin-preserve-shebang';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import dts from 'rollup-plugin-dts';

export default defineConfig([
  // {
  //   input: 'src/parser.ts',
  //   output: {
  //     file: 'dist/parser.bundle.js',
  //     format: 'umd',
  //     name: 'ShaderParser',
  //     sourcemap: true,
  //   },
  //   plugins: [typescript({ module: 'esnext' }), terser()],
  // },
  // {
  //   input: 'bin/gen_diagram.ts',
  //   output: {
  //     file: 'dist/gen_diagram.bundle.js',
  //     format: 'umd',
  //     name: 'gen_diagram',
  //     sourcemap: true,
  //   },
  //   plugins: [
  //     typescript({ module: 'esnext' }),
  //     shebang({ shebang: '#!/usr/bin/env node' }),
  //     terser(),
  //   ],
  // },
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.bundle.js',
      format: 'umd',
      name: 'GalaceanShaderLab',
      sourcemap: true,
    },
    plugins: [
      typescript({ module: 'esnext' }),
      resolve(),
      terser(),
      commonjs({
        include: /node_modules/,
        requireReturnsDefault: 'auto', // <---- this solves default issue
      }),
    ],
  },
  {
    input: 'dist/dts/src/index.d.ts',
    output: {
      file: 'dist/index.bundle.d.ts',
      format: 'es',
    },
    plugins: [dts()],
  },
]);
