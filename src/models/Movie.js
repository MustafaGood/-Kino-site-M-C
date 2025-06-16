const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  genre: [{ type: String, required: true }],
  director: { type: String },
  actors: [{ type: String }],
  duration: { type: Number },
  releaseDate: { type: Date },
  rating: { type: String },
  posterUrl: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Movie', MovieSchema);
