"use client";

import React, { useEffect, useState } from "react";

const Services = ({ items, cta, heading, id, initialShowCount }) => {
  const [visibleCount, setVisibleCount] = useState(initialShowCount || 4);

  const handleToggle = () => {
    if (visibleCount >= items?.length) {
      setVisibleCount(initialShowCount || 4);
    } else {
      setVisibleCount(items?.length);
    }
  };

  useEffect(() => {
    setVisibleCount(initialShowCount || 4);
  }, [initialShowCount]);

  // Don't render if no items
  if (!items || items.length === 0) {
    return null;
  }

  const showToggleButton = items.length > (initialShowCount || 4);
  const isShowingAll = visibleCount >= items.length;

  return (
    <section className="py-20 px-6 bg-gray-800" id={id}>
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        {heading && (
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-orange-400">
            {heading}
          </h2>
        )}

        {/* Items Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.slice(0, visibleCount).map((item, index) => (
            <div
              key={index}
              className="group bg-gray-900 rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              {/* Item Image */}
              {item?.image?.url && (
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image.url}
                    alt={item?.title || `Service ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                  {/* Overlay gradient for better text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              )}

              {/* Item Content */}
              <div className="p-6">
                {item?.title && (
                  <h3 className="text-xl font-bold mb-3 text-orange-400 group-hover:text-orange-300 transition-colors">
                    {item.title}
                  </h3>
                )}
                {item?.description && (
                  <p className="text-gray-300 leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Toggle Button */}
        {showToggleButton && (
          <div className="text-center mt-12">
            <button
              onClick={handleToggle}
              className="bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-500/50"
            >
              {isShowingAll ? "Show Less" : cta || "View All"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;
