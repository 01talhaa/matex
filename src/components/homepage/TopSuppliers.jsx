import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import { FiCheckCircle } from 'react-icons/fi';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function TopSuppliers() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12">Top Verified Suppliers</h2>
        <Swiper
          modules={[Navigation, Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 }
          }}
          className="supplier-carousel"
        >
          {Array.from({ length: 8 }).map((_, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="relative w-20 h-20 mx-auto mb-4">
                  <Image
                    src={`/suppliers/supplier${index + 1}.jpg`}
                    alt={`Supplier ${index + 1}`}
                    layout="fill"
                    className="rounded-full"
                    objectFit="cover"
                  />
                  <div className="absolute -right-2 -bottom-2 bg-blue-600 rounded-full p-1">
                    <FiCheckCircle className="text-white" />
                  </div>
                </div>
                <h3 className="text-center font-semibold mb-2">Company Name {index + 1}</h3>
                <div className="flex justify-center items-center mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                  <span className="ml-2 text-sm text-gray-600">(4.8)</span>
                </div>
                <div className="text-center text-sm text-gray-600 mb-4">
                  <p>Specializes in: Metals, Plastics</p>
                  <p>Location: Dhaka, Bangladesh</p>
                </div>
                <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  View Profile
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default TopSuppliers;