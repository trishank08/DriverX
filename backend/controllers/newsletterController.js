const Newsletter = require('../models/Newsletter');

// POST /api/newsletter/subscribe
const subscribe = async (req, res) => {
  try {
    console.log('📧 Body received:', req.body);

    const { email, firstName, interests, source } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required',
      });
    }

    const existing = await Newsletter.findOne({ email });

    if (existing) {
      if (!existing.isActive) {
        existing.isActive       = true;
        existing.unsubscribedAt = undefined;
        existing.subscribedAt   = new Date();
        if (firstName) existing.firstName = firstName;
        await existing.save();
        return res.status(200).json({
          success: true,
          message: 'Welcome back! You have been resubscribed.',
          data:    { email: existing.email },
        });
      }
      return res.status(200).json({
        success: true,
        message: 'This email is already subscribed.',
        data:    { email: existing.email },
      });
    }

    const subscriber = await Newsletter.create({
      email,
      firstName:  firstName || '',
      interests:  interests || [],
      source:     source    || 'website',
    });

    console.log('✅ Subscribed:', subscriber.email);

    return res.status(201).json({
      success: true,
      message: 'Thank you for subscribing to Regulus.',
      data:    { email: subscriber.email },
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// PATCH /api/newsletter/unsubscribe
const unsubscribe = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required',
      });
    }

    const subscriber = await Newsletter.findOneAndUpdate(
      { email: email.toLowerCase().trim(), isActive: true },
      { isActive: false, unsubscribedAt: new Date() },
      { new: true }
    );

    if (!subscriber) {
      return res.status(404).json({
        success: false,
        message: 'No active subscription found for this email',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'You have been successfully unsubscribed.',
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET /api/newsletter
const getAllSubscribers = async (req, res) => {
  try {
    const filter = {};
    if (req.query.active !== undefined) {
      filter.isActive = req.query.active === 'true';
    }

    const subscribers = await Newsletter
      .find(filter)
      .sort({ subscribedAt: -1 })
      .select('-__v');

    return res.status(200).json({
      success: true,
      count:   subscribers.length,
      data:    subscribers,
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { subscribe, unsubscribe, getAllSubscribers };