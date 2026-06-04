import React from "react";

const ContentSection = ({ data }) => {
  return (
    <section className="w-full bg-white  px-4  sm:px-5  md:px-6 ">
      <div className="max-w-4xl mx-auto">
        <div className="w-full bg-white border border-[#777777] rounded-2xl sm:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10">
          <div className="h-[350px] xs:h-[400px] sm:h-[450px] md:h-[500px] lg:h-auto scrollbar-hide overflow-y-auto pr-2 sm:pr-3 md:pr-4">
            {data?.map((section, idx) => (
              <div className="mb-4 " key={idx}>
                <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4 leading-snug">
                  {section.title}
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-[#676767] leading-relaxed">
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
