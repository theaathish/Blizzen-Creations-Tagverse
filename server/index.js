import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import enquiryRoutes from './routes/enquiry.js';
import courseRoutes from './routes/courses.js';
import placementRoutes from './routes/placements.js';
import placementStatsRoutes from './routes/placement-stats.js';
import contactInfoRoutes from './routes/contact-info.js';
import aboutRoutes from './routes/about.js';
import homeContentRoutes from './routes/home-content.js';
import uploadRoutes from './routes/upload.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// 🔒 PROTECTION SYSTEM - DO NOT REMOVE
const displayProtectionBanner = () => {
  const banner = `
  ███████╗████████╗██████╗ ██╗   ██╗ ██████╗██╗   ██╗██████╗ ███████╗ ██████╗ 
  ██╔════╝╚══██╔══╝██╔══██╗██║   ██║██╔════╝██║   ██║██╔══██╗██╔════╝██╔═══██╗
  ███████╗   ██║   ██████╔╝██║   ██║██║     ██║   ██║██████╔╝█████╗  ██║   ██║
  ╚════██║   ██║   ██╔══██╗██║   ██║██║     ██║   ██║██╔══██╗██╔══╝  ██║   ██║
  ███████║   ██║   ██║  ██║╚██████╔╝╚██████╗╚██████╔╝██║  ██║███████╗╚██████╔╝
  ╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝ ╚═════╝ 
  
  🔒 BLIZZEN CREATIONS - PROTECTED BACKEND
  📧 Contact: strucureo@gmail.com
  ⚠️  Unauthorized access will be logged and reported
  `;
  console.log('\x1b[36m%s\x1b[0m', banner);
};

// Display protection banner
displayProtectionBanner();

// Middleware
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:8080',
      'http://localhost:3000',
      'http://127.0.0.1:5173',
      'http://127.0.0.1:8080',
      'http://127.0.0.1:3000'
    ];

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// 🔒 Protection middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  const ip = req.ip || req.connection.remoteAddress;

  // Log all requests for monitoring
  console.log(`🔍 [${timestamp}] ${req.method} ${req.path} from ${ip}`);

  // Add security headers
  res.setHeader('X-Powered-By', 'Blizzen-Creations');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');

  next();
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✓ MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('✗ MongoDB connection error:', err);
    process.exit(1);
  });

// Routes
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/placements', placementRoutes);
app.use('/api/placement-stats', placementStatsRoutes);
app.use('/api/contact-info', contactInfoRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/home-content', homeContentRoutes);
app.use('/api/upload', uploadRoutes);

// Health check endpoint with protection
app.get('/api/health', (req, res) => {
  const fingerprint = req.headers['x-fingerprint'] || 'unknown';
  console.log(`🔒 Health check from fingerprint: ${fingerprint}`);

  res.json({
    status: 'Server is running',
    timestamp: new Date(),
    protected: true,
    system: 'Blizzen Creations',
    contact: 'strucureo@gmail.com'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
