const mongoose = require('mongoose');

const classroomFolderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  classroom: { type: mongoose.Schema.Types.ObjectId, ref: 'Classroom', required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('ClassroomFolder', classroomFolderSchema);
