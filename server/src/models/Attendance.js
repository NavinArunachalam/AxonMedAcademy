const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  session:   { type: mongoose.Schema.Types.ObjectId, ref: 'LiveSession' },
  meeting:   { type: mongoose.Schema.Types.ObjectId, ref: 'LiveMeeting' },
  classroom: { type: mongoose.Schema.Types.ObjectId, ref: 'Classroom' },
  student:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  batch:     { type: mongoose.Schema.Types.ObjectId, ref: 'Batch' },
  date:      { type: Date, required: true },
  status:    { type: String, enum: ['present', 'absent', 'late', 'excused'], required: true },
  markedBy:  { type: String, enum: ['auto', 'qr', 'manual'], default: 'auto' },
  joinedAt:  Date,
  leftAt:    Date,
  duration:  Number // in minutes
}, { 
  timestamps: true 
});

attendanceSchema.index({ meeting: 1, student: 1 }, { unique: true, sparse: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
