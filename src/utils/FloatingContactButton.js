// FloatingContactButton.js
import React from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

const FloatingContactButton = ({ handleContactSupplier }) => {
  return (
    <motion.div
      className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 space-y-2 sm:space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-blue-600 text-white p-3 sm:p-4 rounded-full shadow-lg flex items-center justify-center"
        onClick={handleContactSupplier}
      >
        <Mail className="w-4 h-4 sm:w-6 sm:h-6" />
      </motion.button>
    </motion.div>
  );
};

export default FloatingContactButton;