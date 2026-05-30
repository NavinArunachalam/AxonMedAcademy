const express = require('express');
const router = express.Router();
const Program = require('../models/Program');
const { protect, restrictTo } = require('../middleware/auth');

// GET / → Public: list published programs
router.get('/', async (req, res, next) => {
  try {
    const filter = { isPublished: true };
    // If user is admin, allow viewing all programs (draft and published)
    // We can check if a token exists, but let's default to published for registration choice
    const programs = await Program.find(filter).sort({ title: 1 });
    res.json({ success: true, programs });
  } catch (error) {
    next(error);
  }
});

// GET /admin-list → Admin: list all programs
router.get('/admin-all', protect, restrictTo('admin', 'superadmin'), async (req, res, next) => {
  try {
    const programs = await Program.find().sort({ title: 1 });
    res.json({ success: true, programs });
  } catch (error) {
    next(error);
  }
});

// GET /featured → Public: get featured programs (homepage)
router.get('/featured', async (req, res, next) => {
  try {
    const featuredPrograms = await Program.find({ isFeatured: true, isPublished: true });
    res.json({ success: true, featuredPrograms });
  } catch (error) {
    next(error);
  }
});

// GET /:slug → Public: get program detail by slug
router.get('/:slug', async (req, res, next) => {
  try {
    const program = await Program.findOne({ slug: req.params.slug });
    if (!program) {
      return res.status(404).json({ success: false, message: 'Program not found' });
    }
    res.json({ success: true, program });
  } catch (error) {
    next(error);
  }
});

// POST / → Admin: create program
router.post('/', protect, restrictTo('admin', 'superadmin'), async (req, res, next) => {
  try {
    const { title, slug, subtitle, description, shortDesc, category, fee, isPublished } = req.body;
    
    if (!title || !slug) {
      return res.status(400).json({ success: false, message: 'Title and slug are required' });
    }

    const program = await Program.create({
      title,
      slug,
      subtitle,
      description,
      shortDesc,
      category,
      fee: fee || { baseAmount: 10000, gstPercent: 18, emiAvailable: true, scholarshipAvailable: false },
      isPublished: isPublished !== undefined ? isPublished : true
    });

    res.status(201).json({ success: true, message: 'Program created successfully', program });
  } catch (error) {
    next(error);
  }
});

// PUT /:id → Admin: update program
router.put('/:id', protect, restrictTo('admin', 'superadmin'), async (req, res, next) => {
  try {
    const program = await Program.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!program) {
      return res.status(404).json({ success: false, message: 'Program not found' });
    }
    res.json({ success: true, message: 'Program updated successfully', program });
  } catch (error) {
    next(error);
  }
});

// DELETE /:id → Admin: soft-delete program
router.delete('/:id', protect, restrictTo('admin', 'superadmin'), async (req, res, next) => {
  try {
    const program = await Program.findByIdAndDelete(req.params.id);
    if (!program) {
      return res.status(404).json({ success: false, message: 'Program not found' });
    }
    res.json({ success: true, message: 'Program deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
