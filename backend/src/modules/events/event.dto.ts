import { z } from 'zod';

export const eventSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  date: z.coerce.date(),
  type: z.string().optional(),
  regionId: z.string().uuid().optional(),
  districtId: z.string().uuid().optional(),
  assemblyId: z.string().uuid().optional()
});

export type EventInput = z.infer<typeof eventSchema>;
