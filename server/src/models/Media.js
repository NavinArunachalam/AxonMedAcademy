const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  googleDriveFileId: {
    type: String,
    required: true
  },
  webViewLink: {
    type: String,
    required: true
  },
  thumbnailLink: {
    type: String
  },
  mimeType: {
    type: String,
    required: true
  },
  size: {
    type: Number
  },
  classroom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Classroom'
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isMock: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Media', mediaSchema);
