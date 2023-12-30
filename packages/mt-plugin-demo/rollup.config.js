import { defineConfig } from 'rollup'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import esbuild from 'rollup-plugin-esbuild'
import { dts } from 'rollup-plugin-dts'

export default defineConfig([

  {
    input: 'src/index.ts',
    output: [
      {
        file: `./dist/index.cjs`,
        format: 'cjs',
        sourcemap: true,
        exports: 'named',
      },
      {
        file: `./dist/index.mjs`,
        format: 'esm',
        sourcemap: true,
        exports: 'named',
      },
    ],
    plugins: [
      commonjs(),
      nodeResolve({ preferBuiltins: true }),
      esbuild({ charset: 'utf8', minify: true, target: 'node18' }),
    ],

    treeshake: 'smallest',
  },
  /* 单独生成声明文件 */
  {
    input: 'src/types.ts',
    plugins: [dts()],
    output: {
      format: 'esm',
      file: 'dist/index.d.ts',
    },
  },
])
