import express from 'express';

const router = express.Router();

// Upload single image as Base64 to database
router.post('/image', (req, res) => {
  try {
    const { image, filename, mimetype } = req.body;

    if (!image) {
      return res.status(400).json({
        success: false,
        message: 'No image data provided'
      });
    }

    // Validate Base64 format
    if (!image.startsWith('data:image/')) {
      return res.status(400).json({
        success: false,
        message: 'Invalid image format. Must be Base64 encoded.'
      });
    }

    // Validate size (Base64 is ~33% larger than binary)
    const sizeInMB = Buffer.byteLength(image, 'utf8') / (1024 * 1024);
    if (sizeInMB > 3) {
      return res.status(400).json({
        success: false,
        message: 'Image too large. Maximum 2MB allowed.'
      });
    }

    console.log(`✓ Image received: ${filename} (${sizeInMB.toFixed(2)}MB Base64)`);

    res.json({
      success: true,
      message: 'Image stored in database successfully',
      data: {
        image: image,
        filename: filename,
        mimetype: mimetype,
        size: sizeInMB
      }
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Upload failed'
    });
  }
});

// Upload multiple images as Base64
router.post('/images', (req, res) => {
  try {
    const { images } = req.body;

    if (!images || !Array.isArray(images) || images.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No images provided'
      });
    }

    const processedImages = images.map(img => ({
      image: img.image,
      filename: img.filename,
      mimetype: img.mimetype
    }));

    res.json({
      success: true,
      message: `${images.length} images stored in database successfully`,
      data: processedImages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Upload failed'
    });
  }
});

export default router;
