import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

const Services = ({ items, heading, id }) => {
  return (
    <section id={id || "services"} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="bg-slate-100 text-slate-700 px-4 py-2 mb-4">
            Services
          </Badge>
          <h2 className="text-4xl font-bold text-slate-800 mb-6">{heading}</h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items?.map((service, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 border border-slate-200 p-0"
            >
              <div className="relative overflow-hidden">
                <img
                  src={service?.image?.url}
                  alt={service.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-slate-800/0 group-hover:bg-slate-800/10 transition-colors duration-300"></div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-slate-800 mb-3">
                  {service.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
