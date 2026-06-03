import React from 'react'
import Image from 'next/image'

const InfluenceCustomers = ({data}) => {
  return (
    <>
      <section className="w-full bg-white py-12 px-4 md:px-10 2xl:px-20 md:py-16 lg:py-20 ">
        <div className=" mx-auto">
          <div className="text-center mb-10 md:mb-12 lg:mb-6">
            <h2 className="text-[25px] md:text-[30px] lg:text-[28px] xl:text-[30px] 2xl:text-[34px] font-bold text-[#000000] mb-4 md:mb-5 leading-tight">
              {data?.heading}
            </h2>
            <p className="text-[14px] lg:text-[12px] xl:text-[14px] 2xl:text-[16px] font-normal text-[#676767] w-full md:max-w-[850px] xl:max-w-[950px] 2xl:max-w-[1050px] leading-relaxed  mx-auto">
              {data?.paragraph}
            </p>
          </div>

          {Array.isArray(data?.products) && data.products.length > 0 && (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.6fr] mt-8 md:mt-10 lg:mt-12">
              <div className="relative rounded-[32px] overflow-hidden bg-slate-100 shadow-[0_30px_80px_rgba(0,0,0,0.08)] min-h-[420px]">
                <Image
                  src={data.products[0].image}
                  alt={data.products[0].title}
                  fill
                  className="object-cover"
                  loading="lazy"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {data.products.slice(1).map((product) => (
                  <div key={product.id} className="group relative overflow-hidden rounded-[28px] bg-white shadow-[0_16px_40px_rgba(0,0,0,0.08)] min-h-[260px]">
                    <div className="relative h-72 overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute left-4 right-4 bottom-4 rounded-[10px] bg-white/95 p-4  backdrop-blur-sm">
                        <p className="text-[16px] font-medium text-black leading-snug text-center">
                          {product.title}
                        </p>
                        <p className="mt-2 text-[13px] text-[#676767] font-normal leading-relaxed text-center">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default InfluenceCustomers
