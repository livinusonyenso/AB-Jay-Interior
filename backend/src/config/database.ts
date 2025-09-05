import mongoose from 'mongoose';

export async function connectDatabase(): Promise<void> {
  try {
    const mongoUri = process.env.MONGO_URI;
    
    if (!mongoUri) {
      throw new Error('MONGO_URI environment variable is required');
    }

    await mongoose.connect(mongoUri);
    
    mongoose.connection.on('error', (error) => {
      console.error('MongoDB connection error:', error);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });

  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
}

export async function disconnectDatabase(): Promise<void> {
  await mongoose.disconnect();
}