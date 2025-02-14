// app/products/[id]/page.js
'use client'

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Breadcrumb from '@/src/utils/Breadcrumb';
import ProductImageGallery from '@/src/utils/ProductImageGallery';
import ProductInfo from '@/src/components/products page/ProductInfo';
import ProductTabs from '@/src/components/products page/ProductTabs';
import ContactModal from '@/src/components/supplier page/ContactModal';
import FloatingContactButton from '@/src/utils/FloatingContactButton';
import Notification from '@/src/utils/Notification';
import Loading from '@/src/utils/Loading';
import ProgressBar from '@/src/utils/ProgressBar';

const ProductDetailsPage = () => {
  const params = useParams();
  const [activeTab, setActiveTab] = useState('description');
  const [selectedImage, setSelectedImage] = useState(0);
  const [product, setProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showShareTooltip, setShowShareTooltip] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [scrollProgress, setScrollProgress] = useState(0);
  const imageRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(currentProgress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchProduct = () => {
      // Sample product data
      const sampleProduct = {
        id: params.id,
        name: `Premium Steel ${params.id === "1" ? "Bars" : params.id === "2" ? "Sheets" : "Tubes"}`,
        price: 299.99,
        moq: 100,
        rating: 4.5,
        supplier: "MetalWorks Inc.",
        supplierRating: 4.8,
        location: "Shanghai, China",
        yearEstablished: 2005,
        responseTime: "≤24h",
        deliveryTime: "15-20 days",
        description: `High-quality steel ${params.id === "1" ? "bars" : params.id === "2" ? "sheets" : "tubes"} perfect for industrial applications. Features excellent durability and precision manufacturing. Our products meet international standards and are suitable for various industrial applications. Each piece undergoes rigorous quality control to ensure consistent performance and reliability.`,
        features: [
          "Premium grade stainless steel",
          "Precision engineered dimensions",
          "Corrosion resistant",
          "High tensile strength",
          "Quality certified",
          "Custom specifications available"
        ],
        specifications: {
          material: "304 Stainless Steel",
          thickness: "2.5mm",
          dimensions: params.id === "1" ? "6m length" : params.id === "2" ? "1000mm x 2000mm" : "50mm diameter",
          finish: "Brushed",
          hardness: "HRB 80",
          certification: "ISO 9001:2015",
          tolerance: "±0.1mm",
          packaging: "Standard export package"
        },
        shipping: {
          methods: [
            { name: "Sea Freight", time: "15-20 days", cost: "Calculated by volume" },
            { name: "Air Freight", time: "5-7 days", cost: "Calculated by weight" },
            { name: "Express", time: "3-5 days", cost: "Door to door service" }
          ],
          payment: [
            "Trade Assurance",
            "T/T (Bank Transfer)",
            "L/C (Letter of Credit)",
            "Western Union"
          ],
          certificates: ["ISO 9001", "CE", "RoHS"]
        },
        images: [
          "https://www.toplevelcnc.com/wp-content/uploads/2022/12/MONO-Rotor-.jpg",
          "https://www.toplevelcnc.com/wp-content/uploads/2022/12/MONO-Stator.jpg",
          "https://www.toplevelcnc.com/wp-content/uploads/2022/12/MONO-Drive-Shaft-.jpg",
          "https://www.toplevelcnc.com/wp-content/uploads/2022/12/MONO-Drive-Shaft-.jpg"
        ],
        reviews: [
          {
            id: 1,
            user: "John D.",
            rating: 5,
            comment: "Excellent quality and fast shipping. Will order again.",
            date: "2024-01-15",
            helpful: 12,
            replies: 2,
            verified: true
          },
          {
            id: 2,
            user: "Jane Smith",
            rating: 4,
            comment: "Good product for the price, but shipping was a bit slow.",
            date: "2024-02-01",
            helpful: 8,
            replies: 1,
            verified: true
          },
          {
            id: 3,
            user: "Mike Johnson",
            rating: 5,
            comment: "Excellent service and product quality. The supplier was very responsive to our inquiries.",
            date: "2024-02-15",
            helpful: 15,
            replies: 3,
            verified: true
          },
          {
            id: 4,
            user: "Emily Brown",
            rating: 3,
            comment: "The product was as described, but the packaging could have been better.",
            date: "2024-03-01",
            helpful: 5,
            replies: 1,
            verified: true
          },
          {
            id: 5,
            user: "David Wilson",
            rating: 4,
            comment: "Overall a good purchase. Would recommend for industrial applications.",
            date: "2024-03-15",
            helpful: 9,
            replies: 0,
            verified: true
          }
        ],
        faqs: [
          {
            id: 1,
            question: "What is the lead time for orders?",
            answer: "Lead times vary depending on the order quantity and specifications. Standard orders typically ship within 15-20 days. For urgent orders, please contact us for expedited processing options."
          },
          {
            id: 2,
            question: "What are your payment terms?",
            answer: "We accept multiple payment methods including Trade Assurance, T/T (Bank Transfer), L/C (Letter of Credit), and Western Union. Standard payment terms are 30% deposit, 70% before shipment."
          },
          {
            id: 3,
            question: "Do you offer custom sizes?",
            answer: "Yes, we offer custom sizes for many of our products. Custom orders may require a higher MOQ and longer lead time. Please contact us with your specific requirements for detailed information."
          },
          {
            id: 4,
            question: "What quality certifications do you have?",
            answer: "Our products are certified with ISO 9001:2015, CE, and RoHS. We can provide all relevant certification documents upon request."
          },
          {
            id: 5,
            question: "Can you provide samples?",
            answer: "Yes, we provide samples for quality verification. Sample costs can be refunded on bulk orders. Standard sample delivery time is 7-10 days."
          }
        ]
      };

      setProduct(sampleProduct);
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  const handleContactSupplier = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleQuantityChange = (value) => {
    const newQuantity = Math.max(1, value);
    setQuantity(newQuantity);
  };

  const handleShare = () => {
    // Implement share functionality
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const breadcrumbSegments = [
    { label: 'Home', href: '/' },
    { label: 'Industrial Supplies', href: '/supplies' },
    { label: product?.name || 'Loading...', href: '#' },
  ];

  if (!product) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <ProgressBar scrollProgress={scrollProgress} />
      <Notification showNotification={showNotification} isWishlisted={isWishlisted} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="px-4 py-2 sm:px-8 sm:py-4 border-b border-gray-100">
            <Breadcrumb segments={breadcrumbSegments} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-12 p-4 sm:p-8">
            <ProductImageGallery
              images={product.images}
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
              isWishlisted={isWishlisted}
              handleWishlist={handleWishlist}
              handleShare={handleShare}
              showShareTooltip={showShareTooltip}
            />

            <ProductInfo
              product={product}
              quantity={quantity}
              handleQuantityChange={handleQuantityChange}
              handleContactSupplier={handleContactSupplier}
            />
          </div>

          <ProductTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            product={product}
          />
        </motion.div>
      </div>

      <ContactModal isModalOpen={isModalOpen} handleCloseModal={handleCloseModal} />
      <FloatingContactButton handleContactSupplier={handleContactSupplier} />
    </div>
  );
};

export default ProductDetailsPage;