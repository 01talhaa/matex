'use client'

import { useParams } from 'next/navigation';
// import ProductListingPage from '@/components/ProductListingPage';
import ProductListingPage from '@/src/components/products page/ProductListingPage';
import Header from '@/src/components/homepage/Header';
import Footer from '@/src/components/homepage/Footer';

export default function Page() {
    const params = useParams();
    return (
        <>
        <div className=''>
        {/* <Header/> */}

        </div>
    <ProductListingPage subCategoryId={parseInt(params.id)} /> 
    <Footer/>
        </>
);
}