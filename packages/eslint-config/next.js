const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    "eslint:recommended",
    "prettier",
    require.resolve("@vercel/style-guide/eslint/next"),
    "eslint-config-turbo",
  ],
  globals: {
    React: true,
    JSX: true,
  },
  env: {
    node: true,
    browser: true,
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
  rules: {
    "no-restricted-exports": [
      "error", { "restrictDefaultExports": { "direct": true } },
    ],
    "no-empty-pattern": "off"
  },
  overrides: [
    { files: ["*.js?(x)", "*.ts?(x)"] },
    {
      files: ['src/app/**/{page,layout,not-found}.tsx'],
      rules: {
        'no-restricted-exports': 'off',
      },
    },
  ],
};
