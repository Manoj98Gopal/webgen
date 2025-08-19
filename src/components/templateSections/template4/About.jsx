import React from "react";
import { CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const About = ({ heading, description, highlights = [], image, id = "about" }) => {
  return (
    <section id={id} className="py-32 bg-white relative overflow-hidden">
      {/* Top Gradient Overlay */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-purple-50 to-white"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Image Section */}
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-pink-400/30 to-purple-400/30 rounded-full blur-2xl"></div>
            <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-3xl p-8 transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <img
                src={image?.url}
                alt="About Us"
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-8">
            <Badge className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-full">
              Our Story
            </Badge>

            <h2 className="text-5xl font-black bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              {heading}
            </h2>

            <p className="text-xl text-muted-foreground leading-relaxed">
              {description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-foreground font-semibold">{highlight}</span>
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
