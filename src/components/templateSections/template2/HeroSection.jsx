import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import React from "react";

const HeroSection = ({
  heroImage,
  heading,
  subheading,
  cta1,
  cta2,
  id,
  bgType,
  bgValue
}) => {
  return (
    <section
      id={id || "hero"}
      className={`py-32 ${
        bgType === "gradient" ? bgValue : bgValue || "bg-white"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left Content */}
          <div>
            {heading && (
              <h1 className="text-6xl md:text-8xl font-black mb-8 leading-none text-gray-900">
                <span className="text-orange-500">{heading.split(" ")[0]}</span>
                {heading.split(" ").length > 1 && (
                  <>
                    <br />
                    {heading.split(" ").slice(1).join(" ")}
                  </>
                )}
              </h1>
            )}

            <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-lg">
              {subheading}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6">
              <a href={cta1.link}>
                <Button
                  size="lg"
                  className="px-10 py-6 text-lg font-bold rounded-full bg-gradient-to-r from-orange-500 to-orange-400 text-white group shadow-lg hover:shadow-xl transition-all"
                >
                  {cta1.label}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>

              <a href={cta2.link}>
                <Button
                  size="lg"
                  variant="outline"
                  className="px-10 py-6 text-lg font-bold rounded-full border-2 border-gray-300 text-gray-800 bg-transparent hover:bg-gray-100 transition-colors"
                >
                  {cta2.label}
                </Button>
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="aspect-video rounded-3xl overflow-hidden shadow-lg">
              <img
                src={heroImage.url}
                alt="Mysore Hardware"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Decorative Circles */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-orange-500 rounded-full opacity-20"></div>
            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full opacity-30"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
