# Multiple Image Upload Backend

A robust Node.js backend with Express, MongoDB, and Cloudinary for handling multiple image uploads.

## Features

- 🚀 **Multiple Image Upload**: Upload up to 10 images per project
- ☁️ **Cloudinary Integration**: Automatic image optimization and CDN delivery
- 🔒 **JWT Authentication**: Secure admin-only endpoints
- 📊 **MongoDB**: Efficient data storage with Mongoose ODM
- 🛡️ **Security**: Rate limiting, CORS, Helmet protection
- ✅ **Validation**: Request validation with comprehensive error handling
- 📧 **Email Notifications**: Quote request notifications

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- Cloudinary account
- Email service (Gmail, SendGrid, etc.)

## Installation & Setup

### 1. Clone and Install Dependencies

\`\`\`bash
git clone <your-repo-url>
cd your-project
npm install
\`\`\`

### 2. Environment Variables

Create a `.env` file in the root directory:

\`\`\`env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=mongodb://localhost:27017/your-database-name
# Or for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database-name

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Admin Configuration
ADMIN_EMAIL=admin@yoursite.com

# Email Configuration (Development)
DEV_EMAIL_HOST=smtp.gmail.com
DEV_EMAIL_PORT=587
DEV_EMAIL_USERNAME=your-email@gmail.com
DEV_EMAIL_PASSWORD=your-app-password
DEV_EMAIL_FROM=your-email@gmail.com

# Email Configuration (Production)
PROD_EMAIL_HOST=smtp.sendgrid.net
PROD_EMAIL_PORT=587
PROD_EMAIL_USER=apikey
PROD_EMAIL_PASS=your-sendgrid-api-key
PROD_EMAIL_FROM=noreply@yoursite.com
\`\`\`

### 3. Start MongoDB

**Local MongoDB:**
\`\`\`bash
mongod
\`\`\`

**Or use MongoDB Atlas** (cloud database - recommended)

### 4. Seed the Database

\`\`\`bash
npm run seed
\`\`\`

### 5. Start the Server

\`\`\`bash
# Development
npm run dev

# Production
npm start
\`\`\`

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/profile` - Get admin profile (protected)

### Projects (Multiple Images)
- `GET /api/projects` - Get all projects (public)
- `GET /api/projects/:id` - Get single project (public)
- `POST /api/projects` - Create project with multiple images (admin only)
- `PUT /api/projects/:id` - Update project with multiple images (admin only)
- `DELETE /api/projects/:id` - Delete project (admin only)

### Quotes
- `POST /api/quotes` - Submit quote request (public)
- `GET /api/quotes` - Get all quotes (admin only)

## Testing Multiple Image Upload

### Using Postman

1. **Login as Admin:**
   \`\`\`
   POST http://localhost:5000/api/auth/login
   Content-Type: application/json
   
   {
     "email": "admin@yoursite.com",
     "password": "admin123"
   }
   \`\`\`

2. **Create Project with Multiple Images:**
   \`\`\`
   POST http://localhost:5000/api/projects
   Authorization: Bearer <your-jwt-token>
   Content-Type: multipart/form-data
   
   Form Data:
   - title: "Beautiful Living Room"
   - location: "New York"
   - category: "Interior Design"
   - description: "Modern living room with multiple angles"
   - images: [file1.jpg, file2.jpg, file3.jpg] (select multiple files)
   \`\`\`

### Using cURL

\`\`\`bash
# Login first
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@yoursite.com","password":"admin123"}'

# Create project with multiple images
curl -X POST http://localhost:5000/api/projects \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "title=Beautiful Kitchen" \
  -F "location=Los Angeles" \
  -F "category=Kitchen Design" \
  -F "description=Modern kitchen with island" \
  -F "images=@image1.jpg" \
  -F "images=@image2.jpg" \
  -F "images=@image3.jpg"
\`\`\`

## Project Structure

\`\`\`
src/
├── config/
│   ├── database.ts          # MongoDB connection
│   └── cloudinary.js        # Cloudinary configuration
├── controllers/
│   ├── auth.controller.ts   # Authentication logic
│   ├── projects.controller.ts # Project CRUD with multiple images
│   └── quotes.controller.ts # Quote handling
├── middlewares/
│   ├── auth.middleware.ts   # JWT authentication
│   ├── upload.middleware.ts # Multer file upload (updated for multiple)
│   ├── validation.middleware.ts # Request validation
│   ├── error.middleware.ts  # Error handling
│   └── notFound.middleware.ts # 404 handler
├── models/
│   ├── Project.ts          # Project schema (images array)
│   ├── Quote.ts            # Quote schema
│   └── User.ts             # User schema
├── routes/
│   ├── auth.routes.ts      # Auth endpoints
│   ├── projects.routes.ts  # Project endpoints (updated)
│   └── quotes.routes.ts    # Quote endpoints
├── services/
│   ├── cloudinary.service.ts # Image upload service (updated)
│   └── email.service.ts    # Email notifications
├── validators/
│   └── project.validator.ts # Request validation schemas
├── app.ts                  # Express app setup
└── server.ts              # Server startup
\`\`\`

## Key Features Explained

### Multiple Image Upload Flow

1. **Frontend**: Send FormData with multiple files under 'images' field
2. **Multer**: Processes up to 10 files, stores in memory
3. **Controller**: Receives files array, uploads each to Cloudinary
4. **Cloudinary**: Optimizes images, returns secure URLs
5. **Database**: Stores array of image URLs in MongoDB

### Image Optimization

All uploaded images are automatically:
- Resized to max 1200x800px
- Compressed with auto quality
- Converted to optimal format (WebP when supported)
- Stored in organized Cloudinary folders

### Security Features

- JWT authentication for admin endpoints
- Rate limiting (100 requests per 15 minutes)
- File type validation (images only)
- File size limits (5MB per file)
- CORS protection
- Helmet security headers

## Troubleshooting

### Common Issues

1. **"Only image files are allowed"**
   - Ensure you're uploading image files (jpg, png, gif, webp)

2. **"Failed to upload images"**
   - Check Cloudinary credentials in .env
   - Verify internet connection

3. **"Unauthorized"**
   - Login first to get JWT token
   - Include token in Authorization header

4. **Database connection errors**
   - Ensure MongoDB is running
   - Check MONGO_URI in .env

### Debug Mode

Enable debug logging by adding to your .env:
\`\`\`env
DEBUG=true
\`\`\`

## Production Deployment

1. Set `NODE_ENV=production`
2. Use production email settings
3. Set up proper MongoDB Atlas connection
4. Configure proper CORS origins
5. Use environment-specific Cloudinary folders

## License

MIT License - feel free to use this in your projects!
