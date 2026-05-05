require('dotenv').config()
const mongoose = require('mongoose')
const Blog = require('./models/Blog')

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/slyder'

const blogs = [
  {
    title: '10 Benefits of Smart Hotel Locks for Modern Hospitality',
    slug: '10-benefits-of-smart-hotel-locks',
    shortDescription: 'Discover how smart hotel locks enhance security, improve guest experience, and streamline operations in the modern hospitality industry.',
    content: `Smart hotel locks have revolutionized the hospitality industry, offering numerous advantages over traditional key-based systems. Here are the top 10 benefits:

1. Enhanced Security: Smart locks provide advanced encryption and real-time monitoring, significantly reducing the risk of unauthorized access.

2. Improved Guest Experience: Guests can use RFID cards or mobile apps for seamless check-in and room access, eliminating the hassle of physical keys.

3. Remote Management: Hotel staff can manage all locks remotely, making it easy to grant or revoke access instantly.

4. Audit Trail: Every access event is logged, providing a complete audit trail for security and compliance purposes.

5. Energy Savings: Integration with power-saving switches helps reduce electricity costs by automatically controlling room power based on occupancy.

6. Reduced Maintenance: Smart locks require less maintenance compared to traditional mechanical locks, saving time and money.

7. Flexible Access Control: Easily set time-based access permissions for guests, staff, and service personnel.

8. Integration Capabilities: Smart locks can integrate with property management systems (PMS) for streamlined operations.

9. Contactless Technology: In the post-pandemic era, contactless access has become essential for guest safety and comfort.

10. Made in India: Slyder's 100% indigenous technology supports local manufacturing and ensures reliable after-sales support.

Investing in smart hotel locks is not just about security—it's about creating a modern, efficient, and guest-friendly hospitality experience.`,
    image: 'sample-blog-1.jpg',
    category: 'Technology',
    author: 'Slyder Team',
    tags: ['smart locks', 'hotel security', 'RFID', 'hospitality technology'],
    isActive: true,
    isFeatured: true,
  },
  {
    title: 'Understanding RFID Technology in Hotel Lock Systems',
    slug: 'understanding-rfid-technology-hotel-locks',
    shortDescription: 'Learn how RFID technology works in hotel lock systems and why it\'s the preferred choice for modern hotels.',
    content: `RFID (Radio-Frequency Identification) technology has become the standard for hotel lock systems worldwide. But what makes it so special?

How RFID Works:
RFID uses electromagnetic fields to automatically identify and track tags attached to objects. In hotel locks, RFID cards contain a chip and antenna that communicate with the lock reader when brought close to it.

Key Advantages:
- Contactless Operation: No physical contact needed, reducing wear and tear
- Fast Access: Instant authentication in milliseconds
- Secure Encryption: Advanced encryption prevents cloning and unauthorized access
- Durability: RFID cards last longer than magnetic stripe cards
- Cost-Effective: Lower replacement costs and maintenance

Slyder's RFID Solution:
Our 100% Made in India RFID readers are designed specifically for the Indian hospitality market, offering:
- Wide card compatibility
- Robust performance in various environmental conditions
- Easy integration with existing systems
- Local support and service

The future of hotel security is here, and it's powered by RFID technology.`,
    image: 'sample-blog-2.jpg',
    category: 'Technology',
    author: 'Slyder Team',
    tags: ['RFID', 'technology', 'hotel locks', 'security'],
    isActive: true,
    isFeatured: false,
  },
  {
    title: 'Why Indian Hotels Are Choosing Indigenous Lock Systems',
    slug: 'indian-hotels-choosing-indigenous-lock-systems',
    shortDescription: 'Explore why more Indian hotels are opting for locally manufactured lock systems and the benefits of choosing Made in India solutions.',
    content: `The Indian hospitality industry is witnessing a significant shift towards indigenous technology solutions, and hotel lock systems are no exception.

Reasons for the Shift:

1. Local Support: Immediate technical support and faster response times
2. Cost-Effective: Reduced import costs and better pricing
3. Customization: Solutions tailored for Indian market needs
4. Quality Assurance: Stringent quality control and testing
5. National Pride: Supporting Make in India initiative

Slyder's Contribution:
As a 100% Made in India brand, Slyder has been at the forefront of this revolution, offering:
- Indigenous RFID technology
- Locally developed software solutions
- 24/7 customer support
- Competitive pricing
- Industry-first features like transaction alerts

Success Stories:
Leading hotel chains across India have successfully implemented Slyder systems, reporting improved security, reduced operational costs, and enhanced guest satisfaction.

The future of Indian hospitality is being built with Indian technology, and Slyder is proud to be part of this journey.`,
    image: 'sample-blog-3.jpg',
    category: 'Industry News',
    author: 'Slyder Team',
    tags: ['Made in India', 'Indian hotels', 'indigenous technology', 'hospitality'],
    isActive: true,
    isFeatured: false,
  },
]

async function seed() {
  try {
    await mongoose.connect(MONGO_URI)
    console.log('Connected to MongoDB')

    // Clear existing data
    await Blog.deleteMany({})
    console.log('Cleared existing blogs')

    // Insert new data
    await Blog.insertMany(blogs)
    console.log('Seeded blogs successfully!')
    console.log('Note: You need to manually add images to backend/uploads/blogs/ folder')
    console.log('Required images: sample-blog-1.jpg, sample-blog-2.jpg, sample-blog-3.jpg')

    process.exit(0)
  } catch (err) {
    console.error('Error seeding data:', err)
    process.exit(1)
  }
}

seed()
