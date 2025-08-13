import React from "react";

const Gallery = ({ heading, images, id }) => {
  return (
    <section className="py-20 px-6 bg-gray-800" id={id}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-orange-400">
          {heading}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images?.map((imgSrc, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl group hover:scale-105 transition-transform duration-300"
            >
              {imgSrc?.url && (
                <img
                  src={imgSrc?.url}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
