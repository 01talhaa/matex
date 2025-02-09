'use client'

import React from 'react';
import Link from 'next/link';
import SubCategories from './SubCategories';

const CategoryDetails = ({ id }) => {
    // Dummy category data
    const categoryData = {
        id: id,
        name: 'Metal & Steel',
        description: 'Explore our comprehensive range of high-quality metals and steel materials for industrial use.',
        image: '/api/placeholder/1600/600',
        subCategories: [
            {
                id: 1,
                name: 'Steel Bars',
                itemCount: 450,
                description: 'High-quality steel bars in various dimensions'
            },
            {
                id: 2,
                name: 'Steel Sheets',
                itemCount: 280,
                description: 'Durable and versatile steel sheets'
            },
            {
                id: 3,
                name: 'Steel Tubes',
                itemCount: 175,
                description: 'Robust and reliable steel tubes for various applications'
            }
        ],
        specifications: [
            'Quality certified materials',
            'Bulk ordering available',
            'Direct from manufacturers',
            'Competitive pricing'
        ]
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Hero Section */}
            <div className="relative h-[400px] bg-gray-900">
                <img 
                    src={categoryData.image}
                    alt={categoryData.name}
                    className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold text-white mb-4">{categoryData.name}</h1>
                        <p className="text-gray-200 max-w-3xl mx-auto px-4 text-lg">{categoryData.description}</p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12">
                {/* Breadcrumb */}
                <div className="mb-8">
                    <nav className="flex" aria-label="Breadcrumb">
                        <ol className="flex items-center space-x-2">
                            <li>
                                <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li className="text-gray-400">/</li>
                            <li>
                                <Link href="/categories" className="text-gray-700 hover:text-blue-600 transition-colors">
                                    Categories
                                </Link>
                            </li>
                            <li className="text-gray-400">/</li>
                            <li className="text-gray-900 font-medium">{categoryData.name}</li>
                        </ol>
                    </nav>
                </div>

                {/* Subcategories Section */}
                <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
                    <SubCategories subCategories={categoryData.subCategories} />
                </div>

                {/* Specifications */}
                <div className="bg-white rounded-2xl shadow-md p-8">
                    <h2 className="text-3xl font-semibold mb-6 text-gray-800">Specifications</h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {categoryData.specifications.map((spec, index) => (
                            <li key={index} className="flex items-center text-gray-700">
                                <svg 
                                    className="w-6 h-6 text-green-500 mr-3" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth="2" 
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                                {spec}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CategoryDetails;