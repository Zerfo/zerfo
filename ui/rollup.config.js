import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import autoExternal from 'rollup-plugin-auto-external';
import babel from '@rollup/plugin-babel';
import commonjs from "@rollup/plugin-commonjs";
import dts from "rollup-plugin-dts";
import image from '@rollup/plugin-image';
import postcss from 'rollup-plugin-postcss';
import postcssUrl from 'postcss-url';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

const packageJson = require("./package.json");

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      nodeResolve({ extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss']}),
      typescript({ tsconfig: './tsconfig.json' }),
      commonjs(),
      image(),
      postcss({
        minimize: true,
        modules: true,
        extract: true,
        plugins: [
          postcssUrl({ url: 'inline' })
        ]
      }),
      babel({ babelHelpers: 'runtime'}),
      terser(),
      autoExternal()
    ],
  },
  {
    input: "dist/esm/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
    external: [/\.(css|scss|sass)$/],
  },
];