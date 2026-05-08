require('dotenv').config({ path: require('path').resolve(__dirname, '.env'), override: true });
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const CarModel = require('./models/CarModel');
const Newsletter = require('./models/Newsletter');

const seedData = [
  {
    name:        'OBSIDIAN',
    tagline:     'Aventador',
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
    price:       { base: 330000, currency: 'GBP' },
    images: [{
      url:       'https://wallpapercave.com/wp/wp8703088.jpg',
      alt:       ' DriveX OBSIDIAN',
      isPrimary: true,
    }],
    isFeatured:  true,
    isAvailable: true,
    order:       1,
  },
  {
    name:        'Lamborghini',
    tagline:     'urus',
    description: 'The most desirable object in the world. Supreme in every dimension.',
    category:    'saloon',
    specs: {
      horsepower:  563,
      torqueNm:    900,
      zeroToSixty: '5.3s',
      topSpeed:    '155 mph',
      isElectric:  false,
    },
    price:       { base: 460000, currency: 'GBP' },
    images: [{
      url:       'https://cdn.motor1.com/images/mgl/g4MGgN/s1/lamborghini-urus-se.jpg',
      alt:       'DriveX Lamborghini',
      isPrimary: true,
    }],
    isFeatured:  true,
    isAvailable: true,
    order:       2,
  },
  {
    name:        'Lamborghini Huracán',
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
    price:       { base: 270000, currency: 'GBP' },
    images: [{
      url:       'https://wallpapercave.com/wp/wp6631940.jpg',
      alt:       'DriveX Lamborghini',
      isPrimary: true,
    }],
    isFeatured:  true,
    isAvailable: true,
    order:       3,
  },
  

  {
    name:        'Audi R8',
    tagline:     'Effortless Everywhere',
    description: 'The first super-luxury SUV. Commanding. Effortless. Everywhere.',
    category:    'suv',
    specs: {
      horsepower:  563,
      torqueNm:    850,
      zeroToSixty: '5.2s',
      topSpeed:    '155 mph',
      isElectric:  false,
    },
    price:       { base: 330000, currency: 'GBP' },
    images: [{
      url:       'https://4kwallpapers.com/images/walls/thumbs_2t/22101.jpg',
      alt:       'DriveX Audi ',
      isPrimary: true,
    }],
    isFeatured:  false,
    isAvailable: true,
    order:       4,
  },
];

const seed = async () => {
  try {
    await connectDB();

    // Clear existing data
    await CarModel.deleteMany({});
    await Newsletter.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Insert car models
    const inserted = await CarModel.insertMany(seedData);
    console.log(`✅ Seeded ${inserted.length} car models`);

    // Insert test newsletter subscriber
    await Newsletter.create({
      email:     'test@regulus.com',
      firstName: 'Test',
      interests: ['models', 'bespoke'],
      source:    'seed',
    });
    console.log('✅ Seeded 1 newsletter subscriber');

    console.log('\n🎉 Database seeded successfully!\n');
    process.exit(0);

  } catch (err) {
    console.error('❌ Seed failed:', err.message);
    process.exit(1);
  }
};

seed();