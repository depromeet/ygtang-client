/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["next", "./react.js"],
  rules: {
    "@next/next/no-img-element": "off",
  },
  parserOptions: {
    babelOptions: {
      presets: [require.resolve("next/babel")],
    },
  },
};
