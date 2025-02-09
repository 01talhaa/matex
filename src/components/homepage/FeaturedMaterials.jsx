import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

function FeaturedMaterials({ materials }) {
  // Ensure materials is an array before attempting to map
  const validMaterials = Array.isArray(materials) ? materials : [];

  return (
    <section className="py-20 container mx-auto px-4">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h2 className="text-3xl font-bold">Featured Materials</h2>
          <p className="text-gray-600 mt-2">Discover high-quality raw materials from verified suppliers</p>
        </div>
        <Link href="/materials" className="text-blue-600 hover:text-blue-700 font-semibold">
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {validMaterials.map((material) => (
          <motion.div
            key={material.id}
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden group"
          >
            <div className="relative h-48">
              <Image
                src={material.image}
                alt={material.name}
                layout="fill"
                objectFit="cover"
                className="group-hover:scale-110 transition-transform duration-300"
              />
              {material.inStock && (
                <span className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-sm">
                  In Stock
                </span>
              )}
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">{material.name}</h3>
                <div className="flex items-center">
                  <span className="text-yellow-400">★</span>
                  <span className="ml-1 text-sm">{material.rating}</span>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-2">{material.category}</p>
              <p className="text-blue-600 font-bold mb-2">{material.price}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">MOQ: {material.moq}</span>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  View Details
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default FeaturedMaterials;