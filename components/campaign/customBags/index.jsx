'use client';
import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import InfluenceCustomers from "./influenceCustomer";
import CallSection from "./call";
import ContentSection from "./contentSection";
import Materials from "./materials";
import Finishes from "./finishes";
import Testimonials from "./testimonials";
import FaqSection from "./faqs";
import CompaignFooter from "./footer";
// Critical above-the-fold components - loaded immediately
import Form from "./form";
import BannerCom from "./banner";
import CustomBagsHeader from "./header";

// Below-the-fold components - lazy loaded for better performance


function CustomBagsCom({ data }) {
  return (
    <div className="bg-white">
      <CustomBagsHeader />
      
      <div
        id="custom-quote-form"
        className="flex m-auto px-4 md:px-10 2xl:px-20 gap-6 mt-10 bg-white lg:flex-row flex-col scroll-mt-20"
      >
        <div className="lg:w-[50%] xl:w-[60%] 2xl:w-[60%] bg-white">
          <BannerCom data={data?.bannerData} />
        </div>
        <div className="lg:w-[50%] xl:w-[40%] 2xl:w-[40%]">
          <FormWrapper data={data?.formData} />
        </div>
        
      </div>
      <InfluenceCustomers data={data?.influencerData} />
      {data?.influencerData?.callSection && <CallSection data={data.influencerData.callSection} />}
      <ContentSection data={data?.Content} />
      <Materials data={data?.materials} />
      <Finishes data={data?.finishes} />
      <Testimonials data={data?.testimonials} />
      <FaqSection data={data?.faqs} />
     
       <CompaignFooter />
    
    </div>
  );
}

export default CustomBagsCom;

export const customBagsSeoData = {
  title: "Custom Bags - Premium Packaging Solutions | ColorWing",
  description:
    "Get premium custom bags for your products. High-quality, durable packaging with custom designs. Fast turnaround and competitive pricing. Order now!",
  keywords:
    "custom bags, bag packaging, custom packaging, custom bags wholesale, premium packaging, custom design bags",
  canonicalUrl: "https://colorwing.com/deals/custom-bags",
  ogImage:
    "https://colorwing.com/images/campaignImage/customPouches/bannerCam/banner_pouch_1.webp",
};

export const customBagsaSeoData = {
  title: "Custom Bag Packaging With Logo Printing",
  description:
    "Order custom bags with logo, ziplock seals, and resealable styles. Wholesale custom bag packaging for brands, startups, and retail products.",
  keywords:
    "custom bags, bag packaging, custom packaging, custom bags wholesale, premium packaging, custom design bags",
  canonicalUrl: "https://colorwing.com/deals/custom-bags-a",
  ogImage:
    "https://colorwing.com/images/campaignImage/customPouches/bannerCam/banner_pouch_1.webp",
};

function FormWrapper() {
  const ref = useRef(null);
  const [enableSticky, setEnableSticky] = useState(false);

  useEffect(() => {
    function check() {
      if (!ref.current) return;
      const height = ref.current.getBoundingClientRect().height;
      setEnableSticky(height <= window.innerHeight);
    }

    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div
      ref={ref}
      style={{ minHeight: "600px" }}
      className={`${enableSticky ? "sticky top-20 self-start" : ""}`}
    >
      <Form />
    </div>
  );
}
