// src/scripts/testConnection.js - Testa databasanslutning
const {
  connectDB,
  closeConnection,
  isConnected,
} = require('../config/database');

async function testDatabaseConnection() {
  console.log('🧪 Testar portable MongoDB anslutning...\n');

  try {
    // Testa anslutning
    console.log('1. Ansluter till databas...');
    await connectDB();

    if (isConnected()) {
      console.log('✅ Databasanslutning lyckades!');
      console.log(`📊 Miljö: ${process.env.NODE_ENV || 'development'}`);
    } else {
      console.log('❌ Databasanslutning misslyckades');
      return;
    }

    // Testa basic operation
    console.log('\n2. Testar databasoperationer...');
    const mongoose = require('mongoose');

    // Skapa en enkel test-schema
    const TestSchema = new mongoose.Schema({
      name: String,
      timestamp: { type: Date, default: Date.now },
    });

    const TestModel = mongoose.model('Test', TestSchema);

    // Skapa test-dokument
    const testDoc = new TestModel({ name: 'Portable MongoDB Test' });
    await testDoc.save();
    console.log('✅ Dokument skapat');

    // Läs tillbaka
    const found = await TestModel.findOne({ name: 'Portable MongoDB Test' });
    if (found) {
      console.log('✅ Dokument läst tillbaka');
      console.log(`📄 Data: ${found.name} (${found.timestamp})`);
    }

    // Rensa test-data
    await TestModel.deleteMany({});
    console.log('✅ Test-data rensad');

    console.log(
      '\n🎉 Alla tester passerade! Portable MongoDB fungerar korrekt.'
    );
  } catch (error) {
    console.error('❌ Test misslyckades:', error.message);
    process.exit(1);
  } finally {
    // Stäng anslutning
    console.log('\n3. Stänger anslutning...');
    await closeConnection();
    console.log('✅ Anslutning stängd');
  }
}

// Kör test om filen körs direkt
if (require.main === module) {
  testDatabaseConnection().catch(console.error);
}

module.exports = testDatabaseConnection;
