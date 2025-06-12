// Enkel seed-script för att lägga in testfilmer i databasen
const mongoose = require('mongoose');
const Movie = require('../models/Movie');

const movies = [
  {
    title: 'Inception',
    description: 'En tjuv som stjäl företagshemligheter genom dröminfiltration.',
    genre: ['Sci-Fi', 'Thriller'],
    director: 'Christopher Nolan',
    actors: ['Leonardo DiCaprio', 'Ellen Page'],
    duration: 148,
    releaseDate: new Date('2010-07-16'),
    rating: '11+',
    posterUrl: 'https://image.tmdb.org/t/p/w500/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg'
  },
  {
    title: 'The Matrix',
    description: 'En hacker upptäcker den verkliga världen bakom illusionen.',
    genre: ['Action', 'Sci-Fi'],
    director: 'Lana Wachowski, Lilly Wachowski',
    actors: ['Keanu Reeves', 'Laurence Fishburne'],
    duration: 136,
    releaseDate: new Date('1999-03-31'),
    rating: '15+',
    posterUrl: 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg'
  },
  {
    title: 'Interstellar',
    description: 'Ett team av upptäcktsresande reser genom ett maskhål i rymden.',
    genre: ['Adventure', 'Drama', 'Sci-Fi'],
    director: 'Christopher Nolan',
    actors: ['Matthew McConaughey', 'Anne Hathaway'],
    duration: 169,
    releaseDate: new Date('2014-11-07'),
    rating: '11+',
    posterUrl: 'https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg'
  }
];

async function seed() {
  await mongoose.connect('mongodb://localhost:27017/kino-site');
  await Movie.deleteMany({});
  await Movie.insertMany(movies);
  console.log('Testfilmer har lagts in!');
  mongoose.disconnect();
}

seed();
