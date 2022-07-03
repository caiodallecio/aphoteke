import type { Config } from '@jest/types';
import { env } from 'process';

const regex = [];
if (env.mode === 'unit' || env.mode === 'all')
  regex.push('.*\\.unit\\.spec\\.ts$');
if (env.mode === 'e2e' || env.mode === 'all')
  regex.push('.*\\.e2e\\.spec\\.ts$');

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: regex,
  collectCoverageFrom: ['src/**/*.ts', '!src/main.ts'],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  setupFiles: ['./src/helpers/setupJest.ts'],
};

export default config;
