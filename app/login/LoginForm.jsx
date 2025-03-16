'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaEnvelope, FaLock, FaSpinner } from 'react-icons/fa';

export default function LoginForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            // Save user info in localStorage for the Header component to use
            localStorage.setItem('userInfo', JSON.stringify(data.user));

            // Redirect to appropriate dashboard based on user role
            if (data.user.role === 'supplier') {
                router.push('/supplier-dashboard');
            } else {
                router.push('/buyer-dashboard');
            }
            
            // Reload the page to update the header state
            // Alternatively, you could use a global state management solution
            setTimeout(() => window.location.reload(), 100);
        } catch (err) {
            setError(err.message || 'An error occurred during login');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Log In to Your Account</h2>
            
            {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                    {error}
                </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaEnvelope className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="pl-10 block w-full rounded-lg border border-gray-300 bg-gray-50 py-3 px-4 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                            placeholder="you@example.com"
                        />
                    </div>
                </div>
                
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaLock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className="pl-10 block w-full rounded-lg border border-gray-300 bg-gray-50 py-3 px-4 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                            placeholder="••••••••"
                        />
                    </div>
                </div>
                
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                            Remember me
                        </label>
                    </div>
                    <div className="text-sm">
                        <Link href="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                            Forgot password?
                        </Link>
                    </div>
                </div>
                
                <button
                    type="submit"
                    disabled={isLoading}
                    className="flex justify-center items-center w-full rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 py-3 px-4 text-white shadow-md hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-75"
                >
                    {isLoading ? (
                        <>
                            <FaSpinner className="animate-spin mr-2" />
                            Logging in...
                        </>
                    ) : (
                        'Log In'
                    )}
                </button>
            </form>
            
            <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
}