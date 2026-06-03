import React from 'react'
import Image from 'next/image'

const Materials = ({data}) => {
  return (
    <section className="w-full bg-white py-6 px-4 sm:py-8 sm:px-5 md:py-10 md:px-6 lg:py-14 lg:px-8 xl:py-16">
      <h2 className='text-center mb-6 md:mb-6 text-[25px] md:text-[30px] xl:text-[35px] 2xl:text-[40px] font-medium'>
          <span className='font-bold text-black'>Choices Materials & Finishes</span>
        </h2>
      <div className="mx-auto  px-4 lg:px-10 2xl:px-20">
        <p className="text-lg sm:text-xl md:text-2xl lg:text-[25px] font-semibold text-[#676767] mb-4 sm:mb-5 md:mb-6 lg:mb-4 ">
          Material
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 sm:gap-2 md:gap-4 lg:gap-4 xl:gap-4">
          {data?.map((material) => (
            <div key={material.id} className="relative rounded-[10px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
              <div className="relative w-full aspect-[4/5] bg-slate-100">
                <Image
                  src={material.image}
                  alt={material.title}
                  fill
                  className="object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute left-4 right-4 bottom-4 rounded-lg bg-black/30 px-4 py-1 text-center">
                  <p className="text-[10px] md:text-[12px] lg:text-[14px] xl:text-[14px] font-medium text-white">
                    {material.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Materials
