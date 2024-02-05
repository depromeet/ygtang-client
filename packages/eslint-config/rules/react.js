/** @type {import("eslint").Linter.Config} */
module.exports = {
  plugins: ["react", "react-hooks"],
  rules: {
    "react/prop-types": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
    "react/jsx-no-target-blank": "error",
  },
};
