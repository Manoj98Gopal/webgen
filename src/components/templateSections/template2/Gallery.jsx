import React from "react";

const Gallery = ({ heading, images = [], id = "gallery" }) => {
  return (
    <section id={id} className="py-32 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-20">
          <h2 className="text-6xl font-black mb-6 text-gray-900">
            {heading?.title || "Store"}{" "}
            <span className="text-orange-500">
              {heading?.highlight || "Gallery"}
            </span>
          </h2>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {images.length > 0 ? (
            images.map((image, index) => (
              <div
                key={image.id || index}
                className="aspect-[3/4] overflow-hidden rounded-2xl group"
              >
                <img
                  src={image.url}
                  alt={image.alt || `Gallery ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No images available
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
