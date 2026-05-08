const express = require('express');
const router  = express.Router();
const {
  subscribe,
  unsubscribe,
  getAllSubscribers,
} = require('../controllers/newsletterController');

// POST /api/newsletter/subscribe
router.post('/subscribe', subscribe);

// PATCH /api/newsletter/unsubscribe
router.patch('/unsubscribe', unsubscribe);

// GET /api/newsletter
router.get('/', getAllSubscribers);

module.exports = router;