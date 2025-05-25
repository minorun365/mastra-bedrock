import { Mastra } from 'mastra';
import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';

// Initialize Bedrock client
const bedrockClient = new BedrockRuntimeClient({
  region: process.env.BEDROCK_REGION || 'us-west-2',
});

// Create Bedrock LLM integration for Mastra
const bedrockLLM = {
  name: 'bedrock-claude',
  generate: async (prompt: string) => {
    const command = new InvokeModelCommand({
      modelId: process.env.BEDROCK_MODEL_ID || 'anthropic.claude-3-5-sonnet-20240620-v1:0',
      body: JSON.stringify({
        anthropic_version: "bedrock-2023-05-31",
        max_tokens: 4000,
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
      }),
      contentType: 'application/json',
    });

    try {
      const response = await bedrockClient.send(command);
      const responseBody = JSON.parse(new TextDecoder().decode(response.body));
      return responseBody.content[0].text;
    } catch (error) {
      console.error('Error calling Bedrock:', error);
      throw error;
    }
  },
};

// Initialize Mastra with Bedrock
export const mastra = new Mastra({
  llm: bedrockLLM,
  agents: [
    {
      name: 'chat-assistant',
      description: 'A helpful AI assistant powered by Claude on Bedrock',
      tools: [],
      model: bedrockLLM,
      systemPrompt: 'You are a helpful AI assistant. Be concise, friendly, and informative.',
    },
  ],
});