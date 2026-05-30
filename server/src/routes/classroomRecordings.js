const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const ClassroomRecording = require('../models/ClassroomRecording');
const Classroom = require('../models/Classroom');
const { protect, restrictTo } = require('../middleware/auth');
const { uploadFileToDrive, deleteFileFromDrive } = require('../config/googleDrive');

// Multer storage for mock uploads
const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, 'video-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// GET /classroom/:classroomId → Get all recordings for a classroom
router.get('/classroom/:classroomId', protect, async (req, res, next) => {
  try {
    const classroom = await Classroom.findById(req.params.classroomId);
    if (!classroom) {
      return res.status(404).json({ success: false, message: 'Classroom not found' });
    }

    const isAdmin = ['admin', 'superadmin'].includes(req.user.role);
    const isEnrolled = classroom.students.some(s => s.student.toString() === req.user._id.toString() && s.status === 'active');
    if (!isAdmin && !isEnrolled) {
      return res.status(403).json({ success: false, message: 'You are not enrolled in this classroom' });
    }

    const filter = { classroom: req.params.classroomId };
    if (!isAdmin) {
      filter.isPublished = true;
    }

    const recordings = await ClassroomRecording.find(filter)
      .populate('uploadedBy', 'firstName lastName')
      .sort({ createdAt: -1 });

    res.json({ success: true, recordings });
  } catch (error) {
    next(error);
  }
});

// GET /:id → Get recording detail + signed Mux playback token
router.get('/:id', protect, async (req, res, next) => {
  try {
    const recording = await ClassroomRecording.findById(req.params.id)
      .populate('classroom')
      .populate('uploadedBy', 'firstName lastName');

    if (!recording) {
      return res.status(404).json({ success: false, message: 'Recording not found' });
    }

    const classroom = await Classroom.findById(recording.classroom);
    const isAdmin = ['admin', 'superadmin'].includes(req.user.role);
    const isEnrolled = classroom ? classroom.students.some(s => s.student.toString() === req.user._id.toString() && s.status === 'active') : false;

    if (!isAdmin && !isEnrolled) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    // Generate signed playback token if using real Mux (mocked for dev)
    const token = `signed_token_for_${recording.muxPlaybackId}`;

    res.json({
      success: true,
      recording,
      playbackToken: token
    });
  } catch (error) {
    next(error);
  }
});

// GET /:id/progress/my → Student: get my watch progress (for resume)
router.get('/:id/progress/my', protect, async (req, res, next) => {
  try {
    const recording = await ClassroomRecording.findById(req.params.id);
    if (!recording) {
      return res.status(404).json({ success: false, message: 'Recording not found' });
    }

    const userStats = recording.viewStats.find(v => v.student.toString() === req.user._id.toString());
    res.json({
      success: true,
      progress: userStats || { totalWatchedSec: 0, lastPosition: 0, rewatchCount: 0 }
    });
  } catch (error) {
    next(error);
  }
});

// POST /:id/progress → Student: update watch progress (position, duration)
router.post('/:id/progress', protect, async (req, res, next) => {
  try {
    const { position, watchedSec, completed } = req.body;
    const recording = await ClassroomRecording.findById(req.params.id);
    if (!recording) {
      return res.status(404).json({ success: false, message: 'Recording not found' });
    }

    let userStatsIndex = recording.viewStats.findIndex(v => v.student.toString() === req.user._id.toString());

    if (userStatsIndex === -1) {
      recording.viewStats.push({
        student: req.user._id,
        totalWatchedSec: watchedSec || 0,
        lastPosition: position || 0,
        rewatchCount: completed ? 1 : 0,
        completedAt: completed ? new Date() : null,
        sessions: [{
          startedAt: new Date(Date.now() - (watchedSec || 0) * 1000),
          endedAt: new Date(),
          watchedSec: watchedSec || 0
        }]
      });
    } else {
      const stats = recording.viewStats[userStatsIndex];
      stats.lastPosition = position || 0;
      stats.totalWatchedSec += watchedSec || 0;
      if (completed && !stats.completedAt) {
        stats.completedAt = new Date();
        stats.rewatchCount += 1;
      }
      stats.sessions.push({
        startedAt: new Date(Date.now() - (watchedSec || 0) * 1000),
        endedAt: new Date(),
        watchedSec: watchedSec || 0
      });
    }

    await recording.save();
    res.json({ success: true, message: 'Watch progress updated' });
  } catch (error) {
    next(error);
  }
});

