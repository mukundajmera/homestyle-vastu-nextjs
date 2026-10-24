// eslint-disable-next-line @typescript-eslint/no-require-imports -- Next.js exposes this config factory as CommonJS.
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  testPathIgnorePatterns: ['<rootDir>/e2e/'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^lucide-react$': require.resolve('lucide-react'),
  },
  transformIgnorePatterns: [
    '/node_modules/'
  ],
};

module.exports = createJestConfig(customJestConfig);
