'use client';

import React, { useState } from 'react'

const FaqSection = ({data}) => {
  const [openIndex, setOpenIndex] = useState(0)

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? -1 : index)
  }

  return (
    <section className="w-full bg-white py-8 sm:py-10 md:py-12 ">
      <div className="max-w-4xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-medium text-black text-center mb-8 sm:mb-10 md:mb-12 lg:mb-14">
          Frequently Asked Questions
        </h2>

        <div className="space-y-0">
          {data?.map((faq, index) => (
            <div key={faq.id} className="border-b border-gray-300">
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between py-5 sm:py-6 md:py-7 text-left hover:bg-gray-50 transition-colors duration-200"
              >
                <span className="text-[14px]  md:text-[16px] lg:text-[18px] font-normal text-black pr-4 break-words whitespace-normal">
                  {faq.question}
                </span>
                <svg
                  className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer text-black flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? (faq.listItems ? 'max-h-[500px]' : 'max-h-96') + ' opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="pb-5 sm:pb-6 md:pb-7 pr-10">
                  <p className="text-[14px] md:text-[16px] text-[#676767] break-words whitespace-normal leading-relaxed">
                    {faq.answer}
                  </p>
                  {faq.listItems && (
                    <ol className="list-decimal list-inside mt-3 ml-1 space-y-1 text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
                      {faq.listItems.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ol>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FaqSection
