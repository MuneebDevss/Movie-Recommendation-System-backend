const mongoose = require('mongoose');

const upcomingMovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: [String],
  director: String,
  cast: [String],
  releaseDate: { type: Date, required: true },
  trailerUrl: String,
  synopsis: String,
  notificationsEnabled: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('UpcomingMovie', upcomingMovieSchema);
