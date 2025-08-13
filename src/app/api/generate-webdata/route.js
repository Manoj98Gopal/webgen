import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
  try {
    const { businessIdea } = await req.json();

    if (!businessIdea) {
      return NextResponse.json(
        { error: "Business idea is required" },
        { status: 400 }
      );
    }

    // Step 1: Generate website content with image prompts in URL fields
    const contentPrompt = `
You are an expert website content creator and image prompt specialist.

The user will provide a business idea, but it may contain spelling mistakes, typos, or incomplete words.
Your task:
1. First, carefully interpret and correct the business idea if needed.
2. Based on the corrected business idea, generate **professional, engaging, and industry-specific** website content in JSON format exactly matching the structure below.
3. For ALL image "url" fields, instead of leaving them empty, provide detailed, realistic image prompts that are specific to the business and the image context.

Do NOT output anything except a valid JSON object in the exact format given.  
Do NOT include extra explanations, markdown formatting, or additional text.

If any required value is unknown, create realistic, credible placeholder data that matches the business type.

For image prompts and sizes in "url" and "size" fields:
- Make prompts specific to the business type and section context
- Keep prompts under 80 characters for best AI image generation
- Focus on professional, realistic imagery
- Include relevant objects, people, settings for the business
- Choose appropriate sizes: "square_1_1", "landscape_4_3", "portrait_3_4", "landscape_16_9"
- Hero images should typically be "landscape_4_3" or "landscape_16_9"
- Service/product images work well as "square_1_1"
- About images can be "landscape_4_3"
- Gallery images will reuse hero, about, and services images

The structure must be:

{
  "navbar": {
    "show": true,
    "logo": {
      "isImage": false,
      "data": "Business Name"
    },
    "links": [
      {"label": "Home", "link": "#hero"},
      {"label": "Services", "link": "#services"},
      {"label": "About", "link": "#about"},
      {"label": "Gallery", "link": "#gallery"},
      {"label": "Contact", "link": "#contact"}
    ]
  },
  "hero": {
    "show": true,
    "bgType": "image",
    "bgValue": "",
    "heading": "Main Business Heading",
    "subheading": "Compelling subheading describing the business",
    "cta1": {"label": "Primary CTA", "link": "#services"},
    "cta2": {"label": "Secondary CTA", "link": "#contact"},
    "heroImage": {"id": "hero-img", "url": "detailed image prompt for hero section", "size": "landscape_4_3"},
    "id": "hero"
  },
  "about": {
    "show": true,
    "heading": "About Us / Our Story",
    "description": "Well-written business story including establishment year, mission, and unique value proposition",
    "image": {"id": "about-img", "url": "detailed image prompt for about section", "size": "landscape_4_3"},
    "highlights": [
      "Key highlight 1",
      "Key highlight 2",
      "Key highlight 3",
      "Key highlight 4"
    ],
    "id": "about"
  },
  "services": {
    "id": "services",
    "show": true,
    "heading": "Our Services / Products",
    "initialShowCount": 4,
    "items": [
      {
        "title": "Service/Product 1",
        "description": "Detailed description of the service/product",
        "image": {"id": "service-1", "url": "detailed image prompt for this specific service", "size": "square_1_1"}
      },
      {
        "title": "Service/Product 2", 
        "description": "Detailed description of the service/product",
        "image": {"id": "service-2", "url": "detailed image prompt for this specific service", "size": "square_1_1"}
      },
      {
        "title": "Service/Product 3",
        "description": "Detailed description of the service/product", 
        "image": {"id": "service-3", "url": "detailed image prompt for this specific service", "size": "square_1_1"}
      },
      {
        "title": "Service/Product 4",
        "description": "Detailed description of the service/product",
        "image": {"id": "service-4", "url": "detailed image prompt for this specific service", "size": "square_1_1"}
      }
    ],
    "cta": "Learn More / View All"
  },
  "gallery": {
    "id": "gallery",
    "show": true,
    "heading": "Gallery / Showcase",
    "images": [
      {"id": "gallery-1", "url": "", "size": "square_1_1"},
      {"id": "gallery-2", "url": "", "size": "landscape_4_3"},
      {"id": "gallery-3", "url": "", "size": "portrait_3_4"},
      {"id": "gallery-4", "url": "", "size": "square_1_1"},
      {"id": "gallery-5", "url": "", "size": "landscape_4_3"},
      {"id": "gallery-6", "url": "", "size": "portrait_3_4"}
    ]
  },
  "testimonials": {
    "id": "testimonials",
    "show": true,
    "heading": "What Our Customers Say",
    "reviews": [
      {
        "name": "Customer Name 1",
        "message": "Authentic customer review highlighting specific benefits",
        "rating": 5
      },
      {
        "name": "Customer Name 2",
        "message": "Authentic customer review mentioning quality and service",
        "rating": 5
      },
      {
        "name": "Customer Name 3",
        "message": "Authentic customer review with personal experience",
        "rating": 5
      }
    ]
  },
  "whyChooseUs": {
    "id": "whyChooseUs",
    "show": true,
    "heading": "Why Choose Us",
    "points": [
      "Key differentiator 1",
      "Key differentiator 2",
      "Key differentiator 3",
      "Key differentiator 4",
      "Key differentiator 5",
      "Key differentiator 6"
    ]
  },
  "footer": {
    "show": true,
    "links": [
      {"label": "Home", "link": "#hero"},
      {"label": "Services", "link": "#services"},
      {"label": "About", "link": "#about"},
      {"label": "Gallery", "link": "#gallery"},
      {"label": "Contact", "link": "#contact"}
    ],
    "socials": {
      "facebook": "https://facebook.com/businessname",
      "instagram": "https://instagram.com/businessname",
      "linkedin": "https://linkedin.com/company/businessname"
    },
    "copyright": "© 2025 Business Name. All rights reserved."
  },
  "contact": {
    "id": "contact",
    "show": true,
    "heading": "Get In Touch / Contact Us",
    "address": "Realistic business address",
    "phone": "+91 XXXXX XXXXX",
    "email": "contact@businessname.com",
    "hours": "Operating hours",
    "mapEmbedUrl": ""
  }
}

Guidelines:
- Fix spelling/grammar errors in the provided business idea before generating content.
- All names, headings, and descriptions must be clear, engaging, and tailored to the business type.
- Image prompts in "url" fields should be realistic and business-specific.
- Avoid generic placeholders like "Lorem ipsum" — use realistic industry-specific terms.
- Write in proper English with correct grammar and natural flow.
- Keep a professional but inviting tone.
- Never break the JSON format.
- Gallery images will be populated automatically from hero, about, and services images.
Business Idea: "${businessIdea}"
`;

    const { text } = await generateText({
      model: openai("gpt-4"),
      prompt: contentPrompt,
      temperature: 0.7,
      maxTokens: 4000
    });

    let jsonData;
    try {
      const cleanedText = text.replace(/```json\n?|\n?```/g, "").trim();
      jsonData = JSON.parse(cleanedText);
    } catch (err) {
      console.error("JSON parsing error:", err);
      return NextResponse.json(
        {
          error: "AI returned invalid JSON",
          raw: text,
          parseError: err.message
        },
        { status: 500 }
      );
    }

    // Step 2: Extract image prompts from URL fields (excluding gallery)
    const imagePrompts = extractImagePrompts(jsonData);
    
    // Step 3: Generate images and update URLs
    const updatedJsonData = await generateAndUpdateImages(jsonData, imagePrompts);

    // Step 4: Populate gallery with existing images
    populateGalleryWithExistingImages(updatedJsonData);

    return NextResponse.json({
      success: true,
      data: updatedJsonData,
      businessIdea: businessIdea,
      generatedImages: Object.keys(imagePrompts).length
    });

  } catch (error) {
    console.error("Error generating business website data:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error.message
      },
      { status: 500 }
    );
  }
}

