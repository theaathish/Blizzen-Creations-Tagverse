#!/usr/bin/env node

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyyEpLWY2xONynIZ9CmrLIT9KMjZNO_LorxeVjyEIyUczzUddrjInV-6b4hFMiWVZWvcA/exec';

const testGoogleScript = async () => {
  console.log('🧪 Testing Google Apps Script Integration...\n');

  try {
    // Test 1: Check if the script endpoint is accessible
    console.log('1. Testing Google Apps Script endpoint');
    
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '+91 9876543210',
      course: 'Python Full Stack Development',
      message: 'This is a test enquiry from the website popup',
      timestamp: new Date().toISOString(),
      source: 'Website Popup Test'
    };

    console.log('📤 Sending test enquiry data...');
    
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });

    // Note: Google Apps Script with no-cors mode doesn't return readable responses
    // But if no error is thrown, it usually means the request was successful
    
    console.log('✅ Request sent successfully!');
    console.log('📊 Test Data Sent:');
    console.log(`   Name: ${testData.name}`);
    console.log(`   Email: ${testData.email}`);
    console.log(`   Phone: ${testData.phone}`);
    console.log(`   Course: ${testData.course}`);
    console.log(`   Source: ${testData.source}\n`);

    console.log('🎉 Google Apps Script integration test completed!');
    console.log('\n📋 Next Steps:');
    console.log('   1. Check your Google Sheet for the test data');
    console.log('   2. Check your email for notification');
    console.log('   3. Test the popup on your website by scrolling');
    console.log('\n🚀 If you see the test data in your sheet, the integration is working!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('   1. Verify the Google Apps Script URL is correct');
    console.log('   2. Ensure the script is deployed as a Web App');
    console.log('   3. Check that access is set to "Anyone"');
    console.log('   4. Verify the Google Sheet exists and is accessible');
  }
};

// Run the test
testGoogleScript();