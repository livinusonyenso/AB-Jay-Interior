# Portfolio Backend API

A production-ready Node.js + Express + MongoDB backend for powering a portfolio website with project management and contact form functionality.

## 🚀 Features

- **Project Management**: Full CRUD operations for portfolio projects
- **Contact Forms**: Quote request system with email notifications
- **Admin Authentication**: JWT-based secure admin authentication
- **Image Upload**: Optional Cloudinary integration for project images
- **Email System**: Automatic email notifications via Nodemailer
- **Validation**: Comprehensive input validation with Zod
- **Security**: Rate limiting, CORS, helmet protection
- **Testing**: Complete test suite with Jest + Supertest

## 📋 Prerequisites

- Node.js >= 18.0.0
- MongoDB >= 5.0 (local installation or MongoDB Atlas)
- SMTP server credentials (Gmail, SendGrid, etc.)
- Optional: Cloudinary account for image uploads

## 🛠️ Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup MongoDB

**Option A: Local MongoDB**
- Install MongoDB locally: https://docs.mongodb.com/manual/installation/
- Start MongoDB service:
  ```bash
  # macOS (with Homebrew)
  brew services start mongodb-community
  
  # Ubuntu/Debian
  sudo systemctl start mongod
  
  # Windows
  net start MongoDB
  ```

**Option B: MongoDB Atlas (Cloud)**
- Create free account at https://www.mongodb.com/atlas
- Create a cluster and get connection string
- Whitelist your IP address

### 3. Environment Configuration

Copy and configure environment variables:

```bash
cp .env.example .env
```

Edit `.env` with your settings:

```env
# Server Configuration
PORT=4000
NODE_ENV=development

# Database - Choose one:
# Local MongoDB:
MONGO_URI=mongodb://localhost:27017/portfolio-db
# OR MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio-db

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=1d

# Admin Configuration
ADMIN_EMAIL=admin@yourcompany.com

# Email Configuration (Required)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
FROM_EMAIL="Your Company <noreply@yourcompany.com>"

# Cloudinary Configuration (Optional - for image uploads)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
```

### 4. Create Admin User & Sample Data

```bash
npm run seed
```

This creates:
- Admin user with email from `ADMIN_EMAIL`
- Default password: `admin123` (change this!)
- Sample portfolio projects

### 5. Start Development Server

```bash
npm run dev
```

The API will be available at `http://localhost:4000`

## 📧 Email Setup Guide

### Gmail Setup (Recommended for Development)

1. Enable 2-Factor Authentication on your Google account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. Use the App Password in your `.env`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-character-app-password
FROM_EMAIL="Your Company <noreply@yourcompany.com>"
```

### Other Email Providers

**SendGrid:**
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
```

**Mailgun:**
```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=postmaster@your-domain.mailgun.org
SMTP_PASS=your-mailgun-password
```

## 📚 API Documentation

### Base URL
- Development: `http://localhost:4000/api`

### Authentication

#### Login Admin
```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@yourcompany.com",
    "password": "admin@123"
  }'
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "admin": {
    "id": "64f...",
    "email": "admin@yourcompany.com",
    "name": "System Administrator",
    "role": "admin"
  }
}
```

#### Get Admin Profile
```bash
curl -X GET http://localhost:4000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Projects

#### Get All Projects
```bash
curl -X GET "http://localhost:4000/api/projects?page=1&limit=10&category=Residential"
```

**Response:**
```json
{
  "projects": [
    {
      "_id": "64f...",
      "title": "Modern Hillside Residence",
      "location": "Malibu, CA",
      "category": "Residential",
      "description": "Stunning contemporary home...",
      "imageUrl": "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
      "createdAt": "2023-12-01T10:00:00.000Z",
      "updatedAt": "2023-12-01T10:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 3,
    "pages": 1
  }
}
```

#### Create Project (Admin Only)
```bash
curl -X POST http://localhost:4000/api/projects \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Project",
    "location": "New York, NY",
    "category": "Commercial",
    "description": "A detailed description of at least 20 characters describing the project scope and features.",
    "imageUrl": "https://images.pexels.com/photos/example.jpg"
  }'
```

#### Create Project with Image Upload
```bash
curl -X POST http://localhost:4000/api/projects \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "title=New Project" \
  -F "location=New York, NY" \
  -F "category=Commercial" \
  -F "description=A detailed description..." \
  -F "image=@/path/to/image.jpg"
