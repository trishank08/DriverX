// A focused 30-car catalogue: two recognisable models from every supported make.
const carGroups = [
  ['Maruti Suzuki', ['Swift', 'Grand Vitara']],
  ['Hyundai', ['i20', 'Creta']],
  ['Tata', ['Punch', 'Nexon']],
  ['Mahindra', ['XUV 3XO', 'Thar Roxx']],
  ['Kia', ['Sonet', 'Seltos']],
  ['Toyota', ['Glanza', 'Fortuner']],
  ['Honda', ['Amaze', 'City']],
  ['Skoda', ['Slavia', 'Kushaq']],
  ['Volkswagen', ['Virtus', 'Taigun']],
  ['MG', ['Comet EV', 'Hector']],
  ['BMW', ['X1 xDrive', '3 Series']],
  ['Mercedes-Benz', ['C-Class', 'E-Class']],
  ['Audi', ['A4', 'Q5']],
  ['Renault', ['Kwid', 'Kiger']],
  ['Nissan', ['Magnite', 'X-Trail']],
]

// Real automotive photographs used when an exact make/model image is unavailable.
const catalogPhotos = [
  'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1200&q=85',
  'https://images.pexels.com/photos/3156482/pexels-photo-3156482.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/33799851/pexels-photo-33799851.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/30287502/pexels-photo-30287502.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/30867687/pexels-photo-30867687.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/28984485/pexels-photo-28984485.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/17544887/pexels-photo-17544887.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/16896042/pexels-photo-16896042.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/18509923/pexels-photo-18509923.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/37170167/pexels-photo-37170167.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/31732759/pexels-photo-31732759.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/919073/pexels-photo-919073.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/3311574/pexels-photo-3311574.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=85',
]

export const emergencyCarPhoto = catalogPhotos[0]

const accents = ['#B8D7FF', '#F9C5B7', '#CDEFC7', '#E2E5E8', '#E9D5B7', '#C7D6EC', '#D2D8D0', '#F5D9B7', '#E2D4F6', '#D2E6E0']
const basePrices = [650000, 750000, 700000, 900000, 850000, 900000, 800000, 1100000, 850000, 750000, 4200000, 4500000, 4300000, 500000, 650000]
const priceSteps = [350000, 450000, 350000, 700000, 500000, 2500000, 450000, 400000, 450000, 700000, 800000, 900000, 1200000, 300000, 2500000]

const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
const electricName = (name) => /\bev\b|electric|comet/i.test(name)
const bodyType = (name) => {
  if (/fortuner|x-trail|grand vitara|creta|nexon|xuv|thar|seltos|kushaq|taigun|hector|x1|q5/i.test(name)) return 'SUV'
  if (/swift|i20|punch|glanza|kwid|magnite|comet/i.test(name)) return 'Hatchback'
  return 'Sedan'
}

const featurePacks = [
  ['6 airbags', 'Wireless Android Auto & Apple CarPlay', 'Rear parking camera', 'Automatic climate control'],
  ['Panoramic sunroof', 'Ventilated front seats', '360° camera', 'Connected car technology'],
  ['LED headlamps', 'Digital driver display', 'Cruise control', 'Tyre pressure monitoring'],
  ['Premium audio system', 'Wireless charger', 'Rear AC vents', 'Keyless entry'],
]

const sourceCars = carGroups.flatMap(([brand, models], brandIndex) => models.map((model, modelIndex) => {
  const index = brandIndex * 2 + modelIndex
  const imageIndex = index % catalogPhotos.length
  const electric = electricName(model)
  const type = bodyType(model)
  const fallbackImage = catalogPhotos[imageIndex]
  // Every card starts with a different direct car photograph. BMW X1 keeps the
  // photo selected for the homepage hero.
  const photo = fallbackImage
  const gallery = [
    photo,
    catalogPhotos[(imageIndex + 10) % catalogPhotos.length],
    catalogPhotos[(imageIndex + 20) % catalogPhotos.length],
  ]
  const galleryFallbacks = [
    fallbackImage,
    catalogPhotos[(imageIndex + 10) % catalogPhotos.length],
    catalogPhotos[(imageIndex + 20) % catalogPhotos.length],
  ]
  const price = basePrices[brandIndex] + priceSteps[brandIndex] * modelIndex
  return {
    id: `${slugify(brand)}-${slugify(model)}`,
    brand,
    model,
    type,
    fuel: electric ? 'Electric' : modelIndex ? 'Petrol' : 'Petrol / Diesel',
    price,
    year: 2025,
    mileage: electric ? `${360 + (index % 4) * 35} km range` : `${(14.2 + (index % 6) * 1.1).toFixed(1)} km/l`,
    power: `${110 + (index % 9) * 20} hp`,
    rating: Number((4.3 + (index % 6) * 0.1).toFixed(1)),
    image: photo,
    fallbackImage,
    gallery,
    galleryFallbacks,
    accent: accents[index % accents.length],
    trending: false,
    overview: `The ${brand} ${model} balances everyday comfort, confident performance and useful modern technology.`,
    features: electric ? ['Fast charging support', 'Regenerative braking', 'Connected car technology', 'Digital driver display'] : featurePacks[index % featurePacks.length],
    specs: {
      engine: electric ? `${35 + (index % 4) * 8}.0 kWh` : `${1199 + (index % 6) * 250} cc`,
      transmission: modelIndex ? 'Automatic' : 'Manual / Automatic',
      seats: /thar|fortuner|x-trail/i.test(model) ? '5 / 7' : '5',
      drive: type === 'SUV' ? 'FWD / AWD' : 'FWD',
    },
  }
}))

// Interleave brands, so the first cards immediately show a broad selection.
const cars = [
  ...sourceCars.filter((_, index) => index % 2 === 0),
  ...sourceCars.filter((_, index) => index % 2 === 1),
].map((car, index) => ({ ...car, trending: index < 4 }))

export const formatPrice = (value) => {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(value % 10000000 ? 1 : 0)} Cr`
  return `₹${(value / 100000).toFixed(value % 100000 ? 1 : 0)}L`
}

export const fallbackCars = cars
