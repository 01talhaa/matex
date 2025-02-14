// ProductTabs.js
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductDescriptionTab from './ProductDescriptionTab';
import ProductSpecificationsTab from './ProductSpecificationsTab';
import ProductShippingTab from './ProductShippingTab';
import ProductReviewsTab from './ProductReviewsTab';
import ProductFaqsTab from './ProductFaqsTab';

const ProductTabs = ({ activeTab, setActiveTab, product }) => {

  const tabVariants = {
    inactive: { opacity: 0.7 },
    active: {
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="border-t border-gray-100 mt-4 sm:mt-8">
      <div className="flex justify-center border-b">
        {['description', 'specifications', 'shipping', 'reviews', 'faqs'].map((tab) => (
          <motion.button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 sm:px-8 sm:py-4 text-xs sm:text-sm font-medium relative ${
              activeTab === tab ? 'text-blue-600' : 'text-gray-600'
            }`}
            whileHover={{ scale: 1.05 }}
            variants={tabVariants}
            initial="inactive"
            animate={activeTab === tab ? "active" : "inactive"}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            {activeTab === tab && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                layoutId="activeTab"
              />
            )}
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="p-4 sm:p-8"
        >
          {activeTab === 'description' && <ProductDescriptionTab product={product} />}
          {activeTab === 'specifications' && <ProductSpecificationsTab product={product} />}
          {activeTab === 'shipping' && <ProductShippingTab product={product} />}
          {activeTab === 'reviews' && <ProductReviewsTab product={product} />}
          {activeTab === 'faqs' && <ProductFaqsTab product={product} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ProductTabs;