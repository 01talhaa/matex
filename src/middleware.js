// src/middleware.js
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(req) {
    const token = req.cookies.get('token')?.value;

    const publicPaths = [
        '/',
        '/login',
        '/register',
        '/api/auth/register',
        '/api/auth/login'
    ];

    const isPublicPath = publicPaths.some(path => req.nextUrl.pathname.startsWith(path));

    if (!token && !isPublicPath) {
        return NextResponse.redirect(new URL('/login', req.nextUrl));
    }

    if (token && isPublicPath) {
        return NextResponse.redirect(new URL('/', req.nextUrl));
    }

    try {
        if (token) {
            jwt.verify(token, process.env.JWT_SECRET || "default_secret");
        }
    } catch (error) {
        console.error("Token verification error:", error);
        return NextResponse.redirect(new URL('/login', req.nextUrl));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/login',
        '/register',
        '/',
        '/dashboard',
        '/api/auth/:path*',
    ],
};