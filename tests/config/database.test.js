// tests/config/database.test.js - Tester för databasanslutning med mongodb-memory-server
const mongoose = require('mongoose');
const { connectDB, isConnected, closeConnection, getMongoInstance } = require('../../src/config/database');

describe('Database Connection med MongoDB Memory Server', () => {
  beforeAll(async () => {
    // Säkerställ att vi använder test-miljö
    process.env.NODE_ENV = 'test';
  });

  afterAll(async () => {
    // Stäng alla anslutningar efter tester
    if (mongoose.connection.readyState !== 0) {
      await closeConnection();
    }
  });

  afterEach(async () => {
    // Rensa databas efter varje test
    if (mongoose.connection.readyState === 1) {
      const collections = mongoose.connection.collections;
      for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany({});
      }
    }
  });

  describe('connectDB() med MongoDB Memory Server', () => {
    test('ska starta portable MongoDB server och ansluta framgångsrikt', async () => {
      const connection = await connectDB();
      
      expect(connection).toBeDefined();
      expect(connection.connection.readyState).toBe(1); // 1 = ansluten
      expect(connection.connection.name).toBe('kino-site-test');
      
      // Kontrollera att portable MongoDB server körs
      const mongoInstance = getMongoInstance();
      expect(mongoInstance).toBeDefined();
      expect(mongoInstance.getUri()).toContain('mongodb://127.0.0.1');
    });

    test('ska använda samma MongoDB instans för flera anslutningar', async () => {
      const connection1 = await connectDB();
      const connection2 = await connectDB();
      
      // Ska vara samma anslutning
      expect(connection1.connection.host).toBe(connection2.connection.host);
      expect(connection1.connection.port).toBe(connection2.connection.port);
    });
  });

  describe('isConnected()', () => {
    test('ska returnera true när ansluten', async () => {
      await connectDB();
      expect(isConnected()).toBe(true);
    });

    test('ska returnera false när frånkopplad', async () => {
      await closeConnection();
      expect(isConnected()).toBe(false);
    });
  });

  describe('closeConnection()', () => {
    test('ska stänga anslutningen framgångsrikt', async () => {
      await connectDB();
      expect(isConnected()).toBe(true);
      
      await closeConnection();
      expect(isConnected()).toBe(false);
    });

    test('ska hantera stängning av redan stängd anslutning', async () => {
      await closeConnection(); // Säkerställ att den är stängd
      
      // Ska inte kasta fel även om redan stängd
      await expect(closeConnection()).resolves.toBeUndefined();
    });
  });

  describe('Databasschema och Collections', () => {
    test('ska kunna skapa och radera collections', async () => {
      await connectDB();
      
      // Skapa en test collection
      const testCollection = mongoose.connection.collection('test');
      await testCollection.insertOne({ name: 'test' });
      
      // Verifiera att datan finns
      const doc = await testCollection.findOne({ name: 'test' });
      expect(doc).toBeDefined();
      expect(doc.name).toBe('test');
      
      // Rensa
      await testCollection.deleteMany({});
    });
  });

  describe('Miljövariabler', () => {
    test('ska använda rätt databas-URI från miljövariabler', () => {
      expect(process.env.MONGODB_URI).toContain('kino-site-test');
    });

    test('ska ha test-miljö konfigurerad', () => {
      expect(process.env.NODE_ENV).toBe('test');
    });
  });
});
