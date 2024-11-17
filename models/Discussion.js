const mongoose = require('mongoose');

const discussionSchema = new mongoose.Schema({
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  comment: String,
  replies: [{
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      replyText: String,
      timestamp: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Discussion', discussionSchema);


