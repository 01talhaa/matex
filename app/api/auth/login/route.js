// src/app/api/auth/login/route.js
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import connectToDatabase from '@/src/lib/db';
import User from '@/src/lib/models/User';

export async function POST(req) {
    try {
        await connectToDatabase();

        const { email, password } = await req.json();

        if (!email || !password) {
            return new NextResponse("Missing email or password", { status: 400 });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return new NextResponse("Invalid credentials", { status: 401 });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return new NextResponse("Invalid credentials", { status: 401 });
        }

        const token = jwt.sign(
            { userId: user._id, role: user.role, email: user.email },
            process.env.JWT_SECRET || "default_secret",
            { expiresIn: '7d' }
        );

        // Create user info object to store in localStorage
        const userInfo = {
            id: user._id.toString(),
            email: user.email,
            role: user.role,
        };

        const response = NextResponse.json({
            user: userInfo,
            token: token, // Send token in response so we can store it client-side
            message: "Login successful"
        });

        // Set HTTP-only cookie for security (backend use)
        response.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60, // 7 days
            path: '/',
        });

        // Set a non-HTTP-only cookie as a login indicator (frontend use)
        // This is just a flag to indicate logged-in state, not the actual token
        response.cookies.set('logged_in', 'true', {
            httpOnly: false, // Client-side JavaScript can read this
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60, // 7 days
            path: '/',
        });

        return response;

    } catch (error) {
        console.error("Login error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}