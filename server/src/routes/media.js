const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const Media = require('../models/Media');
const { protect, restrictTo } = require('../middleware/auth');
const { uploadFileToDrive, deleteFileFromDrive } = require('../config/googleDrive');

// Setup multer storage for temporary local file uploads
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
    cb(null, 'temp-media-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 100 * 1024 * 1024 } // 100MB file limit
});

// Protect all media endpoints to registered users
router.use(protect);

/**
 * @route   GET /api/v1/media
 * @desc    Get all general media items
 * @access  Private
 */
router.get('/', async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.classroom) {
      filter.classroom = req.query.classroom;
    }

    const mediaList = await Media.find(filter)
      .populate('uploadedBy', 'firstName lastName email')
      .sort({ createdAt: -1 });

    res.json({ success: true, count: mediaList.length, media: mediaList });
  } catch (error) {
    next(error);
  }
});

// Admin-only endpoints below
router.use(restrictTo('admin', 'superadmin'));

/**
 * @route   POST /api/v1/media/upload
 * @desc    Upload an image/video to Google Drive and save metadata
 * @access  Admin Only
 */
router.post('/upload', upload.single('file'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file provided for upload' });
    }

    const { title, description, classroom } = req.body;
    if (!title) {
      // Clean up temp file
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({ success: false, message: 'Media title is required' });
    }

    console.log(`[Media Route] Uploading file to Google Drive: ${req.file.originalname}`);
    const driveResult = await uploadFileToDrive(
      req.file.path,
      req.file.originalname,
      req.file.mimetype
    );

    // Save metadata in MongoDB
    const media = await Media.create({
      title,
      description,
      googleDriveFileId: driveResult.fileId,
      webViewLink: driveResult.viewLink,
      thumbnailLink: driveResult.thumbnailLink || '/default-video-thumb.jpg',
      mimeType: req.file.mimetype,
      size: req.file.size,
      classroom: classroom || null,
      uploadedBy: req.user._id,
      isMock: driveResult.isMock
    });

    // Remove the temp file
    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
      console.log(`[Media Route] Deleted temp file: ${req.file.path}`);
    }

    res.status(201).json({
      success: true,
      message: 'Media uploaded and saved successfully',
      media
    });
  } catch (error) {
    // Make sure to clean up local temp file on error
    if (req.file && req.file.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    next(error);
  }
});

/**
 * @route   DELETE /api/v1/media/:id
 * @desc    Delete media from database and Google Drive
 * @access  Admin Only
 */
router.delete('/:id', async (req, res, next) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) {
      return res.status(404).json({ success: false, message: 'Media item not found' });
    }

    console.log(`[Media Route] Deleting media ID: ${media._id}`);
    
    // Attempt to delete from Google Drive (handling mock deletion fallback)
    // The mock file is stored in /uploads/ with the name matching the fileId or originalName
    // Let's pass the URL path if it is mock
    const fileName = media.isMock ? path.basename(media.webViewLink) : null;
    await deleteFileFromDrive(media.googleDriveFileId, fileName);

    await media.deleteOne();

    res.json({
      success: true,
      message: 'Media deleted successfully from Google Drive and database'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
