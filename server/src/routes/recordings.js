const express = require('express');
const router = express.Router();
const multer = require('multer');
const mongoose = require('mongoose');

const LibraryRecording = require('../models/LibraryRecording');
const ClassroomRecording = require('../models/ClassroomRecording');
const Classroom = require('../models/Classroom');
const { protect, restrictTo } = require('../middleware/auth');
const {
  uploadFileToCloudflareR2,
  deleteFileFromCloudflareR2,
  generatePresignedUploadUrl,
  createMultipartUpload,
  generatePresignedPartUrl,
  completeMultipartUpload,
  abortMultipartUpload,
} = require('../config/cloudflare');

const upload = multer({ storage: multer.memoryStorage() });

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

// GET /library -> Get all global recordings
router.get('/library', protect, restrictTo('admin', 'superadmin', 'faculty'), async (req, res, next) => {
  try {
    const recordings = await LibraryRecording.find()
      .populate('uploadedBy', 'fullName')
      .sort({ createdAt: -1 })
      .lean();

    const { generatePresignedGetUrl } = require('../config/cloudflare');
    for (let rec of recordings) {
      if (rec.storageProvider === 'cloudflare' && rec.cloudflareKey) {
        rec.cloudflareUrl = await generatePresignedGetUrl(rec.cloudflareKey);
      }
    }

    res.json({ success: true, recordings });
  } catch (error) {
    next(error);
  }
});

// POST /upload-cloudflare -> Admin/Faculty: upload recording directly to Cloudflare R2
router.post('/upload-cloudflare', protect, restrictTo('admin', 'superadmin', 'faculty'), upload.single('video'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No video file provided' });
    }

    const { title, description, duration, folderId } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, message: 'Title is required' });
    }

    const objectKey = `global-library/${Date.now()}-${req.file.originalname}`;
    const uploadResult = await uploadFileToCloudflareR2(
      req.file.buffer,
      objectKey,
      req.file.mimetype
    );

    const recording = await LibraryRecording.create({
      title,
      description,
      uploadedBy: req.user._id,
      folder: isValidId(folderId) ? folderId : null,
      storageProvider: 'cloudflare',
      cloudflareKey: objectKey,
      cloudflareUrl: uploadResult.url,
      duration: duration ? parseInt(duration, 10) : 0,
      thumbnail: '/default-video-thumb.jpg'
    });

    res.status(201).json({
      success: true,
      message: 'Recording uploaded to Global Library',
      recording
    });
  } catch (error) {
    next(error);
  }
});

// GET /:id -> Get library recording detail
router.get('/:id', protect, restrictTo('admin', 'superadmin', 'faculty'), async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid ID' });
    
    const recording = await LibraryRecording.findById(req.params.id).populate('uploadedBy', 'fullName');
    if (!recording) return res.status(404).json({ success: false, message: 'Recording not found' });
    
    res.json({ success: true, recording });
  } catch (error) {
    next(error);
  }
});

// PUT /:id -> Update library recording
router.put('/:id', protect, restrictTo('admin', 'superadmin', 'faculty'), async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid ID' });
    
    const recording = await LibraryRecording.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!recording) return res.status(404).json({ success: false, message: 'Recording not found' });
    
    res.json({ success: true, message: 'Updated successfully', recording });
  } catch (error) {
    next(error);
  }
});

// DELETE /:id -> Delete library recording
router.delete('/:id', protect, restrictTo('admin', 'superadmin', 'faculty'), async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid ID' });
    
    const recording = await LibraryRecording.findById(req.params.id);
    if (!recording) return res.status(404).json({ success: false, message: 'Recording not found' });

    if (recording.cloudflareKey) {
      // Find and delete all corresponding ClassroomRecordings referencing the same file
      const classroomRecs = await ClassroomRecording.find({ cloudflareKey: recording.cloudflareKey });
      for (const rec of classroomRecs) {
        await Classroom.findByIdAndUpdate(rec.classroom, {
          $inc: { 'stats.totalRecordings': -1 }
        });
        await rec.deleteOne();
      }

      // Delete the file from Cloudflare R2
      await deleteFileFromCloudflareR2(recording.cloudflareKey).catch(err => {
        console.error(`[R2 Delete Error] Failed to delete key ${recording.cloudflareKey}:`, err);
      });
    }
    await recording.deleteOne();
    
    res.json({ success: true, message: 'Recording deleted from library and all classrooms' });
  } catch (error) {
    next(error);
  }
});


