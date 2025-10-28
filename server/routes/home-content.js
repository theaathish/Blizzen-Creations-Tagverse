import express from 'express';
import HomeContent from '../models/HomeContent.js';

const router = express.Router();

// Get home content
router.get('/', async (req, res) => {
  try {
    let homeContent = await HomeContent.findOne();
    if (!homeContent) {
      homeContent = new HomeContent({
        heroTitle: 'Launch Your IT Career',
        heroDescription: 'Start your journey with us'
      });
      await homeContent.save();
    }
    res.json({ success: true, data: homeContent });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update home content (admin)
router.put('/', async (req, res) => {
  try {
    let homeContent = await HomeContent.findOne();
    if (!homeContent) {
      homeContent = new HomeContent(req.body);
    } else {
      Object.assign(homeContent, req.body);
    }
    await homeContent.save();
    res.json({ success: true, message: 'Home content updated', data: homeContent });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

export default router;
