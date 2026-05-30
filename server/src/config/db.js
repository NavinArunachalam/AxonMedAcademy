const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config();

const seedSuperAdmin = async () => {
  try {
    const email = process.env.SUPER_ADMIN_EMAIL || 'superadmin@hospitalacademy.edu';
    const password = process.env.SUPER_ADMIN_PASSWORD || 'SuperAdminPass123!';
    
    const existing = await User.findOne({ email });
    if (!existing) {
      console.log(`[Database] Seeding default super admin user (${email})...`);
      await User.create({
        firstName: 'Super',
        lastName: 'Admin',
        email,
        password,
        role: 'superadmin',
        isVerified: true,
        isActive: true
      });
      console.log('[Database] Default super admin user seeded successfully!');
    }
  } catch (err) {
    console.error('[Database] Failed to seed default super admin user:', err.message);
  }
};

const connectDB = async () => {
  try {
    const connStr = process.env.MONGODB_URI || 'mongodb://localhost:27017/hta_db';
    console.log(`[Database] Attempting connection to MongoDB...`);
    
    const conn = await mongoose.connect(connStr, {
      autoIndex: true, // Auto-build indexes in development
    });

    console.log(`[Database] MongoDB Connected successfully to host: ${conn.connection.host}`);
    
    // Seed default super admin
    await seedSuperAdmin();
  } catch (error) {
    console.error(`[Database] MongoDB connection failure: ${error.message}`);
    process.exit(1);
  }
};

// Mongoose connection event listeners
mongoose.connection.on('disconnected', () => {
  console.warn('[Database] MongoDB connection lost. Retrying...');
});

mongoose.connection.on('error', (err) => {
  console.error(`[Database] MongoDB runtime error: ${err}`);
});

module.exports = connectDB;
