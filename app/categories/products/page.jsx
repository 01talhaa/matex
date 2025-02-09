import { Suspense } from 'react';
import ProductDetailsPage from "@/src/components/products page/Details";

const Page = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <ProductDetailsPage/>
      </Suspense>
    </div>
  );
};

export default Page;