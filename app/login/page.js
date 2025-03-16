'use client'
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaUserTie, FaShoppingCart, FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";

const LoginPage = () => {
    const [selectedRole, setSelectedRole] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    // Check if user is already logged in when component loads
    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        const isLoggedInCookie = document.cookie
            .split('; ')
            .find(row => row.startsWith('logged_in='));
            
        if (userInfo && isLoggedInCookie) {
            // User is already logged in, redirect to appropriate dashboard
            const user = JSON.parse(userInfo);
            if (user.role === 'supplier') {
                router.push('/supplier-dashboard');
            } else {
                router.push('/buyer-dashboard');
            }
        }
    }, [router]);

    const roles = [
        {
            name: "Supplier",
            icon: FaUserTie,
            description: "Access your supplier dashboard"
        },
        {
            name: "Buyer",
            icon: FaShoppingCart,
            description: "Sign in to your buyer account"
        },
    ];

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginError('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Store user info in localStorage for the Header component
                localStorage.setItem('userInfo', JSON.stringify(data.user));
                
                // Redirect based on user role
                if (data.user.role === 'supplier') {
                    router.push('/supplier-dashboard');
                } else {
                    router.push('/buyer-dashboard');
                }
                
                // Optional: Reload to ensure header state updates
                // setTimeout(() => window.location.reload(), 100);
            } else {
                setLoginError(data.message || 'Invalid credentials');
            }
        } catch (error) {
            console.error("Login failed:", error);
            setLoginError('An error occurred during login');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 flex items-center justify-center p-6">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-purple-200 to-indigo-200 rounded-full blur-3xl opacity-30 animate-pulse" />
            <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-tr from-indigo-200 to-blue-200 rounded-full blur-3xl opacity-30 animate-pulse" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 w-full max-w-md border border-white/20"
            >
                <div className="absolute -top-14 left-1/2 transform -translate-x-1/2">
                    <div className="bg-white w-28 h-28 rounded-2xl shadow-lg flex items-center justify-center p-6 border border-indigo-50">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                            Hi!
                        </h1>
                    </div>
                </div>

                <div className="mt-16">
                    <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">Welcome Back</h2>
                    <p className="text-center text-gray-600 mb-8">Sign in to continue</p>

                    {loginError && (
                        <motion.div 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" 
                            role="alert"
                        >
                            <strong className="font-bold">Error:</strong>
                            <span className="block sm:inline"> {loginError}</span>
                        </motion.div>
                    )}

                    {!selectedRole ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="grid grid-cols-1 gap-4 mb-6">
                                {roles.map((role) => (
                                    <motion.button
                                        key={role.name}
                                        whileHover={{ scale: 1.02, backgroundColor: "#F5F7FF" }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setSelectedRole(role.name)}
                                        className="group flex items-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-indigo-50"
                                    >
                                        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 rounded-xl group-hover:scale-110 transition-transform duration-200">
                                            <role.icon className="text-2xl text-white" />
                                        </div>
                                        <div className="ml-4 text-left">
                                            <h3 className="text-lg font-semibold text-gray-800">{role.name}</h3>
                                            <p className="text-sm text-gray-600">{role.description}</p>
                                        </div>
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.form
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4 }}
                            className="space-y-6"
                            onSubmit={handleLogin}
                        >
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-white/50 border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                <input
                                    type="password"
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-white/50 border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-3 px-6 text-white font-medium rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 disabled:opacity-70"
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Signing In...
                                    </div>
                                ) : (
                                    `Sign In as ${selectedRole}`
                                )}
                            </motion.button>

                            <motion.button
                                type="button"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setSelectedRole(null)}
                                className="flex items-center justify-center w-full py-2 text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
                                disabled={isLoading}
                            >
                                <FaArrowLeft className="mr-2" />
                                Back to role selection
                            </motion.button>
                        </motion.form>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;