const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Security Middlewares
app.use(helmet());

// Build list of allowed CORS origins from environment
const rawOrigins = process.env.CLIENT_URL || 'http://localhost:8080';
const allowedOrigins = rawOrigins
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

// Always allow localhost variants in development
if (process.env.NODE_ENV !== 'production') {
  ['http://localhost:5173', 'http://localhost:8080', 'http://localhost:3000'].forEach((o) => {
    if (!allowedOrigins.includes(o)) allowedOrigins.push(o);
  });
}

// CORS configuration matching requirements
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, server-to-server)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    console.warn(`[CORS] Blocked request from origin: ${origin}`);
    return callback(new Error(`CORS: Origin ${origin} not allowed`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-dev-user-email', 'x-dev-user-role', 'x-dev-user-name'],
  optionsSuccessStatus: 200,
}));

// Handle preflight OPTIONS for all routes
app.options('*', cors());

// HTTP request logger
app.use(morgan('dev'));

// Payload Parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Cookie Parser
app.use(cookieParser());

// Static uploads serving
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Rate Limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // max 1000 requests per IP per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP. Please try again after 15 minutes.'
  }
});
app.use('/api', apiLimiter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'HTA Backend API is fully operational',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV
  });
});

// Real routing binding mapped to full monorepo routes
const apiRouter = require('./routes');
app.use('/api/v1', apiRouter);

// Global Error Handler Middleware
app.use(errorHandler);

module.exports = app;
