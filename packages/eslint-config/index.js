/** @type {import("eslint").Linter.Config} */
module.exports = {
  plugins: [],
  extends: [
    ...[
      "./rules/core.js",
      "./rules/import.js",
      "./rules/typescript.js",
      "./rules/prettier.js",
    ].map(require.resolve),
  ],
};
