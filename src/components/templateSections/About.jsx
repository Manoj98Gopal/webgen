import React from "react";

const About = ({ heading, description, highlights, image, id }) => {
  return (
    <section className="py-20 px-6" id={id}>
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Text Section */}
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-orange-400">
            {heading}
          </h2>
          <p className="text-lg text-gray-300 mb-8 leading-relaxed">
            {description}
          </p>
          <div className="grid grid-cols-2 gap-4">
            {highlights?.map((highlight, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-gray-300">{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Image Section */}
        <div className="relative flex justify-center">
          {image?.url && <img
            src={image?.url}
            alt="About us"
            className="max-w-full h-auto object-contain rounded-2xl shadow-2xl"
          />}
        </div>
      </div>
    </section>
  );
};

export default About;
