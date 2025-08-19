import React from "react";

const About = ({ heading, description, highlights, image, id }) => {
  return (
    <section id={id || "about"} className="py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Image */}
          <div className="aspect-square rounded-3xl overflow-hidden shadow-lg">
            <img
              src={image?.url}
              alt={heading || "About"}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Text Content */}
          <div>
            {heading && (
              <h2 className="text-6xl font-black mb-8 text-gray-900 leading-none">
                <span className="text-orange-500">{heading.split(" ")[0]}</span>
                {heading.split(" ").length > 1 && (
                  <>
                    <br />
                    {heading.split(" ").slice(1).join(" ")}
                  </>
                )}
              </h2>
            )}

            {description && (
              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                {description}
              </p>
            )}

            {/* Highlights */}
            {highlights?.length > 0 && (
              <div className="space-y-6">
                {highlights?.map((highlight, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-orange-500 rounded-full flex-shrink-0"></div>
                    <span className="text-lg font-medium text-gray-900">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
