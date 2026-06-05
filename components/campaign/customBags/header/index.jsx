'use client';

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
const CustomBagsHeader = () => {
  const [showModal, setShowModal] = useState(false)

  const openEmail = () => {
    window.open('mailto:support@colorwing.com', '_blank')
    setShowModal(false)
  }

  const openWhatsApp = () => {
    window.open('https://wa.me/17138320935', '_blank')
    setShowModal(false)
  }

  const openPhoneCall = () => {
    window.open('tel:+17138320935', '_blank')
    setShowModal(false)
  }

  return (
    <div className='px-[20px] sm:px-[35px] md:px-20 pt-[20px] bg-white'>
      <div className='flex gap-[10px] items-center justify-between '>
        <div className='hidden md:block'>
          <Link href="/">
            <Image
              src="/campaign/colorwing_logo.webp"
              alt="ColorWing Logo"
              width={220}
              height={40}
              priority
              quality={75}
              className='w-[180px] xl:w-[220px] h-auto'
            />
          </Link>
        </div>
        <div className='block md:hidden'>
          <Link href="/">
            <Image
              src="/campaign/colorwing_logo.webp"
              alt="ColorWing Logo"
              width={180}
              height={40}
              priority
              quality={75}
              className='w-full h-auto'
            />
          </Link>
        </div>  
        {/* <div className='hidden xl:block'>
          <img src="/images/campaignImage/mylarBags/headerCam/wing.webp" alt="logos" />
        </div> */}
        <a href="tel:+17138320935 " className='phone_number' >
          <div className='flex items-center'>
            <button className='inline-block  text-center text-[12px] sm:text-[14px] xl:text-[16px] font-bold rounded-[38px] bg-[#0095DA] text-white py-[10px] md:py-[11px] xl:py-[12px] w-[140px] sm:w-[150px] md:w-[200px] xl:w-[215px] hover:bg-[#0084c4] transition-all duration-300 transform hover:scale-105 '>
             +1 (713) 832-0935
            </button>

            {/* <div className='hidden md:block'>
              <button className='hover:scale-110 transition-transform duration-200'>
                <img src="/images/campaignImage/mylarBags/headerCam/header_arr.svg" alt="logos" />
              </button>
            </div>
            <div className='block md:hidden'>
              <button className='hover:scale-110 transition-transform duration-200'>
                <img className='w-[40px]' src="/images/campaignImage/mylarBags/headerCam/arr_mbl.svg" alt="logos" />
              </button>
            </div> */}
          </div>
        </a>
      </div>
       </div>
  )
}

export default CustomBagsHeader