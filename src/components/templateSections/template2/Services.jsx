import { Card } from "@/components/ui/card";
import React from "react";

const Services = ({ items, cta, heading, id, initialShowCount }) => {
  return (
    <section id={id || "services"} className="py-32 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-20">
          <h2 className="text-6xl font-black mb-6 text-gray-900">
            {heading?.split(" ")[0] || "Our"}{" "}
            <span className="text-orange-500">
              {heading?.split(" ").slice(1).join(" ") || "Products"}
            </span>
          </h2>
          {/* <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need for your projects
          </p> */}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {items.map((service, index) => (
            <Card
              key={index}
              className="p-0 overflow-hidden border-0 bg-white group shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row">
                {/* Image */}
                <div className="md:w-1/3">
                  <img
                    src={service.image.url}
                    alt={service.title}
                    className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                {/* Text */}
                <div className="md:w-2/3 p-8">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
