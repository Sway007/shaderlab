import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import { defineConfig } from 'rollup';
import shebang from 'rollup-plugin-preserve-shebang';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import dts from 'rollup-plugin-dts';

export default defineConfig([
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/umd/index.js',
        format: 'umd',
        name: 'GalaceanShaderLab',
        sourcemap: true,
      },
      {
        file: 'dist/es/index.js',
        format: 'es',
        sourcemap: true,
      },
    ],
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
    input: 'dist/es/dts/src/index.d.ts',
    output: [
      {
        file: 'dist/es/index.d.ts',
        format: 'es',
      },
      {
        file: 'dist/umd/index.d.ts',
        format: 'es',
      },
    ],
    plugins: [dts()],
  },
]);