```

### Quote Requests

#### Submit Quote Request
```bash
curl -X POST http://localhost:4000/api/quotes \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "1234567890",
    "location": "San Francisco, CA",
    "projectType": "Kitchen Renovation",
    "budget": "$25,000 - $50,000",
    "timeline": "2-3 months",
    "description": "I need help renovating my kitchen. Looking for modern design with quality materials.",
    "hasPlans": false,
    "newsletter": true
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Quote request submitted successfully. We'll be in touch soon!",
  "quoteId": "64f..."
}
```

#### Get All Quotes (Admin Only)
```bash
curl -X GET "http://localhost:4000/api/quotes?page=1&limit=10&status=new" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Health Check
```bash
curl -X GET http://localhost:4000/health
```

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2023-12-01T10:00:00.000Z",
  "uptime": 3600
}
```

## 🧪 Testing

Run the test suite:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run with coverage
npm test -- --coverage
```

**Expected Test Output:**
```
 PASS  src/tests/auth.test.ts
 PASS  src/tests/projects.test.ts
 PASS  src/tests/quotes.test.ts

Test Suites: 3 passed, 3 total
Tests:       12 passed, 12 total
Snapshots:   0 total
Time:        2.5s
```

## 🔧 Development Scripts

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Seed database with admin user and sample data
npm run seed
```

## 🌐 Frontend Integration Guide

### 1. Authentication Flow

```javascript
// Login request
const loginResponse = await fetch('http://localhost:4000/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'admin@yourcompany.com',
    password: 'admin123',
  }),
});

const { token, admin } = await loginResponse.json();

// Store token (localStorage for development, httpOnly cookie for production)
localStorage.setItem('authToken', token);
```

### 2. Making Authenticated Requests

```javascript
const token = localStorage.getItem('authToken');

const response = await fetch('http://localhost:4000/api/projects', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
  body: JSON.stringify(projectData),
});
```

### 3. Quote Form Submission

```javascript
const submitQuote = async (formData) => {
  const response = await fetch('http://localhost:4000/api/quotes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  const result = await response.json();
  
  if (result.success) {
    alert(result.message);
  } else {
    // Handle validation errors
    console.error(result.details);
  }
};
```

### 4. File Upload for Projects

```javascript
const uploadProject = async (projectData, imageFile) => {
  const formData = new FormData();
  
  // Add text fields
  Object.keys(projectData).forEach(key => {
    formData.append(key, projectData[key]);
  });
  
  // Add image file
  if (imageFile) {
    formData.append('image', imageFile);
  }

  const response = await fetch('http://localhost:4000/api/projects', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      // Don't set Content-Type for FormData
    },
    body: formData,
  });
};
```

## 🔒 Security Best Practices

### JWT Token Storage
- **Development**: localStorage/sessionStorage is acceptable
- **Production**: Use secure, httpOnly cookies
- **SPA Recommendation**: Store in memory + refresh token pattern

### Password Security
- Admin passwords are hashed with bcrypt (12 rounds)
- Change default admin password immediately
- Use strong JWT secrets (minimum 32 characters)

## 🚀 Production Deployment

### 1. Environment Setup
```env
NODE_ENV=production
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/portfolio-db
JWT_SECRET=your-production-jwt-secret-32-chars-minimum
CORS_ORIGIN=https://your-frontend-domain.com
```

### 2. Build and Deploy
```bash
# Build the application
npm run build

