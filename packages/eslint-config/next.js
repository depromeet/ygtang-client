/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [...["./index.js", "./rules/next.js"].map(require.resolve)],
};
