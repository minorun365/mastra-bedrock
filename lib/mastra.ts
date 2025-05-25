import { Agent } from '@mastra/core';
import { createAmazonBedrock } from '@ai-sdk/amazon-bedrock';

// Create Bedrock client
const bedrockClient = createAmazonBedrock({
  region: process.env.BEDROCK_REGION || 'us-west-2',
});

// Initialize the chat agent using Mastra
export const chatAgent = new Agent({
  name: 'chat-assistant',
  instructions: 'You are a helpful AI assistant. Be concise, friendly, and informative.',
  model: bedrockClient('anthropic.claude-3-5-sonnet-20240620-v1:0'),
});

// Helper function to generate chat response
export async function generateChatResponse(message: string) {
  const response = await chatAgent.generate(
    [
      {
        role: 'user',
        content: message,
      },
    ],
    {
      maxTokens: 4000,
      temperature: 0.7,
    }
  );

  return response;
}