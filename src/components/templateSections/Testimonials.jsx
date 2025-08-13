import React from "react";

const Testimonials = ({ heading, reviews, id }) => {
  return (
    <section className="py-20 px-6 bg-gray-900" id={id}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-orange-400">
          {heading}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {reviews?.map((review, index) => (
            <div key={index} className="bg-gray-800 p-8 rounded-2xl">
              <div className="flex mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <span key={i} className="text-orange-400 text-xl">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-gray-300 mb-6 italic">"{review?.message}"</p>
              <p className="text-orange-400 font-semibold">- {review?.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
