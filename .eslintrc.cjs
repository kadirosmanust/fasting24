const fs = require("fs");
const path = require("path");
const prettierOptions =  JSON.parse(
  fs.readFileSync(path.resolve(__dirname, ".prettierrc"), "utf8")
)

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "prettier"
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "prettier","simple-import-sort"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "no-console": "off",
    "react/require-default-props": "off",
    "prettier/prettier": ["error", prettierOptions],
    "no-restricted-syntax": [
      "error",
      {
        selector:
          "CallExpression[callee.object.name='console'][callee.property.name!=/^(log|warn|error|info|trace)$/]",
        message: "Unexpected property on console object was called",
      },
    ],
    "no-unused-vars": [1, { args: "after-used", argsIgnorePattern: "^_" }],
    "no-underscore-dangle": ["error", { allow: ["_id", "_doc"] }],
    "no-restricted-exports": "off",
    "@next/next/no-img-element": "off",
    "import/prefer-default-export": "off",
    "react/function-component-definition": [
      "off",
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    "react/jsx-props-no-spreading": "off",
    "jsx-a11y/label-has-associated-control": "off",
    "no-param-reassign": "off",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error"
  },
};
