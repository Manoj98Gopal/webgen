import React from "react";

const HeroSection = ({ heroImage, heading, subheading, cta1, cta2, id }) => {
  return (
    <section
      className="relative h-screen flex items-center justify-center"
      id={id}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage?.url})` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
          {heading}
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-300">{subheading}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {cta1 && (
            <a href={cta1?.link}>
              <button className="bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105">
                {cta1?.label}
              </button>
            </a>
          )}
          {cta2 && (
            <a href={cta2?.link}>
              <button className="border-2 border-orange-500 hover:bg-orange-500 px-8 py-4 rounded-full text-lg font-semibold transition-all">
                {cta2?.label}
              </button>
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
