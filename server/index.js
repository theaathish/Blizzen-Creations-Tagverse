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
import trustStatsRoutes from './routes/trust-stats.js';
import footerContentRoutes from './routes/footer-content.js';
import blogRoutes from './routes/blog.js';
import navbarRoutes from './routes/navbar.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;


console.log('🚀 Blizzen Creations Backend Server');

// Middleware
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      // Production domains
      'https://blizzencreations.com',
      'https://www.blizzencreations.com',
      'https://blizzen-creations-tagverse.vercel.app',
      'https://api.blizzencreations.com',
      
      // Development/Local
      'http://localhost:5173',
      'http://localhost:4173', // Vite preview port
      'http://localhost:8080',
      'http://localhost:3000',
      'http://127.0.0.1:5173',
      'http://127.0.0.1:4173', // Vite preview port
      'http://127.0.0.1:8080',
      'http://127.0.0.1:3000'
    ];

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`⚠️ CORS blocked request from: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Handle preflight requests
app.options('*', cors(corsOptions));

// Security middleware
app.use((req, res, next) => {
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
app.use('/api/trust-stats', trustStatsRoutes);
app.use('/api/footer-content', footerContentRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/navbar', navbarRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'Server is running',
    timestamp: new Date(),
    system: 'Blizzen Creations'
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
