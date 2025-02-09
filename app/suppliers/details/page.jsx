import { Suspense } from 'react';
import SupplierDetailsPage from "@/src/components/supplier page/SupplierDetailsPage";

const Page = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading supplier details...</div>}>
        <SupplierDetailsPage />
      </Suspense>
    </div>
  );
};

export default Page;