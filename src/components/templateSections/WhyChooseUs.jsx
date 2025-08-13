import React from "react";

const WhyChooseUs = ({ heading, points, id }) => {
  return (
    <section className="py-20 px-6" id={id}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-orange-400">
          {heading}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {points?.map((point, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 p-6 bg-gray-800 rounded-xl"
            >
              <div className="w-4 h-4 bg-orange-500 rounded-full flex-shrink-0"></div>
              <span className="text-lg text-gray-300">{point}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
