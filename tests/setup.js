// tests/setup.js - Test setup för Kino-site
const dotenv = require('dotenv');

// Ladda test-specifika miljövariabler
dotenv.config({ path: '.env.test' });

// Sätt test miljö
process.env.NODE_ENV = 'test';
process.env.MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/kino-site-test';
process.env.SESSION_SECRET = 'test-secret-key';
process.env.PORT = '3001';

// Global test timeout
jest.setTimeout(10000);

// Console warnings för långsamma tester
const originalConsoleWarn = console.warn;
console.warn = (...args) => {
  if (
    args[0] && 
    typeof args[0] === 'string' && 
    args[0].includes('slow test')
  ) {
    return;
  }
  originalConsoleWarn.apply(console, args);
};

// Global setup för alla tester
beforeAll(async () => {
  // Kan användas för att sätta upp globala test-resurser
});

afterAll(async () => {
  // Rensa upp efter alla tester
  if (global.__MONGOD__) {
    await global.__MONGOD__.stop();
  }
});
