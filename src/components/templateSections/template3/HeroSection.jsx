import React from "react";
import { Button } from "@/components/ui/button"; // using shadcn button

const HeroSection = ({
  heroImage,
  heading,
  subheading,
  cta1,
  cta2,
  id = "hero",
  bgType = "color",
  bgValue = "bg-white",
  scrollToSection
}) => {
  return (
    <section
      id={id}
      className={`min-h-screen flex items-center relative pt-20 bg-white`}
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              {heading}
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed">
              {subheading}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-slate-800 hover:bg-slate-900 text-white px-8 py-4 text-lg font-medium shadow-lg"
                onClick={() => scrollToSection?.("services")}
              >
                {cta1?.label}
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white px-8 py-4 text-lg font-medium"
                onClick={() => scrollToSection?.("contact")}
              >
                {cta2?.label}
              </Button>
            </div>
          </div>

          {/* Right Content */}
          <div className="relative">
            <div className="bg-gray-100 rounded-2xl p-8 shadow-2xl">
              <img
                src={heroImage?.url}
                alt="Hero"
                className="w-full h-80 object-cover rounded-xl"
              />
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-emerald-500 rounded-2xl opacity-20"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-slate-800 rounded-2xl opacity-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
