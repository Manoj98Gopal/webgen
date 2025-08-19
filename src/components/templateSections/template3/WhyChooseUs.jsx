import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import React from "react";

const WhyChooseUs = ({ heading, points, id }) => {
  return (
    <section id={id || "whyChooseUs"} className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge className="bg-emerald-100 text-emerald-700 px-4 py-2 mb-4">
            Why Choose Us
          </Badge>
          <h2 className="text-4xl font-bold text-slate-800">{heading}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {points?.map((point, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-slate-600 to-emerald-600 rounded-xl flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <span className="text-slate-700 font-medium leading-relaxed">
                {point}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
