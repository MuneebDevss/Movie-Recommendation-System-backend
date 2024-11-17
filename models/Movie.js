const mongoose = require('mongoose');

// Schema for people (actors, directors, crew)
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  biography: String,
  filmography: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
  awards: [String]
}, { timestamps: true });

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: [String],
  director: { type: mongoose.Schema.Types.ObjectId, ref: 'Person' }, // Reference to a Person
  cast: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Person' }], // Array of Person references
  releaseDate: Date,
  runtime: Number, // in minutes
  synopsis: String,
  trivia: [String],
  goofs: [String],
  soundtrackInfo: [String],
  averageRating: { type: Number, default: 0 },
  ratingsCount: { type: Number, default: 0 },
  ageRating: String, // e.g., "PG-13"
  parentalGuidance: String,
  boxOffice: {
      openingWeekend: Number,
      totalRevenue: Number,
      internationalRevenue: Number
  },
  awards: [String]
}, { timestamps: true });

module.exports = {
  Movie: mongoose.model('Movie', movieSchema),
  Person: mongoose.model('Person', personSchema)
};
