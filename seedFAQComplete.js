require('dotenv').config();
const mongoose = require('mongoose');
const FAQ = require('./models/FAQ');

const faqs = [
  {
    question: "What smart locking and hotel automation solutions do you offer?",
    answer: "We offer a complete range of solutions including RFID smart locks, biometric locks, hotel power saving switches, DND and MMR signages, and centralized lock management software. These systems are designed for hotels, hostels, PGs, commercial spaces, and residential use, providing secure and efficient access control.",
    category: "General",
    order: 1
  },
  {
    question: "What makes your RFID locks different from other brands in India?",
    answer: "Our RFID locks are built using readers designed and manufactured in India, unlike most brands that rely on imported components. This allows better performance, deeper integration with our software, and more reliable long-term support tailored to Indian conditions.",
    category: "Products",
    order: 2
  },
  {
    question: "Do you manufacture RFID readers in India?",
    answer: "Yes, we design and manufacture our own RFID readers in India. This gives us complete control over quality, customization, and compatibility, ensuring better performance compared to imported alternatives.",
    category: "Products",
    order: 3
  },
  {
    question: "Do your smart locks come with in-house developed software?",
    answer: "Yes, our locking systems are supported by proprietary software developed in India. This software is built specifically for local business needs and offers advanced features such as access tracking, user management, and operational alerts.",
    category: "Technical",
    order: 4
  },
  {
    question: "How is your software different from imported lock systems?",
    answer: "Unlike imported systems that rely on generic software, our in-house platform is designed for flexibility and customization. It integrates seamlessly with our hardware and includes features such as transaction alerts, better access control, and improved usability for Indian businesses.",
    category: "Technical",
    order: 5
  },
  {
    question: "Do your systems support SMS or transaction alerts?",
    answer: "Yes, our system supports transaction-based alerts such as SMS notifications. This allows property owners to monitor access activity in real time, improving both security and operational control.",
    category: "Technical",
    order: 6
  },
  {
    question: "What is an RFID smart lock and how does it work?",
    answer: "An RFID smart lock is a keyless system that uses radio frequency identification to grant access through cards or tags. When a valid credential is presented, the lock verifies it and unlocks instantly, making it ideal for hotels and commercial spaces.",
    category: "Products",
    order: 7
  },
  {
    question: "Are RFID locks suitable for hotels, hostels, and PGs?",
    answer: "Yes, RFID locks are widely used in hotels, hostels, and PGs as they simplify access management for multiple users. They allow quick issuance and cancellation of access cards while improving operational efficiency.",
    category: "Products",
    order: 8
  },
  {
    question: "RFID locks vs biometric locks: which is better for hotels?",
    answer: "RFID locks are generally preferred for hotels due to faster check-ins and ease of use, while biometric locks are better suited for restricted access areas or residential use. The choice depends on operational needs and user convenience.",
    category: "Products",
    order: 9
  },
  {
    question: "Which smart lock system is best for hotels in India?",
    answer: "The best smart lock system for hotels in India should offer reliable hardware, easy card management, strong software support, and local service. Systems designed and manufactured locally often provide better customization and long-term reliability.",
    category: "General",
    order: 10
  },
  {
    question: "What problems do hotels face with traditional locks?",
    answer: "Traditional locks create issues such as key loss, duplication risks, and difficulty in managing multiple rooms. They also lack tracking capabilities, making it harder to monitor access and maintain security.",
    category: "General",
    order: 11
  },
  {
    question: "How do RFID locks improve hotel operations?",
    answer: "RFID locks streamline operations by enabling quick check-ins, easy room access, and centralized control. They reduce manual effort, eliminate key management issues, and improve overall efficiency for hotel staff.",
    category: "Products",
    order: 12
  },
  {
    question: "What are common issues with imported lock systems?",
    answer: "Imported lock systems may have limitations such as lack of customization, slower support, and dependency on external software. They may also not be fully optimized for local operational requirements, leading to inefficiencies over time.",
    category: "General",
    order: 13
  },
  {
    question: "Why is Made-in-India smart lock hardware beneficial?",
    answer: "Made-in-India hardware offers better support, faster service, and improved compatibility with local conditions. It also allows greater customization and reduces dependency on imported components, ensuring long-term reliability.",
    category: "Products",
    order: 14
  },
  {
    question: "What is a biometric lock and where can it be used?",
    answer: "A biometric lock uses fingerprint or biometric authentication for access. It is suitable for both residential and commercial spaces, providing high security and convenience for controlled environments.",
    category: "Products",
    order: 15
  },
  {
    question: "What is a hotel power saving switch?",
    answer: "A power saving switch controls electricity in hotel rooms by activating power only when a card is inserted. This helps reduce energy consumption and operational costs by ensuring power is not used when rooms are unoccupied.",
    category: "Products",
    order: 16
  },
  {
    question: "What are DND and MMR signages in hotels?",
    answer: "DND (Do Not Disturb) and MMR (Make My Room) signages are electronic indicators placed outside rooms. They allow guests to communicate with housekeeping staff without interruption, improving guest experience and service efficiency.",
    category: "Products",
    order: 17
  },
  {
    question: "Do your locks work without internet?",
    answer: "Yes, most of our locks operate offline and do not require internet connectivity for daily usage. Internet is only needed for advanced features like centralized monitoring or remote access.",
    category: "Technical",
    order: 18
  },
  {
    question: "What happens if an RFID card is lost?",
    answer: "If a card is lost, it can be instantly deactivated through the system, preventing unauthorized access. A new card can be issued without replacing the lock, ensuring convenience and security.",
    category: "Technical",
    order: 19
  },
  {
    question: "Can your systems be installed on existing properties?",
    answer: "Yes, our solutions are designed for both new installations and retrofitting existing properties. They are compatible with standard doors and require minimal modifications.",
    category: "General",
    order: 20
  },
  {
    question: "Do your locks require wiring?",
    answer: "Most of our locks are battery-operated and do not require complex wiring. This makes installation quick and suitable for a wide range of properties.",
    category: "Technical",
    order: 21
  },
  {
    question: "What happens during a power failure?",
    answer: "Our locks continue to function during power outages as they are powered by internal batteries. Backup options and alerts ensure uninterrupted operation.",
    category: "Technical",
    order: 22
  },
  {
    question: "Are smart locks a good investment for hotels and commercial spaces?",
    answer: "Smart locks improve efficiency, enhance security, and provide better user experience. They reduce operational challenges and offer scalable solutions, making them a valuable long-term investment.",
    category: "General",
    order: 23
  },
  {
    question: "How do your solutions help improve security and control?",
    answer: "Our integrated hardware and software solutions provide real-time access control, monitoring, and alerts. This helps property owners maintain better security, track usage, and manage operations efficiently.",
    category: "General",
    order: 24
  }
];

async function seedFAQs() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing FAQs (optional - comment out if you want to keep existing ones)
    // await FAQ.deleteMany({});
    // console.log('🗑️  Cleared existing FAQs');

    // Insert new FAQs
    const result = await FAQ.insertMany(faqs);
    console.log(`✅ Successfully added ${result.length} FAQs`);

    mongoose.connection.close();
    console.log('✅ Database connection closed');
  } catch (error) {
    console.error('❌ Error seeding FAQs:', error);
    process.exit(1);
  }
}

seedFAQs();
