import { NextResponse } from 'next/server';

// In-memory store for task IDs and images (replace with a database in production)
export const taskStore = {};

// Your Freepik API key and webhook base URL (from .env)
const FREEPIK_API_KEY = process.env.FREEPIK_API_KEY || 'your-api-key';
const WEBHOOK_BASE_URL = 'https://935e25be97b6.ngrok-free.app/api/webhook';

// Map size to Freepik resolution and aspect ratio
const sizeMap = {
  landscape: { resolution: '2k', aspect_ratio: 'widescreen_16_9' }, // Hero section background
  square: { resolution: '2k', aspect_ratio: 'square_1_1' }, // Product image
};

// Map mode to Freepik model
const modeMap = {
  realism: 'realism',
  cartoon: 'cartoon',
  abstract: 'abstract',
};

export async function POST(request) {
  try {
    const { mode, size, prompt } = await request.json();

    // Validate inputs
    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Prompt is required and must be a string' }, { status: 400 });
    }
    if (!modeMap[mode]) {
      return NextResponse.json({ error: 'Invalid mode. Use realism, cartoon, or abstract' }, { status: 400 });
    }
    if (!sizeMap[size]) {
      return NextResponse.json({ error: 'Invalid size. Use landscape or square' }, { status: 400 });
    }

    // Generate a timestamp-based short key
    const shortKey = Date.now().toString();

    // Prepare Freepik API request payload
    const payload = {
      prompt,
      webhook_url: `${WEBHOOK_BASE_URL}/${shortKey}`,
      resolution: sizeMap[size].resolution,
      aspect_ratio: sizeMap[size].aspect_ratio,
      model: modeMap[mode],
      filter_nsfw: true,
      engine: 'automatic',
      creative_detailing: 50,
      hdr: 50,
      adherence: 50,
    };

    // Log request payload for debugging
    console.log('Freepik API request payload:', JSON.stringify(payload, null, 2));

    // Validate API key
    if (!FREEPIK_API_KEY || FREEPIK_API_KEY === 'your-api-key') {
      throw new Error('Invalid or missing Freepik API key. Check FREEPIK_API_KEY in .env');
    }

    // Prepare Freepik API request
    const freepikResponse = await fetch('https://api.freepik.com/v1/ai/mystic', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-freepik-api-key': FREEPIK_API_KEY,
      },
      body: JSON.stringify(payload),
    });

    const responseText = await freepikResponse.text();
    console.log('Freepik API response status:', freepikResponse.status);
    console.log('Freepik API response body:', responseText);

    if (!freepikResponse.ok) {
      throw new Error(`Freepik API error: ${freepikResponse.status} - ${responseText}`);
    }

    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch (parseError) {
      throw new Error(`Failed to parse Freepik API response: ${parseError.message}`);
    }

    const task_id = responseData.data?.task_id;

    if (!task_id) {
      throw new Error(`No task_id returned from Freepik API. Response: ${JSON.stringify(responseData, null, 2)}`);
    }

    // Store task_id
    taskStore[shortKey] = { task_id };

    // Construct short URL for image retrieval
    const shortUrl = `http://localhost:3000/image/${shortKey}`;

    return NextResponse.json({ shortUrl, task_id });
  } catch (error) {
    console.error('Error generating image:', error.message, error.stack);
    return NextResponse.json({ error: `Failed to generate image: ${error.message}` }, { status: 500 });
  }
}