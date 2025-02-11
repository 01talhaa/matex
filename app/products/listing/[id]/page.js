'use client'

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import ProductListingPage from '@/src/components/products page/ProductListingPage';
import Footer from '@/src/components/homepage/Footer';

export default function Page() {
    const params = useParams();
    
    return (
        <>
            
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center space-x-2 text-gray-600">
                        <Link 
                            href="/" 
                            className="hover:text-blue-600 transition-colors duration-200 flex items-center"
                        >
                            <Home size={20} className="mr-1" />
                            Home
                        </Link>
                        <ChevronRight size={16} />
                        <span className="text-gray-900">Products</span>
                    </div>
                </div>
            </div>

            <ProductListingPage subCategoryId={parseInt(params.id)} />
            <Footer />
        </>
    );
}