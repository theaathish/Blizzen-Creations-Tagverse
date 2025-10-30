#!/usr/bin/env node

import { spawn } from 'child_process';

console.log('🌱 Seeding Real Placement Data...\n');

const runSeed = (scriptName, description) => {
  return new Promise((resolve, reject) => {
    console.log(`📊 ${description}...`);
    const process = spawn('npm', ['run', scriptName], {
      stdio: 'inherit',
      shell: true
    });

    process.on('close', (code) => {
      if (code === 0) {
        console.log(`✅ ${description} completed!\n`);
        resolve();
      } else {
        console.error(`❌ ${description} failed!`);
        reject(new Error(`${scriptName} failed with code ${code}`));
      }
    });

    process.on('error', (error) => {
      console.error(`❌ Error running ${scriptName}:`, error);
      reject(error);
    });
  });
};

const seedAll = async () => {
  try {
    await runSeed('seed:real-placements', 'Seeding real placement data');
    await runSeed('seed:placement-stats', 'Updating placement statistics');
    
    console.log('🎉 All real data seeded successfully!');
    console.log('\n📋 Summary:');
    console.log('   ✅ 15 real placement records added');
    console.log('   ✅ Updated placement statistics');
    console.log('   ✅ Companies: Zoho, Freshworks, Chargebee, and more');
    console.log('   ✅ Salary range: ₹3.2 - ₹4.5 LPA');
    console.log('\n🚀 Start your server to see the changes:');
    console.log('   npm run server');
    console.log('   npm run dev');
  } catch (error) {
    console.error('❌ Failed to seed data:', error.message);
    process.exit(1);
  }
};

seedAll();