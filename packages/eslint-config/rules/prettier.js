/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["prettier"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
  },
};
