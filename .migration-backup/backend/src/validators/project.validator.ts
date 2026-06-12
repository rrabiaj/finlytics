import { z } from 'zod';

export const createProjectSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    description: z.string().optional().nullable(),
    startDate: z.string().optional().nullable().transform((str) => str ? new Date(str) : null),
    endDate: z.string().optional().nullable().transform((str) => str ? new Date(str) : null),
    status: z.enum(['PLANNING', 'ACTIVE', 'COMPLETED', 'ON_HOLD']).default('PLANNING'),
  }),
});

export const createTaskSchema = z.object({
  body: z.object({
    title: z.string().min(1),
    description: z.string().optional().nullable(),
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).default('MEDIUM'),
    dueDate: z.string().optional().nullable().transform((str) => str ? new Date(str) : null),
    status: z.string(),
    columnId: z.string().optional().nullable(),
    assigneeId: z.string().optional().nullable(),
  }),
});
