import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import url from '@rollup/plugin-url';
import svgr from '@svgr/rollup';
import cssnano from 'cssnano';
import autoprefixer from 'autoprefixer';
import pkg from './package.json';

export default [
  {
    input: 'src/index.ts',
    external: Object.keys(pkg.peerDependencies),
    output: [{ file: pkg.main, format: 'es' }],
    plugins: [
      postcss({
        extract: 'style.min.css',
        plugins: [autoprefixer(), cssnano()],
      }),
      resolve({ extensions: ['.js', '.jsx', '.ts', '.tsx'] }),
      commonjs(),
      typescript(),
      url(),
      svgr({ svgo: false }),
      terser(),
    ],
  },
];
