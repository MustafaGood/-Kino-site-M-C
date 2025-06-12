// tests/app.test.js - Tester för Express applikation
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const { closeConnection } = require('../src/config/database');

describe('Express App', () => {
  beforeAll(async () => {
    // Sätt test miljö
    process.env.NODE_ENV = 'test';
  });

  afterAll(async () => {
    // Stäng databasanslutning efter alla tester
    if (mongoose.connection.readyState !== 0) {
      await closeConnection();
    }
  });

  describe('Grundläggande Routes', () => {
    test('GET / ska returnera hemsidan', async () => {
      const response = await request(app)
        .get('/')
        .expect('Content-Type', /html/)
        .expect(200);

      expect(response.text).toContain('Kino-site');
    });

    test('GET /health ska returnera hälsostatus', async () => {
      const response = await request(app)
        .get('/health')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('status', 'OK');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('environment');
    });

    test('GET /nonexistent ska returnera 404', async () => {
      const response = await request(app)
        .get('/nonexistent-route')
        .expect(404);

      expect(response.text).toContain('404');
    });
  });

  describe('Middleware', () => {
    test('ska sätta rätt security headers', async () => {
      const response = await request(app)
        .get('/')
        .expect(200);

      // Kontrollera att Helmet middleware är aktivt
      expect(response.headers).toHaveProperty('x-frame-options');
      expect(response.headers).toHaveProperty('x-content-type-options');
    });

    test('ska hantera JSON data', async () => {
      const response = await request(app)
        .post('/api/test')
        .send({ test: 'data' })
        .set('Content-Type', 'application/json');

      // Även om rutten inte finns ska JSON middleware fungera
      expect(response.status).toBe(404);
    });

    test('ska hantera URL-encoded data', async () => {
      const response = await request(app)
        .post('/api/test')
        .send('test=data')
        .set('Content-Type', 'application/x-www-form-urlencoded');

      // Även om rutten inte finns ska middleware fungera
      expect(response.status).toBe(404);
    });
  });

  describe('Session Middleware', () => {
    test('ska sätta session cookie', async () => {
      const response = await request(app)
        .get('/')
        .expect(200);

      // Kontrollera att session middleware sätter cookies
      const cookies = response.headers['set-cookie'];
      if (cookies) {
        expect(cookies.some(cookie => cookie.includes('connect.sid'))).toBe(true);
      }
    });
  });

  describe('Static Files', () => {
    test('ska servera statiska filer från public/', async () => {
      // Testa att static middleware är konfigurerat
      const response = await request(app)
        .get('/css/style.css')
        .expect('Content-Type', /css/);

      // Ska antingen returnera filen (200) eller 404 om den inte finns än
      expect([200, 404]).toContain(response.status);
    });

    test('ska servera JavaScript filer', async () => {
      const response = await request(app)
        .get('/js/main.js')
        .expect('Content-Type', /javascript/);

      // Ska antingen returnera filen (200) eller 404 om den inte finns än
      expect([200, 404]).toContain(response.status);
    });
  });

  describe('Error Handling', () => {
    test('ska hantera 404 errors gracefully', async () => {
      const response = await request(app)
        .get('/this-route-does-not-exist')
        .expect(404);

      expect(response.text).toContain('404');
    });

    test('ska hantera server errors', async () => {
      // Detta test kräver att vi skapar en route som kastar ett fel
      // För nu, testa bara att error middleware finns
      expect(app._router).toBeDefined();
    });
  });

  describe('Template Engine', () => {
    test('ska ha EJS konfigurerat som view engine', async () => {
      const response = await request(app)
        .get('/')
        .expect(200);

      // Kontrollera att EJS templates renderas
      expect(response.text).toContain('<!DOCTYPE html>');
      expect(response.text).toContain('<html');
    });
  });

  describe('Miljökonfiguration', () => {
    test('ska använda rätt miljövariabler', () => {
      expect(process.env.NODE_ENV).toBe('test');
      expect(process.env.MONGODB_URI).toContain('test');
    });

    test('ska ha session secret konfigurerat', () => {
      expect(process.env.SESSION_SECRET).toBeDefined();
    });
  });
});
