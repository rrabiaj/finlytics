import { z } from 'zod';

export const updateOrganizationSchema = z.object({
  body: z.object({
    name: z.string().min(1).optional(),
    logoUrl: z.string().url().optional().nullable(),
    currency: z.string().length(3).optional(),
    timezone: z.string().optional(),
    vatNumber: z.string().optional().nullable(),
    whiteLabelConfig: z.record(z.any()).optional().nullable(),
  }),
});
