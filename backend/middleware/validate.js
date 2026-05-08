const { validationResult } = require('express-validator');

/**
 * Runs after express-validator checks in a route.
 * If errors exist, returns 422 with all field errors.
 * If clean, passes control to the controller.
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: 'Validation failed',
      errors:  errors.array().map(err => ({
        field:   err.path,
        message: err.msg,
      })),
    });
  }

  next();
};

module.exports = validate;