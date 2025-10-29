import mongoose from 'mongoose';
import PlacementStats from '../models/PlacementStats.js';
import dotenv from 'dotenv';

dotenv.config();

const seedPlacementStats = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing placement stats
    await PlacementStats.deleteMany({});
    console.log('Cleared existing placement statistics');

    // Create default placement stats
    const placementStats = new PlacementStats({
      totalPlacements: "500+",
      placementRate: "95%",
      averageSalary: "₹6.5 LPA",
      highestSalary: "₹25 LPA",
      companiesPartnered: "100+",
      topCompanies: "Google, Microsoft, Amazon, TCS, Infosys, Wipro, Accenture"
    });

    await placementStats.save();
    console.log('✓ Placement statistics seeded successfully');

    // Close connection
    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding placement stats:', error);
    process.exit(1);
  }
};

// Run the seed function
seedPlacementStats();