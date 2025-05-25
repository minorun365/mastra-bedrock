import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  ChatMessage: a
    .model({
      content: a.string(),
      role: a.enum(['user', 'assistant']),
      sessionId: a.string(),
      timestamp: a.datetime(),
    })
    .authorization((allow) => [allow.owner()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});