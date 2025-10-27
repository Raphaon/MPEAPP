import { z } from 'zod';

export const ministrySchema = z.object({
  name: z.string().min(2),
  type: z.string().optional(),
  leaderName: z.string().optional()
});

export type MinistryInput = z.infer<typeof ministrySchema>;
