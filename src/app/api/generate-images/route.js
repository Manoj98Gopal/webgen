import { NextResponse } from "next/server";
import axios from "axios";

const FREEPIK_API_KEY = process.env.FREEPIK_API_KEY;

// Updated endpoints based on Freepik API documentation
const ENDPOINTS = {
  classic: "https://api.freepik.com/v1/ai/text-to-image",
  mystic: "https://api.freepik.com/v1/ai/mystic", 
  flux: "https://api.freepik.com/v1/ai/text-to-image/flux-dev",
  imagen3: "https://api.freepik.com/v1/ai/text-to-image/imagen3"
};

if (!FREEPIK_API_KEY) {
  console.error("FREEPIK_API_KEY environment variable is not set");
}

// Function to poll for image completion (for non-classic modes)
async function pollForCompletion(taskId, mode, maxAttempts = 60, intervalMs = 3000) {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      let pollUrl;
      
      // Use different poll URLs based on mode
      if (mode === 'mystic') {
        pollUrl = `https://api.freepik.com/v1/ai/mystic/${taskId}`;
      } else {
        pollUrl = `https://api.freepik.com/v1/ai/text-to-image/jobs/${taskId}`;
      }
      
      console.log(`Poll attempt ${attempt + 1} for ${mode} mode:`, pollUrl);
      
      const response = await axios.get(pollUrl, {
        headers: {
          "X-Freepik-API-Key": FREEPIK_API_KEY,
          "Content-Type": "application/json"
        }
      });

      console.log(`Poll attempt ${attempt + 1} response:`, JSON.stringify(response.data, null, 2));

      const responseData = response.data;

      // Handle Mystic response format
      if (mode === 'mystic') {
        if (responseData.data) {
          const { status, generated } = responseData.data;
          
          // Check if task is completed successfully
          if (status === "COMPLETED" && generated && generated.length > 0) {
            const imageData = generated[0];
            return {
              url: imageData.url || imageData.image_url,
              actualSize: imageData.size || null,
              width: imageData.width || null,
              height: imageData.height || null
            };
          }

          // Check for failure states
          if (status === "FAILED" || status === "ERROR") {
            throw new Error(`Image generation failed with status: ${status}`);
          }

          console.log(`Mystic task ${taskId} status: ${status}, waiting...`);
        }
      } 
      // Handle other modes (flux, imagen3) response format
      else {
        if (responseData.status === "success" && responseData.result?.images?.[0]?.url) {
          return {
            url: responseData.result.images[0].url,
            actualSize: responseData.result.images[0]?.size || null,
            width: responseData.result.images[0]?.width || null,
            height: responseData.result.images[0]?.height || null
          };
        }

        if (responseData.status === "failed" || responseData.status === "error") {
          throw new Error(`Image generation failed: ${responseData.result?.message || 'Unknown error'}`);
        }
      }

      // Wait before next poll
      await new Promise((resolve) => setTimeout(resolve, intervalMs));
    } catch (error) {
      console.log(`Poll attempt ${attempt + 1} error:`, error.message);
      
      if (error.response?.status === 404) {
        // Task might not exist yet, continue polling
        console.log("Task not found, continuing to poll...");
        await new Promise((resolve) => setTimeout(resolve, intervalMs));
        continue;
      }
      
      if (attempt === maxAttempts - 1) {
        throw error;
      }
      await new Promise((resolve) => setTimeout(resolve, intervalMs));
    }
  }

  throw new Error(`Image generation timeout after ${maxAttempts * intervalMs / 1000} seconds`);
}

// Freepik API valid sizes based on documentation
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

// Expected dimensions mapping
const sizeMapping = {
  "square_1_1": { width: 1024, height: 1024 },
  "classic_4_3": { width: 1024, height: 768 },
  "traditional_3_4": { width: 768, height: 1024 },
  "widescreen_16_9": { width: 1024, height: 576 },
  "social_story_9_16": { width: 576, height: 1024 },
  "smartphone_horizontal_20_9": { width: 1024, height: 461 },
  "smartphone_vertical_9_20": { width: 461, height: 1024 },
  "standard_3_2": { width: 1024, height: 683 },
  "portrait_2_3": { width: 683, height: 1024 },
  "horizontal_2_1": { width: 1024, height: 512 },
  "vertical_1_2": { width: 512, height: 1024 },
  "social_5_4": { width: 1024, height: 819 },
  "social_post_4_5": { width: 819, height: 1024 }
};

