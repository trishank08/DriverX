const mongoose = require('mongoose');

/**
 * Schema to track uploaded images in MongoDB
 * Physical files are stored in /uploads directory
 */
const uploadSchema = new mongoose.Schema(
  {
    originalName: {
      type:     String,
      required: true,
    },

    storedName: {
      type:     String,
      required: true,
      unique:   true,  // Multer generates unique filenames
    },

    url: {
      type:     String,
      required: true,  // Public URL to serve to frontend
    },

    mimeType: {
      type: String,
      enum: ['image/jpeg', 'image/png', 'image/webp', 'image/avif'],
    },

    sizeBytes: {
      type: Number,
    },

    // Optional: which car model this image belongs to
    linkedModel: {
      type: mongoose.Schema.Types.ObjectId,
      ref:  'CarModel',
      default: null,
    },

    usedIn: {
      type:    String,
      enum:    ['hero', 'gallery', 'model-card', 'bespoke', 'other'],
      default: 'other',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Upload', uploadSchema);