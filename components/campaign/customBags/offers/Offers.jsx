import React from 'react'
import Image from 'next/image'

export default function Offers({className, data}) {
  return (
    <div className={className}>
      <h2 className="text-lg font-semibold mb-4">Core Values: <span className="font-normal text-gray-600"> What Makes Us Stand Out </span></h2>
      <div className="grid grid-cols-2 w-fit sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data?.map((o, i) => (
          <div key={i} className="flex max-w-[233px] items-center gap-1 p-3 border rounded-lg bg-white">
            <div className="w-10 h-10 flex items-center justify-center rounded-md  overflow-hidden">
              <Image src={o.img} alt={o.title} width={24} height={24} className="w-6 h-6 object-contain" />
            </div>
            <p className="text-sm text-gray-700 ">{o.title}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
