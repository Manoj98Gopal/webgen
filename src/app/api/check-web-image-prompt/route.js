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

    const prompt = `You are an expert website content creator and AI image prompt specialist.

The user will provide a business idea, but it may contain spelling mistakes, typos, or incomplete words.

Your task:
1. First, carefully interpret and correct the business idea if needed.
2. Based on the corrected business idea, generate **professional, engaging, and industry-specific** website content in JSON format exactly matching the structure below.
3. For every image object (e.g., "heroImage", "about.image", "services.items[x].image"):
   - The "url" field must contain a **highly detailed, realistic AI image prompt** describing the scene, subject, style, lighting, and mood. Avoid generic placeholders. Make each one visually rich and specific to the business type and section.
   - Add a "size" field, choosing only from this list:
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
4. Exception: For gallery.images[], always leave "url": "" (empty string), but still include a "size" field.
5. Do NOT output anything except a valid JSON object in the exact format given.
6. If any required value is unknown, create realistic, credible placeholder data that matches the business type.
7. Avoid generic placeholders like "Lorem ipsum" — use realistic industry-specific terms.
8. Write in proper English with correct grammar and natural flow.
9. Keep a professional but inviting tone.
10. Never break the JSON format.

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
      "url": "Realistic detailed image prompt for hero section...",
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
      "url": "Realistic detailed image prompt for about section...",
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
          "url": "Realistic detailed image prompt for this service...",
          "size": "square_1_1"
        }
      },
      {
        "title": "Service/Product 2", 
        "description": "Detailed description of the service/product",
        "image": {
          "id": "service-2",
          "url": "Realistic detailed image prompt for this service...",
          "size": "square_1_1"
        }
      },
      {
        "title": "Service/Product 3",
        "description": "Detailed description of the service/product", 
        "image": {
          "id": "service-3",
          "url": "Realistic detailed image prompt for this service...",
          "size": "square_1_1"
        }
      },
      {
        "title": "Service/Product 4",
        "description": "Detailed description of the service/product",
        "image": {
          "id": "service-4",
          "url": "Realistic detailed image prompt for this service...",
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
`;

    const { text } = await generateText({
      model: openai("gpt-4"),
      prompt,
      temperature: 0.7,
      maxTokens: 3000
    });

    let jsonData;
    try {
      // Clean the response in case there's any markdown formatting
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
