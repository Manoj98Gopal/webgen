import React from "react";
import { CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge"; // shadcn badge

const About = ({ heading, description, highlights, image, id = "about" }) => {
  return (
    <section id={id} className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Image */}
          <div className="relative">
            <img
              src={image?.url}
              alt="About Us"
              className="w-full h-96 object-cover rounded-2xl shadow-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-800/20 to-blue-600/20 rounded-2xl"></div>
          </div>

          {/* Right Content */}
          <div className="space-y-8">
            <div>
              <Badge className="bg-emerald-100 text-emerald-700 px-3 py-1 mb-4">
                About Us
              </Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                {heading}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {description}
              </p>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-1 gap-4">
              {highlights?.map((highlight, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm"
                >
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                  </div>
                  <span className="text-gray-700 font-medium">{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
