import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const ProductDescriptionTab = ({ product }) => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <p className="text-gray-600 leading-relaxed">{product.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-4 sm:mt-8">
        <div className="bg-gray-50 p-4 sm:p-6 rounded-xl">
          <h3 className="font-semibold text-base sm:text-lg mb-2 sm:mb-4">Key Features</h3>
          <ul className="space-y-2 sm:space-y-3">
            {product.features.map((feature, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center text-gray-600"
              >
                <CheckCircle 
                  className="w-4 h-4 md:w-5 md:h-5 text-green-600 mr-2" 
                />
                {feature}
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="bg-gray-50 p-4 sm:p-6 rounded-xl">
          <h3 className="font-semibold text-base sm:text-lg mb-2 sm:mb-4">Certifications</h3>
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            {product.shipping.certificates.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-3 sm:p-4 rounded-lg text-center"
              >
                <div className="text-blue-600 font-semibold">{cert}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDescriptionTab;