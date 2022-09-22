const { resolve } = require('path');

module.exports = {
  bail: 1,
  preset: 'ts-jest',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  rootDir: 'src',
  modulePaths: ['<rootDir>'],
  testEnvironment: 'jsdom',
  transform: {
    '.(js|jsx|ts|tsx)$': 'ts-jest'
  },
  reporters: ['default', ['jest-junit', { suiteName: 'jest tests' }]],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    './*.(svg|jpg|jpeg|webp|png)': resolve('jest.file.js'),
    '^@src/(.*)$': '<rootDir>/$1',
    "^@utils/(.*)$": '<rootDir>/utils/$1',
    "^@utils$": '<rootDir>/utils',
  }
};