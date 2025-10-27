import { z } from 'zod';

export const assemblySchema = z.object({
  name: z.string().min(3),
  districtId: z.string().uuid(),
  meetingPlace: z.string().optional(),
  pastorName: z.string().optional(),
  preachingPoints: z
    .array(
      z.object({
        name: z.string(),
        schedule: z.string().optional()
      })
    )
    .optional(),
  location: z
    .object({
      lat: z.number(),
      lng: z.number(),
      address: z.string().optional()
    })
    .optional()
});

export type AssemblyInput = z.infer<typeof assemblySchema>;
