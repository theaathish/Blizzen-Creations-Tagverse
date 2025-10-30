/**
 * Google Apps Script for handling enquiry form submissions
 * Deploy this as a Web App to receive form data from your website
 */

// Configuration
const SHEET_NAME = 'Enquiries'; // Name of the sheet to store data
const NOTIFICATION_EMAIL = 'your-email@example.com'; // Email to receive notifications

/**
 * Main function to handle POST requests from the website
 */
function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Get or create the spreadsheet
    const sheet = getOrCreateSheet();
    
    // Add the data to the sheet
    addEnquiryToSheet(sheet, data);
    
    // Send notification email (optional)
    sendNotificationEmail(data);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Enquiry submitted successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error processing enquiry:', error);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: 'Failed to process enquiry'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle GET requests (for testing)
 */
function doGet(e) {
  return ContentService
    .createTextOutput('Enquiry handler is working! Use POST to submit data.')
    .setMimeType(ContentService.MimeType.TEXT);
}

/**
 * Get or create the enquiries sheet
 */
function getOrCreateSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    // Create new sheet with headers
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    const headers = [
      'Timestamp',
      'Name',
      'Email',
      'Phone',
      'Course Interest',
      'Message',
      'Source',
      'Status'
    ];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    
    // Format header row
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground('#4285f4');
    headerRange.setFontColor('white');
    headerRange.setFontWeight('bold');
  }
  
  return sheet;
}

/**
 * Add enquiry data to the sheet
 */
function addEnquiryToSheet(sheet, data) {
  const timestamp = new Date(data.timestamp || new Date());
  
  const rowData = [
    timestamp,
    data.name || '',
    data.email || '',
    data.phone || '',
    data.course || '',
    data.message || '',
    data.source || 'Website',
    'New'
  ];
  
  // Add the data to the next available row
  sheet.appendRow(rowData);
  
  // Auto-resize columns for better readability
  sheet.autoResizeColumns(1, rowData.length);
}

/**
 * Send notification email when new enquiry is received
 */
function sendNotificationEmail(data) {
  try {
    const subject = `New Enquiry from ${data.name} - Blizzen Creations`;
    
    const htmlBody = `
      <h2>New Course Enquiry Received</h2>
      <table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse;">
        <tr><td><strong>Name:</strong></td><td>${data.name}</td></tr>
        <tr><td><strong>Email:</strong></td><td>${data.email}</td></tr>
        <tr><td><strong>Phone:</strong></td><td>${data.phone}</td></tr>
        <tr><td><strong>Course Interest:</strong></td><td>${data.course || 'Not specified'}</td></tr>
        <tr><td><strong>Message:</strong></td><td>${data.message || 'No message'}</td></tr>
        <tr><td><strong>Source:</strong></td><td>${data.source}</td></tr>
        <tr><td><strong>Timestamp:</strong></td><td>${new Date(data.timestamp).toLocaleString()}</td></tr>
      </table>
      
      <p><strong>Next Steps:</strong></p>
      <ul>
        <li>Contact the enquirer within 24 hours</li>
        <li>Update the status in the Google Sheet</li>
        <li>Schedule a demo or consultation if needed</li>
      </ul>
    `;
    
    MailApp.sendEmail({
      to: NOTIFICATION_EMAIL,
      subject: subject,
      htmlBody: htmlBody
    });
    
  } catch (error) {
    console.error('Failed to send notification email:', error);
  }
}

/**
 * Test function to verify the setup
 */
function testEnquiryHandler() {
  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    phone: '+91 9876543210',
    course: 'Python Full Stack Development',
    message: 'This is a test enquiry',
    timestamp: new Date().toISOString(),
    source: 'Test'
  };
  
  const sheet = getOrCreateSheet();
  addEnquiryToSheet(sheet, testData);
  
  console.log('Test enquiry added successfully!');
}

/**
 * Function to get all enquiries (for admin dashboard)
 */
function getAllEnquiries() {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    if (!sheet) {
      return { success: false, message: 'No enquiries sheet found' };
    }
    
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const rows = data.slice(1);
    
    const enquiries = rows.map(row => {
      const enquiry = {};
      headers.forEach((header, index) => {
        enquiry[header] = row[index];
      });
      return enquiry;
    });
    
    return {
      success: true,
      data: enquiries
    };
    
  } catch (error) {
    return {
      success: false,
      message: error.toString()
    };
  }
}

/**
 * Function to update enquiry status
 */
function updateEnquiryStatus(email, status) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    const data = sheet.getDataRange().getValues();
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][2] === email) { // Email is in column 3 (index 2)
        sheet.getRange(i + 1, 8).setValue(status); // Status is in column 8
        return { success: true, message: 'Status updated successfully' };
      }
    }
    
    return { success: false, message: 'Enquiry not found' };
    
  } catch (error) {
    return { success: false, message: error.toString() };
  }
}