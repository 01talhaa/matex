// Loading.js
import React from 'react';
import { motion } from 'framer-motion';

const Loading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-900">Loading...</h2>
        <p className="mt-2 text-gray-600">Please wait while we fetch the product details.</p>
      </motion.div>
    </div>
  );
};

export default Loading;