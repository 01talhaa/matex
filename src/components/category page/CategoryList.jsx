'use client'
import React, { useState } from 'react';
import CategoryCard from './CategoryCard';

const CategoryList = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const categories = [
        {
            id: 1,
            name: 'Metal & Steel',
            image: 'https://www.toplevelcnc.com/wp-content/uploads/2021/04/Copper-tubes-.jpg',
            description: 'High-quality metals and steel materials',
            itemCount: 1240,
            subCategories: 8,
            featured: true,
            type: 'metal'
        },
        // Add more categories as needed
    ];

    const filterCategories = () => {
        return categories.filter(category => {
            const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesType = activeCategory === 'all' || category.type === activeCategory;
            return matchesSearch && matchesType;
        });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                <div className="w-full md:w-1/3 mb-4 md:mb-0">
                    <input
                        type="text"
                        placeholder="Search categories..."
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                
                <div className="flex space-x-2 overflow-x-auto">
                    <button
                        className={`px-4 py-2 rounded-lg ${
                            activeCategory === 'all' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-200 text-gray-700'
                        }`}
                        onClick={() => setActiveCategory('all')}
                    >
                        All
                    </button>
                    {/* Add more filter buttons as needed */}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filterCategories().map((category) => (
                    <CategoryCard key={category.id} category={category} />
                ))}
            </div>
        </div>
    );
};

export default CategoryList;