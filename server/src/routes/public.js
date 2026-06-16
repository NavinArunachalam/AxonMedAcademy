const express = require('express');
const router = express.Router();
const FacultyMember = require('../models/FacultyMember');
const AboutDetail = require('../models/AboutDetail');
const Milestone = require('../models/Milestone');
const HospitalPartner = require('../models/HospitalPartner');
const PlacementStory = require('../models/PlacementStory');
const BlogPost = require('../models/BlogPost');
const ContactDetail = require('../models/ContactDetail');
const Inquiry = require('../models/Inquiry');

// GET /programs → Published programs list
router.get('/programs', (req, res) => {
  res.json({ success: true, programs: [] });
});

// GET /programs/:slug → Program detail
router.get('/programs/:slug', (req, res) => {
  res.json({ success: true, program: { slug: req.params.slug } });
});

// GET /faculty → Faculty directory
router.get('/faculty', async (req, res, next) => {
  try {
    const facultyList = await FacultyMember.find().sort({ createdAt: 1 });
    res.json({ success: true, facultyList });
  } catch (error) {
    next(error);
  }
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

// --- NEW PUBLIC GET ENDPOINTS ---

// GET /about → Get about details & milestones
router.get('/about', async (req, res, next) => {
  try {
    const about = await AboutDetail.findOne() || { mission: '', vision: '', values: '' };
    const milestones = await Milestone.find().sort({ year: 1 });
    res.json({ success: true, about, milestones });
  } catch (error) {
    next(error);
  }
});

// GET /placements → Get placements (partners & stories)
router.get('/placements', async (req, res, next) => {
  try {
    const partners = await HospitalPartner.find().sort({ name: 1 });
    const stories = await PlacementStory.find().sort({ createdAt: -1 });
    res.json({ success: true, partners, stories });
  } catch (error) {
    next(error);
  }
});

// GET /blogs → Get all blog posts
router.get('/blogs', async (req, res, next) => {
  try {
    const blogs = await BlogPost.find().sort({ createdAt: -1 });
    res.json({ success: true, blogs });
  } catch (error) {
    next(error);
  }
});

// GET /contact-details → Get public contact details
router.get('/contact-details', async (req, res, next) => {
  try {
    let contactDetails = await ContactDetail.findOne();
    if (!contactDetails) {
      contactDetails = {
        address: "Plot 21, Medical Campus, Hosur Road, Bengaluru — 560001",
        phone: "+91 98765 43210",
        email: "hello@axon.academy",
        hours: "Monday – Saturday, 9 AM to 8 PM"
      };
    }
    res.json({ success: true, contactDetails });
  } catch (error) {
    next(error);
  }
});

// POST /contact → Submit a counselling inquiry / lead
router.post('/contact', async (req, res, next) => {
  try {
    const { name, email, phone, interest, message } = req.body;
    if (!name || !email) {
      return res.status(400).json({ success: false, message: 'Name and email are required' });
    }
    const inquiry = await Inquiry.create({ name, email, phone, interest, message });
    res.status(201).json({ success: true, message: 'Counselling inquiry submitted successfully', inquiry });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
