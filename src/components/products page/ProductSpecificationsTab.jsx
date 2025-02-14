// ProductSpecificationsTab.js
import React from 'react';
import { motion } from 'framer-motion';

const ProductSpecificationsTab = ({ product }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
      {Object.entries(product.specifications).map(([key, value], index) => (
        <motion.div
          key={key}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-gray-50 p-4 sm:p-6 rounded-xl"
        >
          <div className="text-gray-600 mb-1 sm:mb-2">{key}</div>
          <div className="font-semibold text-gray-900">{value}</div>
        </motion.div>
      ))}
    </div>
  );
};

export default ProductSpecificationsTab;