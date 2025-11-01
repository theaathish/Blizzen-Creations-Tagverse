# Environment Setup Guide

This guide explains how to configure environment variables for different deployment scenarios.

## Environment Variables

### `VITE_API_URL` (Required)

The base URL for your backend API. The frontend **always** uses this value to make API calls.

#### Development (Local)
```env
VITE_API_URL=http://localhost:5001
```

#### Testing with Remote Backend
```env
VITE_API_URL=https://your-backend-domain.com
```

#### Production (Vercel Frontend + DigitalOcean Backend)
```env
VITE_API_URL=https://your-droplet-ip-or-domain.com
```

### `MONGODB_URI` (Backend Required)

Connection string for MongoDB Atlas.

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
```

### Admin Credentials

```env
VITE_ADMIN_USERNAME=strucureo
VITE_ADMIN_PASSWORD=admin@123#
```

### Google Maps API Key (Optional)

```env
VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
```

### Google Apps Script URL (Optional)

For enquiry form submissions to Google Sheets.

```env
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

---

## Setup Instructions by Scenario

### 1. Local Development (Frontend + Local Backend)

**Frontend `.env`:**
```env
VITE_API_URL=http://localhost:5001
MONGODB_URI=your_mongodb_uri
VITE_ADMIN_USERNAME=strucureo
VITE_ADMIN_PASSWORD=admin@123#
```

**Backend `.env`:**
```env
MONGODB_URI=your_mongodb_uri
PORT=5001
```

**Start servers:**
```bash
npm run dev:all
```

---

### 2. Local Frontend + Remote Backend

**Frontend `.env`:**
```env
VITE_API_URL=https://your-backend-domain.com
VITE_ADMIN_USERNAME=strucureo
VITE_ADMIN_PASSWORD=admin@123#
```

**Start frontend only:**
```bash
npm run dev
```

Your local frontend will communicate with the remote backend.

---

### 3. Production Deployment (Vercel + DigitalOcean)

#### Frontend on Vercel

**Vercel Environment Variables:**
```
VITE_API_URL=https://your-droplet-ip-or-domain.com
VITE_ADMIN_USERNAME=strucureo
VITE_ADMIN_PASSWORD=admin@123#
VITE_GOOGLE_MAPS_API_KEY=your_key
VITE_GOOGLE_SCRIPT_URL=your_script_url
```

#### Backend on DigitalOcean

**Server `.env`:**
```
MONGODB_URI=your_mongodb_uri
PORT=5001
```

---

## Important Notes

⚠️ **NEVER commit your `.env` file to Git!**

- The `.env` file is listed in `.gitignore`
- Always use `.env.example` as a template
- Use platform-specific environment variable configuration (Vercel dashboard, server ENV variables)

✅ **Best Practices:**

1. Use `VITE_API_URL` for all API calls (no hardcoded URLs)
2. Set environment variables on your hosting platform dashboard
3. Never expose sensitive credentials in code or version control
4. Use different credentials for development and production
5. Keep `.env.example` updated with all required variables

---

## Testing Configuration

To verify your setup works:

1. Check that `VITE_API_URL` is correctly set
2. Run the frontend: `npm run dev`
3. Open browser console and check API calls
4. Verify requests go to the correct URL

If you get errors about missing `VITE_API_URL`, ensure it's properly configured in your `.env` file.
