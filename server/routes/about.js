import express from 'express';
import About from '../models/About.js';

const router = express.Router();

// Get about content
router.get('/', async (req, res) => {
  try {
    let about = await About.findOne();
    if (!about) {
      about = new About({
        title: 'About Blizzen Creations',
        heroDescription: 'Welcome to Blizzen Creations',
        missionDescription: 'Our mission is to provide quality education',
        visionDescription: 'Our vision is to create skilled professionals'
      });
      await about.save();
    }
    res.json({ success: true, data: about });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update about content (admin)
router.put('/', async (req, res) => {
  try {
    console.log('Updating about content...');
    console.log('Received heroImage length:', req.body.heroImage?.length || 0);
    console.log('Received heroImage starts with:', req.body.heroImage?.substring(0, 50) || 'empty');
    
    let about = await About.findOne();
    if (!about) {
      about = new About(req.body);
    } else {
      Object.assign(about, req.body);
    }
    await about.save();
    
    console.log('✓ About saved. Saved heroImage length:', about.heroImage?.length || 0);
    res.json({ success: true, message: 'About content updated', data: about });
  } catch (error) {
    console.error('✗ Error updating about:', error);
    res.status(400).json({ success: false, message: error.message });
  }
});

export default router;
