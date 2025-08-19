import React from "react";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const HeroSection = ({
  heroImage,
  heading,
  subheading,
  cta1,
  cta2,
  id = "hero",
  bgType = "gradient", // "gradient" | "color" | "custom"
  bgValue = "bg-white", // Tailwind class or custom gradient
  scrollToSection
}) => {
  return (
    <section
      id={id}
      className="min-h-screen flex items-center relative overflow-hidden pt-20"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {bgType === "gradient" ? (
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-blue-500/20"></div>
        ) : (
          <div className={`absolute inset-0 ${bgValue}`}></div>
        )}

        {/* Decorative Floating Blobs */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-pink-400/30 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-20 right-20 w-80 h-80 bg-purple-400/30 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center space-y-12 animate-fade-in">
          {/* Heading */}
          <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent leading-tight">
            {heading}
          </h1>

          {/* Subheading */}
          <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            {subheading}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a href={cta1?.link}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-12 py-6 rounded-full text-xl font-bold shadow-2xl hover:shadow-pink-500/25 transform hover:scale-105 transition-all duration-300"
              >
                {cta1?.label}
                <Zap className="w-6 h-6 ml-2" />
              </Button>
            </a>

            <a href={cta2?.link}>
              <Button
                variant="outline"
                size="lg"
                className="border-3 border-purple-500 text-purple-600 hover:bg-purple-500 hover:text-white px-12 py-6 rounded-full text-xl font-bold transition-all duration-300 transform hover:scale-105"
              >
                {cta2?.label}
              </Button>
            </a>
          </div>

          {/* Hero Image */}
          {heroImage && (
            <div className="relative max-w-4xl mx-auto mt-16">
              <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/30 shadow-2xl">
                <img
                  src={heroImage?.url}
                  alt="Hero"
                  className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
