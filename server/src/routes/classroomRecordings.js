const express = require('express');
const router = express.Router();
const multer = require('multer');
const mongoose = require('mongoose');

const ClassroomRecording = require('../models/ClassroomRecording');
const Classroom = require('../models/Classroom');
const { protect, restrictTo } = require('../middleware/auth');
const {
  uploadFileToCloudflareR2,
  deleteFileFromCloudflareR2,
} = require('../config/cloudflare');

// ✅ Memory storage — file never touches disk
const upload = multer({ storage: multer.memoryStorage() });

// ─── ObjectId validation helper ───────────────────────────────────────────────
const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

// =============================================================================
// STATIC NAMED ROUTES — must be defined BEFORE any /:id dynamic routes
// =============================================================================

// GET /classroom/:classroomId → Get all recordings for a classroom
router.get('/classroom/:classroomId', protect, async (req, res, next) => {
  try {
    const classroom = await Classroom.findById(req.params.classroomId);
    if (!classroom) {
      return res.status(404).json({ success: false, message: 'Classroom not found' });
    }

    const isAdmin = ['admin', 'superadmin'].includes(req.user.role);
    const isEnrolled = classroom.students.some(
      (s) => s.student.toString() === req.user._id.toString() && s.status === 'active'
    );
    if (!isAdmin && !isEnrolled) {
      return res.status(403).json({ success: false, message: 'You are not enrolled in this classroom' });
    }

    const filter = { classroom: req.params.classroomId };
    if (!isAdmin) filter.isPublished = true;

    const recordings = await ClassroomRecording.find(filter)
      .populate('uploadedBy', 'firstName lastName')
      .sort({ createdAt: -1 });

    res.json({ success: true, recordings });
  } catch (error) {
    next(error);
  }
});

// GET /classroom/:classroomId/analytics → Admin: all recordings' stats for classroom
router.get('/classroom/:classroomId/analytics', protect, restrictTo('admin', 'superadmin'), async (req, res, next) => {
  try {
    const recordings = await ClassroomRecording.find({ classroom: req.params.classroomId })
      .populate('viewStats.student', 'firstName lastName email');
    res.json({ success: true, recordings });
  } catch (error) {
    next(error);
  }
});

// POST /upload-url → Admin: Get Mux direct upload URL or mock
router.post('/upload-url', protect, restrictTo('admin', 'superadmin'), async (req, res, next) => {
  try {
    res.json({
      success: true,
      isMock: true,
      uploadUrl: `${process.env.API_BASE_URL || ''}/api/v1/recordings/classroom/mock-upload`,
      playbackId: `mock_playback_id_${Date.now()}`,
      assetId: `mock_asset_id_${Date.now()}`
    });
  } catch (error) {
    next(error);
  }
});

// POST /mock-upload → Admin: Local mock upload (memory-based, no disk write)
router.post('/mock-upload', protect, restrictTo('admin', 'superadmin'), upload.single('video'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No video file provided' });
    }
    res.json({
      success: true,
      playbackId: `mock_playback_${Date.now()}`,
      assetId: `mock_asset_${Date.now()}`,
      duration: 120
    });
  } catch (error) {
    next(error);
  }
});

