const express = require('express');
const router = express.Router();

const Attendance = require('../models/Attendance');
const { protect, restrictTo } = require('../middleware/auth');

// GET /my -> Student: own attendance records
router.get('/my', protect, async (req, res, next) => {
  try {
    const attendance = await Attendance.find({ student: req.user._id })
      .populate('meeting', 'title scheduledAt duration status roomId')
      .populate('classroom', 'name code')
      .sort({ date: -1 });
    res.json({ success: true, attendance });
  } catch (error) {
    next(error);
  }
});

// GET /meeting/:meetingId -> Admin: attendance for a live meeting
router.get('/meeting/:meetingId', protect, restrictTo('admin', 'superadmin'), async (req, res, next) => {
  try {
    const attendanceList = await Attendance.find({ meeting: req.params.meetingId })
      .populate('student', 'fullName email phone avatar')
      .sort({ joinedAt: 1 });
    res.json({ success: true, attendanceList });
  } catch (error) {
    next(error);
  }
});

// POST /mark -> Auto-mark on join/heartbeat
router.post('/mark', protect, async (req, res, next) => {
  try {
    const { meeting, classroom, status = 'present', joinedAt, leftAt, duration } = req.body;
    if (!meeting) {
      return res.status(400).json({ success: false, message: 'meeting is required' });
    }

    const attendance = await Attendance.findOneAndUpdate(
      { meeting, student: req.user._id },
      {
        $set: {
          classroom,
          date: joinedAt || new Date(),
          status,
          markedBy: 'auto',
          joinedAt,
          leftAt,
          duration,
        },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.json({ success: true, message: 'Attendance marked automatically', attendance });
  } catch (error) {
    next(error);
  }
});

// POST /manual -> Admin: manual mark/update
router.post('/manual', protect, restrictTo('admin', 'superadmin'), async (req, res, next) => {
  try {
    const { meeting, classroom, student, status, joinedAt, leftAt, duration } = req.body;
    if (!meeting || !student || !status) {
      return res.status(400).json({ success: false, message: 'meeting, student and status are required' });
    }

    const attendance = await Attendance.findOneAndUpdate(
      { meeting, student },
      {
        $set: {
          classroom,
          date: joinedAt || new Date(),
          status,
          markedBy: 'manual',
          joinedAt,
          leftAt,
          duration,
        },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.json({ success: true, message: 'Attendance marked manually', attendance });
  } catch (error) {
    next(error);
  }
});

// PUT /:id -> Admin: update attendance record
router.put('/:id', protect, restrictTo('admin', 'superadmin'), async (req, res, next) => {
  try {
    const attendance = await Attendance.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    if (!attendance) {
      return res.status(404).json({ success: false, message: 'Attendance record not found' });
    }
    res.json({ success: true, message: 'Attendance record updated', attendance });
  } catch (error) {
    next(error);
  }
});

// GET /report/:classroomId -> Admin: full attendance report for classroom
router.get('/report/:classroomId', protect, restrictTo('admin', 'superadmin'), async (req, res, next) => {
  try {
    const report = await Attendance.find({ classroom: req.params.classroomId })
      .populate('student', 'fullName email phone')
      .populate('meeting', 'title scheduledAt duration status')
      .sort({ date: -1 });
    res.json({ success: true, report });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
