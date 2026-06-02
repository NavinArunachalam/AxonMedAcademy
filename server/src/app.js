const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Security
app.use(helmet());

// ==================== CORS ====================

const rawOrigins = process.env.CLIENT_URL || '';

const allowedOrigins = rawOrigins
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean);

// Development origins
if (process.env.NODE_ENV !== 'production') {
  [
    'http://localhost:3000',
    'http://localhost:5173',
    'http://localhost:8080'
  ].forEach(origin => {
    if (!allowedOrigins.includes(origin)) {
      allowedOrigins.push(origin);
    }
  });
}

console.log('Allowed Origins:', allowedOrigins);

const corsOptions = {
  origin: (origin, callback) => {
    // Allow Postman, server-to-server, curl
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.error(`CORS BLOCKED: ${origin}`);

    return callback(
      new Error(`Origin ${origin} is not allowed by CORS`)
    );
  },

  credentials: true,

  methods: [
    'GET',
    'POST',
    'PUT',
    'PATCH',
    'DELETE',
    'OPTIONS'
  ],

  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'x-dev-user-email',
    'x-dev-user-role',
    'x-dev-user-name'
  ],

  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// IMPORTANT
app.options(/.*/, cors(corsOptions));

// ==================== END CORS ====================

// Logger
app.use(morgan('dev'));

// Body Parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({
  extended: true,
  limit: '10mb'
}));

// Cookies
app.use(cookieParser());

// Static Files
app.use(
  '/uploads',
  express.static(path.join(__dirname, '../uploads'))
);

// Rate Limit
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message:
      'Too many requests from this IP. Please try again later.'
  }
});

app.use('/api', apiLimiter);

// Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString()
  });
});

// Routes
const apiRouter = require('./routes');
app.use('/api/v1', apiRouter);

// Error Handler
app.use(errorHandler);

module.exports = app;