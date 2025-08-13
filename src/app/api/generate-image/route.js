import { NextResponse } from "next/server";
import axios from "axios";
import fs from "fs";
import path from "path";

// ✅ GET request — quick API key test
export async function GET() {
  try {
    const response = await axios.get("https://api.freepik.com/v1/resources", {
      headers: {
        "x-freepik-api-key": process.env.FREEPIK_API_KEY
      },
      params: {
        term: "biryani",
        limit: 1
      }
    });

    return NextResponse.json({
      success: true,
      message: "API key is valid",
      data: response.data
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.response?.data || error.message },
      { status: error.response?.status || 500 }
    );
  }
}

// ✅ POST request — generate image using Classic Fast endpoint
export async function POST(request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { success: false, error: "Prompt is required" },
        { status: 400 }
      );
    }

    // Try Classic Fast endpoint first (simpler parameters)
    const requestBody = {
      prompt: prompt,
      num_images: 1,
      image: {
        size: "square_1_1"
      },
      filter_nsfw: true
    };

    console.log(
      "Sending request to Classic Fast API:",
      JSON.stringify(requestBody, null, 2)
    );

    const response = await axios.post(
      "https://api.freepik.com/v1/ai/text-to-image",
      requestBody,
      {
        headers: {
          "x-freepik-api-key": process.env.FREEPIK_API_KEY,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("API Response:", JSON.stringify(response.data, null, 2));

    if (
      !response.data ||
      !response.data.data ||
      response.data.data.length === 0
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "No image data received",
          responseData: response.data
        },
        { status: 404 }
      );
    }

    const generatedImage = response.data.data[0];
    const base64Image = generatedImage.base64;

    if (!base64Image) {
      return NextResponse.json(
        {
          success: false,
          error: "Base64 image data not found",
          imageData: generatedImage
        },
        { status: 404 }
      );
    }

    // Convert base64 to data URL for immediate display
    const imageDataUrl = `data:image/png;base64,${base64Image}`;

    return NextResponse.json({
      success: true,
      imageUrl: imageDataUrl,
      base64Image: base64Image,
      imageData: {
        prompt: prompt,
        hasNsfw: generatedImage.has_nsfw || false,
        meta: response.data.meta || {}
      }
    });
  } catch (error) {
    console.error(
      "Error generating image:",
      error.response?.data || error.message
    );

    // Return detailed error information for debugging
    return NextResponse.json(
      {
        success: false,
        error: error.response?.data?.message || error.message,
        details: error.response?.data || "No additional details",
        status: error.response?.status || "Unknown status",
        endpoint: "Classic Fast (/v1/ai/text-to-image)"
      },
      { status: error.response?.status || 500 }
    );
  }
}

// ✅ PUT request — save base64 image to file
export async function PUT(request) {
  try {
    const { base64Image, filename } = await request.json();

    if (!base64Image || !filename) {
      return NextResponse.json(
        { success: false, error: "Base64 image and filename are required" },
        { status: 400 }
      );
    }

    // Create generatedImages directory if it doesn't exist
    const publicDir = path.join(process.cwd(), "public");
    const generatedImagesDir = path.join(publicDir, "generatedImages");

    if (!fs.existsSync(generatedImagesDir)) {
      fs.mkdirSync(generatedImagesDir, { recursive: true });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const uniqueFilename = `${filename}_${timestamp}.png`;
    const filePath = path.join(generatedImagesDir, uniqueFilename);

    // Convert base64 to buffer and save
    const imageBuffer = Buffer.from(base64Image, "base64");
    fs.writeFileSync(filePath, imageBuffer);

    const savedImagePath = `/generatedImages/${uniqueFilename}`;

    return NextResponse.json({
      success: true,
      message: "Image saved successfully",
      imagePath: savedImagePath,
      filename: uniqueFilename
    });
  } catch (error) {
    console.error("Error saving image:", error);
    return NextResponse.json(
      { success: false, error: error.response?.data || error.message },
      { status: error.response?.status || 500 }
    );
  }
}
