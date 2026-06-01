const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config();

const defaultUsers = [
  {
    firstName: 'Super',
    lastName: 'Admin',
    email: process.env.SUPER_ADMIN_EMAIL || 'superadmin@hospitalacademy.edu',
    password: process.env.SUPER_ADMIN_PASSWORD || 'SuperAdminPass123!',
    role: 'superadmin'
  },
  {
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@ex.com',
    password: 'axon@admin',
    role: 'admin'
  },
  {
    firstName: 'Ajay',
    lastName: 'Kumar',
    email: 'ajay@ex.com',
    password: '1111',
    role: 'student',
    phone: '+91 98700 11110'
  },
  {
    firstName: 'Navin',
    lastName: 'Raj',
    email: 'navin@ex.com',
    password: '2222',
    role: 'student',
    phone: '+91 98700 22220'
  }
];

const seedDefaultUsers = async () => {
  try {
    for (const defaultUser of defaultUsers) {
      const existing = await User.findOne({ email: defaultUser.email }).select('+password');
      if (existing) {
        const passwordMatches = await existing.comparePassword(defaultUser.password);
        existing.firstName = defaultUser.firstName;
        existing.lastName = defaultUser.lastName;
        existing.role = defaultUser.role;
        existing.isVerified = true;
        existing.isActive = true;
        if (defaultUser.phone) existing.phone = defaultUser.phone;
        if (!passwordMatches) existing.password = defaultUser.password;
        await existing.save();
        continue;
      }

      console.log(`[Database] Seeding default ${defaultUser.role} user (${defaultUser.email})...`);
      await User.create({
        ...defaultUser,
        isVerified: true,
        isActive: true
      });
    }
    console.log('[Database] Default users are ready.');
  } catch (err) {
    console.error('[Database] Failed to seed default users:', err.message);
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
    
    // Seed default login users
    await seedDefaultUsers();
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
