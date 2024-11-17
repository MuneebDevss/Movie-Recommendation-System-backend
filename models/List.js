const mongoose = require('mongoose');

const customListSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  movies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
}, { timestamps: true });

module.exports = mongoose.model('CustomList', customListSchema);

