// src/app/api/auth/register/route.js
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import connectToDatabase from '@/src/lib/db';
import User from '@/src/lib/models/User';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb', // Increase body size limit for base64 images
    },
    responseLimit: false, // Remove response size limit
  },
};

export async function POST(req) {
    try {
        console.log("Registration route hit");

        // Connect to the database first
        try {
            await connectToDatabase();
            console.log("Database connected");
        } catch (dbError) {
            console.error("Database connection failed:", dbError);
            return NextResponse.json({ 
                message: "Database connection failed", 
                details: dbError.message 
            }, { status: 500 });
        }

        // Parse request body with a timeout
        let body;
        try {
            const bodyText = await req.text();
            body = JSON.parse(bodyText);
            console.log("Request body processed");
        } catch (parseError) {
            console.error("Failed to parse request body:", parseError);
            return NextResponse.json({ 
                message: "Invalid request format", 
                details: parseError.message 
            }, { status: 400 });
        }

        // Extract data from request
        const { email, password, role, kycImage, documents, documentPreviews, ...otherData } = body;

        // Basic validation
        if (!email || !password || !role) {
            console.log("Missing required fields");
            return NextResponse.json({ message: "Missing email, password or role" }, { status: 400 });
        }

        // Check for existing user
        const existingUser = await User.findOne({ email }).lean();
        if (existingUser) {
            console.log("Email already taken");
            return NextResponse.json({ message: "Email is already taken" }, { status: 400 });
        }

        // Normalize role
        const normalizedRole = role.toLowerCase();
        if (!['buyer', 'supplier'].includes(normalizedRole)) {
            return NextResponse.json({ 
                message: "Invalid role. Role must be either 'buyer' or 'supplier'." 
            }, { status: 400 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Process user data
        const userData = {
            email,
            password: hashedPassword,
            role: normalizedRole,
            ...otherData
        };
        
        // Handle image uploads more efficiently
        if (kycImage) {
            // For buyers with KYC verification image
            userData.kycImage = kycImage;
            console.log("KYC image processed");
        }
        
        // For suppliers with document uploads
        if (documentPreviews && Array.isArray(documentPreviews) && documentPreviews.length > 0) {
            // Use documentPreviews instead of documents (these are already base64)
            userData.documents = documentPreviews;
            console.log(`Processing ${documentPreviews.length} document(s)`);
        }

        // Role-specific validation
        if (normalizedRole === 'supplier' && !userData.companyName) {
            return NextResponse.json({ 
                message: "Company name is required for suppliers" 
            }, { status: 400 });
        }

        // Create user
        try {
            // Create a new user instance
            const newUser = new User(userData);
            
            // Save to database
            await newUser.save();
            console.log("New user saved with ID:", newUser._id);

            // Create JWT token
            const jwtSecret = process.env.JWT_SECRET || "default_secret";
            const token = jwt.sign(
                { userId: newUser._id, role: newUser.role, email: newUser.email },
                jwtSecret,
                { expiresIn: '7d' }
            );

            // Prepare user info for response
            const userInfo = {
                id: newUser._id.toString(),
                email: newUser.email,
                role: newUser.role,
            };

            // Create the response
            const response = NextResponse.json({
                user: userInfo,
                token: token, // Send token so client can store it
                message: "User created successfully"
            });
            
            // Set cookies for authentication
            response.cookies.set('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60, // 7 days
                path: '/',
            });

            // Set a login indicator cookie
            response.cookies.set('logged_in', 'true', {
                httpOnly: false, // JavaScript can read this
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60, // 7 days
                path: '/',
            });

            return response;
        } catch (err) {
            console.error("Error creating user:", err);
            
            if (err.code === 11000) {
                return NextResponse.json({ message: "Email already exists" }, { status: 400 });
            }
            
            if (err.name === 'ValidationError') {
                const validationErrors = Object.values(err.errors).map(e => e.message);
                return NextResponse.json({ 
                    message: "Validation error", 
                    details: validationErrors 
                }, { status: 400 });
            }
            
            return NextResponse.json({ 
                message: "Error creating user account", 
                details: err.message 
            }, { status: 500 });
        }
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json({ 
            message: "Internal Server Error", 
            details: error.message 
        }, { status: 500 });
    }
}