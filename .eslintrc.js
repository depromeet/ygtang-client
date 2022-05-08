module.exports = {
  extends: ['next', 'prettier', 'plugin:import/recommended', 'plugin:import/typescript'],
  plugins: ['prettier', 'import', '@typescript-eslint', 'simple-import-sort', 'ygt-rules'],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },
  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
        selector: 'variable',
        leadingUnderscore: 'allow',
      },
      { format: ['camelCase', 'PascalCase'], selector: 'function' },
      { format: ['PascalCase'], selector: 'interface' },
      { format: ['PascalCase'], selector: 'typeAlias' },
    ],
    'no-implicit-coercion': 'error',
    '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
    '@typescript-eslint/no-unused-vars': [
      'error',
      { ignoreRestSiblings: true, argsIgnorePattern: '_', varsIgnorePattern: '_' },
    ],
    'prefer-const': 'error',
    'no-var': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'react/jsx-no-target-blank': 'error',
    'import/no-duplicates': 'error',
    'import/newline-after-import': 'error',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // react > next > @ > ~ > a~z
          ['^react$', '^next', '^@', '^[a-z]'],
          // `../` > './'
          ['^~'],
          ['^\\.\\.(?!/?$)', '^\\.\\./?$', '^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          // Side effect imports
          ['^\\u0000'],
        ],
      },
    ],
    'simple-import-sort/exports': 'error',
    'import/default': 'off',
    'import/namespace': 'off',
    '@next/next/no-img-element': 'off',

    'ygt-rules/internal-router-passhref': 'warn',
  },
  overrides: [
    {
      env: {
        jest: true,
      },
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react', 'plugin:jest/recommended'],
      rules: {
        // 테스트 환경에서 devDependency 사용을 위해
        'import/no-extraneous-dependencies': [
          'off',
          { devDependencies: ['**/?(*.)+(spec|test).[jt]s?(x)'] },
        ],
        'react/display-name': 'off',
      },
    },
  ],
};
