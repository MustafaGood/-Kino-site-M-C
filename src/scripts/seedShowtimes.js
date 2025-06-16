// Seedar testvisningar (showtimes) till databasen
const mongoose = require('mongoose');
const Showtime = require('../models/Showtime');
const Movie = require('../models/Movie');

async function seedShowtimes() {
  await mongoose.connect('mongodb://localhost:27017/kino-site');
  const movies = await Movie.find();
  if (movies.length === 0) {
    console.log('Inga filmer finns, seed-filmer först!');
    return mongoose.disconnect();
  }
  await Showtime.deleteMany({});
  const showtimes = [
    {
      movieId: movies[0]._id,
      movieTitle: movies[0].title,
      date: new Date(Date.now() + 86400000),
      time: '18:00',
      theater: 'Salong 1',
      totalSeats: 100,
      availableSeats: 100,
      price: 120,
    },
    {
      movieId: movies[1]._id,
      movieTitle: movies[1].title,
      date: new Date(Date.now() + 2 * 86400000),
      time: '20:00',
      theater: 'Salong 2',
      totalSeats: 80,
      availableSeats: 80,
      price: 110,
    },
  ];
  await Showtime.insertMany(showtimes);
  console.log('Testvisningar har lagts in!');
  mongoose.disconnect();
}

seedShowtimes();
