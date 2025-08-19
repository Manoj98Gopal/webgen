"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const ContactUs = ({
  heading,
  address,
  phone,
  email,
  hours,
  id = "contact",
  mapEmbedUrl
}) => {
  const [toastMessage, setToastMessage] = useState("");

  // Contact Info Items with Icons
  const infoItems = [
    { label: "Address", value: address, icon: MapPin },
    { label: "Phone", value: phone, icon: Phone },
    { label: "Email", value: email, icon: Mail },
    { label: "Hours", value: hours, icon: Clock }
  ];

  // Form Fields
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

  // Handle Form Submit
  const onSubmit = (data) => {
    console.log("Form Submitted:", data);

    setToastMessage("✅ Message sent successfully!");
    setTimeout(() => setToastMessage(""), 3000);

    reset();
  };

  return (
    <section className="py-24 bg-slate-50" id={id}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="inline-block bg-emerald-100 text-emerald-700 px-4 py-2 mb-4 rounded-lg font-medium">
            Contact
          </span>
          <h2 className="text-4xl font-bold text-slate-800">{heading}</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto items-start">
          {/* Contact Info */}
          <div className="space-y-6">
            {infoItems.map(
              (item, index) =>
                item.value && (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-6 shadow-sm border border-slate-200"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-slate-600 to-emerald-600 rounded-xl flex items-center justify-center">
                        <item.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-2">
                          {item.label}
                        </h4>
                        <p className="text-slate-600">{item.value}</p>
                      </div>
                    </div>
                  </div>
                )
            )}

            {mapEmbedUrl && (
              <div className="mt-6 rounded-xl overflow-hidden shadow-md border border-slate-200">
                <iframe
                  src={mapEmbedUrl}
                  className="w-full h-72"
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
          <div className="bg-white p-8 rounded-2xl w-full relative border border-slate-200 shadow-sm">
            <h3 className="text-2xl font-semibold text-slate-800 mb-6">
              Send us a Message
            </h3>

            {/* Toast */}
            {toastMessage && (
              <div className="absolute top-4 right-4 bg-emerald-600 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in">
                {toastMessage}
              </div>
            )}

            {/* Form */}
            {formFields.length === 0 ? (
              <p className="text-slate-500">⚠ No form fields available.</p>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {formFields.map((field) => {
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
                          className="w-full p-4 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none resize-none"
                        />
                      ) : (
                        <input
                          type={field.type}
                          placeholder={field.placeholder}
                          {...register(field.name, validationRules)}
                          className="w-full p-4 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
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
                  className="w-full bg-slate-800 hover:bg-slate-900 text-white py-4 rounded-lg font-semibold transition-colors"
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
