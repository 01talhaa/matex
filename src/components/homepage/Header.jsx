'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className={`text-2xl font-bold ${isScrolled ? 'text-blue-600' : 'text-white'}`}>
            RawMat
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/categories" className={`transition ${isScrolled ? 'hover:text-blue-600 text-black' : 'hover:text-blue-600 text-white'}`}>Categories</Link>
            <Link href="/suppliers" className={`transition ${isScrolled ? 'hover:text-blue-600 text-black' : 'hover:text-blue-600 text-white'}`}>Suppliers</Link>
            <Link href="/pricing" className={`transition ${isScrolled ? 'hover:text-blue-600 text-black' : 'hover:text-blue-600 text-white'}`}>Pricing</Link>
            <div className="relative group">
              <button className={`transition ${isScrolled ? 'hover:text-blue-600 text-black' : 'hover:text-blue-600 text-white'}`}>Resources</button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 hidden group-hover:block">
                <Link href="/blog" className="block px-4 py-2 hover:bg-blue-50">Blog</Link>
                <Link href="/guides" className="block px-4 py-2 hover:bg-blue-50">Guides</Link>
                <Link href="/market-insights" className="block px-4 py-2 hover:bg-blue-50">Market Insights</Link>
              </div>
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Link href="/login" className={`px-4 py-2 rounded-lg hover:bg-gray-100 transition ${isScrolled ? 'text-black' : 'text-white'}`}>Login</Link>
            <Link href="/register" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;