/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@ygtang/eslint-config/react.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
};
