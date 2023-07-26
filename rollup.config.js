import dts from "rollup-plugin-dts";
import typescript from "rollup-plugin-typescript2";

export default [
  {
    input: "src/index.ts",
    output: {
      file: "build/paygreenjs-react.js",
      format: "cjs",
      sourcemap: true,
    },
    plugins: [typescript()],
  },
  {
    input: "src/types/index.d.ts",
    output: {
      file: "build/paygreenjs-react.d.ts",
      format: "es",
    },
    plugins: [dts()],
  },
];
