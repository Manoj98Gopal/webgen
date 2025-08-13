"use client";

import React, { useState, useEffect } from "react";
import {
  CheckCircle2,
  Sparkles,
  Image,
  Layout,
  Palette,
  Code,
  Rocket,
  X
} from "lucide-react";
import { useAppContext } from "@/hook/useAppContext";
import { commonActions } from "@/context/actions/commonActions";
import { useRouter } from "next/navigation";

const BuildView = () => {
  const { commonDetails, dispatch } = useAppContext();

  const businessIdea = commonDetails?.userInput || "Create website for biryani";
  const [currentStep, setCurrentStep] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();

  // Loading messages that cycle through
  const loadingSteps = [
    { text: "Analyzing your idea", icon: Sparkles },
    { text: "Creating suitable images", icon: Image },
    { text: "Designing perfect template", icon: Layout },
    { text: "Selecting color schemes", icon: Palette },
    { text: "Building components", icon: Code },
    { text: "Finalizing your website", icon: Rocket }
  ];

  // Your actual API call
  const generateWebsiteData = async () => {
    try {
      dispatch(commonActions.webGenLoading(true));

      const response = await fetch("/api/generate-webdata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ businessIdea: businessIdea })
      });

      const result = await response.json();
      console.log("Generated API data:", result);

      if (response.ok && result) {
        dispatch(commonActions.webData(result?.data));
        return result;
      } else {
        throw new Error(result.error || "Failed to generate website");
      }
    } catch (err) {
      setError(err.message || "Network error occurred");
      console.error("Error:", err);
      throw err;
    } finally {
      dispatch(commonActions.webGenLoading(false));
    }
  };

  useEffect(() => {
    // Start the API call
    generateWebsiteData()
      .then((result) => {
        // Show success toast
        setShowToast(true);

        // Redirect after 3 seconds
        setTimeout(() => {
          router.push("/web-preview");
        }, 2000);
      })
      .catch((err) => {
        console.error("API call failed:", err);
      });

    // Cycle through loading steps
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % loadingSteps.length);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const CurrentIcon = loadingSteps[currentStep].icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4 relative">
      {/* Success Toast */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div className="bg-white rounded-lg shadow-lg border border-green-200 p-4 flex items-center space-x-3 max-w-sm">
            <div className="flex-shrink-0">
              <CheckCircle2 className="w-6 h-6 text-green-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">
                Website Created!
              </p>
              <p className="text-xs text-gray-600">
                Redirecting in a moment...
              </p>
            </div>
            <button
              onClick={() => setShowToast(false)}
              className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <div className="max-w-md w-full text-center space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">
            Building Your Website
          </h1>
          <h2 className="text-lg text-indigo-600 font-medium">
            Turning Your Vision Into Reality One Step at a Time
          </h2>
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-100">
            <p className="text-gray-700 leading-relaxed text-lg font-medium">
              "{businessIdea}"
            </p>
          </div>
        </div>

        {/* Main Loading Animation */}
        <div className="relative">
          {/* Spinning Border */}
          <div className="w-32 h-32 mx-auto relative">
            <div className="absolute inset-0 rounded-full border-4 border-indigo-200"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-500 animate-spin"></div>

            {/* Center Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white rounded-full p-4 shadow-lg transform transition-all duration-500 hover:scale-110">
                <CurrentIcon className="w-8 h-8 text-indigo-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Current Step - No Progress Bar */}
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-100 transform transition-all duration-500">
            <p className="text-xl font-semibold text-gray-800">
              {loadingSteps[currentStep].text}
            </p>
          </div>
        </div>

        {/* Steps Preview - Only show current step as active */}
        <div className="grid grid-cols-2 gap-3">
          {loadingSteps.map((step, index) => {
            const StepIcon = step.icon;
            const isActive = index === currentStep;

            return (
              <div
                key={index}
                className={`p-3 rounded-lg border transition-all duration-300 ${
                  isActive
                    ? "bg-indigo-50 border-indigo-200 scale-105"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <StepIcon
                    className={`w-4 h-4 ${
                      isActive ? "text-indigo-500" : "text-gray-400"
                    }`}
                  />
                  <span
                    className={`text-xs font-medium ${
                      isActive ? "text-indigo-700" : "text-gray-500"
                    }`}
                  >
                    {step.text}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pulse Animation */}
        <div className="flex justify-center space-x-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            ></div>
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            <p className="text-sm">{error}</p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(100%) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0) translateY(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

export default BuildView;
