'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, User, LogOut, Settings, ShoppingBag, Package, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie'; // Optional: You can add js-cookie for better cookie handling

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const router = useRouter();
  
  // Custom auth state management
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userRole, setUserRole] = useState('guest');

  // Check authentication status on component mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Function to check if user is logged in
  const checkAuthStatus = () => {
    // Check for login indicator cookie
    const isLoggedInCookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('logged_in='));
    
    // Get user info from localStorage
    const userInfoFromStorage = localStorage.getItem('userInfo');
    
    if (isLoggedInCookie && userInfoFromStorage) {
      // If both cookie and localStorage have user data, user is logged in
      const userInfo = JSON.parse(userInfoFromStorage);
      setIsLoggedIn(true);
      setUserEmail(userInfo.email || '');
      setUserRole(userInfo.role || 'guest');
    } else {
      // Otherwise, user is not logged in
      setIsLoggedIn(false);
      setUserEmail('');
      setUserRole('guest');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      // Delete the cookie or token 
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      
      // Clear user data from localStorage if exists
      localStorage.removeItem('userInfo');
      
      // Update state
      setIsLoggedIn(false);
      setUserEmail('');
      setUserRole('guest');
      
      // Redirect to homepage
      router.push('/');
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const menuItems = [
    { label: 'Categories', href: '/categories' },
    { label: 'Suppliers', href: '/suppliers' },
    { label: 'Pricing', href: '/pricing' },
    {
      label: 'Resources',
      children: [
        { label: 'Blog', href: '/blog' },
        { label: 'Guides', href: '/guides' },
        { label: 'Market Insights', href: '/market-insights' }
      ]
    }
  ];

  // Add user-specific menu items based on role
  const userMenuItems = isLoggedIn ? [
    { 
      label: 'Profile',
      icon: <User className="w-4 h-4 mr-2" />,
      href: '/profile'
    },
    {
      label: userRole === 'buyer' ? 'My Orders' : 'My Products',
      icon: userRole === 'buyer' ? <ShoppingBag className="w-4 h-4 mr-2" /> : <Package className="w-4 h-4 mr-2" />,
      href: userRole === 'buyer' ? '/orders' : '/products'
    },
    {
      label: 'Settings',
      icon: <Settings className="w-4 h-4 mr-2" />,
      href: '/settings'
    },
    {
      label: 'Logout',
      icon: <LogOut className="w-4 h-4 mr-2" />,
      onClick: handleLogout
    }
  ] : [];

  // Helper function to get user initials
  const getUserInitials = () => {
    if (!userEmail) return 'U';
    return userEmail.slice(0, 2).toUpperCase();
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className={`text-2xl font-bold tracking-tight ${
              isScrolled ? 'text-blue-600' : 'text-white'
            }`}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              RawMat
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <div key={item.label} className="relative group">
                {item.children ? (
                  <button
                    className={`flex items-center space-x-1 group transition ${
                      isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'
                    }`}
                    onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                  >
                    <span>{item.label}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={`transition ${
                      isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'
                    }`}
                  >
                    {item.label}
                  </Link>
                )}

                {/* Dropdown Menu */}
                {item.children && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Auth Buttons or User Menu */}
          <div className="hidden lg:flex items-center space-x-4">
            {!isLoggedIn ? (
              // Show Login/Register for logged out users
              <>
                <Link
                  href="/login"
                  className={`px-4 py-2 rounded-lg transition ${
                    isScrolled 
                      ? 'text-gray-700 hover:bg-gray-100' 
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition transform hover:scale-105"
                >
                  Register
                </Link>
              </>
            ) : (
              // Show user menu for logged in users
              <div className="flex items-center space-x-4">
                {/* Notifications */}
                <button className="relative p-2 rounded-full hover:bg-gray-100/10">
                  <Bell className={isScrolled ? "h-5 w-5 text-gray-700" : "h-5 w-5 text-white"} />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                
                {/* User Profile Dropdown */}
                <div className="relative">
                  <button 
                    onClick={() => setActiveDropdown(activeDropdown === 'profile' ? null : 'profile')}
                    className="flex items-center space-x-2"
                  >
                    <div className={`h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center ${
                      isScrolled ? 'text-blue-600' : 'text-blue-600 ring-2 ring-white'
                    }`}>
                      <span className="font-medium text-sm">
                        {getUserInitials()}
                      </span>
                    </div>
                    <ChevronDown className={`w-4 h-4 ${isScrolled ? 'text-gray-700' : 'text-white'}`} />
                  </button>

                  {/* User Dropdown Menu */}
                  {activeDropdown === 'profile' && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl py-2">
                      {/* User Info */}
                      <div className="px-4 py-3 border-b">
                        <p className="text-sm font-medium text-gray-900">{userEmail || 'User'}</p>
                        <p className="text-xs text-gray-500 capitalize">{userRole}</p>
                      </div>

                      {/* Menu Items */}
                      <div className="py-1">
                        {userMenuItems.map((item, index) => (
                          <div key={item.label}>
                            {item.onClick ? (
                              <button
                                onClick={item.onClick}
                                className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                              >
                                {item.icon}
                                {item.label}
                              </button>
                            ) : (
                              <Link
                                href={item.href}
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                              >
                                {item.icon}
                                {item.label}
                              </Link>
                            )}
                            {index === userMenuItems.length - 2 && (
                              <div className="border-t my-1"></div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100/10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className={`w-6 h-6 ${isScrolled ? 'text-gray-700' : 'text-white'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isScrolled ? 'text-gray-700' : 'text-white'}`} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t mt-2"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              {/* User Info for Mobile (if logged in) */}
              {isLoggedIn && (
                <div className="flex items-center space-x-3 px-2 py-3 bg-gray-50 rounded-lg mb-4">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <span className="font-medium">{getUserInitials()}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{userEmail}</p>
                    <p className="text-xs text-gray-500 capitalize">{userRole}</p>
                  </div>
                </div>
              )}
              
              {/* Regular Menu Items */}
              {menuItems.map((item) => (
                <div key={item.label}>
                  {item.children ? (
                    <div className="space-y-2">
                      <button
                        onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                        className="flex items-center justify-between w-full text-gray-700 hover:text-blue-600"
                      >
                        <span>{item.label}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${
                          activeDropdown === item.label ? 'rotate-180' : ''
                        }`} />
                      </button>
                      {activeDropdown === item.label && (
                        <div className="pl-4 space-y-2">
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              className="block text-gray-600 hover:text-blue-600"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="block text-gray-700 hover:text-blue-600"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
              
              {/* User Menu Items (if logged in) */}
              {isLoggedIn ? (
                <div className="pt-4 space-y-2 border-t">
                  {userMenuItems.map((item) => (
                    <div key={item.label}>
                      {item.onClick ? (
                        <button
                          onClick={item.onClick}
                          className="flex items-center w-full py-2 text-gray-700 hover:text-blue-600"
                        >
                          {item.icon}
                          {item.label}
                        </button>
                      ) : (
                        <Link
                          href={item.href}
                          className="flex items-center py-2 text-gray-700 hover:text-blue-600"
                        >
                          {item.icon}
                          {item.label}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="pt-4 space-y-2">
                  <Link
                    href="/login"
                    className="block w-full px-4 py-2 text-center text-gray-700 rounded-lg border hover:bg-gray-50"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="block w-full px-4 py-2 text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Header;