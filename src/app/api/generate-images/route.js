import { NextResponse } from "next/server";
import axios from "axios";

const FREEPIK_API_KEY = process.env.FREEPIK_API_KEY;
const FREEPIK_BASE_URL = "https://api.freepik.com/v1/ai/text-to-image";

if (!FREEPIK_API_KEY) {
  console.error("FREEPIK_API_KEY environment variable is not set");
}

// Function to poll for image completion
async function pollForCompletion(jobId, maxAttempts = 30, intervalMs = 2000) {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      const response = await axios.get(`${FREEPIK_BASE_URL}/jobs/${jobId}`, {
        headers: {
          "X-Freepik-API-Key": FREEPIK_API_KEY,
          "Content-Type": "application/json"
        }
      });

      const { status, result } = response.data;

      if (status === "success" && result?.images?.[0]?.url) {
        return result.images[0].url;
      }

      if (status === "failed" || status === "error") {
        throw new Error("Image generation failed");
      }

      // Wait before next poll
      await new Promise((resolve) => setTimeout(resolve, intervalMs));
    } catch (error) {
      if (attempt === maxAttempts - 1) {
        throw error;
      }
      await new Promise((resolve) => setTimeout(resolve, intervalMs));
    }
  }

  throw new Error("Image generation timeout");
}

export async function POST(req) {
  try {
    const { prompt, size = "square_1_1" } = await req.json();

    if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
      return NextResponse.json(
        { error: "Prompt is required and must be a non-empty string" },
        { status: 400 }
      );
    }

    if (!FREEPIK_API_KEY) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    // Validate size option
    const validSizes = [
      "square_1_1",
      "classic_4_3",
      "traditional_3_4",
      "widescreen_16_9",
      "social_story_9_16",
      "smartphone_horizontal_20_9",
      "smartphone_vertical_9_20",
      "standard_3_2",
      "portrait_2_3",
      "horizontal_2_1",
      "vertical_1_2",
      "social_5_4",
      "social_post_4_5"
    ];

    if (!validSizes.includes(size)) {
      return NextResponse.json(
        { error: `Invalid size. Must be one of: ${validSizes.join(", ")}` },
        { status: 400 }
      );
    }

    console.log("Generating image with prompt:", prompt, "size:", size);

    // Start image generation
    const generateResponse = await axios.post(
      FREEPIK_BASE_URL,
      {
        prompt: prompt.trim(),
        num_images: 1,
        mode: "mystic", // Using Mystic mode as per the documentation
        image: {
          size: size // Now using the string value directly
        },
        styling: {
          style: "photo", // Best option for realistic images
          color: "color", // Full color (vs black_and_white)
          lightning: "natural" // Natural lighting for most realistic look
        }
      },
      {
        headers: {
          "X-Freepik-API-Key": FREEPIK_API_KEY,
          "Content-Type": "application/json"
        },
        timeout: 10000 // 10 second timeout for initial request
      }
    );

    const jobId = generateResponse.data?.job_id;

    if (!jobId) {
      throw new Error("No job ID received from Freepik API");
    }

    console.log("Image generation started, job ID:", jobId);

    // Poll for completion
    const imageUrl = await pollForCompletion(jobId);

    console.log("Image generation completed:", imageUrl);

    return NextResponse.json({
      success: true,
      imageUrl: imageUrl,
      jobId: jobId
    });
  } catch (error) {
    console.error(
      "Image generation error:",
      error.response?.data || error.message
    );

    // Handle specific error cases
    if (error.response?.status === 401) {
      return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
    }

    if (error.response?.status === 429) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please try again later." },
        { status: 429 }
      );
    }

    if (error.response?.status === 402) {
      return NextResponse.json(
        { error: "Insufficient credits. Please check your Freepik account." },
        { status: 402 }
      );
    }

    if (error.code === "ECONNABORTED" || error.message.includes("timeout")) {
      return NextResponse.json(
        { error: "Request timeout. Please try again." },
        { status: 408 }
      );
    }

    return NextResponse.json(
      {
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to generate image",
        details: error.response?.data
      },
      { status: 500 }
    );
  }
}
