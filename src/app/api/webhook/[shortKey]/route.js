import { NextResponse } from 'next/server';
import { taskStore } from '../../test-image-mode/route';

export async function POST(request, { params }) {
  try {
    const { shortKey } = params;
    const webhookData = await request.json();

    // Validate shortKey
    if (!taskStore[shortKey]) {
      return NextResponse.json({ error: 'Invalid shortKey' }, { status: 404 });
    }

    // Extract image URL from webhook data
    const imageUrl = webhookData.generated?.[0]?.url;

    if (!imageUrl) {
      return NextResponse.json({ error: 'No image URL in webhook data' }, { status: 400 });
    }

    // Store the image URL
    taskStore[shortKey].image_url = imageUrl;

    return NextResponse.json({ message: 'Webhook received', image_url: imageUrl });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json({ error: 'Failed to process webhook' }, { status: 500 });
  }
}