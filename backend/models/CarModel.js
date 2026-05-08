const mongoose = require('mongoose');

/**
 * Schema for a Regulus motor car model
 * Stores all display data served to the frontend
 */
const carModelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Model name is required'],
      trim: true,
      unique: true,
      maxlength: [80, 'Name cannot exceed 80 characters'],
    },

    tagline: {
      type: String,
      required: [true, 'Tagline is required'],
      trim: true,
      maxlength: [120, 'Tagline cannot exceed 120 characters'],
    },

    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },

    category: {
      type: String,
      enum: ['saloon', 'coupe', 'convertible', 'suv', 'electric'],
      required: [true, 'Category is required'],
    },

    specs: {
      horsepower:   { type: Number },
      torqueNm:     { type: Number },
      zeroToSixty:  { type: String },  // e.g. "4.5s"
      topSpeed:     { type: String },  // e.g. "250 mph"
      isElectric:   { type: Boolean, default: false },
      rangeKm:      { type: Number },  // Only for electric models
    },

    price: {
      base:     { type: Number, required: [true, 'Base price is required'] },
      currency: { type: String, default: 'GBP' },
    },

    images: [
      {
        url:     { type: String, required: true },
        alt:     { type: String, default: '' },
        isPrimary: { type: Boolean, default: false },
      },
    ],

    isAvailable: {
      type: Boolean,
      default: true,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    order: {
      type: Number,
      default: 0,  // Controls display order on frontend
    },
  },
  {
    timestamps: true,  // Adds createdAt and updatedAt automatically
  }
);

// Index for fast featured/available queries
carModelSchema.index({ isFeatured: 1, isAvailable: 1 });
carModelSchema.index({ order: 1 });

module.exports = mongoose.model('CarModel', carModelSchema);