import React from "react";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Testimonials = ({ heading, reviews = [], id = "testimonials" }) => {
  const gradients = [
    "from-pink-500 to-rose-500",
    "from-purple-500 to-indigo-500",
    "from-blue-500 to-cyan-500",
  ];

  return (
    <section id={id} className="py-32 bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-20">
          <Badge className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 text-lg rounded-full mb-6">
            Happy Customers
          </Badge>

          <h2 className="text-5xl font-black bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            {heading}
          </h2>
        </div>

        {/* Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border-0 shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <div className="p-8">
                {/* Rating */}
                <div className="flex mb-6">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-6 h-6 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                {/* Message */}
                <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                  "{review.message}"
                </p>

                {/* User */}
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${
                      gradients[index % gradients.length]
                    } rounded-full flex items-center justify-center`}
                  >
                    <span className="text-white font-bold">
                      {review.name[0]}
                    </span>
                  </div>
                  <div className="font-bold text-foreground text-lg">
                    {review.name}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
