// app/api/webpage-data/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { businessIdea } = body;

    // Validate required fields
    if (!businessIdea || !businessIdea.trim()) {
      return NextResponse.json(
        { error: 'Business idea is required' },
        { status: 400 }
      );
    }

    // Check for required API keys
    const openRouterKey = process.env.OPENROUTER_API_KEY;
    const runwareKey = process.env.RUNWARE_API_KEY;
    
    if (!openRouterKey) {
      return NextResponse.json(
        { error: 'OpenRouter API key is not configured' },
        { status: 500 }
      );
    }
    
    if (!runwareKey) {
      return NextResponse.json(
        { error: 'Runware API key is not configured' },
        { status: 500 }
      );
    }

    // Content generation prompt
    const contentPrompt = `
You are an expert website content creator and AI image prompt specialist for photorealistic AI image generation.

The user will provide a business idea, which may contain spelling mistakes, typos, or incomplete words.

CRITICAL INSTRUCTIONS:
- You MUST return ONLY a valid JSON object
- Do NOT include any explanations, comments, or text outside the JSON
- Do NOT wrap the JSON in markdown code blocks
- Start your response directly with the opening curly brace {
- End your response with the closing curly brace }

Your task:
1. Interpret the intended meaning of the business idea and correct spelling/grammar mistakes before starting.
2. Based on the corrected business idea, generate **professional, engaging, and industry-specific** website content in JSON format exactly matching the structure below.
3. For every image object (e.g., "heroImage", "about.image", "services.items[x].image"):
   - The "url" field must contain a **highly detailed, realistic AI image prompt** specifically designed for Freepik AI (Mystic mode, style: "photo", color: "color", lighting: "natural").
   - Describe the subject, environment, perspective, textures, colors, lighting, and mood in rich detail.
   - Each prompt must be unique to its section — do not repeat prompts.
   - Avoid generic placeholders like "[business core scene]" — directly write the vivid description.
   - Add a "size" field using ONLY one value from this list:
     [
       "small_square",
       "landscape", 
       "portrait"
     ]
4. For the **heroImage**:
   - Make it the most captivating image possible.
   - Wide cinematic composition, ultra sharp, high resolution.
   - Real-life setting with rich textures, natural golden hour or soft daylight.
   - Professional depth of field and color grading.
   - Scene must inspire and clearly reflect the business's core essence.
5. For the **about** section image:
   - Focus on the human side — behind-the-scenes, craftsmanship, candid interactions, or warm welcoming spaces.
6. For **services items**:
   - Each service gets its own distinct and descriptive image prompt.
   - Clearly show the product/service in use, close-ups of quality details, or authentic customer interactions.
7. For **gallery.images[]**:
   - Keep "url": "" (empty string), but still include a "size" field.
8. Output ONLY the valid JSON object in the exact structure given — no explanations, no extra text.
9. If any required value is unknown, create realistic, industry-specific content.
10. Maintain a professional yet inviting tone in text fields.
11. Ensure perfect grammar and natural flow.

STRUCTURE:
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
    "heroImage": {
      "id": "hero-img",
      "url": "Ultra-realistic wide cinematic photo describing the main essence of the business in action, captured with golden hour light, high texture detail, professional depth of field, natural shadows, inviting atmosphere — no text overlay",
      "size": "landscape"
    },
    "id": "hero"
  },
  "about": {
    "show": true,
    "heading": "About Us / Our Story",
    "description": "Well-written business story including establishment year, mission, and unique value proposition",
    "image": {
      "id": "about-img",
      "url": "Warm, candid photograph of the team or workspace, showing authentic human interaction, subtle background details, natural lighting, realistic tones",
      "size": "landscape"
    },
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
        "image": {
          "id": "service-1",
          "url": "Close-up shot showing intricate details of the product/service in action, crisp textures, lifelike colors, sharp focus, and natural light",
          "size": "small_square"
        }
      },
      {
        "title": "Service/Product 2",
        "description": "Detailed description of the service/product",
        "image": {
          "id": "service-2",
          "url": "Dynamic photo capturing the energy of the service/product in use, realistic motion blur, vivid tones, immersive composition",
          "size": "small_square"
        }
      },
      {
        "title": "Service/Product 3",
        "description": "Detailed description of the service/product",
        "image": {
          "id": "service-3",
          "url": "Stylized yet realistic shot of the service/product setup, natural depth of field, well-balanced daylight, rich materials and surfaces",
          "size": "small_square"
        }
      },
      {
        "title": "Service/Product 4",
        "description": "Detailed description of the service/product",
        "image": {
          "id": "service-4",
          "url": "Wide shot showing the product/service environment with people engaging naturally, soft shadows, real textures",
          "size": "small_square"
        }
      }
    ],
    "cta": "Learn More / View All"
  },
  "gallery": {
    "id": "gallery",
    "show": true,
    "heading": "Gallery / Showcase",
    "images": [
      {"id": "gallery-1", "url": "", "size": "portrait"},
      {"id": "gallery-2", "url": "", "size": "portrait"},
      {"id": "gallery-3", "url": "", "size": "portrait"},
      {"id": "gallery-4", "url": "", "size": "portrait"},
      {"id": "gallery-5", "url": "", "size": "portrait"},
      {"id": "gallery-6", "url": "", "size": "portrait"}
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

Business Idea: "${businessIdea}"

Remember: Return ONLY the JSON object, starting with { and ending with }. No explanations or additional text.
`;

    console.log('Step 1: Generating website content with OpenRouter...');

    // Step 1: Generate website content using OpenRouter
    const openRouterResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${openRouterKey}`,
        "Content-Type": "application/json",
        "X-Title": "Website Content Generator"
      },
      body: JSON.stringify({
        model: "anthropic/claude-3.5-sonnet",
        messages: [
          {
            role: "user",
            content: contentPrompt
          }
        ],
        temperature: 0.7,
        max_tokens: 4000
      })
    });

    if (!openRouterResponse.ok) {
      throw new Error(`OpenRouter API error: ${openRouterResponse.status}`);
    }

    const openRouterData = await openRouterResponse.json();
    const generatedContent = openRouterData.choices[0].message.content;

    console.log('OpenRouter response:', generatedContent);

    // Parse the JSON content
    let websiteData;
    try {
      websiteData = JSON.parse(generatedContent);
    } catch (parseError) {
      console.error('Failed to parse generated JSON:', parseError);
      return NextResponse.json(
        { error: 'Failed to parse generated content as JSON' },
        { status: 500 }
      );
    }

    console.log('Step 2: Extracting image prompts and generating images...');

    // Step 2: Extract all image prompts that need to be generated
    const imagePrompts = [];
    
    // Helper function to collect image prompts
    const collectImagePrompt = (imageObj, path) => {
      if (imageObj && imageObj.url && imageObj.url.trim() && imageObj.size) {
        imagePrompts.push({
          prompt: imageObj.url,
          size: imageObj.size,
          path: path,
          id: imageObj.id
        });
      }
    };

    // Collect image prompts from different sections
    if (websiteData.hero?.heroImage) {
      collectImagePrompt(websiteData.hero.heroImage, 'hero.heroImage');
    }
    
    if (websiteData.about?.image) {
      collectImagePrompt(websiteData.about.image, 'about.image');
    }
    
    if (websiteData.services?.items) {
      websiteData.services.items.forEach((item, index) => {
        if (item.image) {
          collectImagePrompt(item.image, `services.items.${index}.image`);
        }
      });
    }

    console.log(`Found ${imagePrompts.length} images to generate:`, imagePrompts.map(p => p.path));

    // Step 3: Generate images for each prompt using Runware API directly
    const generateImage = async (prompt, size, maxRetries = 3) => {
      // Map size to Runware dimensions
      const sizeMap = {
        'small_square': { width: 512, height: 512 },
        'landscape': { width: 1024, height: 768 }, 
        'portrait': { width: 768, height: 1024 }
      };
      
      const dimensions = sizeMap[size] || { width: 1024, height: 768 };
      
      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          console.log(`Generating image (attempt ${attempt}): ${prompt.substring(0, 50)}...`);
          
          // Generate a unique task UUID
          const taskUUID = crypto.randomUUID();

          // Prepare the request payload for Runware API
          const requestPayload = [
            {
              taskType: "imageInference",
              taskUUID: taskUUID,
              model: "runware:101@1", // FLUX.1 Dev model
              positivePrompt: prompt.trim(),
              width: dimensions.width,
              height: dimensions.height,
              steps: 20,
              CFGScale: 7
            }
          ];

          // Make request directly to Runware API
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 90000); // 90 second timeout

          const runwareResponse = await fetch('https://api.runware.ai/v1', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${runwareKey}`,
            },
            body: JSON.stringify(requestPayload),
            signal: controller.signal,
          });
          
          clearTimeout(timeoutId);

          if (!runwareResponse.ok) {
            const errorText = await runwareResponse.text();
            console.error(`Runware API error (attempt ${attempt}):`, {
              status: runwareResponse.status,
              statusText: runwareResponse.statusText,
              body: errorText
            });
            
            if (attempt === maxRetries) {
              throw new Error(`Runware API error: ${runwareResponse.status} - ${errorText}`);
            }
          } else {
            const data = await runwareResponse.json();
            
            // Validate response structure
            if (!data.data || !Array.isArray(data.data) || data.data.length === 0) {
              throw new Error('Invalid response from Runware - no data array found');
            }

            const imageData = data.data[0];
            
            if (!imageData.imageURL) {
              throw new Error('Invalid response from Runware - no imageURL found');
            }

            console.log(`Image generated successfully: ${imageData.imageURL}`);
            
            return {
              output_url: imageData.imageURL,
              id: imageData.imageUUID || null,
              taskUUID: imageData.taskUUID || null,
              seed: imageData.seed || null,
              meta: {
                prompt: prompt,
                size: size,
                dimensions: dimensions,
                model: 'Runware FLUX.1 Dev',
                steps: 20,
                CFGScale: 7,
                generated_at: new Date().toISOString()
              }
            };
          }
        } catch (error) {
          console.error(`Image generation error (attempt ${attempt}):`, error.message);
          if (attempt === maxRetries) {
            throw error;
          }
          // Wait before retry
          await new Promise(resolve => setTimeout(resolve, attempt * 2000));
        }
      }
    };

    // Generate all images concurrently with retry logic
    const imageResults = await Promise.allSettled(
      imagePrompts.map(async (imagePrompt) => {
        try {
          const result = await generateImage(imagePrompt.prompt, imagePrompt.size);
          return {
            ...imagePrompt,
            imageUrl: result.output_url,
            imageId: result.id,
            success: true
          };
        } catch (error) {
          console.error(`Failed to generate image for ${imagePrompt.path}:`, error);
          return {
            ...imagePrompt,
            imageUrl: null,
            imageId: null,
            success: false,
            error: error.message
          };
        }
      })
    );

    // Step 4: Update the JSON with generated image URLs
    console.log('Step 3: Updating JSON with generated image URLs...');
    
    const generatedImages = {
      hero: null,
      about: null,
      services: []
    };
    
    imageResults.forEach((result, index) => {
      if (result.status === 'fulfilled' && result.value.success) {
        const { path, imageUrl, imageId } = result.value;
        
        // Update the URL in the JSON based on the path and store for gallery
        if (path === 'hero.heroImage') {
          websiteData.hero.heroImage.url = imageUrl;
          websiteData.hero.heroImage.imageId = imageId;
          generatedImages.hero = { url: imageUrl, id: imageId };
        } else if (path === 'about.image') {
          websiteData.about.image.url = imageUrl;
          websiteData.about.image.imageId = imageId;
          generatedImages.about = { url: imageUrl, id: imageId };
        } else if (path.startsWith('services.items.')) {
          const index = parseInt(path.split('.')[2]);
          if (websiteData.services.items[index]) {
            websiteData.services.items[index].image.url = imageUrl;
            websiteData.services.items[index].image.imageId = imageId;
            generatedImages.services.push({ url: imageUrl, id: imageId, index });
          }
        }
      } else {
        console.error(`Failed to process image for ${imagePrompts[index]?.path}:`, result.reason || result.value?.error);
      }
    });

    // Step 5: Populate gallery with generated images (hero + about + 4 services)
    console.log('Step 4: Populating gallery with generated images...');
    
    const galleryImages = [];
    
    // Add hero image
    if (generatedImages.hero) {
      galleryImages.push(generatedImages.hero);
    }
    
    // Add about image
    if (generatedImages.about) {
      galleryImages.push(generatedImages.about);
    }
    
    // Add service images (up to 4)
    generatedImages.services.slice(0, 4).forEach(serviceImg => {
      galleryImages.push(serviceImg);
    });
    
    // Update gallery images with the generated ones
    if (websiteData.gallery?.images) {
      websiteData.gallery.images.forEach((galleryItem, index) => {
        if (index < galleryImages.length) {
          galleryItem.url = galleryImages[index].url;
          galleryItem.imageId = galleryImages[index].id;
        }
      });
    }
    
    console.log(`Gallery updated with ${galleryImages.length} images`);

    // Step 6: Add generation metadata
    const successCount = imageResults.filter(r => r.status === 'fulfilled' && r.value.success).length;
    const totalImages = imagePrompts.length;

    console.log(`Image generation complete: ${successCount}/${totalImages} images generated successfully`);

    // Return the final JSON with image URLs
    return NextResponse.json({
      success: true,
      data: websiteData,
      meta: {
        businessIdea: businessIdea.trim(),
        imagesGenerated: successCount,
        totalImages: totalImages,
        generatedAt: new Date().toISOString(),
        model: 'Claude-3.5-Sonnet + Runware FLUX.1 Dev'
      }
    });

  } catch (error) {
    console.error('API Route Error:', error);
    
    // Handle different types of errors
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }
    
    if (error.message.includes('OpenRouter')) {
      return NextResponse.json(
        { 
          error: 'Failed to generate website content',
          details: error.message,
          code: 'CONTENT_GENERATION_ERROR'
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: 'Website Data Generator API is running',
    endpoint: '/api/webpage-data',
    methods: ['POST'],
    required_env: ['OPENROUTER_API_KEY', 'RUNWARE_API_KEY'],
    description: 'Generates complete website content with AI-generated images',
    flow: [
      '1. Generate website content JSON using OpenRouter',
      '2. Extract image prompts from the content',
      '3. Generate images using Runware API',
      '4. Replace prompts with actual image URLs',
      '5. Return complete website data'
    ]
  });
}