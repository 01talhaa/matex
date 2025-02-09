'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
// import SupplierDetails from '@/components/SupplierDetails';
import SupplierDetails from '@/src/components/supplier page/SupplierDetails';

const SupplierDetailsPage = () => {
  const searchParams = useSearchParams();
  const [supplier, setSupplier] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const id = searchParams.get('id');

    const fetchSupplier = async () => {
      setLoading(true);
      setError(null);

      try {
        // Simulate API call
        const simulatedSupplier = {
          id: id,
          name: 'Acme Corp',
          location: 'Dhaka, Bangladesh',
          businessType: 'Manufacturer',
          isVerified: true,
          products: ['Cotton Yarn', 'Polyester Fabric', 'Raw Denim'],
        };
        await new Promise(resolve => setTimeout(resolve, 1000));

        setSupplier(simulatedSupplier);
      } catch (err) {
        console.error("Error fetching supplier:", err);
        setError("Failed to load supplier details.");
      } finally {
        setLoading(false);
      }
    };
     if(id)
     {
          fetchSupplier();
     }

  }, [searchParams]);

  if (loading) {
    return <div>Loading supplier details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!supplier) {
    return <div>Supplier not found.</div>;
  }

  return <SupplierDetails supplier={supplier} />;
};

export default SupplierDetailsPage;