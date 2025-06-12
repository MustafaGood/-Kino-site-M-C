// src/config/env-validator.js - Validera miljövariabler beroende på miljö
const validateEnvironment = () => {
  const environment = process.env.NODE_ENV || 'development';

  console.log(`🔍 Validerar miljökonfiguration för: ${environment}`);

  if (environment === 'production') {
    // I PRODUKTION: Kräv extern MongoDB URI
    if (!process.env.MONGODB_URI) {
      throw new Error(`
❌ KRITISKT FEL: MONGODB_URI måste vara satt i produktionsmiljö!
   
   Produktionsmiljön kan inte använda portable MongoDB av säkerhetsskäl.
   Sätt en giltig MongoDB Atlas eller extern MongoDB URI.
   
   Exempel:
   MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/kino-site
      `);
    }

    // Varna om portable MongoDB försöker användas i produktion
    if (
      process.env.MONGODB_URI &&
      process.env.MONGODB_URI.includes('127.0.0.1')
    ) {
      throw new Error(`
❌ SÄKERHETSFEL: Localhost MongoDB URI upptäckt i produktionsmiljö!
   
   URI: ${process.env.MONGODB_URI}
   
   Detta är inte säkert för produktion. Använd en extern MongoDB service.
      `);
    }

    console.log(
      '✅ Produktionsmiljö validerad - extern MongoDB kommer att användas'
    );
  } else {
    // I UTVECKLING/TEST: Portable MongoDB tillåts
    if (
      process.env.MONGODB_URI &&
      !process.env.MONGODB_URI.includes('localhost') &&
      !process.env.MONGODB_URI.includes('127.0.0.1')
    ) {
      console.warn(`
⚠️  VARNING: Extern MongoDB URI upptäckt i utvecklingsmiljö
   
   URI: ${process.env.MONGODB_URI.replace(/\/\/[^:]+:[^@]+@/, '//***:***@')}
   
   Utvecklingsmiljön kommer att använda portable MongoDB istället för att skydda produktionsdata.
   För att använda extern databas, sätt NODE_ENV=production
      `);
    }

    console.log(
      '✅ Utvecklingsmiljö validerad - portable MongoDB kommer att användas'
    );
  }

  // Validera andra viktiga miljövariabler
  if (
    !process.env.SESSION_SECRET ||
    process.env.SESSION_SECRET === 'your-secret-key-here-change-in-production'
  ) {
    if (environment === 'production') {
      throw new Error(
        'SESSION_SECRET måste vara satt till en stark hemlig nyckel i produktion!'
      );
    } else {
      console.warn(
        '⚠️  Använder default SESSION_SECRET - ändra detta för produktion'
      );
    }
  }

  return {
    environment,
    usePortableMongoDB: environment !== 'production',
    useExternalMongoDB: environment === 'production',
  };
};

module.exports = {
  validateEnvironment,
};
