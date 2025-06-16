const mongoose = require('mongoose');

const showtimeSchema = new mongoose.Schema({
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true,
  },
  movieTitle: {
    type: String,
    required: true,
  },
  datetime: {
    type: Date,
    required: true,
  },
  theater: {
    type: String,
    required: true,
  },
  totalSeats: {
    type: Number,
    required: true,
  },
  availableSeats: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

showtimeSchema.index({ datetime: 1 });
showtimeSchema.index({ movie: 1 });

module.exports = mongoose.model('Showtime', showtimeSchema);
