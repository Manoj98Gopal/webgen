import React from "react";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

const Testimonials = ({ heading, reviews = [], id = "testimonials" }) => {
  return (
    <section id={id} className="py-32 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-20">
          <h2 className="text-6xl font-black mb-6 text-gray-900">
            {heading?.title || "What"}{" "}
            <span className="text-orange-500">
              {heading?.highlight || "Customers"}
            </span>{" "}
            {heading?.suffix || "Say"}
          </h2>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <Card
                key={index}
                className="p-10 border-0 rounded-3xl bg-gray-50 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                {/* Rating Stars */}
                <div className="flex items-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-6 h-6 ${
                        i < review.rating
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                {/* Review Message */}
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  "{review.message}"
                </p>

                {/* Reviewer Name */}
                <p className="text-xl font-bold text-gray-900">
                  {review.name}
                </p>
              </Card>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No reviews available
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
