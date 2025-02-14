// Notification.js
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Notification = ({ showNotification, isWishlisted }) => {
  return (
    <AnimatePresence>
      {showNotification && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 20 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-0 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-lg z-50"
        >
          {isWishlisted ? 'Added to wishlist!' : 'Removed from wishlist!'}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notification;