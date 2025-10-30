# 📝 Scroll-Triggered Enquiry Popup with Google Sheets Integration

## ✅ **Complete Implementation**

I've created a sophisticated scroll-triggered enquiry popup that automatically submits data to Google Sheets using Google Apps Script.

## 🎯 **Features Implemented**

### **1. Scroll-Triggered Popup (`src/components/EnquiryPopup.tsx`)**
- **Smart Triggering**: Shows after 40% page scroll + 3-second delay
- **Session Management**: Shows only once per browser session
- **Professional Design**: Clean, modern popup with form validation
- **Mobile Responsive**: Works perfectly on all devices
- **User-Friendly**: Easy to close, clear form fields

### **2. Custom Hook (`src/hooks/useScrollEnquiry.ts`)**
- **Configurable**: Customizable scroll threshold and delay
- **Performance Optimized**: Passive scroll listeners
- **Session Storage**: Remembers if popup was shown
- **Cleanup**: Proper event listener cleanup

### **3. Google Apps Script Integration**
- **Direct Submission**: Forms submit directly to Google Sheets
- **Email Notifications**: Automatic email alerts for new enquiries
- **Data Validation**: Server-side validation and error handling
- **Status Tracking**: Track enquiry status (New, Contacted, Converted)

## 🗄️ **Google Sheets Setup**

### **Step 1: Create Google Sheet**
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Blizzen Creations Enquiries"

### **Step 2: Deploy Google Apps Script**
1. Go to [Google Apps Script](https://script.google.com)
2. Create a new project
3. Replace the default code with the content from `google-apps-script/enquiry-handler.gs`
4. Update the configuration:
   ```javascript
   const SHEET_NAME = 'Enquiries';
   const NOTIFICATION_EMAIL = 'your-email@example.com';
   ```

### **Step 3: Deploy as Web App**
1. Click "Deploy" → "New deployment"
2. Choose "Web app" as type
3. Set execute as "Me"
4. Set access to "Anyone"
5. Click "Deploy"
6. Copy the Web App URL

### **Step 4: Update Environment Variable**
1. Open `.env` file
2. Replace `YOUR_SCRIPT_ID` with your actual script ID:
   ```env
   VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_ACTUAL_SCRIPT_ID/exec
   ```

## 📋 **Form Fields**

### **Required Fields**
- **Name**: Full name of the enquirer
- **Email**: Email address for follow-up
- **Phone**: Contact number

### **Optional Fields**
- **Course Interest**: Dropdown with available courses
- **Message**: Additional questions or requirements

### **Auto-Generated Fields**
- **Timestamp**: When the enquiry was submitted
- **Source**: "Website Popup" for tracking
- **Status**: "New" by default

## 🎨 **Popup Behavior**

### **Trigger Conditions**
- **Scroll Threshold**: 40% of page scrolled
- **Delay**: 3 seconds after threshold reached
- **Frequency**: Once per browser session
- **Pages**: All pages except admin

### **User Experience**
- **Smooth Animation**: Scale-in animation on appearance
- **Easy Dismissal**: Click X or outside popup to close
- **Form Validation**: Required field validation
- **Success Feedback**: Toast notification on successful submission
- **Loading States**: Visual feedback during submission

## 🔧 **Technical Implementation**

### **Scroll Detection**
```typescript
const handleScroll = () => {
  const scrollTop = window.pageYOffset;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercentage = (scrollTop / scrollHeight) * 100;

  if (scrollPercentage >= scrollThreshold) {
    // Trigger popup after delay
  }
};
```

### **Google Apps Script Submission**
```typescript
const response = await fetch(GOOGLE_SCRIPT_URL, {
  method: 'POST',
  mode: 'no-cors', // Required for Google Apps Script
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
});
```

## 📊 **Google Sheets Structure**

| Column | Field | Description |
|--------|-------|-------------|
| A | Timestamp | When enquiry was submitted |
| B | Name | Full name of enquirer |
| C | Email | Email address |
| D | Phone | Phone number |
| E | Course Interest | Selected course |
| F | Message | Additional message |
| G | Source | Where enquiry came from |
| H | Status | Follow-up status |

## 📧 **Email Notifications**

### **Automatic Emails**
- **Recipient**: Configured email address
- **Subject**: "New Enquiry from [Name] - Blizzen Creations"
- **Content**: Formatted HTML with all enquiry details
- **Action Items**: Next steps for follow-up

### **Email Template**
```html
<h2>New Course Enquiry Received</h2>
<table>
  <tr><td>Name:</td><td>[Name]</td></tr>
  <tr><td>Email:</td><td>[Email]</td></tr>
  <tr><td>Phone:</td><td>[Phone]</td></tr>
  <tr><td>Course:</td><td>[Course]</td></tr>
  <tr><td>Message:</td><td>[Message]</td></tr>
</table>
```

## 🎯 **Customization Options**

### **Popup Timing**
```typescript
const { showPopup, closePopup } = useScrollEnquiry({
  scrollThreshold: 40, // Percentage (0-100)
  delay: 3000, // Milliseconds
  showOnce: true // Boolean
});
```

### **Course Options**
Update the course dropdown in `EnquiryPopup.tsx`:
```tsx
<option value="Your New Course">Your New Course</option>
```

### **Styling**
- **Colors**: Uses your existing design system
- **Animation**: Smooth scale-in animation
- **Responsive**: Mobile-first design

## 🚀 **Testing**

### **Test the Popup**
1. Visit any page on your site
2. Scroll down to 40% of the page
3. Wait 3 seconds
4. Popup should appear

### **Test Form Submission**
1. Fill out the form with test data
2. Submit the form
3. Check Google Sheets for new row
4. Check email for notification

### **Test Google Apps Script**
1. Open Google Apps Script editor
2. Run the `testEnquiryHandler()` function
3. Check if test data appears in sheet

## 📱 **Mobile Optimization**

- **Touch-Friendly**: Large touch targets
- **Responsive Design**: Adapts to screen size
- **Keyboard Support**: Proper form navigation
- **Performance**: Lightweight and fast

## 🔒 **Privacy & Security**

- **Data Protection**: Only collects necessary information
- **Secure Transmission**: HTTPS encryption
- **Privacy Notice**: Clear privacy statement in form
- **No Tracking**: No unnecessary cookies or tracking

## 📈 **Analytics & Tracking**

### **Built-in Tracking**
- **Source Tracking**: Identifies popup submissions
- **Timestamp**: Precise submission time
- **Session Management**: Prevents spam submissions

### **Conversion Tracking**
- **Lead Generation**: Track popup conversion rate
- **Course Interest**: Popular course analysis
- **Follow-up Success**: Status tracking in sheets

## 🎉 **Benefits**

1. **Lead Generation**: Capture interested visitors
2. **Automated Process**: No manual data entry
3. **Instant Notifications**: Immediate email alerts
4. **Data Organization**: Structured Google Sheets storage
5. **Follow-up Tracking**: Status management system
6. **Mobile Friendly**: Works on all devices
7. **Cost Effective**: Uses free Google services

Your scroll-triggered enquiry popup is now fully functional with Google Sheets integration! 🚀