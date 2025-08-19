import React from "react";
import { CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const WhyChooseUs = ({ heading, points = [], id = "whyChooseUs" }) => {
  const gradients = [
    "from-pink-500 to-rose-500",
    "from-purple-500 to-indigo-500",
    "from-blue-500 to-cyan-500",
    "from-indigo-500 to-purple-500",
    "from-rose-500 to-pink-500",
    "from-cyan-500 to-blue-500"
  ];

  return (
    <section id={id} className="py-32 bg-white">
      <div className="container mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-20">
          <Badge className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 text-lg rounded-full mb-6">
            Why Choose Us
          </Badge>

          <h2 className="text-5xl font-black bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            {heading}
          </h2>
        </div>

        {/* Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {points.map((point, index) => (
            <div key={index} className="group relative">
              {/* Glow Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${
                  gradients[index % gradients.length]
                } rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300`}
              ></div>

              {/* Card */}
              <div className="relative bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105">
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${
                    gradients[index % gradients.length]
                  } rounded-2xl flex items-center justify-center mb-6`}
                >
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <span className="text-foreground font-bold text-lg leading-relaxed">
                  {point}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
