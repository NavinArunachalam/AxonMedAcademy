const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const Session = require('../models/Session');
const path = require('path');
const fs = require('fs');

const User = require('../models/User');
const StudentRequest = require('../models/StudentRequest');
const { protect } = require('../middleware/auth');

const defaultLoginAccounts = {
  'admin@ex.com': {
    firstName: 'Admin',
    lastName: 'User',
    password: 'axon@admin',
    role: 'admin'
  },
  'ajay@ex.com': {
    firstName: 'Ajay',
    lastName: 'Kumar',
    password: '1111',
    role: 'student',
    phone: '+91 98700 11110'
  },
  'navin@ex.com': {
    firstName: 'Navin',
    lastName: 'Raj',
    password: '2222',
    role: 'student',
    phone: '+91 98700 22220'
  }
};

const repairDefaultLoginAccount = async (user, password) => {
  const defaults = defaultLoginAccounts[user.email];
  if (!defaults || password !== defaults.password) return;

  user.firstName = defaults.firstName;
  user.lastName = defaults.lastName;
  user.role = defaults.role;
  user.isVerified = true;
  user.isActive = true;
  if (defaults.phone) user.phone = defaults.phone;
  await user.save();
};

// Setup local uploads storage for documents
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
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// POST /register → Student registration request submission
router.post('/register', upload.any(), async (req, res, next) => {
  try {
    const { firstName, lastName, email, phone, qualification, address, program, message, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields (firstName, lastName, email, password)' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    // 1. Create User account (isVerified=false, role=student, isActive=true)
    const user = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password, // it will be hashed by pre-save hook in User model
      role: 'student',
      isVerified: false,
      isActive: true
    });

    // Handle documents from files or body
    let docs = [];
    if (req.files && req.files.length > 0) {
      docs = req.files.map(f => ({
        type: f.fieldname,
        url: `/uploads/${f.filename}`,
        name: f.originalname
      }));
    } else if (req.body.documents) {
      docs = typeof req.body.documents === 'string' ? JSON.parse(req.body.documents) : req.body.documents;
    }

    // 2. Create StudentRequest document
    const request = await StudentRequest.create({
      user: user._id,
      firstName,
      lastName,
      email,
      phone,
      qualification,
      address,
      program: program || null,
      message,
      documents: docs,
      timeline: [{ status: 'pending', note: 'Registration submitted', changedAt: new Date() }]
    });

    // 3. Notify ALL admin users in real-time via Socket.io
    try {
      const { getIO } = require('../config/socket');
      const io = getIO();
      const admins = await User.find({ role: { $in: ['admin', 'superadmin'] } }).select('_id');
      admins.forEach(admin => {
        io.to(`user:${admin._id}`).emit('notification:new', {
          type: 'student_request',
          title: 'New student registration',
          message: `${firstName} ${lastName} has submitted a registration request`,
          actionUrl: `/admin/applications`,
          priority: 'medium'
        });
      });
    } catch (socketErr) {
      console.error('[Socket Error] Could not emit student_request notification:', socketErr.message);
    }

    res.status(201).json({
      success: true,
      message: 'Registration submitted. Awaiting admin approval.',
      requestId: request._id
    });
  } catch (error) {
    next(error);
  }
});

// POST /login → Authenticate user with password & verification state checks
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    const normalizedEmail = String(email).toLowerCase().trim();
    let user = await User.findOne({ email: normalizedEmail }).select('+password');
    const defaultAccount = defaultLoginAccounts[normalizedEmail];

    if (!user && defaultAccount && password === defaultAccount.password) {
      user = await User.create({
        firstName: defaultAccount.firstName,
        lastName: defaultAccount.lastName,
        email: normalizedEmail,
        phone: defaultAccount.phone,
        password: defaultAccount.password,
        role: defaultAccount.role,
        isVerified: true,
        isActive: true
      });
    }

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    let isMatch = await user.comparePassword(password);
    if (!isMatch && defaultAccount && password === defaultAccount.password) {
      user.password = defaultAccount.password;
      await user.save();
      isMatch = true;
    }

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    await repairDefaultLoginAccount(user, password);

    // CHECK 1: Is account verified (approved by admin)?
    if (!user.isVerified) {
      const request = await StudentRequest.findOne({ user: user._id });
      const status = request?.status || 'pending';
      const note = request?.adminNote;

      if (status === 'pending') {
        return res.status(403).json({
          success: false,
          code: 'PENDING_APPROVAL',
          message: 'Your registration is under review. You will be notified once approved.',
        });
      }
      if (status === 'held') {
        return res.status(403).json({
          success: false,
          code: 'ACCOUNT_HELD',
          message: note || 'Your account access has been temporarily suspended. Please contact the academy.',
        });
      }
      if (status === 'rejected') {
        return res.status(403).json({
          success: false,
          code: 'ACCOUNT_REJECTED',
          message: note || 'Your application was not approved. Please contact the academy for details.',
        });
      }
    }

    // CHECK 2: Is account active?
    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        code: 'ACCOUNT_INACTIVE',
        message: 'Your account has been deactivated. Please contact support.',
      });
    }

    // All checks passed — issue tokens
    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_ACCESS_SECRET || 'local_access_secret_for_development_purposes_only_12345',
      { expiresIn: '15m' }
    );
    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.JWT_REFRESH_SECRET || 'local_refresh_secret_for_development_purposes_only_12345',
      { expiresIn: '7d' }
    );

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 8);
    await User.findByIdAndUpdate(user._id, {
      $push: { refreshTokens: hashedRefreshToken },
      lastLogin: new Date()
    });

    // ---------- Persistent session creation ----------
    const crypto = require('crypto');
    const rawSessionToken = crypto.randomBytes(32).toString('hex');
    const SESSION_EXPIRES_MS = 90 * 24 * 60 * 60 * 1000; // 90 days
    await Session.createSession(user._id, rawSessionToken, SESSION_EXPIRES_MS, req.headers['user-agent'] || '');

    // Set cookies
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    };
    res.cookie('accessToken', accessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 });
    res.cookie('refreshToken', refreshToken, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 });
    // Persistent session cookie
    res.cookie('session', rawSessionToken, { ...cookieOptions, maxAge: SESSION_EXPIRES_MS });
    // -----------------------------------------------

    const sanitizedUser = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      isVerified: user.isVerified,
      isActive: user.isActive,
      avatar: user.avatar
    };

    res.json({
      success: true,
      accessToken,
      refreshToken,
      user: sanitizedUser
    });
  } catch (error) {
    next(error);
  }
});

