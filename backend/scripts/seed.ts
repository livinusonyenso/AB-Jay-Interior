import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Admin } from '../src/models/Admin';
import { Project } from '../src/models/Project';
import { hashPassword } from '../src/utils/password';

dotenv.config();

async function seedDatabase(): Promise<void> {
  try {
    // Connect to database
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error('MONGO_URI environment variable is required');
    }

    await mongoose.connect(mongoUri);
    console.log('Connected to database');

    // Clear existing data
    await Admin.deleteMany({});
    await Project.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@ab-jay-interior.com';
    const adminPassword = 'admin@123'; // Change this in production!
    const passwordHash = await hashPassword(adminPassword);

    const admin = await Admin.create({
      email: adminEmail,
      passwordHash,
      name: 'System Administrator',
      role: 'admin',
    });

    console.log(`✅ Admin user created: ${admin.email}`);
    console.log(`🔑 Password: ${adminPassword}`);

    // Create sample projects
    const sampleProjects = [
      {
        title: 'Modern Hillside Residence',
        location: 'Malibu, CA',
        category: 'Residential',
        description: 'Stunning contemporary home featuring floor-to-ceiling windows, sustainable materials, and panoramic ocean views. This project showcases innovative design solutions for challenging hillside terrain.',
        imageUrl: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
      },
      {
        title: 'Downtown Corporate Headquarters',
        location: 'Seattle, WA',
        category: 'Commercial',
        description: 'State-of-the-art office building designed for a tech startup, featuring open collaborative spaces, wellness rooms, and rooftop gardens. LEED Platinum certified with advanced sustainable systems.',
        imageUrl: 'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg',
      },
      {
        title: 'Boutique Hotel Renovation',
        location: 'Charleston, SC',
        category: 'Hospitality',
        description: 'Historic hotel restoration combining preservation of original architectural details with modern luxury amenities. Features custom millwork, locally-sourced materials, and energy-efficient systems.',
        imageUrl: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg',
      },
    ];

    const projects = await Project.create(sampleProjects);
    console.log(`✅ Created ${projects.length} sample projects`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📝 Login credentials:');
    console.log(`Email: ${adminEmail}`);
    console.log(`Password: ${adminPassword}`);
    console.log('\n⚠️  Remember to change the admin password in production!');

  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seedDatabase();