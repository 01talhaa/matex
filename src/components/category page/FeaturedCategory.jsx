// components/FeaturedCategories.jsx
import React from 'react';
import Link from 'next/link';

const FeaturedCategories = () => {
    const featuredCategories = [
        {
            id: 1,
            name: 'Metal & Steel',
            image: 'https://www.toplevelcnc.com/wp-content/uploads/2021/04/Copper-tubes-.jpg',
            // image: '/api/placeholder/300/200',
            description: 'High-quality metals and steel materials',
            itemCount: 1240
        },
        {
            id: 2,
            name: 'Textiles & Fabrics',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6U3oL0dTRCMD_Xccde7-HrfK0p4ZB50ZSzQ&s',
            description: 'Premium quality fabrics and textile materials',
            itemCount: 890
        },
        {
            id: 3,
            name: 'Construction',
            image: 'https://static.vecteezy.com/system/resources/previews/000/653/184/non_2x/contruction-site-cartoon-vector.jpg',
            description: 'Essential construction materials',
            itemCount: 670
        },
        {
            id: 4,
            name: 'Plastics & Polymers',
            image: 'https://www.denetim.com/images/polimer-ve-plastik-denetimleri.jpg',
            description: 'Industrial grade plastics and polymers',
            itemCount: 450
        }
    ];

    return (
        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-gray-800 mb-8">Featured Categories</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featuredCategories.map((category) => (
                        <Link 
                            href={`/category/${category.id}`} 
                            key={category.id}
                            className="group bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105"
                        >
                            <div className="relative">
                                <img 
                                    src={category.image} 
                                    alt={category.name}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-opacity" />
                            </div>
                            <div className="p-4">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{category.name}</h3>
                                <p className="text-gray-600 text-sm mb-2">{category.description}</p>
                                <p className="text-blue-600 text-sm">{category.itemCount.toLocaleString()} items</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedCategories;