import React from "react";
import Image from "next/image";

const CallSection = ({ data }) => {
  if (!data?.items?.length) return null;

  return (
    <section className="w-full  py-12 px-4 md:px-10 2xl:px-20 bg-white">
      <div className="mx-auto ">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-[28px] md:text-[32px] font-semibold text-[#212121] mb-4">
            {data.heading}
          </h2>
          <p className="text-[14px] md:text-[16px] text-[#676767] max-w-[900px] mx-auto leading-relaxed">
            {data.subheading}
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
          {data.items.map((item) => (
            <div
              key={item.id}
              className="rounded-[24px] ]  p-5 text-center "
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <h3 className="text-[16px] font-semibold text-[#212121] mb-2">
                {item.title}
              </h3>
              <p className="text-[13px] text-[#575757] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CallSection;
