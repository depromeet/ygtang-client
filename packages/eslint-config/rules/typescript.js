/** @type {import("eslint").Linter.Config} */
module.exports = {
  plugins: ["@typescript-eslint"],
  extends: [
    "plugin:@typescript-eslint/recommended"
  ],
  parser: "@typescript-eslint/parser",
  rules: {
    "@typescript-eslint/naming-convention": [
      "error",
      {
        format: ["camelCase", "UPPER_CASE", "PascalCase"],
        selector: "variable",
        leadingUnderscore: "allow",
      },
      { format: ["camelCase", "PascalCase"], selector: "function" },
      { format: ["PascalCase"], selector: "interface" },
      { format: ["PascalCase"], selector: "typeAlias" },
    ],
    "@typescript-eslint/array-type": ["error", { default: "array-simple" }],
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        ignoreRestSiblings: true,
        argsIgnorePattern: "_",
        varsIgnorePattern: "_",
      },
    ],
    "@typescript-eslint/no-unsafe-return": "off"
  },
};
