'use client'

import { useParams } from 'next/navigation';
// import ProductListingPage from '@/components/ProductListingPage';
import ProductListingPage from '@/src/components/products page/ProductListingPage';

export default function Page() {
    const params = useParams();
    return <ProductListingPage subCategoryId={parseInt(params.id)} />;
}