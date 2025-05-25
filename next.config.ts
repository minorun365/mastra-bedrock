import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  env: {
    AWS_REGION: process.env.AWS_REGION || 'us-west-2',
    BEDROCK_MODEL_ID: process.env.BEDROCK_MODEL_ID || 'us.anthropic.claude-3-5-sonnet-20240620-v1:0',
  },
};

export default nextConfig;
