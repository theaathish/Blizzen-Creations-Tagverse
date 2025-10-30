# 🚀 Quick Test Guide - Enquiry Popup

## ✅ **Google Apps Script URL Updated**

Your Google Apps Script URL has been configured:
```
https://script.google.com/macros/s/AKfycbyyEpLWY2xONynIZ9CmrLIT9KMjZNO_LorxeVjyEIyUczzUddrjInV-6b4hFMiWVZWvcA/exec
```

## 🧪 **Quick Tests**

### **1. Test Google Apps Script**
```bash
npm run test:google-script
```
This will send a test enquiry to your Google Sheet.

### **2. Test Popup on Website**
1. Start your development server:
   ```bash
   npm run dev
   ```
2. Open any page (Home, About, Courses, etc.)
3. Scroll down to about 40% of the page
4. Wait 3 seconds
5. The enquiry popup should appear

### **3. Test Form Submission**
1. Fill out the popup form with test data
2. Click "Submit Enquiry"
3. Check your Google Sheet for the new entry
4. Check your email for notification

## 📋 **Expected Behavior**

### **Popup Appearance**
- ✅ Shows after scrolling 40% of any page
- ✅ 3-second delay after scroll threshold
- ✅ Appears only once per browser session
- ✅ Professional design with smooth animation

### **Form Functionality**
- ✅ Required field validation (Name, Email, Phone)
- ✅ Course selection dropdown
- ✅ Optional message field
- ✅ Loading state during submission
- ✅ Success toast notification

### **Google Sheets Integration**
- ✅ New row added for each submission
- ✅ Timestamp automatically recorded
- ✅ Source marked as "Website Popup"
- ✅ Status set to "New"

### **Email Notifications**
- ✅ Automatic email sent to configured address
- ✅ Formatted HTML with all enquiry details
- ✅ Action items for follow-up

## 🔧 **Troubleshooting**

### **If Popup Doesn't Appear**
1. Clear browser cache and reload
2. Check browser console for errors
3. Verify you've scrolled past 40% of the page
4. Wait at least 3 seconds after scrolling

### **If Form Submission Fails**
1. Check browser network tab for errors
2. Verify Google Apps Script URL is correct
3. Ensure script is deployed as Web App
4. Check script permissions are set to "Anyone"

### **If No Data in Google Sheets**
1. Verify the sheet name matches the script configuration
2. Check if the script has permission to access the sheet
3. Run the test function in Google Apps Script editor
4. Check Google Apps Script execution logs

## 📱 **Mobile Testing**

The popup is fully responsive and works on mobile devices:
- **Touch-Friendly**: Large touch targets
- **Keyboard Support**: Proper form navigation
- **Screen Adaptation**: Adjusts to screen size
- **Performance**: Optimized for mobile browsers

## 🎯 **Success Indicators**

**Everything is working when:**
- ✅ Popup appears after scrolling and waiting
- ✅ Form validates required fields
- ✅ Submission shows success message
- ✅ New row appears in Google Sheet
- ✅ Email notification is received
- ✅ Popup doesn't appear again in same session

## 📞 **Support**

If you encounter any issues:
1. Run the test scripts to isolate the problem
2. Check browser console for error messages
3. Verify Google Apps Script deployment settings
4. Contact: strucureo@gmail.com

Your enquiry popup system is now live and ready to capture leads! 🎉