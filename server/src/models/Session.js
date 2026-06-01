const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const sessionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tokenHash: { type: String, required: true },
  deviceInfo: { type: String },
  expiresAt: { type: Date, required: true },
}, { timestamps: true });

// Index to efficiently purge expired sessions
sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Helper to create a hashed token
sessionSchema.statics.createSession = async function (userId, rawToken, expiresInMs, deviceInfo) {
  const hash = await bcrypt.hash(rawToken, 10);
  const expiresAt = new Date(Date.now() + expiresInMs);
  return this.create({ user: userId, tokenHash: hash, expiresAt, deviceInfo });
};

// Verify raw token against stored hash
sessionSchema.methods.isValid = async function (rawToken) {
  return bcrypt.compare(rawToken, this.tokenHash);
};

module.exports = mongoose.model('Session', sessionSchema);