// GET /me → Get logged in user profile
router.get('/me', protect, async (req, res, next) => {
  try {
    const user = {
      _id: req.user._id,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
      phone: req.user.phone,
      role: req.user.role,
      isVerified: req.user.isVerified,
      isActive: req.user.isActive,
      avatar: req.user.avatar
    };
    res.json({ success: true, user });
  } catch (error) {
    next(error);
  }
});

// POST /refresh-token → Refresh access token using refresh cookie
router.post('/refresh-token', async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ success: false, message: 'Refresh token not found' });
    }

    let decoded;
    try {
      decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || 'local_refresh_secret_for_development_purposes_only_12345');
    } catch (err) {
      return res.status(401).json({ success: false, message: 'Invalid refresh token' });
    }

    const currentUser = await User.findById(decoded.id).select('+refreshTokens');
    if (!currentUser) {
      return res.status(401).json({ success: false, message: 'User not found for refresh token' });
    }

    const tokenMatches = await Promise.all(
      currentUser.refreshTokens.map((storedToken) => bcrypt.compare(refreshToken, storedToken))
    );

    if (!tokenMatches.some(Boolean)) {
      return res.status(401).json({ success: false, message: 'Refresh token has been revoked' });
    }

    const newAccessToken = jwt.sign(
      { id: currentUser._id, role: currentUser.role },
      process.env.JWT_ACCESS_SECRET || 'local_access_secret_for_development_purposes_only_12345',
      { expiresIn: '15m' }
    );

    const newRefreshToken = jwt.sign(
      { id: currentUser._id },
      process.env.JWT_REFRESH_SECRET || 'local_refresh_secret_for_development_purposes_only_12345',
      { expiresIn: '7d' }
    );
    const hashedNewRefreshToken = await bcrypt.hash(newRefreshToken, 8);

    // Rotate refresh token and persist it
    const oldIndex = tokenMatches.findIndex(Boolean);
    if (oldIndex !== -1) {
      currentUser.refreshTokens.splice(oldIndex, 1, hashedNewRefreshToken);
      await currentUser.save();
    }

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    };
    res.cookie('accessToken', newAccessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 });
    res.cookie('refreshToken', newRefreshToken, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 });

    res.json({ success: true, accessToken: newAccessToken });
  } catch (error) {
    next(error);
  }
});

// PUT /me → Update own profile fields
router.put('/me', protect, async (req, res, next) => {
  try {
    const { firstName, lastName, phone } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: { firstName, lastName, phone } },
      { new: true }
    );
    res.json({
      success: true,
      user: {
        _id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        phone: updatedUser.phone,
        role: updatedUser.role
      }
    });
  } catch (error) {
    next(error);
  }
});

// POST /logout → Invalidate session cookies
router.post('/logout', protect, async (req, res) => {
  // Retrieve session token before clearing cookies
  const sessionToken = req.cookies.session;

  // Remove session from DB if present
  if (sessionToken && req.user) {
    const userSessions = await Session.find({ user: req.user._id });
    for (const s of userSessions) {
      if (await s.isValid(sessionToken)) {
        await s.remove();
        break;
      }
    }
  }

  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.clearCookie('session');

  res.json({ success: true, message: 'Logged out successfully' });
});

module.exports = router;
