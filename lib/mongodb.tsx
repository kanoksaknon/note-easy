import mongoose from 'mongoose';

export const connectMongoDB = async (): Promise<void> => {
  if (mongoose.connection.readyState === 1) {
    console.log('MongoDB is already connected');
    return;
  }

  try {
    const mongodbUri = process.env.MONGODB_URI;
    if (!mongodbUri) {
      throw new Error('MONGODB_URI is not defined in the environment variables');
    }

    await mongoose.connect(mongodbUri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};