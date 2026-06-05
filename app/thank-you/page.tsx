'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

export default function QuoteSubmitted() {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    async function loadAnimation() {
      try {
        const response = await fetch('/tickanimation.json');
        if (!response.ok) return;
        const data = await response.json();
        setAnimationData(data);
      } catch (error) {
        console.error('Failed to load animation', error);
      }
    }

    loadAnimation();
  }, []);

  return (
    <div className="bg-white">
      <div className="px-[30px]">
        <div className="h-[100vh] flex flex-col justify-center items-center">
          {animationData && (
            <Lottie
              animationData={animationData}
              className="w-[250px] md:w-[370px]"
              loop
              autoplay
            />
          )}
          <h2 className="text-3xl font-semibold text-black">Quote submitted!</h2>
          <p className="max-w-[500px] my-4 text-center text-black">
            Thank you! Your Quote Request has been submitted successfully. One
            of our Representatives will be in touch with your Quote shortly.
          </p>
          <Link href="/">
            <div className="px-8 py-2 border-black border text-black rounded-full transition duration-300 transform hover:scale-105">
              Back to Homepage
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
