const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const FacultyMember = require('../models/FacultyMember');

dotenv.config();

const defaultUsers = [
  {
    fullName: 'Super Admin',
    email: process.env.SUPER_ADMIN_EMAIL || 'superadmin@hospitalacademy.edu',
    password: process.env.SUPER_ADMIN_PASSWORD || 'SuperAdminPass123!',
    role: 'superadmin'
  },
  {
    fullName: 'Admin User',
    email: 'admin@ex.com',
    password: 'axon@admin',
    role: 'admin'
  },
  {
    fullName: 'Ajay Kumar',
    email: 'ajay@ex.com',
    password: '1111',
    role: 'student',
    phone: '+91 98700 11110'
  },
  {
    fullName: 'Navin Raj',
    email: 'navin@ex.com',
    password: '2222',
    role: 'student',
    phone: '+91 98700 22220'
  }
];

const defaultFaculty = [
  { name: "Dr. Anita Sharma",  role: "Senior Cardiologist", specialty: "Cardiac Care",  years: 18, rating: 4.9, initials: "AS" },
  { name: "Dr. Rohan Mehta",   role: "Anesthesiologist",    specialty: "OT Technology", years: 14, rating: 4.8, initials: "RM" },
  { name: "Dr. Priya Iyer",    role: "Chief Pathologist",   specialty: "Lab Sciences",  years: 22, rating: 5.0, initials: "PI" },
  { name: "Dr. Aman Khan",     role: "Radiologist",         specialty: "Imaging",       years: 12, rating: 4.7, initials: "AK" },
  { name: "Nurse Latha R.",    role: "Nursing Head",        specialty: "Staff Nursing", years: 20, rating: 4.9, initials: "LR" },
  { name: "Dr. Sanjay V.",     role: "ICU Specialist",      specialty: "Critical Care", years: 16, rating: 4.8, initials: "SV" },
  { name: "Dr. Meera Joshi",   role: "Pediatrician",        specialty: "Pediatric Care",years: 11, rating: 4.8, initials: "MJ" },
  { name: "Dr. Vikram Rao",    role: "Emergency Physician", specialty: "ER & Trauma",   years: 13, rating: 4.7, initials: "VR" }
];

const seedDefaultUsers = async () => {
  try {
    for (const defaultUser of defaultUsers) {
      const existing = await User.findOne({ email: defaultUser.email }).select('+password');
      if (existing) {
        const passwordMatches = await existing.comparePassword(defaultUser.password);
        existing.fullName = defaultUser.fullName;
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

const seedDefaultFaculty = async () => {
  try {
    const count = await FacultyMember.countDocuments();
    if (count === 0) {
      console.log('[Database] Seeding default faculty members...');
      await FacultyMember.insertMany(defaultFaculty);
      console.log('[Database] Seeding default faculty members completed.');
    }
  } catch (err) {
    console.error('[Database] Failed to seed default faculty members:', err.message);
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
    // Seed default faculty members
    await seedDefaultFaculty();
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
