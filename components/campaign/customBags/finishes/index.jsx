'use client';
import React, { useState } from 'react'
import Image from 'next/image'
import QuoteModal from '../quoteModal'

const Finishes = ({data}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openModal = (finish) => {
    setSelectedProduct(finish);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };
  return (
    <section className="w-full bg-white py-6 px-4 sm:py-8 sm:px-5 md:py-10 md:px-6 lg:py-14 lg:px-8 xl:py-16">
    
      <div className="mx-auto  px-4 lg:px-10 2xl:px-20">
        <p className="text-lg sm:text-xl md:text-2xl lg:text-[25px] font-medium text-[#676767] mb-4 sm:mb-5 md:mb-6 lg:mb-4 ">
          Finishes
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-2 sm:gap-2 md:gap-4 lg:gap-4 xl:gap-4">
          {data?.map((finish) => (
            <div key={finish.id} onClick={() => openModal(finish)} className="relative rounded-[10px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.08)] cursor-pointer hover:shadow-[0_30px_80px_rgba(0,0,0,0.12)] transition-shadow">
              <div className="relative w-full aspect-[4/5] bg-slate-100">
                <Image
                  src={finish.image}
                  alt={finish.title}
                  fill
                  className="object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute left-4 right-4 bottom-4 rounded-lg bg-black/30 px-4 py-1 text-center">
                  <p className="text-[10px] md:text-[12px] lg:text-[14px] xl:text-[14px] font-medium text-white">
                    {finish.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <QuoteModal isOpen={isModalOpen} onClose={closeModal} product={selectedProduct} />
    </section>
  )
}

export default Finishes
