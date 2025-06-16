// src/config/database.js - MongoDB databasanslutning för Kino-site med portable-mongodb
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { validateEnvironment } = require('./env-validator');

let mongod = null;

const connectDB = async () => {
  try {
    // Validera miljökonfiguration först
    const envConfig = validateEnvironment();

    let mongoURI;
    const environment = envConfig.environment;

    if (envConfig.useExternalMongoDB) {
      // PRODUKTION: Använd extern MongoDB från miljövariabler
      console.log('🏭 Produktionsmiljö - använder extern MongoDB');
      mongoURI = process.env.MONGODB_URI;

      console.log(
        `📊 Produktions MongoDB URI: ${mongoURI.replace(/\/\/[^:]+:[^@]+@/, '//***:***@')}`
      );
    } else if (envConfig.usePortableMongoDB) {
      // UTVECKLING/TEST: Använd MongoDB Memory Server (portable)
      console.log('🔧 Utvecklings/Test-miljö - använder portable MongoDB');
      6;
      // Blockera extern MongoDB i utvecklingsmiljö för säkerhet
      if (
        process.env.MONGODB_URI &&
        !process.env.MONGODB_URI.includes('localhost') &&
        !process.env.MONGODB_URI.includes('127.0.0.1') &&
        process.env.NODE_ENV == 'development'
      ) {
        console.log(
          '🛡️  Ignorerar extern MONGODB_URI i utvecklingsmiljö för datasäkerhet'
        );
      }

      // Stäng befintlig Mongoose anslutning om den finns
      if (mongoose.connection.readyState !== 0) {
        console.log('🔄 Stänger befintlig Mongoose anslutning...');
        await mongoose.connection.close();
      }

      if (!mongod) {
        console.log('🔄 Startar portable MongoDB server...');

        try {
          mongod = await MongoMemoryServer.create({
            binary: {
              version: '6.0.6',
              downloadDir: './mongodb-binaries',
            },
            instance: {
              // Låt MongoDB Memory Server välja en fri port automatiskt
              port: undefined,
              dbName: environment === 'test' ? 'kino-site-test' : 'kino-site',
            },
          });

          console.log('✅ Portable MongoDB server startad');
        } catch (memoryServerError) {
          console.error(
            '❌ Kunde inte starta MongoDB Memory Server:',
            memoryServerError.message
          );
          throw memoryServerError;
        }
      }

      // Hämta den dynamiska URI från Memory Server
      mongoURI = mongod.getUri();

      // Lägg till databas namnet om det inte redan finns
      const dbName = environment === 'test' ? 'kino-site-test' : 'kino-site';
      if (!mongoURI.includes(dbName)) {
        mongoURI = mongoURI.endsWith('/')
          ? mongoURI + dbName
          : mongoURI + '/' + dbName;
      }

      console.log(`📊 Portable MongoDB URI: ${mongoURI}`);
    }

    // Moderna Mongoose anslutningsalternativ
    const options = {
      // Timeout inställningar
      serverSelectionTimeoutMS: environment === 'production' ? 30000 : 10000,
      connectTimeoutMS: environment === 'production' ? 30000 : 10000,
      socketTimeoutMS: 45000,

      // Connection pool inställningar
      maxPoolSize: environment === 'production' ? 10 : 3,
      minPoolSize: environment === 'production' ? 2 : 1,

      // Heartbeat
      heartbeatFrequencyMS: environment === 'production' ? 10000 : 5000,

      // Retry inställningar
      retryWrites: true,
      retryReads: true,
    };

    console.log('🔄 Ansluter till MongoDB...');

    // Försök ansluta med exponential backoff
    let retryCount = 0;
    const maxRetries = environment === 'production' ? 5 : 3;

    while (retryCount < maxRetries) {
      try {
        const conn = await mongoose.connect(mongoURI, options);

        console.log(
          `✅ MongoDB ansluten: ${conn.connection.host}:${conn.connection.port}`
        );
        console.log(`📊 Databas: ${conn.connection.name}`);
        console.log(
          `🔗 Anslutningsstatus: ${mongoose.connection.readyState === 1 ? 'Ansluten' : 'Ej ansluten'}`
        );

        // Setup event listeners (bara en gång)
        if (!mongoose.connection.listeners('error').length) {
          mongoose.connection.on('error', (err) => {
            console.error('❌ MongoDB anslutningsfel:', err.message);
          });

          mongoose.connection.on('disconnected', () => {
            console.warn('⚠️  MongoDB frånkopplad');
          });

          mongoose.connection.on('reconnected', () => {
            console.log('🔄 MongoDB återansluten');
          });
        }

        return conn;
      } catch (connectError) {
        retryCount++;
        console.error(
          `❌ Anslutningsförsök ${retryCount}/${maxRetries} misslyckades:`,
          connectError.message
        );

        if (retryCount >= maxRetries) {
          throw connectError;
        }

        const delay = Math.pow(2, retryCount) * 1000; // Exponential backoff
        console.log(`⏳ Väntar ${delay}ms innan nästa försök...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  } catch (error) {
    console.error('❌ Kritiskt fel vid databasanslutning:', error.message);

    // Cleanup vid fel
    if (mongod && process.env.NODE_ENV !== 'production') {
      try {
        await mongod.stop();
        mongod = null;
        console.log('🧹 Portable MongoDB server stoppad efter fel');
      } catch (cleanupError) {
        console.error('❌ Fel vid cleanup:', cleanupError.message);
      }
    }

    throw error;
  }
};

// Hjälpfunktion för att kontrollera databasanslutning
const isConnected = () => {
  return mongoose.connection.readyState === 1;
};

// Hjälpfunktion för att stänga databasanslutning (främst för tester)
const closeConnection = async () => {
  try {
    await mongoose.connection.close();

    // Stäng portable MongoDB server om den körs
    if (mongod) {
      await mongod.stop();
      mongod = null;
      console.log('🔒 Portable MongoDB server stoppad');
    }

    console.log('🔒 MongoDB anslutning stängd');
  } catch (error) {
    console.error('❌ Fel vid stängning av databasanslutning:', error);
    throw error;
  }
};

// Hjälpfunktion för att få MongoDB instans (för tester)
const getMongoInstance = () => mongod;

module.exports = {
  connectDB,
  isConnected,
  closeConnection,
  getMongoInstance,
};
