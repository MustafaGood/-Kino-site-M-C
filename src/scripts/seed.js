const mongoose = require('mongoose');
const path = require('path');
const Movie = require(path.join(__dirname, '../models/Movie'));
const Showtime = require(path.join(__dirname, '../models/Showtime'));

const MONGODB_URI = 'mongodb://localhost:27017/kino'; // Ändra vid behov

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Ansluten till MongoDB');

    // Radera tidigare data
    await Movie.deleteMany({});
    await Showtime.deleteMany({});
    console.log('Tidigare data raderad');

    // Lägg till filmer
    const movies = await Movie.insertMany([
      { title: 'Inception', genre: 'Sci-Fi', year: 2010 },
      { title: 'The Godfather', genre: 'Crime', year: 1972 },
      { title: 'Interstellar', genre: 'Sci-Fi', year: 2014 },
    ]);
    console.log('Filmer tillagda:', movies.map(m => m.title));

    // Lägg till visningar kopplade till filmerna
    const now = new Date();
    const showtimes = [
      {
        movie: movies[0]._id,
        datetime: new Date(now.getTime() + 2 * 60 * 60 * 1000), // 2 timmar framåt
        theater: 'Salong 1',
      },
      {
        movie: movies[1]._id,
        datetime: new Date(now.getTime() + 24 * 60 * 60 * 1000), // 1 dag framåt
        theater: 'Salong 2',
      },
      {
        movie: movies[2]._id,
        datetime: new Date(now.getTime() + 48 * 60 * 60 * 1000), // 2 dagar framåt
        theater: 'Salong 1',
      },
    ];
    await Showtime.insertMany(showtimes);
    console.log('Visningar tillagda');
  } catch (err) {
    console.error('Fel vid seed:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Databaskoppling stängd');
  }
}

seed();
