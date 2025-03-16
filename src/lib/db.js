// src/lib/db.js
import mongoose from 'mongoose';

// Get MongoDB URI from environment variable or fallback to a direct value
// This helps debug environment variable loading issues
let MONGODB_URI = process.env.MONGODB_KEY;

// Debug the actual value
console.log("MONGODB_URI from env:", MONGODB_URI);

// Fallback if environment variable is not working properly
if (!MONGODB_URI || MONGODB_URI.includes('<') || MONGODB_URI.includes('iLoveJS')) {
  console.warn("Invalid MongoDB URI in environment variables, using fallback connection string");
  // Use the connection string directly from your .env file
  MONGODB_URI = "mongodb+srv://abstalha192:abstalha192@cluster0.gsjdr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
}

// Validate the connection string
if (!MONGODB_URI || MONGODB_URI.includes('<')) {
  throw new Error(
    'MongoDB connection string is invalid. Please check your .env file.'
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    console.log("Using cached database connection");
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000, // 10 seconds timeout
    };

    console.log(`Connecting to MongoDB with URI: ${MONGODB_URI.substring(0, 20)}...`);
    
    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log("MongoDB connection successful");
        return mongoose;
      })
      .catch(err => {
        console.error("MongoDB connection error:", err);
        cached.promise = null;
        throw err;
      });
  }
  
  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    console.error("Failed to establish database connection:", error);
    throw error;
  }
}

export default connectToDatabase;