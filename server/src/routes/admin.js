const express = require('express');
const router = express.Router();
const User = require('../models/User');
const StudentProfile = require('../models/StudentProfile');
const FacultyMember = require('../models/FacultyMember');
const { sendWelcomeEmail } = require('../services/emailService');
const { protect, restrictTo } = require('../middleware/auth');
const multer = require('multer');
const { storage, cloudinary } = require('../config/cloudinary');

const upload = multer({ storage });

// GET /stats → Command center stats: sessions, exams, incidents, users
router.get('/stats', (req, res) => {
  res.json({
    success: true,
    stats: {
      activeSessions: 5,
      activeExams: 2,
      pendingIncidents: 12,
      totalUsers: 1284
    }
  });
});

// ==========================================
// USER MANAGEMENT
// ==========================================

// GET /users → List all users (filter role/status, paginate, search)
router.get('/users', protect, restrictTo('admin', 'superadmin'), async (req, res, next) => {
  try {
    const { role, status, search } = req.query;
    const filter = {};

    if (role) filter.role = role;
    if (status === 'active') filter.isActive = true;
    if (status === 'inactive') filter.isActive = false;
    if (search) {
      const q = new RegExp(String(search).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      filter.$or = [{ fullName: q }, { email: q }, { phone: q }];
    }

    const users = await User.find(filter)
      .select('fullName email phone role isVerified isActive avatar createdAt')
      .sort({ createdAt: -1 })
      .lean();

    res.json({ success: true, users });
  } catch (error) {
    next(error);
  }
});

// GET /users/:id → Get user + profile detail
router.get('/users/:id', (req, res) => {
  res.json({ success: true, user: { id: req.params.id } });
});

// POST /users → Create user manually
router.post('/users', protect, restrictTo('admin', 'superadmin'), async (req, res, next) => {
  try {
    const { fullName, email, phone, role, password } = req.body;

    // 1. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User with this email already exists' });
    }

    // 2. Create User
    const user = await User.create({
      fullName,
      email,
      phone,
      role: role || 'student',
      password: password || '1111',
      isVerified: true // Admin created users are verified
    });

    // 3. If role is student, create StudentProfile
    if (user.role === 'student') {
      const year = new Date().getFullYear();
      const count = await StudentProfile.countDocuments();
      const enrollmentNo = `HTA-${year}-${(count + 1).toString().padStart(4, '0')}`;

      await StudentProfile.create({
        user: user._id,
        enrollmentNo
      });
    }

    // 4. Send Welcome Email (non-blocking)
    sendWelcomeEmail(user, password || '1111').catch(err => console.error('Delayed email error:', err));

    res.status(201).json({
      success: true,
      message: 'User created successfully and welcome email sent',
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
});

// PUT /users/:id → Update user
router.put('/users/:id', (req, res) => {
  res.json({ success: true, message: 'User updated (placeholder)' });
});

// PUT /users/:id/status → Activate/deactivate user
router.put('/users/:id/status', (req, res) => {
  res.json({ success: true, message: 'User status updated (placeholder)' });
});

// PUT /users/:id/role → Change user role
router.put('/users/:id/role', (req, res) => {
  res.json({ success: true, message: 'User role updated (placeholder)' });
});

// DELETE /users/:id → Soft delete user
router.delete('/users/:id', (req, res) => {
  res.json({ success: true, message: 'User deleted (placeholder)' });
});

// ==========================================
// ANALYTICS
// ==========================================

// GET /analytics/enrollment → Enrollment trends chart data
router.get('/analytics/enrollment', (req, res) => {
  res.json({ success: true, chartData: [] });
});

// GET /analytics/revenue → Revenue breakdown chart data
router.get('/analytics/revenue', (req, res) => {
  res.json({ success: true, chartData: [] });
});

// GET /analytics/attendance → Attendance analytics
router.get('/analytics/attendance', (req, res) => {
  res.json({ success: true, analytics: {} });
});

// GET /analytics/exam → Exam pass rates, score distributions
router.get('/analytics/exam', (req, res) => {
  res.json({ success: true, analytics: {} });
});

// GET /analytics/dropout-risk → Students at dropout risk
router.get('/analytics/dropout-risk', (req, res) => {
  res.json({ success: true, riskList: [] });
});

// ==========================================
// PROCTOR LOGS
// ==========================================

// GET /proctor/logs → All proctor logs (filter severity/exam/student)
router.get('/proctor/logs', (req, res) => {
  res.json({ success: true, logs: [] });
});

// PUT /proctor/logs/:id/resolve → Resolve incident
router.put('/proctor/logs/:id/resolve', (req, res) => {
  res.json({ success: true, message: 'Incident resolved (placeholder)' });
});

// GET /proctor/logs/export → Export CSV
router.get('/proctor/logs/export', (req, res) => {
  res.setHeader('Content-Type', 'text/csv');
  res.send('sessionId,student,exam,incidentType,severity\nEXAM123,Student A,Exam A,tab_switch,high');
});

// ==========================================
// EXAM CONFIG
// ==========================================

// GET /exam-config/:examId → Get proctoring config for exam
router.get('/exam-config/:examId', (req, res) => {
  res.json({ success: true, config: {} });
});

// PUT /exam-config/:examId → Save proctoring rule builder config
router.put('/exam-config/:examId', (req, res) => {
  res.json({ success: true, message: 'Proctoring config updated (placeholder)' });
});

// ==========================================
// STORAGE MANAGEMENT
// ==========================================

// GET /storage/stats → S3 usage + retention info
router.get('/storage/stats', (req, res) => {
  res.json({ success: true, s3UsedBytes: 549755813888, retentionDays: 90 });
});

// DELETE /storage/purge-snapshots → Purge old exam snapshots (>90 days)
router.delete('/storage/purge-snapshots', (req, res) => {
  res.json({ success: true, message: 'Old screenshots purged successfully (placeholder)' });
});

// ==========================================
// ANNOUNCEMENTS / CMS
// ==========================================

// GET /announcements → List announcements
router.get('/announcements', (req, res) => {
  res.json({ success: true, announcements: [] });
});

// POST /announcements → Create announcement
router.post('/announcements', (req, res) => {
  res.json({ success: true, message: 'Announcement created' });
});

// PUT /announcements/:id → Update
router.put('/announcements/:id', (req, res) => {
  res.json({ success: true, message: 'Announcement updated' });
});

// DELETE /announcements/:id → Delete
router.delete('/announcements/:id', (req, res) => {
  res.json({ success: true, message: 'Announcement deleted' });
});

// ==========================================
// TIMETABLE
// ==========================================

// GET /timetable/:batchId → Get batch timetable
router.get('/timetable/:batchId', (req, res) => {
  res.json({ success: true, timetable: [] });
});

// PUT /timetable/:batchId → Save drag-drop timetable
router.put('/timetable/:batchId', (req, res) => {
  res.json({ success: true, message: 'Timetable saved (placeholder)' });
});

// ==========================================
// LIVE MONITOR
// ==========================================

// GET /live/sessions → All active live sessions
router.get('/live/sessions', (req, res) => {
  res.json({ success: true, activeSessions: [] });
});

// GET /live/sessions/:id → Session detail + participant list
router.get('/live/sessions/:id', (req, res) => {
  res.json({ success: true, session: { id: req.params.id, participants: [] } });
});

// POST /live/sessions/:id/broadcast → Send broadcast message to session
router.post('/live/sessions/:id/broadcast', (req, res) => {
  res.json({ success: true, message: 'Broadcast sent to live session (placeholder)' });
});

// POST /live/sessions/:id/poll → Create quick poll
router.post('/live/sessions/:id/poll', (req, res) => {
  res.json({ success: true, message: 'Poll created in live session (placeholder)' });
});

// PUT /live/sessions/:id/mute-all → Mute all participants
router.put('/live/sessions/:id/mute-all', (req, res) => {
  res.json({ success: true, message: 'Muted all session participants (placeholder)' });
});

// ==========================================
// FACULTY MEMBER MANAGEMENT (CRUD)
// ==========================================

// GET /faculty → Get all faculty members
router.get('/faculty', protect, restrictTo('admin', 'superadmin'), async (req, res, next) => {
  try {
    const facultyList = await FacultyMember.find().sort({ createdAt: 1 });
    res.json({ success: true, facultyList });
  } catch (error) {
    next(error);
  }
});

// POST /faculty → Create new faculty member
router.post('/faculty', protect, restrictTo('admin', 'superadmin'), upload.single('image'), async (req, res, next) => {
  try {
    const { name, role, specialty, years, rating, initials } = req.body;
    if (!name || !role || !specialty || years === undefined) {
      return res.status(400).json({ success: false, message: 'Required fields: name, role, specialty, years' });
    }

    const image = req.file ? req.file.path : undefined;
    const imagePublicId = req.file ? req.file.filename : undefined;

    const faculty = await FacultyMember.create({
      name,
      role,
      specialty,
      years,
      rating: rating ?? 5.0,
      image,
      imagePublicId,
      initials: initials || name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    });
    res.status(201).json({ success: true, faculty });
  } catch (error) {
    next(error);
  }
});

// PUT /faculty/:id → Update faculty member
router.put('/faculty/:id', protect, restrictTo('admin', 'superadmin'), upload.single('image'), async (req, res, next) => {
  try {
    const { name, role, specialty, years, rating, initials, removeImage } = req.body;

    const updateData = { name, role, specialty, years, rating, initials };

    if (req.file) {
      // 1. If faculty has an existing image, delete it from Cloudinary
      const existingFaculty = await FacultyMember.findById(req.params.id);
      if (existingFaculty && existingFaculty.imagePublicId) {
        cloudinary.uploader.destroy(existingFaculty.imagePublicId).catch(err => console.error('Cloudinary delete error:', err));
      }

      updateData.image = req.file.path;
      updateData.imagePublicId = req.file.filename;
    } else if (removeImage === 'true' || removeImage === true) {
      const existingFaculty = await FacultyMember.findById(req.params.id);
      if (existingFaculty && existingFaculty.imagePublicId) {
        cloudinary.uploader.destroy(existingFaculty.imagePublicId).catch(err => console.error('Cloudinary delete error:', err));
      }
      updateData.image = null;
      updateData.imagePublicId = null;
    }

    const faculty = await FacultyMember.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    if (!faculty) {
      return res.status(404).json({ success: false, message: 'Faculty member not found' });
    }
    res.json({ success: true, faculty });
  } catch (error) {
    next(error);
  }
});

// DELETE /faculty/:id → Delete faculty member
router.delete('/faculty/:id', protect, restrictTo('admin', 'superadmin'), async (req, res, next) => {
  try {
    const faculty = await FacultyMember.findById(req.params.id);
    if (!faculty) {
      return res.status(404).json({ success: false, message: 'Faculty member not found' });
    }

    if (faculty.imagePublicId) {
      cloudinary.uploader.destroy(faculty.imagePublicId).catch(err => console.error('Cloudinary delete error:', err));
    }

    await faculty.deleteOne();
    res.json({ success: true, message: 'Faculty member deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
