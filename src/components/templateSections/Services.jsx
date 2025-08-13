"use client";

import React, { useState } from "react";

const Services = ({ items, cta, heading, id, initialShowCount }) => {
  const [visibleCount, setVisibleCount] = useState(initialShowCount || 3);

  const handleToggle = () => {
    if (visibleCount >= items.length) {
      setVisibleCount(initialShowCount || 3);
    } else {
      setVisibleCount(items.length);
    }
  };

  return (
    <section className="py-20 px-6 bg-gray-800" id={id}>
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-orange-400">
          {heading}
        </h2>

        {/* Items */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items?.slice(0, visibleCount)?.map((item, index) => (
            <div
              key={index}
              className="group bg-gray-900 rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
            >
              {item?.image?.url && (
                <img
                  src={item?.image?.url}
                  alt={item?.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-orange-400">
                  {item?.title}
                </h3>
                <p className="text-gray-300">{item?.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="text-center mt-12 flex flex-col gap-4 items-center">
          {/* CTA button */}
          {items?.length > (initialShowCount || 3) && (
            <button
              onClick={handleToggle}
              className="bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-full text-lg font-semibold transition-all"
            >
              {cta}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Services;
