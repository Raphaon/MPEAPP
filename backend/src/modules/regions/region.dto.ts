import { z } from 'zod';

export const regionSchema = z.object({
  name: z.string().min(3),
  code: z.string().min(2),
  headquarters: z.string().min(3).optional(),
  executiveOffice: z
    .object({
      president: z.string(),
      secretary: z.string().optional(),
      treasurer: z.string().optional()
    })
    .optional()
});

export type RegionInput = z.infer<typeof regionSchema>;
