const express    = require('express');
const router     = express.Router();
const { body }   = require('express-validator');
const validate   = require('../middleware/validate');
const {
  getAllModels,
  getModelById,
  getFeaturedModels,
  createModel,
  updateModel,
  deleteModel,
} = require('../controllers/modelController');

// ── Public routes ──────────────────────────────────────
// GET /api/models              → All available models
router.get('/', getAllModels);

// GET /api/models/featured     → Homepage featured models
router.get('/featured', getFeaturedModels);

// GET /api/models/:id          → Single model by ID
router.get('/:id', getModelById);

// ── Write routes (add admin auth middleware here later) ─
// POST /api/models             → Create new model
router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('tagline').notEmpty().withMessage('Tagline is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('category')
      .isIn(['saloon', 'coupe', 'convertible', 'suv', 'electric'])
      .withMessage('Invalid category'),
    body('price.base')
      .isNumeric()
      .withMessage('Base price must be a number'),
  ],
  validate,
  createModel
);

// PUT /api/models/:id          → Update a model
router.put('/:id', updateModel);

// DELETE /api/models/:id       → Delete a model
router.delete('/:id', deleteModel);

module.exports = router;