// POST /upload-cloudflare → Admin: upload recording DIRECTLY to Cloudflare R2
router.post('/upload-cloudflare', protect, restrictTo('admin', 'superadmin'), upload.single('video'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No video file provided' });
    }

    const { classroom, title, description, duration, isPublished } = req.body;

    if (!classroom || !title) {
      return res.status(400).json({ success: false, message: 'Classroom and title are required' });
    }

    // Validate classroom is a real ObjectId
    if (!isValidId(classroom)) {
      return res.status(400).json({ success: false, message: 'Invalid classroom ID' });
    }

    let chapters = [];
    if (req.body.chapters) {
      try {
        chapters = typeof req.body.chapters === 'string' ? JSON.parse(req.body.chapters) : req.body.chapters;
      } catch {
        chapters = [];
      }
    }
    const published = isPublished === 'true' || isPublished === true;

    // Upload buffer directly to R2 — no temp file
    const objectKey = `classroom-recordings/${classroom}/${Date.now()}-${req.file.originalname}`;
    const uploadResult = await uploadFileToCloudflareR2(
      req.file.buffer,
      objectKey,
      req.file.mimetype
    );

    const recording = await ClassroomRecording.create({
      classroom,
      title,
      description,
      uploadedBy: req.user._id,
      storageProvider: 'cloudflare',
      cloudflareKey: objectKey,
      cloudflareUrl: uploadResult.url,
      isPublished: published,
      chapters,
      muxStatus: 'ready',
      duration: duration ? parseInt(duration, 10) : 0,
      thumbnail: '/default-video-thumb.jpg',
      security: {
        signedUrlRequired: false,
        urlExpiryHours: 0,
        watermark: true,
        downloadBlocked: true,
        screenRecordDetect: false,
        devToolsBlocked: false
      }
    });

    await Classroom.findByIdAndUpdate(classroom, {
      $inc: { 'stats.totalRecordings': 1 }
    });

    res.status(201).json({
      success: true,
      message: 'Recording uploaded to Cloudflare R2 successfully',
      recording
    });
  } catch (error) {
    next(error);
  }
});

// POST / → Admin: save recording metadata after Mux upload
router.post('/', protect, restrictTo('admin', 'superadmin'), async (req, res, next) => {
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
      thumbnail: muxPlaybackId.startsWith('/uploads/')
        ? '/default-video-thumb.jpg'
        : `https://image.mux.com/${muxPlaybackId}/thumbnail.jpg`,
      security: security || {
        signedUrlRequired: true,
        urlExpiryHours: 6,
        watermark: true,
        downloadBlocked: true,
        screenRecordDetect: true,
        devToolsBlocked: true
      }
    });

    await Classroom.findByIdAndUpdate(classroom, {
      $inc: { 'stats.totalRecordings': 1 }
    });

    res.status(201).json({ success: true, message: 'Recording saved successfully', recording });
  } catch (error) {
    next(error);
  }
});

// =============================================================================
// DYNAMIC /:id ROUTES — must be defined AFTER all static named routes
// =============================================================================

// GET /:id → Get recording detail + signed playback token
router.get('/:id', protect, async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid recording ID' });
    }
    const recording = await ClassroomRecording.findById(req.params.id)
      .populate('classroom')
      .populate('uploadedBy', 'firstName lastName');

    if (!recording) {
      return res.status(404).json({ success: false, message: 'Recording not found' });
    }

    const classroom = await Classroom.findById(recording.classroom);
    const isAdmin = ['admin', 'superadmin'].includes(req.user.role);
    const isEnrolled = classroom
      ? classroom.students.some(
          (s) => s.student.toString() === req.user._id.toString() && s.status === 'active'
        )
      : false;

    if (!isAdmin && !isEnrolled) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    res.json({
      success: true,
      recording,
      playbackUrl: recording.storageProvider === 'cloudflare'
        ? `/api/v1/recordings/classroom/${recording._id}/stream`
        : undefined
    });
  } catch (error) {
    next(error);
  }
});

