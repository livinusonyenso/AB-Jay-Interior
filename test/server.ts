import dotenv from 'dotenv';
import { connectDatabase } from './config/database';
import app from './app';
const cors = require('cors');

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 4000;
 


// // Or allow all origins (for development only)
app.use(cors({
  origin: '*',
  credentials: true
}));
async function startServer(): Promise<void> {
  try {
    // Connect to MongoDB
    await connectDatabase();
    console.log('✅ Database connected successfully');

    // Start the server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📍 Environment: ${process.env.NODE_ENV}`);
      console.log(`🔗 API Base URL: http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully...');
  process.exit(0);
});

startServer();