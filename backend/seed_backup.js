// backend/seed.js — run with: node seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const CarModel = require('./models/CarModel');

const seedData = [
  {
    name:        'Spectre',
    tagline:     'The Pinnacle of Electric',
    description: 'The first fully electric super coupé. A monument to effortless performance.',
    category:    'electric',
    specs: {
      horsepower:  577,
      torqueNm:    900,
      zeroToSixty: '4.5s',
      topSpeed:    '155 mph',
      isElectric:  true,
      rangeKm:     520,
    },
    price:      { base: 330000, currency: 'GBP' },
    images: [{
      url: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=1920&q=90',
      alt: 'Regulus Spectre in motion',
      isPrimary: true,
    }],
    isFeatured: true,
    isAvailable: true,
    order: 1,
  },
  {
    name:        'Phantom',
    tagline:     'The Pinnacle',
    description: 'The most desirable object in the world. Supreme in every dimension.',
    category:    'saloon',
    specs: {
      horsepower:  563,
      torqueNm:    900,
      zeroToSixty: '5.3s',
      topSpeed:    '155 mph',
      isElectric:  false,
    },
    price:      { base: 460000, currency: 'GBP' },
    images: [{
      url: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=85',
      alt: 'Regulus Phantom',
      isPrimary: true,
    }],
    isFeatured: true,
    isAvailable: true,
    order: 2,
  },
  {
    name:        'Ghost',
    tagline:     'Post Opulence',
    description: 'The most technologically advanced motor car ever created.',
    category:    'saloon',
    specs: {
      horsepower:  563,
      torqueNm:    850,
      zeroToSixty: '4.8s',
      topSpeed:    '155 mph',
      isElectric:  false,
    },
    price:      { base: 270000, currency: 'GBP' },
    images: [{
      url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=85',
      alt: 'Regulus Ghost',
      isPrimary: true,
    }],
    isFeatured: true,
    isAvailable: true,
    order: 3,
  },
];

const seed = async () => {
  await connectDB();

  // Clear existing data
  await CarModel.deleteMany({});
  console.log('🗑️  Cleared existing car models');

  // Insert seed data
  const inserted = await CarModel.insertMany(seedData);
  console.log(`✅ Seeded ${inserted.length} car models`);

  mongoose.connection.close();
  process.exit(0);
};

seed().catch(err => {
  console.error('Seed failed:', err);
  process.exit(1);
});