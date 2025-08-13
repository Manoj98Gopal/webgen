import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { businessIdea } = await req.json();

    if (!businessIdea) {
      return NextResponse.json(
        { error: "Business idea is required" },
        { status: 400 }
      );
    }

    const prompt = `
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
   - Use cinematic, sensory language that would make a stunning, natural, ultra-realistic photo.
   - Each prompt must be unique to its section — do not repeat prompts.
   - Avoid generic placeholders like "[business core scene]" — directly write the vivid description.
   - Add a "size" field using ONLY one value from this list:
     [
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
      "size": "widescreen_16_9"
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
      "size": "classic_4_3"
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
          "size": "square_1_1"
        }
      },
      {
        "title": "Service/Product 2", 
        "description": "Detailed description of the service/product",
        "image": {
          "id": "service-2",
          "url": "Dynamic photo capturing the energy of the service/product in use, realistic motion blur, vivid tones, immersive composition",
          "size": "square_1_1"
        }
      },
      {
        "title": "Service/Product 3",
        "description": "Detailed description of the service/product", 
        "image": {
          "id": "service-3",
          "url": "Stylized yet realistic shot of the service/product setup, natural depth of field, well-balanced daylight, rich materials and surfaces",
          "size": "square_1_1"
        }
      },
      {
        "title": "Service/Product 4",
        "description": "Detailed description of the service/product",
        "image": {
          "id": "service-4",
          "url": "Wide shot showing the product/service environment with people engaging naturally, soft shadows, real textures",
          "size": "square_1_1"
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
      {"id": "gallery-1", "url": "", "size": "portrait_2_3"},
      {"id": "gallery-2", "url": "", "size": "portrait_2_3"},
      {"id": "gallery-3", "url": "", "size": "portrait_2_3"},
      {"id": "gallery-4", "url": "", "size": "portrait_2_3"},
      {"id": "gallery-5", "url": "", "size": "portrait_2_3"},
      {"id": "gallery-6", "url": "", "size": "portrait_2_3"}
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

    const { text } = await generateText({
      model: openai("gpt-4"),
      prompt,
      temperature: 0.7,
      maxTokens: 4000 // Increased token limit
    });

    let jsonData;
    try {
      // More robust text cleaning
      let cleanedText = text.trim();
      
      // Remove markdown code blocks if present
      cleanedText = cleanedText.replace(/```json\n?/g, "").replace(/\n?```/g, "");
      
      // Remove any text before the first { and after the last }
      const firstBrace = cleanedText.indexOf('{');
      const lastBrace = cleanedText.lastIndexOf('}');
      
      if (firstBrace === -1 || lastBrace === -1) {
        throw new Error("No valid JSON object found in response");
      }
      
      cleanedText = cleanedText.substring(firstBrace, lastBrace + 1);
      
      // Additional cleaning: remove any trailing text after the JSON
      cleanedText = cleanedText.trim();
      
      console.log("Attempting to parse JSON:", cleanedText.substring(0, 200) + "...");
      
      jsonData = JSON.parse(cleanedText);
    } catch (err) {
      console.error("JSON parsing error:", err);
      console.error("Raw AI response:", text);
      
      // Try one more time with even more aggressive cleaning
      try {
        let fallbackText = text;
        
        // Look for JSON pattern more aggressively
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          fallbackText = jsonMatch[0];
          jsonData = JSON.parse(fallbackText);
        } else {
          throw new Error("Could not extract valid JSON from response");
        }
      } catch (fallbackErr) {
        return NextResponse.json(
          {
            error: "AI returned invalid JSON format",
            details: "The AI response could not be parsed as JSON",
            rawResponse: text.substring(0, 500) + "...", // Only show first 500 chars for debugging
            parseError: err.message
          },
          { status: 500 }
        );
      }
    }

    // Validate that we have the required structure
    const requiredSections = ["navbar", "hero", "about", "services", "contact"];
    const missingSections = requiredSections.filter(
      (section) => !jsonData[section]
    );

    if (missingSections.length > 0) {
      return NextResponse.json(
        {
          error: `Missing required sections: ${missingSections.join(", ")}`,
          data: jsonData
        },
        { status: 500 }
      );
    }

    // Additional validation to ensure critical fields exist
    if (!jsonData.hero?.heading || !jsonData.about?.description || !jsonData.services?.items?.length) {
      return NextResponse.json(
        {
          error: "Generated content is missing critical fields",
          data: jsonData
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: jsonData,
      businessIdea: businessIdea
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