// Admin-only endpoints
router.use(protect);
router.use(restrictTo('admin', 'superadmin'));

// POST /upload-url → Get Mux direct upload URL or mock local upload
router.post('/upload-url', async (req, res, next) => {
  try {
    const isMockMux = !process.env.MUX_TOKEN_ID || process.env.MUX_TOKEN_ID.startsWith('mock_');

    if (isMockMux) {
      // Return local server endpoints for video upload
      return res.json({
        success: true,
        isMock: true,
        uploadUrl: `http://localhost:${process.env.PORT || 5000}/api/v1/recordings/classroom/mock-upload`,
        playbackId: `mock_playback_id_${Date.now()}`,
        assetId: `mock_asset_id_${Date.now()}`
      });
    }

    // Standard Real Mux API call goes here if needed. Since we're using Mux client API credentials,
    // we fall back gracefully to local uploads for development testing.
    res.json({
      success: true,
      isMock: true,
      uploadUrl: `http://localhost:${process.env.PORT || 5000}/api/v1/recordings/classroom/mock-upload`,
      playbackId: `mock_playback_id_${Date.now()}`,
      assetId: `mock_asset_id_${Date.now()}`
    });
  } catch (error) {
    next(error);
  }
});

// POST /mock-upload → Endpoint for local file mock uploads
router.post('/mock-upload', upload.single('video'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No video file provided' });
    }

    const localUrl = `/uploads/${req.file.filename}`;
    res.json({
      success: true,
      playbackId: localUrl, // Use local path as mock playback ID
      assetId: `mock_asset_${req.file.filename}`,
      duration: 120 // mock 2 minutes or similar
    });
  } catch (error) {
    next(error);
  }
});

// POST / → Admin: save recording metadata to classroom after upload
router.post('/', async (req, res, next) => {
  try {
    const { classroom, title, description, muxAssetId, muxPlaybackId, duration, security } = req.body;

    if (!classroom || !title || !muxPlaybackId) {
      return res.status(400).json({ success: false, message: 'Classroom, title, and playbackId are required' });
    }

    const recording = await ClassroomRecording.create({
      classroom,
      title,
      description,
      uploadedBy: req.user._id,
      muxAssetId: muxAssetId || 'mock_asset_id',
      muxPlaybackId,
      muxStatus: 'ready',
      duration: duration || 0,
      thumbnail: muxPlaybackId.startsWith('/uploads/') ? '/default-video-thumb.jpg' : `https://image.mux.com/${muxPlaybackId}/thumbnail.jpg`,
      security: security || {
        signedUrlRequired: true,
        urlExpiryHours: 6,
        watermark: true,
        downloadBlocked: true,
        screenRecordDetect: true,
        devToolsBlocked: true
      }
    });

    // Increment recording counts in classroom
    await Classroom.findByIdAndUpdate(classroom, {
      $inc: { 'stats.totalRecordings': 1 }
    });

    res.status(201).json({ success: true, message: 'Recording saved successfully', recording });
  } catch (error) {
    next(error);
  }
});

// POST /upload-drive → Admin: upload recording directly to Google Drive and save metadata
router.post('/upload-drive', upload.single('video'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No video file provided' });
    }

    const { classroom, title, description, duration } = req.body;
    if (!classroom || !title) {
      // Clean up uploaded file
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({ success: false, message: 'Classroom and title are required' });
    }

    console.log(`[Classroom Recordings] Uploading recording to Google Drive: ${req.file.originalname}`);
    const driveResult = await uploadFileToDrive(
      req.file.path,
      req.file.originalname,
      req.file.mimetype
    );

    const recording = await ClassroomRecording.create({
      classroom,
      title,
      description,
      uploadedBy: req.user._id,
      storageProvider: 'google_drive',
      googleDriveFileId: driveResult.fileId,
      googleDriveViewLink: driveResult.viewLink,
      muxStatus: 'ready',
      duration: duration ? parseInt(duration, 10) : 0,
      thumbnail: driveResult.thumbnailLink || '/default-video-thumb.jpg',
      security: {
        signedUrlRequired: false,
        urlExpiryHours: 0,
        watermark: false,
        downloadBlocked: true,
        screenRecordDetect: false,
        devToolsBlocked: false
      }
    });

    // Increment recording counts in classroom
    await Classroom.findByIdAndUpdate(classroom, {
      $inc: { 'stats.totalRecordings': 1 }
    });

    // Clean up local temp file
    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
      console.log(`[Classroom Recordings] Cleaned up temp file: ${req.file.path}`);
    }

    res.status(201).json({
      success: true,
      message: 'Recording uploaded to Google Drive and saved successfully',
      recording
    });
  } catch (error) {
    if (req.file && req.file.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    next(error);
  }
});

