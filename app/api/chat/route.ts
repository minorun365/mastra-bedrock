import { NextRequest, NextResponse } from 'next/server';
import { generateChatResponse } from '@/lib/mastra';

export async function POST(request: NextRequest) {
  try {
    const { message, sessionId } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Use Mastra agent to generate response
    const response = await generateChatResponse(message);

    return NextResponse.json({
      message: response.text,
      sessionId: sessionId,
    });

  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}