// GET /:id/stream → Stream classroom recording from Cloudflare R2
router.get('/:id/stream', protect, async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid recording ID' });
    }
    const recording = await ClassroomRecording.findById(req.params.id).populate('classroom');
    if (!recording) {
      return res.status(404).json({ success: false, message: 'Recording not found' });
    }

    const classroom = await Classroom.findById(recording.classroom);
    const isAdmin = ['admin', 'superadmin'].includes(req.user.role);
    const isEnrolled = classroom
      ? classroom.students.some(
          (s) => s.student.toString() === req.user._id.toString() && s.status === 'active'
        )
      : false;

    if (!isAdmin && !isEnrolled) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    if (recording.storageProvider !== 'cloudflare' || !recording.cloudflareKey) {
      return res.status(404).json({ success: false, message: 'Stream not available for this recording' });
    }

    try {
      const { getS3Client } = require('../config/cloudflare');
      const { GetObjectCommand } = require('@aws-sdk/client-s3');

      const s3 = getS3Client();
      const command = new GetObjectCommand({
        Bucket: process.env.CLOUDFLARE_R2_BUCKET,
        Key: recording.cloudflareKey,
        Range: req.headers.range,
      });

      const s3Response = await s3.send(command);

      if (s3Response.ContentType) res.setHeader('Content-Type', s3Response.ContentType);
      if (s3Response.ContentLength) res.setHeader('Content-Length', s3Response.ContentLength);
      if (s3Response.ContentRange) res.setHeader('Content-Range', s3Response.ContentRange);
      if (s3Response.AcceptRanges) res.setHeader('Accept-Ranges', s3Response.AcceptRanges);

      res.status(s3Response.$metadata.httpStatusCode || 200);
      s3Response.Body.pipe(res);
    } catch (s3Error) {
      console.error('[S3 Streaming Error]:', s3Error.message);
      res.status(s3Error.$metadata?.httpStatusCode || 500).send(s3Error.message);
    }
  } catch (error) {
    next(error);
  }
});

// GET /:id/progress/my → Student: get my watch progress
router.get('/:id/progress/my', protect, async (req, res, next) => {
  try {
    const recording = await ClassroomRecording.findById(req.params.id);
    if (!recording) {
      return res.status(404).json({ success: false, message: 'Recording not found' });
    }
    const userStats = recording.viewStats.find(
      (v) => v.student.toString() === req.user._id.toString()
    );
    res.json({
      success: true,
      progress: userStats || { totalWatchedSec: 0, lastPosition: 0, rewatchCount: 0 }
    });
  } catch (error) {
    next(error);
  }
});

// GET /:id/analytics → Admin: per-student analytics for a recording
router.get('/:id/analytics', protect, restrictTo('admin', 'superadmin'), async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid recording ID' });
    }
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

// POST /:id/progress → Student: update watch progress
router.post('/:id/progress', protect, async (req, res, next) => {
  try {
    const { position, watchedSec, completed } = req.body;
    const recording = await ClassroomRecording.findById(req.params.id);
    if (!recording) {
      return res.status(404).json({ success: false, message: 'Recording not found' });
    }

    let userStatsIndex = recording.viewStats.findIndex(
      (v) => v.student.toString() === req.user._id.toString()
    );

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

// POST /:id/chapters → Admin: save chapters
router.post('/:id/chapters', protect, restrictTo('admin', 'superadmin'), async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid recording ID' });
    }
    const { chapters } = req.body;
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

// PUT /:id → Admin: update title, description, chapters
router.put('/:id', protect, restrictTo('admin', 'superadmin'), async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid recording ID' });
    }
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

// PUT /:id/publish → Admin: publish recording + notify students
router.put('/:id/publish', protect, restrictTo('admin', 'superadmin'), async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid recording ID' });
    }
    const recording = await ClassroomRecording.findById(req.params.id);
    if (!recording) {
      return res.status(404).json({ success: false, message: 'Recording not found' });
    }

    recording.isPublished = true;
    recording.notified = true;
    recording.notifiedAt = new Date();
    await recording.save();

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

// DELETE /:id → Admin: delete recording
router.delete('/:id', protect, restrictTo('admin', 'superadmin'), async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid recording ID' });
    }
    const recording = await ClassroomRecording.findById(req.params.id);
    if (!recording) {
      return res.status(404).json({ success: false, message: 'Recording not found' });
    }

    await Classroom.findByIdAndUpdate(recording.classroom, {
      $inc: { 'stats.totalRecordings': -1 }
    });

    if (recording.storageProvider === 'cloudflare' && recording.cloudflareKey) {
      await deleteFileFromCloudflareR2(recording.cloudflareKey);
    }

    await recording.deleteOne();
    res.json({ success: true, message: 'Recording deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;