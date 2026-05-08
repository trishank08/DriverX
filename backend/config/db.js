// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  // Fallback to local MongoDB if env var missing
  const uri = process.env.MONGO_URI ;

  if (!process.env.MONGO_URI) {
    console.warn('⚠️  MONGO_URI not found in .env — using local fallback');
  }

  try {
    const conn = await mongoose.connect(uri);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;