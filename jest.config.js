module.exports = {
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testEnvironment: 'jsdom',
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  setupFiles: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@apis/(.*)$': '<rootDir>/apis/$1',
    '^@components/(.*)$': '<rootDir>/components/$1',
    '^@/(.*)$': '<rootDir>/$1',
  },
};
