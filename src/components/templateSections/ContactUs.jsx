"use client"


import React, { useState } from "react";
import { useForm } from "react-hook-form";

const ContactUs = ({
  heading,
  address,
  phone,
  email,
  hours,
  id,
  mapEmbedUrl
}) => {
  const [toastMessage, setToastMessage] = useState("");

  const formFields = [
    {
      name: "name",
      type: "text",
      placeholder: "Your Name",
      validation: { required: "Name is required" }
    },
    {
      name: "email",
      type: "email",
      placeholder: "Your Email",
      validation: { required: "Email is required" }
    },
    {
      name: "phone",
      type: "tel",
      placeholder: "Phone Number",
      validation: { required: "Phone number is required" }
    },
    {
      name: "message",
      type: "textarea",
      placeholder: "Your Message",
      rows: 5
    }
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);

    setToastMessage("✅ Message sent successfully!");
    setTimeout(() => setToastMessage(""), 3000);

    reset();
  };

  return (
    <section className="py-20 px-6 bg-gray-800" id={id}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-orange-400">
          {heading}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12 lg:mb-0">
            <div className="bg-gray-900 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-2 text-orange-400">
                Address
              </h3>
              <p className="text-gray-300">{address}</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-2 text-orange-400">Phone</h3>
              <p className="text-gray-300">{phone}</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-2 text-orange-400">Email</h3>
              <p className="text-gray-300">{email}</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-2 text-orange-400">Hours</h3>
              <p className="text-gray-300">{hours}</p>
            </div>
            {mapEmbedUrl && (
              <div className="mt-6 col-span-1 md:col-span-2 rounded-xl overflow-hidden shadow-lg border border-gray-700">
                <iframe
                  src={mapEmbedUrl}
                  className="w-full h-64 sm:h-72 md:h-80"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Map"
                ></iframe>
              </div>
            )}
          </div>

          {/* Contact Form */}
          <div className="bg-gray-900 p-6 sm:p-8 rounded-2xl w-full relative">
            <h3 className="text-2xl font-bold mb-6 text-orange-400">
              Send us a Message
            </h3>

            {toastMessage && (
              <div className="absolute top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in">
                {toastMessage}
              </div>
            )}

            {formFields.length === 0 ? (
              <p className="text-gray-400">⚠ No form fields available.</p>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {formFields.map((field) => {
                  // Special validation for phone numbers
                  const validationRules =
                    field.name === "phone"
                      ? {
                          required: "Phone number is required",
                          pattern: {
                            value: /^[0-9]{10}$/,
                            message: "Enter a valid 10-digit phone number"
                          }
                        }
                      : field.validation;

                  return (
                    <div key={field.name}>
                      {field.type === "textarea" ? (
                        <textarea
                          placeholder={field.placeholder}
                          rows={field.rows || 4}
                          {...register(field.name, validationRules)}
                          className="w-full p-4 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none resize-none"
                        />
                      ) : (
                        <input
                          type={field.type}
                          placeholder={field.placeholder}
                          {...register(field.name, validationRules)}
                          className="w-full p-4 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
                        />
                      )}
                      {errors[field.name] && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors[field.name]?.message}
                        </p>
                      )}
                    </div>
                  );
                })}
                <button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-lg font-semibold transition-colors"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
