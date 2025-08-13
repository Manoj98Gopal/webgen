"use client";

import { useState } from "react";
import Image from "next/image";

export default function ImageGenerator() {
  const [imagination, setImagination] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState("");
  const [base64Image, setBase64Image] = useState("");
  const [imageData, setImageData] = useState(null);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState("");
  const [apiStatus, setApiStatus] = useState("");
  const [downloading, setDownloading] = useState(false);
  const [downloadedPath, setDownloadedPath] = useState("");

  // ✅ Generate image
  const handleCreate = async () => {
    if (!imagination.trim()) {
      setError("Please describe your imagination");
      return;
    }

    setLoading(true);
    setError("");
    setGeneratedImage("");
    setBase64Image("");
    setImageData(null);
    setDownloadedPath("");
    setProgress("Generating your image with AI...");

    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt: imagination })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate image");
      }

      setGeneratedImage(data.imageUrl);
      setBase64Image(data.base64Image);
      setImageData(data.imageData);
      setProgress("Image generated successfully!");
    } catch (err) {
      console.error("Generation error:", err);
      
      // Show detailed error information
      let errorMessage = err.message;
      if (err.message.includes('details')) {
        try {
          const errorData = JSON.parse(err.message.split('details: ')[1]);
          errorMessage = `API Error: ${errorData.message || errorData.error || err.message}`;
        } catch (parseError) {
          // If can't parse, use original message
        }
      }
      
      setError(errorMessage);
      setProgress("");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Download and save image
  const handleDownload = async () => {
    if (!base64Image) return;

    setDownloading(true);
    setError("");
    
    try {
      // Create filename from prompt (sanitized)
      const sanitizedPrompt = imagination
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .replace(/\s+/g, "_")
        .substring(0, 50);

      const response = await fetch("/api/generate-image", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          base64Image: base64Image,
          filename: sanitizedPrompt || "generated_image"
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to save image");
      }

      setDownloadedPath(data.imagePath);
      setProgress("Image saved successfully!");
      
    } catch (err) {
      setError(err.message);
    } finally {
      setDownloading(false);
    }
  };


  // ✅ Test API Key
  const handleTestApi = async () => {
    setApiStatus("Testing API key...");
    setError("");

    try {
      const res = await fetch("/api/generate-image", { method: "GET" });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "API key test failed");
      }

      setApiStatus(`✅ API key is valid — Model responded successfully!`);
    } catch (err) {
      setApiStatus("");
      setError(err.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          AI Image Creator
        </h1>
        <p className="text-gray-600">
          Describe your imagination and create AI-generated images
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="space-y-6">
          {/* Textarea */}
          <div>
            <label
              htmlFor="imagination"
              className="block text-lg font-medium text-gray-700 mb-3"
            >
              Describe Your Imagination:
            </label>
            <textarea
              id="imagination"
              value={imagination}
              onChange={(e) => setImagination(e.target.value)}
              placeholder="Describe the image you want to generate... (e.g., a sunset over mountains, a cute cat in a garden, futuristic cityscape)"
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-700"
              rows="6"
            />
            <div className="text-sm text-gray-500 mt-2">
              Characters: {imagination.length}/1000
            </div>
          </div>

          {/* Buttons Row */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleCreate}
              disabled={loading || !imagination.trim()}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Generating...</span>
                </div>
              ) : (
                "Generate Image"
              )}
            </button>

            <button
              onClick={handleTestApi}
              className="flex-1 bg-green-600 text-white py-4 px-8 rounded-lg hover:bg-green-700 font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Test API Key
            </button>
          </div>

          {/* API status */}
          {apiStatus && (
            <div className="p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg">
              {apiStatus}
            </div>
          )}

          {/* Progress */}
          {progress && (
            <div className="p-4 bg-blue-50 border border-blue-200 text-blue-800 rounded-lg">
              {progress}
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {/* Generated Image */}
          {generatedImage && (
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  Generated Image:
                </h3>
                <button
                  onClick={handleDownload}
                  disabled={downloading}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  {downloading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Downloading...</span>
                    </div>
                  ) : (
                    "Download & Save"
                  )}
                </button>
              </div>

              <div className="relative w-full aspect-square max-w-lg mx-auto border-2 border-gray-200 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={generatedImage}
                  alt={imageData?.prompt || "Generated image"}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Image Info */}
              {imageData && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Prompt:</span> {imageData.prompt}
                  </p>
                  <p className="text-sm text-gray-700 mt-1">
                    <span className="font-medium">Size:</span> {imageData.width} × {imageData.height}px
                  </p>
                  {imageData.hasNsfw && (
                    <p className="text-sm text-amber-600 mt-1">
                      <span className="font-medium">⚠️ Content Warning:</span> This image may contain sensitive content
                    </p>
                  )}
                </div>
              )}

              {/* Download Success */}
              {downloadedPath && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <span>✅ Image saved successfully!</span>
                  </div>
                  <div className="text-sm mt-2">
                    <span className="font-medium">Saved to:</span>{" "}
                    <code className="bg-green-100 px-2 py-1 rounded">
                      public{downloadedPath}
                    </code>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}