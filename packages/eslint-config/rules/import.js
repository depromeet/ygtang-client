/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["plugin:import/recommended", "plugin:import/typescript"],
  plugins: ["import", "simple-import-sort"],
  settings: {
    "import/resolver": "node",
    "import/extensions": [".js", ".jsx", ".ts", ".tsx"],
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
  },
  rules: {
    "import/no-duplicates": "error",
    "import/newline-after-import": "error",
    "import/default": "off",
    "import/namespace": "off",
    "import/no-unresolved": "off",
    "simple-import-sort/imports": [
      "error",
      {
        groups: [
          // react > next > @ > ~ > a~z
          ["^react$", "^next", "^@", "^[a-z]"],
          // `../` > './'
          ["^~"],
          [
            "^\\.\\.(?!/?$)",
            "^\\.\\./?$",
            "^\\./(?=.*/)(?!/?$)",
            "^\\.(?!/?$)",
            "^\\./?$",
          ],
          // Side effect imports
          ["^\\u0000"],
        ],
      },
    ],
    "simple-import-sort/exports": "error",
  },
};
