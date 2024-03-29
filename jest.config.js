const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  resetMocks: true,
  moduleDirectories: ['node_modules'],
  testEnvironment: 'jsdom',
  testRegex: '(/__tests__/.*|(\\.|/)(test))\\.[jt]sx?$',
  collectCoverageFrom: [
    '**/src/**/*.{js,ts,jsx,tsx}',
    '!**/src/constants/**/*.{js,ts,jsx,tsx}',
    '!**/src/remotes/**/*.d.ts',
    '!**/src/store/**/!(use)*.{js,ts,jsx,tsx}',
    '!**/src/styles/!(utils)/*.{js,ts,jsx,tsx}',
  ],
  moduleNameMapper: {
    '~/(.*)': '<rootDir>/src/$1',
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2|ico)$': 'identity-obj-proxy',
  },
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
  transform: {
    '^.+\\.tsx?$': 'esbuild-jest',
  },
  coverageThreshold: null,
  setupFilesAfterEnv: ['./jest.setup.js'],
};

module.exports = createJestConfig(customJestConfig);
