import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const CompaignFooter = () => {
  const scrollToForm = () => {
    const formSection = document.getElementById('custom-quote-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="w-full bg-[#1E1D1E] rounded-t-3xl mt-12 md:mt-16 lg:mt-20 ">
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-6 sm:py-8 md:py-10">
        <div className="hidden lg:flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image src="/campaign/Footer/Logo.png" alt="Colorwing Logo" width={180} height={40} />
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <Link href="https://www.facebook.com/ColorWingllc" target="_blank" className="w-8 h-8 md:w-12 md:h-12 border border-[#474747] rounded-lg flex items-center justify-center hover:bg-[#4D4D4D] transition-colors">
              <Image src="/campaign/Footer/facebook.svg" alt="Facebook" width={24} height={24} />
            </Link>
            <Link href="https://www.instagram.com/colorwingllc/" target="_blank" className="w-8 h-8 md:w-12 md:h-12 sm:h-12 border border-[#474747] rounded-lg flex items-center justify-center hover:bg-[#4D4D4D] transition-colors">
              <Image src="/campaign/Footer/insta.svg" alt="Instagram" width={24} height={24} />
            </Link>
            <Link href="https://www.linkedin.com/company/colorwingllc/" target="_blank" className="w-8 h-8 md:w-12 md:h-12 sm:h-12 border border-[#474747] rounded-lg flex items-center justify-center hover:bg-[#4D4D4D] transition-colors">
              <Image src="/campaign/Footer/linkedin.svg" alt="LinkedIn" width={24} height={24} />
            </Link>
            <Link href="https://www.pinterest.com/colorwingllc/" target="_blank" className="w-8 h-8 md:w-12 md:h-12 sm:h-12 border border-[#474747] rounded-lg flex items-center justify-center hover:bg-[#4D4D4D] transition-colors">
              <Image src="/campaign/Footer/pint.svg" alt="Pinterest" width={24} height={24} />
            </Link>
          </div>
          <button onClick={scrollToForm} type="button" className="bg-[#00ADEE] hover:bg-[#29B6F6] text-white font-semibold px-6 sm:px-8 py-3 rounded-full transition-colors duration-300 text-sm sm:text-base whitespace-nowrap cursor-pointer">
            Get Custom Quote
          </button>
        </div>

        <div className="lg:hidden flex flex-col gap-6">
          <div className="flex items-center justify-center">
            <Image src="/campaign/Footer/Logo.png" alt="Colorwing Logo" width={180} height={40} />
          </div>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <Link href="https://www.facebook.com/ColorWingllc" target="_blank" className="w-10 h-10 border border-[#474747] rounded-lg flex items-center justify-center hover:bg-[#4D4D4D] transition-colors">
                <Image src="/campaign/Footer/facebook.svg" alt="Facebook" width={24} height={24} />
              </Link>
              <Link href="https://www.instagram.com/colorwingllc/" target="_blank" className="w-10 h-10 border border-[#474747] rounded-lg flex items-center justify-center hover:bg-[#4D4D4D] transition-colors">
                <Image src="/campaign/Footer/insta.svg" alt="Instagram" width={24} height={24} />
              </Link>
              <Link href="https://www.linkedin.com/company/colorwingllc/" target="_blank" className="w-10 h-10 border border-[#474747] rounded-lg flex items-center justify-center hover:bg-[#4D4D4D] transition-colors">
                <Image src="/campaign/Footer/linkedin.svg" alt="LinkedIn" width={24} height={24} />
              </Link>
              <Link href="https://www.pinterest.com/colorwingllc/" target="_blank" className="w-10 h-10 border border-[#474747] rounded-lg flex items-center justify-center hover:bg-[#4D4D4D] transition-colors">
                <Image src="/campaign/Footer/pint.svg" alt="Pinterest" width={24} height={24} />
              </Link>
            </div>
            <button onClick={scrollToForm} type="button" className="bg-[#00ADEE] hover:bg-[#29B6F6] text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-full transition-colors duration-300 text-xs sm:text-sm whitespace-nowrap cursor-pointer">
              Get Custom Quote
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-[#484848]"></div>

      <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-4 sm:py-5 md:py-6 bg-[#1E1D1E]">
        <div className=" mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-2">
          <p className="text-[#FFFFFF] text-xs sm:text-sm text-center sm:text-left">
            Colorwing © 2026. All Rights Reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2 sm:gap-3">
            <span className="text-[#FFFFFF] text-xs sm:text-sm">We Accept All Major Cards</span>
            <Image src="/campaign/Footer/payment-method.png" alt="Payment Methods" width={200} height={30} />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default CompaignFooter
