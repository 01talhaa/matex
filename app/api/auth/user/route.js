// src/app/api/auth/user/route.js
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectToDatabase from '@/src/lib/db';
import User from '@/src/lib/models/User';

export async function GET(req) {
    try {
        await connectToDatabase();

        const token = req.cookies.get('token')?.value;

        if (!token) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET || "default_secret");

        if (!decodedToken || !decodedToken.userId) {
            return new NextResponse("Invalid token", { status: 401 });
        }

        const user = await User.findById(decodedToken.userId).select('-password'); // Exclude password

        if (!user) {
            return new NextResponse("User not found", { status: 404 });
        }

        return NextResponse.json({ user });

    } catch (error) {
        console.error("Get user error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}