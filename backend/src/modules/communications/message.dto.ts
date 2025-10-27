import { z } from 'zod';

export const messageSchema = z.object({
  recipientId: z.string().uuid().optional(),
  content: z.string().min(1),
  type: z.enum(['chat', 'announcement', 'circular']).default('chat')
});

export type MessageInput = z.infer<typeof messageSchema>;
