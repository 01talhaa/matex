import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

const ProductFaqsTab = ({ product }) => {
  return (
    <div className="space-y-4 sm:space-y-6">
      {product.faqs.map((faq, index) => (
        <motion.div
          key={faq.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-gray-50 p-4 sm:p-6 rounded-xl"
        >
          <h3 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2 flex items-center">
            <AlertCircle 
              className="w-4 h-4 md:w-5 md:h-5 text-blue-600 mr-2" 
            />
            {faq.question}
          </h3>
          <p className="text-gray-600">{faq.answer}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default ProductFaqsTab;