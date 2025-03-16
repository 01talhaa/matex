// Test route to verify database connection
import { NextResponse } from 'next/server';
import connectToDatabase from '@/src/lib/db';

export async function GET() {
  try {
    console.log("Testing database connection...");
    
    await connectToDatabase();
    
    return NextResponse.json({ 
      success: true,
      message: "Database connection successful" 
    });
  } catch (error) {
    console.error("Database test failed:", error);
    
    return NextResponse.json({ 
      success: false,
      message: "Database connection failed",
      error: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}