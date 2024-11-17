const mongoose=require('mongoose');
const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'UpcomingMovie', required: true },
  notificationType: { type: String, enum: ['email', 'dashboard'], required: true },
  status: { type: String, enum: ['pending', 'sent'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);
