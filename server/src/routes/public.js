const express = require('express');
const router = express.Router();

// GET /programs → Published programs list
router.get('/programs', (req, res) => {
  res.json({ success: true, programs: [] });
});

// GET /programs/:slug → Program detail
router.get('/programs/:slug', (req, res) => {
  res.json({ success: true, program: { slug: req.params.slug } });
});

// GET /faculty → Faculty directory
router.get('/faculty', (req, res) => {
  res.json({ success: true, facultyList: [] });
});

// GET /testimonials → Student testimonials
router.get('/testimonials', (req, res) => {
  res.json({ success: true, testimonials: [] });
});

// GET /stats → Platform stats (students, partners, etc.)
router.get('/stats', (req, res) => {
  res.json({
    success: true,
    stats: {
      studentsCertified: 12000,
      partnerHospitals: 450,
      globalAlumni: 85000,
      excellenceAwards: 12
    }
  });
});

// GET /certificate/verify/:no → Verify certificate
router.get('/certificate/verify/:no', (req, res) => {
  res.json({ success: true, valid: true, certificateNumber: req.params.no });
});

module.exports = router;
