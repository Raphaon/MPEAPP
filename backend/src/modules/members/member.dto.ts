import { z } from 'zod';

export const memberSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  gender: z.enum(['M', 'F']).optional(),
  age: z.number().int().min(0).optional(),
  function: z.string().optional(),
  status: z.enum(['active', 'inactive', 'visitor']).optional(),
  assemblyId: z.string().uuid(),
  ministryId: z.string().uuid().optional()
});

export type MemberInput = z.infer<typeof memberSchema>;
