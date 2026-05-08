/**
 * Global error handler — must be the LAST middleware in server.js
 * Catches anything passed via next(error) in controllers
 */
const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${err.message}`);

  // Mongoose bad ObjectId (e.g. /api/models/not-valid-id)
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: 'Invalid ID format',
    });
  }

  // Mongoose validation error (schema constraint failed)
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({
      success: false,
      message: messages.join(', '),
    });
  }

  // Multer file size exceeded
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({
      success: false,
      message: `File too large. Maximum size is ${process.env.MAX_FILE_SIZE_MB || 5}MB`,
    });
  }

  // Multer wrong file type (from fileFilter callback)
  if (err.message && err.message.includes('Only')) {
    return res.status(415).json({
      success: false,
      message: err.message,
    });
  }

  // Default server error
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
};

module.exports = errorHandler;