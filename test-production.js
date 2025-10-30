#!/usr/bin/env node

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🚀 Testing Production Mode...\n');

// Step 1: Build the project
console.log('📦 Building project...');
const buildProcess = spawn('npm', ['run', 'build'], {
  stdio: 'inherit',
  shell: true
});

buildProcess.on('close', (code) => {
  if (code !== 0) {
    console.error('❌ Build failed!');
    process.exit(1);
  }

  console.log('✅ Build completed!\n');
  
  // Step 2: Start server and preview
  console.log('🌐 Starting server and preview...');
  console.log('📝 Instructions:');
  console.log('   1. Wait for both server and preview to start');
  console.log('   2. Open http://localhost:4173 in your browser');
  console.log('   3. Verify clean, professional interface');
  console.log('   4. Check that all pages load correctly');
  console.log('   5. Press Ctrl+C to stop both processes\n');

  const previewProcess = spawn('npm', ['run', 'preview:all'], {
    stdio: 'inherit',
    shell: true
  });

  // Handle Ctrl+C
  process.on('SIGINT', () => {
    console.log('\n🛑 Stopping processes...');
    previewProcess.kill('SIGINT');
    process.exit(0);
  });
});

buildProcess.on('error', (error) => {
  console.error('❌ Build error:', error);
  process.exit(1);
});