// Function to extract image prompts and sizes from URL fields (excluding gallery)
function extractImagePrompts(data) {
  const prompts = {};
  
  // Hero image
  if (data.hero?.heroImage?.url && data.hero.heroImage.url !== "") {
    prompts[data.hero.heroImage.id] = {
      prompt: data.hero.heroImage.url,
      size: data.hero.heroImage.size || "landscape_4_3"
    };
  }
  
  // About image
  if (data.about?.image?.url && data.about.image.url !== "") {
    prompts[data.about.image.id] = {
      prompt: data.about.image.url,
      size: data.about.image.size || "landscape_4_3"
    };
  }
  
  // Service images
  if (data.services?.items) {
    data.services.items.forEach(item => {
      if (item.image?.url && item.image.url !== "") {
        prompts[item.image.id] = {
          prompt: item.image.url,
          size: item.image.size || "square_1_1"
        };
      }
    });
  }
  
  // Note: Gallery images are excluded from generation
  
  return prompts;
}

// Function to populate gallery with existing images from hero, about, and services
function populateGalleryWithExistingImages(data) {
  if (!data.gallery?.images) return;

  const availableImages = [];

  // Collect hero image
  if (data.hero?.heroImage?.url) {
    availableImages.push({
      url: data.hero.heroImage.url,
      size: data.hero.heroImage.size || "landscape_4_3"
    });
  }

  // Collect about image
  if (data.about?.image?.url) {
    availableImages.push({
      url: data.about.image.url,
      size: data.about.image.size || "landscape_4_3"
    });
  }

  // Collect service images
  if (data.services?.items) {
    data.services.items.forEach(item => {
      if (item.image?.url) {
        availableImages.push({
          url: item.image.url,
          size: item.image.size || "square_1_1"
        });
      }
    });
  }

  // Populate gallery images by cycling through available images
  if (availableImages.length > 0) {
    data.gallery.images.forEach((galleryImage, index) => {
      const sourceImage = availableImages[index % availableImages.length];
      galleryImage.url = sourceImage.url;
      // Keep the original gallery image size or use the source image size
      if (!galleryImage.size) {
        galleryImage.size = sourceImage.size;
      }
    });
  }
}

