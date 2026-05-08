const CarModel = require('../models/CarModel');

/**
 * GET /api/models
 * Returns all available car models, sorted by order field
 */
const getAllModels = async (req, res, next) => {
  try {
    // Support optional category filter: /api/models?category=electric
    const filter = { isAvailable: true };
    if (req.query.category) filter.category = req.query.category;

    const models = await CarModel
      .find(filter)
      .sort({ order: 1, createdAt: -1 })
      .select('-__v');  // Hide Mongoose version key

    res.status(200).json({
      success: true,
      count:   models.length,
      data:    models,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/models/featured
 * Returns only models marked as featured (for homepage grid)
 */
const getFeaturedModels = async (req, res, next) => {
  try {
    const models = await CarModel
      .find({ isFeatured: true, isAvailable: true })
      .sort({ order: 1 })
      .select('name tagline category price images isFeatured');

    res.status(200).json({
      success: true,
      count:   models.length,
      data:    models,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/models/:id
 * Returns a single car model by its MongoDB _id
 */
const getModelById = async (req, res, next) => {
  try {
    const model = await CarModel
      .findById(req.params.id)
      .select('-__v');

    if (!model) {
      return res.status(404).json({
        success: false,
        message: 'Car model not found',
      });
    }

    res.status(200).json({
      success: true,
      data:    model,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/models
 * Creates a new car model document
 */
const createModel = async (req, res, next) => {
  try {
    const model = await CarModel.create(req.body);

    res.status(201).json({
      success: true,
      message: `${model.name} created successfully`,
      data:    model,
    });
  } catch (error) {
    // Mongoose duplicate key error (unique name)
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'A model with this name already exists',
      });
    }
    next(error);
  }
};

/**
 * PUT /api/models/:id
 * Updates an existing car model by ID
 */
const updateModel = async (req, res, next) => {
  try {
    const model = await CarModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new:          true,   // Return updated document
        runValidators: true,  // Re-run schema validators on update
      }
    );

    if (!model) {
      return res.status(404).json({
        success: false,
        message: 'Car model not found',
      });
    }

    res.status(200).json({
      success: true,
      message: `${model.name} updated successfully`,
      data:    model,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/models/:id
 * Removes a car model from the database
 */
const deleteModel = async (req, res, next) => {
  try {
    const model = await CarModel.findByIdAndDelete(req.params.id);

    if (!model) {
      return res.status(404).json({
        success: false,
        message: 'Car model not found',
      });
    }

    res.status(200).json({
      success: true,
      message: `${model.name} deleted successfully`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllModels,
  getFeaturedModels,
  getModelById,
  createModel,
  updateModel,
  deleteModel,
};