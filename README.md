# Blizzen Creations

## 🎓 Educational Platform Management System

A comprehensive full-stack web application for managing courses, placements, and student enquiries for Blizzen Creations.

---

## ✨ Features

### 🏠 **Frontend**
- **Modern UI**: React 18 + TypeScript + Tailwind CSS
- **Responsive Design**: Mobile-first approach with professional styling
- **Database-Driven**: All content managed through admin panel
- **Performance Optimized**: API caching and parallel requests
- **Security Protected**: Advanced tamper detection system

### 🔧 **Backend**
- **RESTful API**: Express.js with MongoDB
- **Full CRUD**: Complete data management
- **File Upload**: Image upload infrastructure ready
- **Security**: CORS configuration and secure headers

### 👨‍💼 **Admin Panel**
- **Course Management**: Full curriculum editor
- **Placement Tracking**: Student success stories
- **Content Management**: About, contact, and home page content
- **Enquiry Management**: Form submissions and tracking
- **Secure Access**: Protected with authentication

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd blizzen-launchpad
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   # Update .env with your MongoDB connection string
   ```

4. **Seed the database**
   ```bash
   npm run seed:all
   ```

5. **Start the application**
   ```bash
   npm run dev:all
   ```

### Access URLs
- **Frontend**: http://localhost:8080
- **Admin Panel**: http://localhost:8080/admin
- **Backend API**: http://localhost:5001

### Admin Credentials
- **Username**: `strucureo`
- **Password**: `admin@123#`

---

## 📁 Project Structure

```
blizzen-launchpad/
├── src/                    # Frontend source code
│   ├── components/         # React components
│   ├── pages/             # Page components
│   ├── services/          # API services
│   ├── assets/            # Images and static files
│   └── utils/             # Utility functions
├── server/                # Backend source code
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── seeds/             # Database seed scripts
│   └── middleware/        # Express middleware
└── public/                # Static assets
```

---

## 🛠️ Available Scripts

### Development
```bash
npm run dev              # Frontend only
npm run server           # Backend only
npm run dev:all          # Both servers
```

### Database
```bash
npm run seed:all         # Seed all data
npm run seed:courses     # Seed courses only
npm run seed:placements  # Seed placements only
npm run seed:contact     # Seed contact info
npm run seed:about       # Seed about content
npm run seed:home        # Seed home content
```

### Production
```bash
npm run build            # Build for production
npm run preview          # Preview production build
npm run lint             # Check code quality
```

---

## 🎨 Pages

### Public Pages
- **Home** (`/`) - Hero section, featured courses, testimonials
- **About** (`/about`) - Company information, mission, vision
- **Courses** (`/courses`) - Course listings with details
- **Course Detail** (`/courses/:slug`) - Individual course information
- **Placements** (`/placements`) - Student success stories
- **Contact** (`/contact`) - Contact form and company information

### Admin Pages
- **Admin Dashboard** (`/admin`) - Content management system
- **Course Editor** - Full curriculum management
- **Placement Manager** - Student placement tracking
- **Content Editor** - Page content management
- **Enquiry Viewer** - Form submission management

---

## 🔒 Security Features

### Security Implementation
- **CORS Configuration**: Proper cross-origin request handling
- **Security Headers**: X-Frame-Options, X-Content-Type-Options
- **Admin Authentication**: Secure access control
- **Input Validation**: Server-side data validation
- **Error Handling**: Secure error responses

### Contact for Security Issues
📧 **strucureo@gmail.com**

---

## 🌐 API Endpoints

### Public Endpoints
```
GET  /api/courses          # Get all courses
GET  /api/courses/:id      # Get single course
GET  /api/placements       # Get all placements
GET  /api/contact-info     # Get contact information
GET  /api/about            # Get about content
GET  /api/home-content     # Get home page content
POST /api/enquiries        # Submit enquiry form
```

### Admin Endpoints
```
POST   /api/courses        # Create course
PUT    /api/courses/:id    # Update course
DELETE /api/courses/:id    # Delete course
POST   /api/placements     # Create placement
PUT    /api/placements/:id # Update placement
DELETE /api/placements/:id # Delete placement
PUT    /api/contact-info   # Update contact info
PUT    /api/about          # Update about content
PUT    /api/home-content   # Update home content
GET    /api/enquiries      # Get all enquiries
DELETE /api/enquiries/:id  # Delete enquiry
```

---

## 🎯 Technology Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **shadcn/ui** - Component library
- **TanStack Query** - Server state management
- **React Router** - Client-side routing
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **CORS** - Cross-origin resource sharing
- **Multer** - File upload handling

---

## 📊 Performance Features

### API Optimization
- **Intelligent Caching**: 5-15 minute TTL based on content type
- **Parallel Requests**: Multiple API calls simultaneously
- **Request Monitoring**: Performance tracking and slow call detection
- **Error Handling**: Comprehensive error management

### Frontend Optimization
- **Code Splitting**: Lazy loading components
- **Image Optimization**: Optimized asset delivery
- **Bundle Optimization**: Minimal bundle size
- **Responsive Images**: Multiple breakpoints

---

## 🚀 Deployment

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy `dist/` folder to static hosting (Netlify, Vercel)
3. Configure environment variables for production API URL

### Backend Deployment
1. Deploy to Node.js hosting (Heroku, Railway, DigitalOcean)
2. Set environment variables (MongoDB URI, PORT)
3. Ensure MongoDB Atlas is accessible

### Environment Variables
```env
# Frontend
VITE_API_URL=https://your-api-domain.com
VITE_ADMIN_USERNAME=
VITE_ADMIN_PASSWORD=

# Backend
MONGODB_URI=mongodb+srv://...
PORT=5001
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

## 📞 Support

For technical support or questions:

📧 **strucureo@gmail.com**

---

## 📄 License

This project is proprietary software owned by Blizzen Creations.

---

## 🎉 Status

✅ **Production Ready**  
✅ **Fully Functional**  
✅ **Security Protected**  
✅ **Performance Optimized**

**Last Updated**: October 2024  
**Version**: 1.0.0