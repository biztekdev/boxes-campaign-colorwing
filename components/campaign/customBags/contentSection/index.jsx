import React from "react";

const ContentSection = ({ data }) => {
  return (
    <section className="w-full bg-white  px-4  sm:px-5  md:px-6 ">

      <div className="max-w-4xl mx-auto">
        <div className="w-full bg-white border border-[#777777] rounded-2xl sm:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10">
          <div className="h-auto scrollbar-hide overflow-y-auto pr-2 sm:pr-3 md:pr-4">
            {data?.map((section, idx) => (
              <div className="mb-4 " key={idx}>
                <h2 className="text-[20px] sm:text-[20px] md:text-[22px] lg:text-[24px] font-medium text-gray-900 mb-3 sm:mb-4 leading-snug">
                  {section.title}
                </h2>
                <p className="text-[12px] sm:text-[14px] md:text-[16px] text-[#676767] font-normal leading-relaxed">
                  {section.paragraph}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentSection;