// Function to generate images and update the JSON data (with retry)
async function generateAndUpdateImages(jsonData, imagePrompts) {
  const updatedData = { ...jsonData };

  try {
    const imageGenerationPromises = Object.entries(imagePrompts).map(async ([imageId, imageData]) => {
      let imageUrl = null;
      let success = false;

      // Try first time
      try {
        console.log(`Generating image for ${imageId} (Attempt 1)`);
        imageUrl = await generateFreepikImage(imageData.prompt, imageData.size);
        success = true;
      } catch (error) {
        console.error(`Error generating image for ${imageId} (Attempt 1):`, error.message);

        // Retry once
        try {
          console.log(`Retrying image generation for ${imageId} (Attempt 2)`);
          imageUrl = await generateFreepikImage(imageData.prompt, imageData.size);
          success = true;
        } catch (retryError) {
          console.error(`Error generating image for ${imageId} (Attempt 2):`, retryError.message);
        }
      }

      if (success && imageUrl) {
        updateImageUrl(updatedData, imageId, imageUrl);
      }

      return { imageId, imageUrl, success };
    });

    const results = await Promise.all(imageGenerationPromises);

    console.log(`Successfully generated ${results.filter(r => r.success).length} out of ${results.length} images`);
  } catch (error) {
    console.error("Error in batch image generation:", error);
  }

  return updatedData;
}

// Function to call Freepik API and generate image with dynamic size
async function generateFreepikImage(prompt, size = "square_1_1") {
  try {
    const requestBody = {
      prompt: prompt,
      num_images: 1,
      image: {
        size: size
      },
      filter_nsfw: true
    };

    console.log("Sending request to Freepik API:", JSON.stringify(requestBody, null, 2));

    const response = await axios.post(
      "https://api.freepik.com/v1/ai/text-to-image",
      requestBody,
      {
        headers: {
          "x-freepik-api-key": process.env.FREEPIK_API_KEY,
          "Content-Type": "application/json"
        },
        timeout: 30000 // 30 second timeout
      }
    );

    if (response.data?.data?.[0]?.base64) {
      const base64Image = response.data.data[0].base64;
      return `data:image/png;base64,${base64Image}`;
    }
    
    throw new Error("No image data received from Freepik API");
    
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      throw new Error("Image generation timeout");
    }
    throw new Error(error.response?.data?.message || error.message);
  }
}

// Helper function to update image URLs in the nested JSON structure (excluding gallery)
function updateImageUrl(data, imageId, imageUrl) {
  // Hero image
  if (data.hero?.heroImage?.id === imageId) {
    data.hero.heroImage.url = imageUrl;
    return;
  }
  
  // About image  
  if (data.about?.image?.id === imageId) {
    data.about.image.url = imageUrl;
    return;
  }
  
  // Service images
  if (data.services?.items) {
    data.services.items.forEach(item => {
      if (item.image?.id === imageId) {
        item.image.url = imageUrl;
      }
    });
  }
  
  // Note: Gallery images are not updated here as they will be populated separately
}