// PUT /:id → Admin: update title, description, chapters
router.put('/:id', async (req, res, next) => {
  try {
    const recording = await ClassroomRecording.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!recording) {
      return res.status(404).json({ success: false, message: 'Recording not found' });
    }
    res.json({ success: true, message: 'Recording updated successfully', recording });
  } catch (error) {
    next(error);
  }
});

// DELETE /:id → Admin: delete recording
router.delete('/:id', async (req, res, next) => {
  try {
    const recording = await ClassroomRecording.findById(req.params.id);
    if (!recording) {
      return res.status(404).json({ success: false, message: 'Recording not found' });
    }

    // Decrement recording counts in classroom
    await Classroom.findByIdAndUpdate(recording.classroom, {
      $inc: { 'stats.totalRecordings': -1 }
    });

    // Delete Google Drive file or local mock file
    if (recording.storageProvider === 'google_drive' && recording.googleDriveFileId) {
      const isMock = recording.thumbnail === '/default-video-thumb.jpg' || recording.googleDriveFileId.startsWith('mock_drive_file_');
      const mockName = isMock ? path.basename(recording.googleDriveViewLink) : null;
      await deleteFileFromDrive(recording.googleDriveFileId, mockName);
    } else if (recording.muxPlaybackId && recording.muxPlaybackId.startsWith('/uploads/')) {
      const filePath = path.join(__dirname, '../..', recording.muxPlaybackId);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await recording.deleteOne();

    res.json({ success: true, message: 'Recording deleted successfully' });
  } catch (error) {
    next(error);
  }
});

// PUT /:id/publish → Admin: publish + notify students
router.put('/:id/publish', async (req, res, next) => {
  try {
    const recording = await ClassroomRecording.findById(req.params.id);
    if (!recording) {
      return res.status(404).json({ success: false, message: 'Recording not found' });
    }

    recording.isPublished = true;
    recording.notified = true;
    recording.notifiedAt = new Date();
    await recording.save();

    // Socket alert
    try {
      const { getIO } = require('../config/socket');
      const io = getIO();
      io.to(`classroom:${recording.classroom}`).emit('recording:published', {
        recordingId: recording._id,
        title: recording.title
      });
    } catch (socketErr) {
      console.log('[Socket Error] Could not emit recording published alert:', socketErr.message);
    }

    res.json({ success: true, message: 'Recording published and students notified' });
  } catch (error) {
    next(error);
  }
});

// POST /:id/chapters → Admin: save chapters
router.post('/:id/chapters', async (req, res, next) => {
  try {
    const { chapters } = req.body; // Array
    const recording = await ClassroomRecording.findByIdAndUpdate(
      req.params.id,
      { $set: { chapters } },
      { new: true }
    );
    res.json({ success: true, message: 'Chapters updated successfully', recording });
  } catch (error) {
    next(error);
  }
});

// GET /:id/analytics → Admin: view analytics per student for a video
router.get('/:id/analytics', async (req, res, next) => {
  try {
    const recording = await ClassroomRecording.findById(req.params.id)
      .populate('viewStats.student', 'firstName lastName email avatar');

    if (!recording) {
      return res.status(404).json({ success: false, message: 'Recording not found' });
    }

    res.json({ success: true, viewStats: recording.viewStats });
  } catch (error) {
    next(error);
  }
});

// GET /classroom/:classroomId/analytics → Admin: all recordings' view stats for classroom
router.get('/classroom/:classroomId/analytics', async (req, res, next) => {
  try {
    const recordings = await ClassroomRecording.find({ classroom: req.params.classroomId })
      .populate('viewStats.student', 'firstName lastName email');

    res.json({ success: true, recordings });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
