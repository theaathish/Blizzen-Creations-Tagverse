import express from 'express';
import Enquiry from '../models/Enquiry.js';

const router = express.Router();

const MAX_ENQUIRIES_PER_DAY = 5;
const RATE_LIMIT_WINDOW_HOURS = 24;

// Create a new enquiry
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, course, qualification, experience, placementRequired, message } = req.body;

    // Validation
    if (!name || !email || !phone || !course) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Rate limit: allow up to MAX_ENQUIRIES_PER_DAY per email within last RATE_LIMIT_WINDOW_HOURS
    const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW_HOURS * 60 * 60 * 1000);
    const recentEnquiriesCount = await Enquiry.countDocuments({
      email,
      createdAt: { $gte: windowStart }
    });

    if (recentEnquiriesCount >= MAX_ENQUIRIES_PER_DAY) {
      res.set('Retry-After', RATE_LIMIT_WINDOW_HOURS * 60 * 60);
      return res.status(429).json({
        success: false,
        message: `You have reached the daily enquiry limit. Please try again after ${RATE_LIMIT_WINDOW_HOURS} hours.`
      });
    }

    // Create new enquiry
    const enquiry = new Enquiry({
      name,
      email,
      phone,
      course,
      qualification: qualification || '',
      experience: experience || '',
      placementRequired: placementRequired || '',
      message: message || ''
    });

    await enquiry.save();

    res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully',
      data: enquiry
    });
  } catch (error) {
    console.error('Error creating enquiry:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error submitting enquiry'
    });
  }
});

// Get all enquiries (admin endpoint)
router.get('/', async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: enquiries.length,
      data: enquiries
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get enquiry by ID
router.get('/:id', async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found'
      });
    }
    res.json({
      success: true,
      data: enquiry
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Update enquiry status (admin endpoint)
router.patch('/:id', async (req, res) => {
  try {
    const { status, notes } = req.body;
    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { status, notes },
      { new: true, runValidators: true }
    );
    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found'
      });
    }
    res.json({
      success: true,
      message: 'Enquiry updated successfully',
      data: enquiry
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Delete enquiry
router.delete('/:id', async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found'
      });
    }
    res.json({
      success: true,
      message: 'Enquiry deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;
