import { z } from 'zod';

export const askAISchema = z.object({
  body: z.object({
    content: z.string().min(1),
    conversationId: z.string().optional(),
  }),
});
