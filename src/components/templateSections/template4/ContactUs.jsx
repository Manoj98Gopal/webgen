import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MapPin, Phone, Mail, Clock, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ContactUs = ({
  heading,
  address,
  phone,
  email,
  hours,
  id = "contact",
  mapEmbedUrl,
}) => {
  const [toastMessage, setToastMessage] = useState("");

  // Contact Info Items with Icons & Gradient Colors
  const infoItems = [
    {
      label: "Address",
      value: address,
      icon: MapPin,
      gradient: "from-pink-50 to-purple-50",
      iconGradient: "from-pink-500 to-purple-600",
    },
    {
      label: "Phone",
      value: phone,
      icon: Phone,
      gradient: "from-purple-50 to-blue-50",
      iconGradient: "from-purple-500 to-blue-500",
    },
    {
      label: "Email",
      value: email,
      icon: Mail,
      gradient: "from-blue-50 to-cyan-50",
      iconGradient: "from-blue-500 to-cyan-500",
    },
    {
      label: "Hours",
      value: hours,
      icon: Clock,
      gradient: "from-cyan-50 to-pink-50",
      iconGradient: "from-cyan-500 to-pink-500",
    },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Handle Form Submit
  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
    setToastMessage("✅ Message sent successfully!");
    setTimeout(() => setToastMessage(""), 3000);
    reset();
  };

  return (
    <section id={id} className="py-32 bg-white relative">
      <div className="container mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-20">
          <Badge className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 text-lg rounded-full mb-6">
            Get In Touch
          </Badge>
          <h2 className="text-5xl font-black bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            {heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {infoItems.map((item, index) => (
                <div key={index} className="group">
                  <div
                    className={`bg-gradient-to-br ${item.gradient} rounded-2xl p-6 group-hover:shadow-xl transition-all duration-300`}
                  >
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${item.iconGradient} rounded-xl flex items-center justify-center mb-4`}
                    >
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-bold text-foreground mb-3 text-lg">
                      {item.label}
                    </h4>
                    <p className="text-muted-foreground">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 border-0 shadow-2xl rounded-2xl p-8">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-8">
              Send us a Message
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input
                    {...register("name", { required: "Name is required" })}
                    placeholder="Your Name"
                    className="w-full border-2 border-pink-200 focus:border-pink-500 rounded-xl py-3 px-4 outline-none"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    {...register("email", { required: "Email is required" })}
                    placeholder="Your Email"
                    type="email"
                    className="w-full border-2 border-purple-200 focus:border-purple-500 rounded-xl py-3 px-4 outline-none"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Phone */}
              <div>
                <input
                  {...register("phone", { required: "Phone number is required" })}
                  placeholder="Phone Number"
                  type="tel"
                  className="w-full border-2 border-blue-200 focus:border-blue-500 rounded-xl py-3 px-4 outline-none"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <textarea
                  {...register("message", { required: "Message is required" })}
                  placeholder="Your Message"
                  rows={5}
                  className="w-full border-2 border-indigo-200 focus:border-indigo-500 rounded-xl py-3 px-4 resize-none outline-none"
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-4 text-xl font-bold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
              >
                Send Message
                <Zap className="w-5 h-5 ml-2" />
              </button>
            </form>

            {/* Toast Message */}
            {toastMessage && (
              <div className="mt-6 p-4 bg-green-100 text-green-700 rounded-xl text-center font-semibold">
                {toastMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
