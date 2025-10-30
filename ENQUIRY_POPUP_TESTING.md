# Enquiry Popup - Testing Guide

## How It Works

The enquiry popup automatically appears when a user scrolls down the page:

1. **Trigger**: User scrolls to 40% of the page
2. **Delay**: After reaching 40%, waits 3 seconds
3. **Display**: Popup appears with enquiry form
4. **Session**: Shows only once per browser session

## Testing Steps

### 1. Clear Browser Session
```javascript
// Open browser console and run:
sessionStorage.removeItem('enquiry-popup-shown');
```

### 2. Reload the Page
- Refresh your browser (F5 or Cmd+R)

### 3. Scroll Down Slowly
- Scroll down the homepage
- When you reach about 40% of the page, wait 3 seconds
- The popup should appear automatically

### 4. Test the Form
- Fill in the form fields
- Submit to test Google Sheets integration
- Check if data is saved to your Google Sheet

## Configuration

Current settings in `src/App.tsx`:
```typescript
const { showPopup, closePopup } = useScrollEnquiry({
  scrollThreshold: 40,  // Show after 40% scroll
  delay: 3000,          // Wait 3 seconds after threshold
  showOnce: true        // Show only once per session
});
```

## Troubleshooting

### Popup Not Showing?

1. **Check Session Storage**
   - Open browser console
   - Run: `sessionStorage.getItem('enquiry-popup-shown')`
   - If it returns 'true', clear it: `sessionStorage.removeItem('enquiry-popup-shown')`

2. **Check Page Height**
   - The page must be tall enough to scroll
   - If page is too short, you can't reach 40% scroll

3. **Check Browser Console**
   - Look for any JavaScript errors
   - Errors might prevent the popup from working

4. **Try Different Browser**
   - Test in Chrome, Firefox, or Safari
   - Clear cache and cookies

### Adjust Settings

To change when the popup appears, edit `src/App.tsx`:

```typescript
// Show after 30% scroll instead of 40%
scrollThreshold: 30,

// Show immediately (no delay)
delay: 0,

// Show multiple times per session
showOnce: false,
```

## Google Sheets Integration

Make sure your `.env` file has the correct Google Apps Script URL:

```
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

## Production Checklist

- ✅ Popup appears after scrolling
- ✅ Form validation works
- ✅ Google Sheets integration works
- ✅ Popup closes properly
- ✅ Session storage prevents multiple shows
- ✅ Mobile responsive
- ✅ No console errors

## Notes

- The popup uses `sessionStorage`, so it resets when the browser tab is closed
- The popup will not show if the user has already seen it in the current session
- The popup is fully responsive and works on mobile devices
