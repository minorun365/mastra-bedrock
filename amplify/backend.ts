import { defineBackend } from '@aws-amplify/backend';
import { CfnRole } from 'aws-cdk-lib/aws-iam';

export const backend = defineBackend({});

// Create IAM role for SSR
const ssrRole = new CfnRole(backend.stack, 'AmplifySSRRole', {
  assumeRolePolicyDocument: {
    Version: '2012-10-17',
    Statement: [
      {
        Effect: 'Allow',
        Principal: {
          Service: ['amplify.amazonaws.com', 'lambda.amazonaws.com'],
        },
        Action: 'sts:AssumeRole',
      },
    ],
  },
  policies: [
    {
      policyName: 'BedrockInvokePolicy',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Action: [
              'bedrock:InvokeModel',
              'bedrock:InvokeModelWithResponseStream',
            ],
            Resource: '*',
          },
        ],
      },
    },
  ],
});

backend.addOutput({
  custom: {
    ssrRoleArn: ssrRole.attrArn,
  },
});