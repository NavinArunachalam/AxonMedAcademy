const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName:  { type: String, required: true, trim: true },
  email:     { type: String, required: true, unique: true, lowercase: true, trim: true },
  phone:     { type: String, unique: true, sparse: true, trim: true },
  password:  { type: String, required: true, select: false },
  avatar:    { type: String, default: null }, // S3 URL
  role: {
    type: String,
    enum: ['student', 'faculty', 'admin', 'accounts', 'receptionist', 'superadmin'],
    default: 'student'
  },
  isVerified:   { type: Boolean, default: false },
  isActive:     { type: Boolean, default: true },
  twoFAEnabled: { type: Boolean, default: false },
  twoFASecret:  { type: String, select: false },
  otp:          { type: String, select: false },
  otpExpiry:    { type: Date, select: false },
  refreshTokens: [{ type: String, select: false }],
  lastLogin:    { type: Date },
  deviceInfo:   { type: String }
}, { 
  timestamps: true 
});

// Indexes for super-fast retrieval during auth
userSchema.index({ email: 1, role: 1 });

// Pre-save password hashing hook
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const saltRounds = parseInt(process.env.BCRYPT_ROUNDS) || 12;
    const salt = await bcrypt.genSalt(saltRounds);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Password verification instance method
userSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
