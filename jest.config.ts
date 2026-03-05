import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/lib/env/client$': '<rootDir>/__tests__/__mocks__/env.mock.ts',
    '^@/lib/env/server$': '<rootDir>/__tests__/__mocks__/env.mock.ts',
    '^@/(.*)$': '<rootDir>/$1',
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testMatch: ['**/__tests__/**/*.test.ts'],
  clearMocks: true,
};

export default config;
