import React from "react";
import { Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const Services = ({ items = [], heading, id = "services" }) => {
  // Define gradients for each service card
  const gradients = [
    "from-pink-500 to-rose-500",
    "from-purple-500 to-indigo-500",
    "from-blue-500 to-cyan-500",
    "from-indigo-500 to-purple-500"
  ];

  return (
    <section
      id={id}
      className="py-32 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 relative overflow-hidden"
    >
      {/* Decorative Background */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-pink-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Heading Section */}
        <div className="text-center mb-20">
          <Badge className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 text-lg rounded-full mb-6">
            What We Offer
          </Badge>

          <h2 className="text-5xl font-black bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-8">
            {heading}
          </h2>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Innovative solutions powered by decades of experience
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {items.map((service, index) => (
            <Card
              key={index}
              className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm transform hover:scale-105 hover:-rotate-1 p-0"
            >
              <CardContent className="p-0">
                {/* Service Image */}
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={service.image?.url}
                    alt={service.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${
                      gradients[index % gradients.length]
                    } opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                  ></div>
                </div>

                {/* Service Content */}
                <div className="p-8">
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${
                      gradients[index % gradients.length]
                    } rounded-xl flex items-center justify-center mb-4`}
                  >
                    <Zap className="w-6 h-6 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {service.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
