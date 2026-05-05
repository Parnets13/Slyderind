require('dotenv').config()
const mongoose = require('mongoose')
const FAQ = require('./models/FAQ')

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/slyder'

const faqs = [
  {
    question: 'What is Slyder hotel lock system?',
    answer: 'Slyder is a 100% Made in India hotel lock system featuring advanced RFID and Bluetooth technology. It provides secure, reliable access control for hotels with indigenous software and hardware solutions.',
    category: 'General',
    order: 1,
    isActive: true,
  },
  {
    question: 'What makes Slyder different from other hotel lock systems?',
    answer: 'Slyder is proudly manufactured in India with indigenous RFID technology. We offer industry-first transaction alert features, 24/7 support, and cloud-based management software. Our systems are trusted by leading hotels across India.',
    category: 'General',
    order: 2,
    isActive: true,
  },
  {
    question: 'What products does Slyder offer?',
    answer: 'Slyder offers a complete range of hotel security solutions including Hotel Locks, RFID Readers, Lock Management Software, Encoders, Key Cylinders, Power Saving Switches, DND Electronic Panels, and Door Accessories.',
    category: 'Products',
    order: 3,
    isActive: true,
  },
  {
    question: 'How does the transaction alert feature work?',
    answer: 'Our industry-first transaction alert system sends real-time notifications for every access event. This allows hotel management to monitor room access instantly and maintain complete security oversight.',
    category: 'Technical',
    order: 4,
    isActive: true,
  },
  {
    question: 'Is installation support provided?',
    answer: 'Yes, we provide complete installation support and training. Our technical team assists with setup, configuration, and staff training to ensure smooth implementation of the Slyder system.',
    category: 'Installation',
    order: 5,
    isActive: true,
  },
  {
    question: 'What kind of support do you offer?',
    answer: 'We offer 24/7 customer support to all our clients. Our dedicated support team is available round-the-clock to assist with any technical issues, queries, or maintenance requirements.',
    category: 'Support',
    order: 6,
    isActive: true,
  },
  {
    question: 'How can I become a Slyder distributor?',
    answer: 'You can apply to become a distributor through our "Become Distributor" page. Fill out the application form with your details, and our team will review your application and get in touch with you.',
    category: 'Distributor',
    order: 7,
    isActive: true,
  },
  {
    question: 'What is the warranty period for Slyder products?',
    answer: 'Slyder products come with a comprehensive warranty. The specific warranty period varies by product. Please contact our sales team for detailed warranty information for specific products.',
    category: 'Products',
    order: 8,
    isActive: true,
  },
  {
    question: 'Can the system integrate with existing hotel management software?',
    answer: 'Yes, Slyder lock management software is designed to integrate seamlessly with most popular hotel management systems (PMS). Our technical team can assist with integration setup.',
    category: 'Technical',
    order: 9,
    isActive: true,
  },
  {
    question: 'What types of cards are supported?',
    answer: 'Slyder systems support a wide range of RFID cards including Mifare, EM, and other standard hotel key card formats. Our encoders are compatible with all major card types.',
    category: 'Technical',
    order: 10,
    isActive: true,
  },
]

async function seed() {
  try {
    await mongoose.connect(MONGO_URI)
    console.log('Connected to MongoDB')

    // Clear existing data
    await FAQ.deleteMany({})
    console.log('Cleared existing FAQs')

    // Insert new data
    await FAQ.insertMany(faqs)
    console.log('Seeded FAQs successfully!')

    process.exit(0)
  } catch (err) {
    console.error('Error seeding data:', err)
    process.exit(1)
  }
}

seed()
