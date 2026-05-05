require('dotenv').config()
const mongoose = require('mongoose')
const WhyChooseUs = require('./models/WhyChooseUs')

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/slyder'

const features = [
  {
    title: '100% Made in India',
    description: 'Proudly manufactured in India with indigenous RFID technology and software solutions.',
    icon: 'Shield',
    color: '#159c48',
    order: 1,
    isActive: true,
  },
  {
    title: 'Industry-First Features',
    description: 'Revolutionary transaction alert system that keeps you informed in real-time.',
    icon: 'Award',
    color: '#f59e0b',
    order: 2,
    isActive: true,
  },
  {
    title: '24/7 Support',
    description: 'Round-the-clock customer service ensuring complete satisfaction and peace of mind.',
    icon: 'Headphones',
    color: '#3b82f6',
    order: 3,
    isActive: true,
  },
  {
    title: 'Advanced Technology',
    description: 'Cutting-edge RFID and Bluetooth technology for seamless access control.',
    icon: 'Zap',
    color: '#8b5cf6',
    order: 4,
    isActive: true,
  },
  {
    title: 'Trusted Nationwide',
    description: 'Leading hotels across India trust Slyder for their security infrastructure.',
    icon: 'Globe',
    color: '#ec4899',
    order: 5,
    isActive: true,
  },
  {
    title: 'Proven Track Record',
    description: 'Over 5 years of excellence in hospitality security solutions.',
    icon: 'TrendingUp',
    color: '#06b6d4',
    order: 6,
    isActive: true,
  },
]

async function seed() {
  try {
    await mongoose.connect(MONGO_URI)
    console.log('Connected to MongoDB')

    // Clear existing data
    await WhyChooseUs.deleteMany({})
    console.log('Cleared existing Why Choose Us features')

    // Insert new data
    await WhyChooseUs.insertMany(features)
    console.log('Seeded Why Choose Us features successfully!')

    process.exit(0)
  } catch (err) {
    console.error('Error seeding data:', err)
    process.exit(1)
  }
}

seed()
