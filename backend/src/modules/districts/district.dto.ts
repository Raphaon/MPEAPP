import { z } from 'zod';

export const districtSchema = z.object({
  name: z.string().min(3),
  regionId: z.string().uuid(),
  headquarters: z.string().optional(),
  leadership: z
    .object({
      superintendent: z.string().optional(),
      secretary: z.string().optional(),
      treasurer: z.string().optional()
    })
    .optional()
});

export type DistrictInput = z.infer<typeof districtSchema>;
