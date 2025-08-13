"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { commonActions } from "@/context/actions/commonActions";
import { useAppContext } from "@/hook/useAppContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [businessIdea, setBusinessIdea] = useState("");
  const { dispatch } = useAppContext();

  const route = useRouter();

  const handleGetStarted = () => {
    dispatch(commonActions.userInput(businessIdea));
    if (businessIdea.trim()) {
      route.push("/web-build");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            WebCraft AI
          </div>
          <nav className="hidden md:flex space-x-8">
            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Features
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Examples
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Pricing
            </a>
          </nav>
        </div>
      </header>

      <main className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Turn Your Business Idea Into a
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              Beautiful Website
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Describe your business idea and watch as AI creates a stunning,
            professional website tailored to your vision in seconds.
          </p>

          {/* Input Section */}
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <label
              htmlFor="business-idea"
              className="block text-lg font-semibold text-gray-700 mb-4 text-left"
            >
              Describe your business idea
            </label>
            <Textarea
              id="business-idea"
              value={businessIdea}
              onChange={(e) => setBusinessIdea(e.target.value)}
              placeholder="e.g., A modern coffee shop that serves artisanal coffee and provides a cozy workspace for remote workers..."
              className="w-full h-32 text-base border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 resize-none transition-colors"
            />

            <Button
              onClick={handleGetStarted}
              disabled={!businessIdea.trim()}
              className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl text-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              🚀 Get Started - Build My Website
            </Button>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mt-20 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Lightning Fast
              </h3>
              <p className="text-gray-600">
                Generate a complete website in under 10 seconds
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="text-3xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Beautiful Design
              </h3>
              <p className="text-gray-600">
                Modern, responsive designs that look professional
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="text-3xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                AI Powered
              </h3>
              <p className="text-gray-600">
                Smart algorithms understand your business needs
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
