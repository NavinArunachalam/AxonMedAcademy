const express = require('express');
const router = express.Router();

// POST / → Student: enroll in a program+batch (after payment)
router.post('/', (req, res) => {
  res.json({ success: true, message: 'Student enrolled (placeholder)' });
});

// GET /my → Student: get all own enrollments with progress
router.get('/my', (req, res) => {
  res.json({ success: true, enrollments: [] });
});

// GET /:id → Get enrollment details + progress
router.get('/:id', (req, res) => {
  res.json({ success: true, enrollment: {} });
});

// PUT /:id/progress → Update lesson progress
router.put('/:id/progress', (req, res) => {
  res.json({ success: true, message: 'Progress updated (placeholder)' });
});

// GET /admin/all → Admin: all enrollments (paginated)
router.get('/admin/all', (req, res) => {
  res.json({ success: true, enrollments: [] });
});

// PUT /admin/:id/status → Admin: change enrollment status
router.put('/admin/:id/status', (req, res) => {
  res.json({ success: true, message: 'Enrollment status updated (placeholder)' });
});

// DELETE /:id → Admin: drop enrollment
router.delete('/:id', (req, res) => {
  res.json({ success: true, message: 'Enrollment dropped (placeholder)' });
});

module.exports = router;
