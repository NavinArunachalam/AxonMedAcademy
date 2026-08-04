const mongoose = require('mongoose');

const videoPlaybackErrorSchema = new mongoose.Schema({
  recording: { type: mongoose.Schema.Types.ObjectId, ref: 'ClassroomRecording', required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  classroom: { type: mongoose.Schema.Types.ObjectId, ref: 'Classroom' },
  errorCode: { type: Number }, // MediaError.code (1 = aborted, 2 = network, 3 = decode, 4 = src not supported)
  errorMessage: { type: String }, // Error details / diagnostic message
  userAgent: { type: String }, // Browser and OS info
  videoUrl: { type: String } // Stream URL used when error occurred
}, { timestamps: true });

videoPlaybackErrorSchema.index({ recording: 1 });
videoPlaybackErrorSchema.index({ student: 1 });
videoPlaybackErrorSchema.index({ classroom: 1 });

module.exports = mongoose.model('VideoPlaybackError', videoPlaybackErrorSchema);
