import React from 'react';

const SupplierReviewAndRatings = ({ supplierId }) => {
  // Replace with actual data fetching logic
  const reviews = [
    { id: 1, author: 'John Doe', rating: 5, comment: 'Excellent service!' },
    { id: 2, author: 'Jane Smith', rating: 4, comment: 'Good quality products.' },
  ];

  return (
    <div className="p-8 border-t border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Ratings & Reviews
      </h2>
      {reviews.map((review) => (
        <div
          key={review.id}
          className="mb-6 p-6 bg-gray-50 rounded-lg shadow-sm"
        >
          <div className="flex items-center mb-3">
            <span className="font-semibold text-gray-700">{review.author}</span>
            <span className="ml-2 text-yellow-500">
              {'⭐'.repeat(review.rating)}
            </span>
          </div>
          <p className="text-gray-700">{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default SupplierReviewAndRatings;