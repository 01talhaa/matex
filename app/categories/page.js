'use client'

import CategoryHeader from '@/src/components/category page/CategoryHeader'
import CategoryList from '@/src/components/category page/CategoryList'
import FeaturedCategories from '@/src/components/category page/FeaturedCategory'
import Footer from '@/src/components/homepage/Footer'
import React from 'react'

const CategoryPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <CategoryHeader/>
      
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              Explore Our Categories
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Find everything you need, organized in one place. Browse through our carefully curated categories.
            </p>
          </div>
        </div>
      </div>

      {/* Featured Categories Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Featured Categories</h2>
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <FeaturedCategories />
          </div>
        </div>

        {/* All Categories Section */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">All Categories</h2>
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <CategoryList />
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-blue-600 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Stay Updated with New Categories
            </h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter and be the first to know about new categories and exclusive offers.
            </p>
            <div className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-lg px-4 py-2 border-0 focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default CategoryPage