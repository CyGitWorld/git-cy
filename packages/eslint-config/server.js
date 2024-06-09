const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["eslint:recommended", "prettier"],
  globals: {
    JSX: true,
  },
  env: {
    node: true,
  },
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
  ignorePatterns: [
    // Ignore dotfiles
    ".*.js",
    "node_modules/",
    "*.d.ts",
  ],
  plugins: ["simple-import-sort"],
  rules: {
    "no-restricted-exports": [
      "error",
      { restrictDefaultExports: { direct: true } },
    ],
    "no-empty-pattern": "off",
    "simple-import-sort/imports": "error",
    "no-unused-vars": "warn",
    "eol-last": "error",
  },
  overrides: [
    {
      files: ["src/worker.ts"],
      rules: {
        "no-restricted-exports": "off",
      },
    },
  ],
};
