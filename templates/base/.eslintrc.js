/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@ygtang/eslint-config"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
};
