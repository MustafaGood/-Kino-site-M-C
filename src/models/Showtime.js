const mongoose = require('mongoose');

const ShowtimeSchema = new mongoose.Schema({
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true,
  },
  movieTitle: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  theater: { type: String, required: true },
  totalSeats: { type: Number, required: true },
  availableSeats: { type: Number, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model('Showtime', ShowtimeSchema);
