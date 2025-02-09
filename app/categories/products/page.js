'use client';

import React from 'react';
import ProductDetails from '@/app/products/[id]/page';
import { useRouter, useSearchParams  } from 'next/navigation';


const ProductDetailsPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const productId = searchParams.get('id');

    if (!productId) {
      return <div className="text-center py-12">No product ID provided</div>;
    }
  
    const parsedProductId = parseInt(productId, 10);

    if (isNaN(parsedProductId)) {
      return <div className="text-center py-12">Invalid product ID</div>
    }


    return <ProductDetails productId={parsedProductId} />;
};

export default ProductDetailsPage;