// POST /presigned-url
router.post('/presigned-url', protect, restrictTo('admin', 'superadmin', 'faculty'), async (req, res, next) => {
  try {
    const { filename, contentType } = req.body;
    if (!filename) return res.status(400).json({ success: false, message: 'filename is required' });
    const safeName = filename.replace(/[/\\]/g, '_');
    const objectKey = `global-library/${Date.now()}-${safeName}`;
    const { uploadUrl, publicUrl } = await generatePresignedUploadUrl(objectKey, contentType || 'video/mp4', 3600);
    res.json({ success: true, uploadUrl, objectKey, publicUrl });
  } catch (error) { next(error); }
});

// POST /save-recording
router.post('/save-recording', protect, restrictTo('admin', 'superadmin', 'faculty'), async (req, res, next) => {
  try {
    const { title, description, duration, folderId, objectKey, publicUrl } = req.body;
    if (!title || !objectKey) return res.status(400).json({ success: false, message: 'Title and objectKey are required' });
    
    const recording = await LibraryRecording.create({
      title,
      description,
      uploadedBy: req.user._id,
      folder: folderId ? folderId : null,
      storageProvider: 'cloudflare',
      cloudflareKey: objectKey,
      cloudflareUrl: publicUrl,
      duration: duration ? parseInt(duration, 10) : 0,
      thumbnail: '/default-video-thumb.jpg'
    });
    res.status(201).json({ success: true, message: 'Recording saved', recording });
  } catch (error) { next(error); }
});

// MULTIPART
router.post('/multipart/initiate', protect, restrictTo('admin', 'superadmin', 'faculty'), async (req, res, next) => {
  try {
    const { filename, contentType } = req.body;
    if (!filename) return res.status(400).json({ success: false, message: 'filename required' });
    const safeName = filename.replace(/[/\\]/g, '_');
    const objectKey = `global-library/${Date.now()}-${safeName}`;
    const uploadId = await createMultipartUpload(objectKey, contentType || 'video/mp4');
    const { getR2ObjectUrl } = require('../config/cloudflare');
    res.json({ success: true, uploadId, objectKey, publicUrl: getR2ObjectUrl(objectKey) });
  } catch (error) { next(error); }
});

router.post('/multipart/presign-part', protect, restrictTo('admin', 'superadmin', 'faculty'), async (req, res, next) => {
  try {
    const { objectKey, uploadId, partNumber } = req.body;
    if (!objectKey || !uploadId || partNumber == null) return res.status(400).json({ success: false, message: 'Missing params' });
    const presignedUrl = await generatePresignedPartUrl(objectKey, uploadId, parseInt(partNumber, 10), 7200);
    res.json({ success: true, presignedUrl });
  } catch (error) { next(error); }
});

router.post('/multipart/complete', protect, restrictTo('admin', 'superadmin', 'faculty'), async (req, res, next) => {
  try {
    const { objectKey, uploadId, parts } = req.body;
    if (!objectKey || !uploadId || !Array.isArray(parts)) return res.status(400).json({ success: false, message: 'Missing params' });
    const sortedParts = [...parts].sort((a, b) => a.PartNumber - b.PartNumber);
    const publicUrl = await completeMultipartUpload(objectKey, uploadId, sortedParts);
    res.json({ success: true, publicUrl });
  } catch (error) { next(error); }
});

router.post('/multipart/abort', protect, restrictTo('admin', 'superadmin', 'faculty'), async (req, res, next) => {
  try {
    const { objectKey, uploadId } = req.body;
    if (!objectKey || !uploadId) return res.status(400).json({ success: false, message: 'Missing params' });
    await abortMultipartUpload(objectKey, uploadId);
    res.json({ success: true });
  } catch (error) { next(error); }
});

module.exports = router;
