const path   = require('path');
const fs     = require('fs');
const Upload = require('../models/Upload');

/**
 * POST /api/upload
 * Accepts a single image file via Multer,
 * saves metadata to MongoDB, returns public URL
 */
const uploadImage = async (req, res, next) => {
  try {
    // Multer attaches file info to req.file
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file provided',
      });
    }

    const { originalname, filename, mimetype, size } = req.file;

    // Build the public URL that the frontend will use
    const publicUrl = `${req.protocol}://${req.get('host')}/uploads/${filename}`;

    // Save file record to MongoDB
    const upload = await Upload.create({
      originalName: originalname,
      storedName:   filename,
      url:          publicUrl,
      mimeType:     mimetype,
      sizeBytes:    size,
      linkedModel:  req.body.linkedModel || null,
      usedIn:       req.body.usedIn      || 'other',
    });

    res.status(201).json({
      success: true,
      message: 'Image uploaded successfully',
      data: {
        id:  upload._id,
        url: upload.url,
        originalName: upload.originalName,
        sizeBytes:    upload.sizeBytes,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/upload
 * Returns all uploaded image records
 * Supports ?usedIn=hero or ?usedIn=gallery filters
 */
const getAllUploads = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.usedIn) filter.usedIn = req.query.usedIn;

    const uploads = await Upload
      .find(filter)
      .sort({ createdAt: -1 })
      .select('-__v');

    res.status(200).json({
      success: true,
      count:   uploads.length,
      data:    uploads,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/upload/:id
 * Removes image record from MongoDB AND deletes physical file
 */
const deleteUpload = async (req, res, next) => {
  try {
    const upload = await Upload.findById(req.params.id);

    if (!upload) {
      return res.status(404).json({
        success: false,
        message: 'Upload record not found',
      });
    }

    // Build path to the physical file on disk
    const filePath = path.join(
      process.env.UPLOAD_PATH || './uploads',
      upload.storedName
    );

    // Delete file from disk if it exists
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Remove record from MongoDB
    await upload.deleteOne();

    res.status(200).json({
      success: true,
      message: `${upload.originalName} deleted successfully`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { uploadImage, getAllUploads, deleteUpload };