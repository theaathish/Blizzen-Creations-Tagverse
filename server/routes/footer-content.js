import express from 'express';
import FooterContent from '../models/FooterContent.js';

const router = express.Router();

// Get footer content
router.get('/', async (req, res) => {
  try {
    let footerContent = await FooterContent.findOne();
    
    // If no footer content exists, create default
    if (!footerContent) {
      footerContent = new FooterContent({
        description: "Blizzen Creations is a premier IT training and placement institute dedicated to empowering students with cutting-edge skills and real-world experience.",
        socialLinks: [
          { name: 'Facebook', url: 'https://facebook.com/blizzencreations', icon: 'Facebook', isActive: true },
          { name: 'Instagram', url: 'https://instagram.com/blizzencreations', icon: 'Instagram', isActive: true },
          { name: 'LinkedIn', url: 'https://linkedin.com/company/blizzencreations', icon: 'Linkedin', isActive: true },
          { name: 'YouTube', url: 'https://youtube.com/@blizzencreations', icon: 'Youtube', isActive: true }
        ],
        quickLinks: [
          { label: 'About Us', path: '/about', isActive: true },
          { label: 'Courses', path: '/courses', isActive: true },
          { label: 'Placements', path: '/placements', isActive: true },
          { label: 'Contact', path: '/contact', isActive: true }
        ],
        showSocialLinks: true,
        showQuickLinks: true,
        copyright: "© 2024 Blizzen Creations. All rights reserved."
      });
      await footerContent.save();
    }
    
    res.json(footerContent);
  } catch (error) {
    console.error('Error fetching footer content:', error);
    res.status(500).json({ message: 'Error fetching footer content', error: error.message });
  }
});

// Update footer content
router.post('/', async (req, res) => {
  try {
    const footerData = req.body;
    
    // Validate data
    if (!footerData.description || footerData.description.trim() === '') {
      return res.status(400).json({ message: 'Description is required' });
    }
    
    // Validate social links
    if (footerData.socialLinks) {
      for (const link of footerData.socialLinks) {
        if (!link.name || !link.url || !link.icon) {
          return res.status(400).json({ message: 'All social links must have name, url, and icon' });
        }
      }
    }
    
    // Validate quick links
    if (footerData.quickLinks) {
      for (const link of footerData.quickLinks) {
        if (!link.label || !link.path) {
          return res.status(400).json({ message: 'All quick links must have label and path' });
        }
      }
    }
    
    // Update or create footer content
    let footerContent = await FooterContent.findOne();
    
    if (footerContent) {
      // Update existing
      Object.assign(footerContent, footerData);
      footerContent.updatedAt = new Date();
    } else {
      // Create new
      footerContent = new FooterContent(footerData);
    }
    
    await footerContent.save();
    res.json({ message: 'Footer content updated successfully', data: footerContent });
  } catch (error) {
    console.error('Error updating footer content:', error);
    res.status(500).json({ message: 'Error updating footer content', error: error.message });
  }
});

export default router;
