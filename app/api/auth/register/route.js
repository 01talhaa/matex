// src/app/api/auth/register/route.js
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import connectToDatabase from '@/src/lib/db';
import User from '@/src/lib/models/User';

export async function POST(req) {
    try {
        console.log("Registration route hit");

        try {
            await connectToDatabase(); // Establish database connection
            console.log("Database connected");
        } catch (dbError) {
            console.error("Database connection failed:", dbError);
            return NextResponse.json({ 
                message: "Database connection failed", 
                details: dbError.message 
            }, { status: 500 });
        }

        let body;
        try {
            body = await req.json();
            console.log("Request body received:", {
                email: body.email,
                role: body.role,
                // omit password for security
            });
        } catch (parseError) {
            console.error("Failed to parse request body:", parseError);
            return NextResponse.json({ 
                message: "Invalid request format", 
                details: parseError.message 
            }, { status: 400 });
        }

        const { email, password, role, documents, documentPreviews, ...otherData } = body;

        // Validate input (basic) - improve this!
        if (!email || !password || !role) {
            console.log("Missing required fields");
            return NextResponse.json({ message: "Missing email, password or role" }, { status: 400 });
        }

        try {
            const existingUser = await User.findOne({ email });
            console.log("Existing user check complete");
            
            if (existingUser) {
                console.log("Email already taken");
                return NextResponse.json({ message: "Email is already taken" }, { status: 400 });
            }
        } catch (err) {
            console.error("Error checking existing user:", err);
            return NextResponse.json({ message: "Error checking user existence" }, { status: 500 });
        }

        // Convert role to lowercase to match schema enum values
        const normalizedRole = role.toLowerCase();
        
        // Check if the role is valid according to our schema
        if (!['buyer', 'supplier'].includes(normalizedRole)) {
            return NextResponse.json({ 
                message: "Invalid role. Role must be either 'buyer' or 'supplier'." 
            }, { status: 400 });
        }

        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        } catch (hashError) {
            console.error("Password hashing failed:", hashError);
            return NextResponse.json({ 
                message: "Error processing password", 
                details: hashError.message 
            }, { status: 500 });
        }

        // Process file data (if any)
        const userData = {
            email,
            password: hashedPassword,
            role: normalizedRole,
            ...otherData
        };
        
        // Handle documents if they exist (base64 strings)
        if (documents && Array.isArray(documents) && documents.length > 0) {
            userData.documents = documents;
            console.log(`Processing ${documents.length} document(s)`);
        }

        console.log("Preparing user data:", {
            email: userData.email,
            role: userData.role,
            hasDocuments: userData.documents ? true : false,
            documentCount: userData.documents ? userData.documents.length : 0
        });

        try {
            // Ensure all required fields are present according to the role
            if (normalizedRole === 'supplier') {
                // These fields might be important for a supplier
                if (!userData.companyName) {
                    return NextResponse.json({ 
                        message: "Company name is required for suppliers" 
                    }, { status: 400 });
                }
            }

            const newUser = new User(userData);
            await newUser.save();
            console.log("New user saved with ID:", newUser._id);

            // Make sure JWT_SECRET is available
            const jwtSecret = process.env.JWT_SECRET || "default_secret";
            if (process.env.JWT_SECRET === undefined) {
                console.warn("JWT_SECRET not found in environment, using default secret");
            }

            let token;
            try {
                token = jwt.sign(
                    { userId: newUser._id, role: newUser.role, email: newUser.email },
                    jwtSecret,
                    { expiresIn: '7d' }
                );
                console.log("Token created successfully");
            } catch (tokenError) {
                console.error("Failed to generate JWT token:", tokenError);
                return NextResponse.json({ 
                    message: "Failed to generate authentication token", 
                    details: tokenError.message 
                }, { status: 500 });
            }

            const response = NextResponse.json({
                user: {
                    id: newUser._id,
                    email: newUser.email,
                    role: newUser.role,
                },
                message: "User created successfully"
            });
            
            try {
                response.cookies.set('token', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    maxAge: 7 * 24 * 60 * 60, // 7 days
                    path: '/',
                });
            } catch (cookieError) {
                console.error("Failed to set cookie:", cookieError);
                // Continue without setting cookie - at least user was created
            }

            return response;
        } catch (err) {
            console.error("Error saving user or generating token:", err);
            
            // Check for MongoDB duplicate key error
            if (err.code === 11000) {
                return NextResponse.json({ 
                    message: "Email already exists", 
                    details: "This email address is already registered"
                }, { status: 400 });
            }
            
            if (err.name === 'ValidationError') {
                // Handle Mongoose validation errors
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