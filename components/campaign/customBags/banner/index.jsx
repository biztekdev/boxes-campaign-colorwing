'use client';

import React, { useState, useEffect } from "react";

function BannerCom({ data }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedIndex((prev) =>
        prev === data?.images?.length - 1 ? 0 : prev + 1,
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [data?.images?.length]);

  return (
    <>
      <div>
        <div className=" p-6">
          <div
            className="relative w-full flex items-center justify-center"
            style={{ minHeight: "400px" }}
          >
            <img
              src={data?.images[selectedIndex]}
              alt={`pouch-${selectedIndex}`}
              width={600}
              height={600}
              fetchPriority="high"
              loading="eager"
              className="object-contain max-h-full w-auto"
              style={{ position: "relative" }}
            />
          </div>x``

          <div className="flex gap-4 mt-6">
            {data?.images?.map((item, index) => (
              <div
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={`w-[96px] h-[96px]  rounded-xl overflow-hidden cursor-pointer flex items-center justify-center
                ${selectedIndex === index ? "ring-1 ring-black" : ""}`}
              >
                <img
                  src={item}
                  alt={`thumb-${index}`}
                  width={96}
                  height={96}
                  className="object-contain max-h-full w-auto"
                />
              </div>
            ))}
          </div>
        </div>

      
      </div>
    </>
  );
}

export default BannerCom;
