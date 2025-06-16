// Enkel seed-script för att lägga in testfilmer i databasen
const mongoose = require('mongoose');
const Movie = require('../models/Movie');
require('dotenv').config();

// Command line arguments
const args = process.argv.slice(2);
const force = args.includes('--force') || args.includes('-f');

const movies = [
  {
    title: 'Inception',
    description: 'En tjuv som stjäl information från människors undermedvetna genom att dela deras drömmar får i uppdrag att göra det motsatta: att plantera en idé i någons undermedvetna.',
    genre: ['Action', 'Sci-Fi', 'Thriller'],
    director: 'Christopher Nolan',
    actors: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Ellen Page'],
    duration: 148,
    releaseDate: new Date('2010-07-16'),
    rating: '11+',
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg',
    trailer: 'https://www.youtube.com/watch?v=YoHD9XEInc0',
    averageRating: 4.8,
    reviewCount: 150
  },
  {
    title: 'The Shawshank Redemption',
    description: 'Två fångar, Andy och Red, utvecklar en djup vänskap under åren i fängelse, och tillsammans hittar de tröst och eventuellt uppfyllelse genom att utföra goda gärningar.',
    genre: ['Drama'],
    director: 'Frank Darabont',
    actors: ['Tim Robbins', 'Morgan Freeman', 'Bob Gunton'],
    duration: 142,
    releaseDate: new Date('1994-09-23'),
    rating: '15+',
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg',
    trailer: 'https://www.youtube.com/watch?v=6hB3S9bIaco',
    averageRating: 4.9,
    reviewCount: 200
  },
  {
    title: 'The Dark Knight',
    description: 'När hotet som kallas Jokern orsakar kaos och kaos i Gotham City, måste Batman acceptera en av de största psykologiska och fysiska testerna av hans förmåga att kämpa mot orättvisa.',
    genre: ['Action', 'Crime', 'Drama'],
    director: 'Christopher Nolan',
    actors: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart'],
    duration: 152,
    releaseDate: new Date('2008-07-18'),
    rating: '11+',
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg',
    trailer: 'https://www.youtube.com/watch?v=EXeTwQWrcwY',
    averageRating: 4.7,
    reviewCount: 180
  },
  {
    title: 'Pulp Fiction',
    description: 'Livsstilar för två mobbister, en boxare, en hustru till en gangster och två banditer korsar varandra i fyra berättelser om våld och förlösning.',
    genre: ['Crime', 'Drama'],
    director: 'Quentin Tarantino',
    actors: ['John Travolta', 'Uma Thurman', 'Samuel L. Jackson'],
    duration: 154,
    releaseDate: new Date('1994-10-14'),
    rating: '15+',
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
    trailer: 'https://www.youtube.com/watch?v=s7EdQ4FqbhY',
    averageRating: 4.6,
    reviewCount: 170
  },
  {
    title: 'Forrest Gump',
    description: 'Berättelsen om en man med en IQ på 75 som får uppleva några av de viktigaste händelserna i amerikansk historia under 1900-talet.',
    genre: ['Drama', 'Romance'],
    director: 'Robert Zemeckis',
    actors: ['Tom Hanks', 'Robin Wright', 'Gary Sinise'],
    duration: 142,
    releaseDate: new Date('1994-07-06'),
    rating: '11+',
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg',
    trailer: 'https://www.youtube.com/watch?v=bLvqoHBptjg',
    averageRating: 4.8,
    reviewCount: 190
  }
];

const seedDatabase = async () => {
  try {
    console.log('🚀 Starting database seeding...');
    
    // Use environment variable or fallback to local MongoDB
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/kino-site';
    
    // Connect to MongoDB with updated options
    console.log('📡 Connecting to MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB at:', mongoUri);

    // Check if database is empty
    const count = await Movie.countDocuments();
    if (count > 0 && !force) {
      console.log('⚠️  Database is not empty. Use --force to overwrite existing data.');
      process.exit(0);
    }

    // Clear existing movies
    console.log('🧹 Clearing existing movies...');
    await Movie.deleteMany({});
    console.log('✅ Database cleared');

    // Insert new movies
    console.log('📥 Inserting movies...');
    const result = await Movie.insertMany(movies);
    console.log(`✅ Successfully seeded ${result.length} movies`);

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('👋 Disconnected from MongoDB');
    console.log('✨ Seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();
