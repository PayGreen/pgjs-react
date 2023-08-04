import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

export default [
  {
    input: `src/index.tsx`,
    plugins: [typescript()],
    output: [
      {
        file: `dist/bundle.js`,
        format: "cjs",
        sourcemap: true,
      },
    ],
  },
  {
    input: `src/index.tsx`,
    plugins: [dts(), typescript()],
    output: {
      file: `dist/bundle.d.ts`,
      format: "es",
    },
  },
];
