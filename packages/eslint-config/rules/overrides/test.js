/** @type {import("eslint").Linter.Config} */
module.exports = {
  overrides: [
    {
      env: {
        jest: true,
      },
      files: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(test).[jt]s?(x)"],
      extends: ["plugin:testing-library/react", "plugin:jest/recommended"],
      rules: {
        // 테스트 환경에서 devDependency 사용을 위해
        "import/no-extraneous-dependencies": [
          "off",
          { devDependencies: ["**/?(*.)+(spec|test).[jt]s?(x)"] },
        ],
        "react/display-name": "off",
      },
    },
    {
      files: ["**/cypress/**/*.[jt]s?(x)", "**/?(*.)+(spec).[jt]s?(x)"],
      rules: {
        // 테스트 환경에서 devDependency 사용을 위해
        "import/no-extraneous-dependencies": [
          "off",
          { devDependencies: ["**/?(*.)+(spec|test).[jt]s?(x)"] },
        ],
        "react/display-name": "off",
      },
    },
  ],
};
