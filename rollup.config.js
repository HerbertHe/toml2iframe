import commonjs from "@rollup/plugin-commonjs"
import resolve from "@rollup/plugin-node-resolve"
import babel from "@rollup/plugin-babel"
import { terser } from "rollup-plugin-terser"

const extensions = [".js", ".ts"]

export default {
    input: "src/index.ts",
    plugins: [
        resolve({ extensions }),
        commonjs(),

        babel({ extensions, include: ["src/**/*"] }),
    ],
    output: [
        {
            file: "dist/index.js",
            format: "cjs",
        },
        {
            file: "dist/index.min.js",
            format: "cjs",
            plugins: [terser()],
        },
    ],
}
