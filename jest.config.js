// jest.config.js - Jest konfiguration för Kino-site
module.exports = {
  // Test miljö
  testEnvironment: 'node',
  
  // Test filer
  testMatch: [
    '**/tests/**/*.(test|spec).js',
    '**/__tests__/**/*.(test|spec).js'
  ],
  
  // Ignorera dessa mappar
  testPathIgnorePatterns: [
    '/node_modules/',
    '/public/',
    '/views/'
  ],
  
  // Setup filer som körs före alla tester
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  
  // Coverage rapportering
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  
  // Vilka filer som ska inkluderas i coverage
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/public/**',
    '!src/views/**',
    '!**/node_modules/**'
  ],
  
  // Coverage tröskelvärden enligt Sprint 1 mål (>70%)
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  },
  
  // Timeout för tester (längre för databasanslutningar)
  testTimeout: 10000,
  
  // Verbose output
  verbose: true,
  
  // Rensa mocks efter varje test
  clearMocks: true,
  
  // Hantera ES6 modules om det behövs
  transform: {},
  
  // Miljövariabler för tester
  testEnvironmentOptions: {
    NODE_ENV: 'test'
  }
};