# Start production server
npm start
```

### 3. Popular Deployment Platforms

**Heroku:**
```bash
# Install Heroku CLI and login
heroku create your-app-name
heroku config:set NODE_ENV=production
heroku config:set MONGO_URI=your-mongodb-uri
# ... set other env vars
git push heroku main
```

**Railway:**
```bash
# Install Railway CLI
railway login
railway new
railway add
railway up
```

**DigitalOcean App Platform:**
- Connect your GitHub repository
- Set environment variables in the dashboard
- Deploy automatically on git push

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**
   ```bash
   # Check if MongoDB is running locally
   mongosh --eval "db.adminCommand('ismaster')"
   
   # Start MongoDB service
   # macOS: brew services start mongodb-community
   # Ubuntu: sudo systemctl start mongod
   # Windows: net start MongoDB
   ```

2. **Email Not Sending**
   - Verify SMTP credentials in `.env`
   - Check spam folder for test emails
   - For Gmail, ensure you're using App Password, not regular password

3. **Port Already in Use**
   ```bash
   # Find and kill process using port 4000
   lsof -ti:4000 | xargs kill -9
   # Or change PORT in .env file
   ```

4. **JWT Token Errors**
   - Ensure `JWT_SECRET` is set in `.env`
   - Check token expiration time
   - Verify Bearer token format in Authorization header

### Development Tips

1. **Reset Database**
   ```bash
   # Drop database and reseed
   npm run seed
   ```

2. **View MongoDB Data**
   ```bash
   # Connect to local MongoDB
   mongosh mongodb://localhost:27017/portfolio-db
   
   # List collections
   show collections
   
   # View projects
   db.projects.find().pretty()
   
   # View quotes
   db.quotes.find().pretty()
   ```

3. **Test Email Configuration**
   ```bash
   # Submit a test quote to verify email setup
   curl -X POST http://localhost:4000/api/quotes \
     -H "Content-Type: application/json" \
     -d '{
       "firstName": "Test",
       "lastName": "User",
       "email": "test@example.com",
       "phone": "1234567890",
       "location": "Test City",
       "projectType": "Test Project",
       "budget": "$10,000",
       "timeline": "1 month",
       "description": "This is a test quote request to verify email functionality works correctly.",
       "hasPlans": false,
       "newsletter": false
     }'
   ```

## 📊 API Response Examples

### Successful Responses

```json
// GET /api/projects
{
  "projects": [
    {
      "_id": "64f...",
      "title": "Modern Hillside Residence",
      "location": "Malibu, CA",
      "category": "Residential",
      "description": "Stunning contemporary home...",
      "imageUrl": "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
      "createdAt": "2023-12-01T10:00:00.000Z",
      "updatedAt": "2023-12-01T10:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 3,
    "pages": 1
  }
}

// POST /api/projects (success)
{
  "success": true,
  "message": "Project created successfully",
  "project": { ... }
}

// POST /api/quotes (success)
{
  "success": true,
  "message": "Quote request submitted successfully. We'll be in touch soon!",
  "quoteId": "64f..."
}
```

### Error Responses

```json
// Validation Error (400)
{
  "error": "Validation failed",
  "details": [
    {
      "field": "description",
      "message": "Description must be at least 20 characters"
    }
  ]
}

// Authentication Error (401)
{
  "error": "Access token required"
}

// Not Found Error (404)
{
  "error": "Project not found"
}
```

## 🎯 Frontend Integration Checklist

### Authentication
- [ ] Create login form that posts to `/api/auth/login`
- [ ] Store JWT token (localStorage for dev, httpOnly cookie for prod)
- [ ] Add token to Authorization header for protected routes
- [ ] Implement logout (clear stored token)
- [ ] Handle token expiration (401 responses)

### Projects Management
- [ ] Create projects list page (`GET /api/projects`)
- [ ] Implement project creation form (`POST /api/projects`)
- [ ] Add image upload support (FormData with file)
- [ ] Create project edit form (`PUT /api/projects/:id`)
- [ ] Add delete confirmation (`DELETE /api/projects/:id`)

### Quote Form
- [ ] Create contact/quote form with all required fields
- [ ] Implement client-side validation (match server validation)
- [ ] Submit to `POST /api/quotes`
- [ ] Show success/error messages

### Admin Dashboard
- [ ] Create quotes management page (`GET /api/quotes`)
- [ ] Add quote status updates (`PUT /api/quotes/:id/status`)
- [ ] Implement search and filtering
- [ ] Add pagination controls

## 🔧 Configuration Options

### Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PORT` | No | 4000 | Server port |
| `NODE_ENV` | No | development | Environment mode |
| `MONGO_URI` | Yes | - | MongoDB connection string |
| `JWT_SECRET` | Yes | - | JWT signing secret (32+ chars) |
| `JWT_EXPIRES_IN` | No | 1d | JWT expiration time |
| `ADMIN_EMAIL` | Yes | - | Admin email for notifications |
| `SMTP_HOST` | Yes | - | SMTP server hostname |
| `SMTP_PORT` | Yes | - | SMTP server port |
| `SMTP_USER` | Yes | - | SMTP username |
| `SMTP_PASS` | Yes | - | SMTP password |
| `FROM_EMAIL` | Yes | - | From email address |
| `CLOUDINARY_CLOUD_NAME` | No | - | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | No | - | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | No | - | Cloudinary API secret |
| `CORS_ORIGIN` | No | http://localhost:3000 | Allowed CORS origin |

## 📈 Production Checklist

### Security
- [ ] Change default admin password
- [ ] Use strong JWT secret (32+ characters)
- [ ] Set `NODE_ENV=production`
- [ ] Configure proper CORS origins
- [ ] Use HTTPS in production
- [ ] Set up MongoDB authentication
- [ ] Configure rate limiting appropriately

### Monitoring
- [ ] Set up error tracking (Sentry, Bugsnag)
- [ ] Configure logging aggregation
- [ ] Set up uptime monitoring
- [ ] Configure backup strategy for MongoDB

### Performance
- [ ] Enable MongoDB indexes (included in seed script)
- [ ] Configure Cloudinary optimizations
- [ ] Set up CDN for static assets
- [ ] Monitor API response times

## 🤝 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Verify all environment variables are set correctly
3. Ensure MongoDB is running and accessible
4. Test email configuration with a simple quote submission
5. Check server logs for detailed error messages

## 📄 License

MIT License - see LICENSE file for details.