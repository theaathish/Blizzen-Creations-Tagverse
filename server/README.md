# Blizzen Creations - Backend Server

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
Create a `.env` file in the root directory with:
```env
MONGODB_URI=mongodb://localhost:27017/blizzen-creations
PORT=5001
```

### 3. Start the Server
```bash
npm run server
```

### 4. Seed the Database (Optional)
```bash
# Seed all data
npm run seed:all

# Or seed individual collections
npm run seed:home
npm run seed:placement-stats
npm run seed:courses:v2
npm run seed:placements
npm run seed:contact
npm run seed:about
```

### 5. Test Endpoints
```bash
npm run test:endpoints
```

## 📋 API Endpoints

### Home Content
- **GET** `/api/home-content` - Fetch home page content
- **POST** `/api/home-content` - Update home page content (Admin)

### Placement Statistics
- **GET** `/api/placement-stats` - Fetch placement statistics
- **POST** `/api/placement-stats` - Update placement statistics (Admin)

### Other Endpoints
- **GET** `/api/courses` - Fetch all courses
- **GET** `/api/placements` - Fetch all placements
- **GET** `/api/contact-info` - Fetch contact information
- **GET** `/api/about` - Fetch about page content
- **GET** `/api/enquiries` - Fetch all enquiries
- **POST** `/api/enquiries` - Submit new enquiry

## 🗄️ Database Models

### HomeContent
```javascript
{
  heroTitle: String,
  heroDescription: String,
  heroImage: String,
  featuredCourses: [String],
  stats: [{
    label: String,
    value: String
  }],
  testimonials: [{
    name: String,
    role: String,
    message: String,
    image: String
  }],
  callToAction: {
    title: String,
    description: String,
    buttonText: String
  }
}
```

### PlacementStats
```javascript
{
  totalPlacements: String,
  placementRate: String,
  averageSalary: String,
  highestSalary: String,
  companiesPartnered: String,
  topCompanies: String
}
```

## 🔧 Development

### File Structure
```
server/
├── models/           # Database models
├── routes/           # API route handlers
├── seeds/            # Database seed files
├── middleware/       # Custom middleware
├── public/           # Static files
├── index.js          # Main server file
└── README.md         # This file
```

### Adding New Endpoints
1. Create model in `models/`
2. Create routes in `routes/`
3. Import and use in `index.js`
4. Create seed file in `seeds/`
5. Add seed script to `package.json`

### Security Features
- CORS protection
- Request logging
- Security headers
- Input validation
- Error handling

## 🛠️ Troubleshooting

### Common Issues

**MongoDB Connection Error**
- Ensure MongoDB is running
- Check MONGODB_URI in .env file
- Verify database permissions

**Port Already in Use**
- Change PORT in .env file
- Kill existing process: `lsof -ti:5001 | xargs kill -9`

**CORS Errors**
- Check allowed origins in `index.js`
- Ensure frontend URL is in corsOptions

### Logs
Server logs all requests with timestamps and IP addresses for monitoring.

## 📞 Support
For issues or questions, contact: strucureo@gmail.com