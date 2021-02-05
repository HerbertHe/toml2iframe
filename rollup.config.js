import commonjs from "@rollup/plugin-commonjs"
import resolve from "@rollup/plugin-node-resolve"
import babel from "@rollup/plugin-babel"

const extensions = [".js", ".ts"]

export default {
    input: "src/index.ts",
    output: [
        {
            file: "dist/index.js",
            format: "cjs",
        },
    ],
    plugins: [
        resolve({ extensions }),
        commonjs(),

        babel({ extensions, include: ["src/**/*"] }),
    ],
}
