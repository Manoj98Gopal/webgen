import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import React from "react";

const Testimonials = ({ heading, reviews = [], id = "testimonials" }) => {
  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge className="bg-slate-100 text-slate-700 px-4 py-2 mb-4">
            Testimonials
          </Badge>
          <h2 className="text-4xl font-bold text-slate-800">{heading}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <Card
              key={index}
              className="border border-slate-200 shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <CardContent className="p-8">
                <div className="flex mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                <p className="text-slate-600 mb-6 leading-relaxed">
                  "{review.message}"
                </p>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-slate-600 to-emerald-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {review.name[0]}
                    </span>
                  </div>
                  <div className="font-semibold text-slate-800">
                    {review.name}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
