/** @type {import('jest').Config} */
const config = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-node-single-context',
  roots: ['<rootDir>'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        tsconfig: {
          esModuleInterop: true,
          allowSyntheticDefaultImports: true,
        },
      },
    ],
  },
  transformIgnorePatterns: [
    // Don't transform most node_modules, but allow specific packages if needed
    'node_modules/(?!(.*\\.mjs$))',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    // Mock embeddings.js in test environment to avoid ES module issues
    '^@themaximalist/embeddings\\.js$': '<rootDir>/lib/__tests__/__mocks__/embeddings.js',
  },
  collectCoverageFrom: [
    'lib/**/*.ts',
    '!lib/**/*.d.ts',
    '!lib/**/*.example.ts',
    '!lib/__tests__/**',
  ],
  testTimeout: 60000, // 60 seconds for integration tests that may need to connect to Qdrant and initialize models
  setupFilesAfterEnv: []
};

module.exports = config;
