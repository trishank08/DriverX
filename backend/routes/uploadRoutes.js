const express  = require('express');
const router   = express.Router();
const multer   = require('multer');
const path     = require('path');
const {
  uploadImage,
  getAllUploads,
  deleteUpload,
} = require('../controllers/uploadController');

// ── Multer storage config ───────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Save files to the /uploads directory
    cb(null, process.env.UPLOAD_PATH || './uploads');
  },

  filename: (req, file, cb) => {
    // Format: fieldname-timestamp.ext  e.g. image-1718000000000.jpg
    const uniqueSuffix = Date.now();
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

// ── File filter — images only ───────────────────────────
const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];

  if (allowed.includes(file.mimetype)) {
    cb(null, true);   // Accept
  } else {
    cb(new Error('Only JPEG, PNG, WebP, and AVIF images are allowed'), false);
  }
};

// ── Multer instance ─────────────────────────────────────
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: (parseInt(process.env.MAX_FILE_SIZE_MB) || 5) * 1024 * 1024,
  },
});

// ── Routes ──────────────────────────────────────────────
// POST /api/upload             → Upload single image
router.post('/', upload.single('image'), uploadImage);

// GET  /api/upload             → List all uploaded images
router.get('/', getAllUploads);

// DELETE /api/upload/:id       → Remove an uploaded image
router.delete('/:id', deleteUpload);

module.exports = router;