// Function to create proper payload based on mode and API documentation
function createPayload(prompt, size, mode) {
  const basePayload = {
    prompt: prompt.trim(),
    num_images: 1,
    image: {
      size: size
    }
  };

  switch (mode) {
    case "classic":
      return {
        ...basePayload,
        styling: {
          style: "photo",
          color: "color",
          lightning: "natural"
        }
      };

    case "mystic":
      return {
        ...basePayload,
        styling: {
          style: "photo",
          color: "color", 
          lightning: "natural"
        }
      };

    case "flux":
      return {
        ...basePayload,
        guidance_scale: 3.5,
        num_inference_steps: 28
      };

    case "imagen3":
      return {
        ...basePayload,
        guidance_scale: 10
      };

    default:
      return basePayload;
  }
}

export async function POST(req) {
  try {
    const { prompt, size = "square_1_1", mode = "classic" } = await req.json();

    console.log("=== IMAGE GENERATION REQUEST ===");
    console.log("Mode:", mode);
    console.log("Prompt:", prompt);
    console.log("Requested size:", size);
    console.log("Expected dimensions:", sizeMapping[size]);

    // Validation
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
    if (!validSizes.includes(size)) {
      return NextResponse.json(
        { error: `Invalid size. Must be one of: ${validSizes.join(", ")}` },
        { status: 400 }
      );
    }

    // Validate mode
    const validModes = Object.keys(ENDPOINTS);
    if (!validModes.includes(mode)) {
      return NextResponse.json(
        { error: `Invalid mode. Must be one of: ${validModes.join(", ")}` },
        { status: 400 }
      );
    }

    const endpoint = ENDPOINTS[mode];
    const payload = createPayload(prompt, size, mode);
    
    console.log("Endpoint:", endpoint);
    console.log("Request payload:", JSON.stringify(payload, null, 2));

    // Make the API request
    const generateResponse = await axios.post(
      endpoint,
      payload,
      {
        headers: {
          "X-Freepik-API-Key": FREEPIK_API_KEY,
          "Content-Type": "application/json"
        },
        timeout: 15000 // 15 second timeout
      }
    );

    console.log("API Response Status:", generateResponse.status);
    console.log("API Response:", JSON.stringify(generateResponse.data, null, 2));

    // Handle Classic mode (direct response with base64)
    if (mode === "classic" && generateResponse.data?.data?.[0]) {
      const imageData = generateResponse.data.data[0];
      const meta = generateResponse.data.meta;
      
      console.log("=== CLASSIC MODE RESPONSE ===");
      console.log("- Requested size:", size);
      console.log("- Meta image size:", meta?.image?.size);
      console.log("- Meta dimensions:", `${meta?.image?.width}x${meta?.image?.height}`);
      console.log("- Expected dimensions:", `${sizeMapping[size].width}x${sizeMapping[size].height}`);

      const sizeMatches = meta?.image?.size === size;
      const dimensionsMatch = meta?.image?.width === sizeMapping[size].width && 
                             meta?.image?.height === sizeMapping[size].height;

      return NextResponse.json({
        success: true,
        imageUrl: imageData.base64 ? `data:image/png;base64,${imageData.base64}` : null,
        base64: imageData.base64,
        requestedSize: size,
        actualSize: meta?.image?.size,
        requestedDimensions: sizeMapping[size],
        actualDimensions: { 
          width: meta?.image?.width, 
          height: meta?.image?.height 
        },
        sizeMatches: sizeMatches,
        dimensionsMatch: dimensionsMatch,
        mode: mode,
        meta: meta,
        warning: !sizeMatches ? `Size mismatch: requested ${size} but got ${meta?.image?.size}` : null
      });
    } 
    // Handle Mystic mode response (task-based)
    else if (mode === "mystic" && generateResponse.data?.data?.task_id) {
      const taskId = generateResponse.data.data.task_id;
      console.log("Mystic image generation started, task ID:", taskId);

      // Poll for completion
      const result = await pollForCompletion(taskId, mode);

      console.log("=== MYSTIC MODE COMPLETED ===");
      console.log("- URL:", result.url);
      console.log("- Requested size:", size);
      console.log("- Actual size returned:", result.actualSize);
      console.log("- Actual dimensions:", `${result.width}x${result.height}`);
      console.log("- Expected dimensions:", `${sizeMapping[size].width}x${sizeMapping[size].height}`);

      const sizeMatches = result.actualSize === size;
      const dimensionsMatch = result.width === sizeMapping[size].width && 
                             result.height === sizeMapping[size].height;

      return NextResponse.json({
        success: true,
        imageUrl: result.url,
        taskId: taskId,
        requestedSize: size,
        actualSize: result.actualSize,
        requestedDimensions: sizeMapping[size],
        actualDimensions: { width: result.width, height: result.height },
        sizeMatches: sizeMatches,
        dimensionsMatch: dimensionsMatch,
        mode: mode,
        warning: !sizeMatches ? `Size mismatch: requested ${size} but got ${result.actualSize}` : null
      });
    }
    // Handle other job-based modes (Flux, Imagen3)
    else if (generateResponse.data?.job_id) {
      const jobId = generateResponse.data.job_id;
      console.log("Image generation started, job ID:", jobId);

      // Poll for completion
      const result = await pollForCompletion(jobId, mode);

      console.log("=== JOB-BASED MODE COMPLETED ===");
      console.log("- URL:", result.url);
      console.log("- Requested size:", size);
      console.log("- Actual size returned:", result.actualSize);
      console.log("- Actual dimensions:", `${result.width}x${result.height}`);
      console.log("- Expected dimensions:", `${sizeMapping[size].width}x${sizeMapping[size].height}`);

      const sizeMatches = result.actualSize === size;
      const dimensionsMatch = result.width === sizeMapping[size].width && 
                             result.height === sizeMapping[size].height;

      return NextResponse.json({
        success: true,
        imageUrl: result.url,
        jobId: jobId,
        requestedSize: size,
        actualSize: result.actualSize,
        requestedDimensions: sizeMapping[size],
        actualDimensions: { width: result.width, height: result.height },
        sizeMatches: sizeMatches,
        dimensionsMatch: dimensionsMatch,
        mode: mode,
        warning: !sizeMatches ? `Size mismatch: requested ${size} but got ${result.actualSize}` : null
      });
    } 
    // Handle unexpected response formats
    else {
      console.log("=== UNEXPECTED RESPONSE FORMAT ===");
      console.log("Response data:", generateResponse.data);
      
      // Check if there's an error message in the response
      if (generateResponse.data?.error) {
        throw new Error(generateResponse.data.error);
      }
      
      throw new Error(`Unexpected API response format for mode: ${mode}. Expected task_id for mystic or job_id for other modes.`);
    }

  } catch (error) {
    console.error("=== IMAGE GENERATION ERROR ===");
    console.error("Error message:", error.message);
    console.error("Error response status:", error.response?.status);
    console.error("Error response data:", error.response?.data);

    // Handle specific error cases based on Freepik API documentation
    if (error.response?.status === 401) {
      return NextResponse.json({ 
        error: "Invalid API key or authentication failed" 
      }, { status: 401 });
    }

    if (error.response?.status === 402) {
      return NextResponse.json({
        error: "Insufficient credits. Please check your Freepik account balance."
      }, { status: 402 });
    }

    if (error.response?.status === 429) {
      return NextResponse.json({
        error: "Rate limit exceeded. Please try again later."
      }, { status: 429 });
    }

    if (error.response?.status === 400) {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          "Bad request. Please check your parameters.";
      return NextResponse.json({
        error: errorMessage,
        details: error.response?.data
      }, { status: 400 });
    }

    if (error.response?.status === 404) {
      return NextResponse.json({
        error: "API endpoint not found. Please check the model availability."
      }, { status: 404 });
    }

    if (error.response?.status === 422) {
      return NextResponse.json({
        error: "Invalid request parameters. Please check your input.",
        details: error.response?.data
      }, { status: 422 });
    }

    if (error.code === "ECONNABORTED" || error.message.includes("timeout")) {
      return NextResponse.json({
        error: "Request timeout. The image generation is taking longer than expected. Please try again."
      }, { status: 408 });
    }

    if (error.code === "ECONNREFUSED" || error.code === "ENOTFOUND") {
      return NextResponse.json({
        error: "Unable to connect to Freepik API. Please check your internet connection."
      }, { status: 503 });
    }

    return NextResponse.json({
      error: error.response?.data?.message ||
             error.response?.data?.error ||
             error.message ||
             "Failed to generate image",
      details: process.env.NODE_ENV === 'development' ? error.response?.data : undefined
    }, { status: 500 });
  }
}