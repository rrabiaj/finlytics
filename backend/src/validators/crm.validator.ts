import { z } from 'zod';

export const createCustomerSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    email: z.string().email().optional().nullable(),
    phone: z.string().optional().nullable(),
    address: z.string().optional().nullable(),
    website: z.string().url().optional().nullable(),
    type: z.enum(['INDIVIDUAL', 'COMPANY']),
  }),
});

export const createLeadSchema = z.object({
  body: z.object({
    title: z.string().min(1),
    value: z.number().optional().nullable(),
    status: z.enum(['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'NEGOTIATION', 'WON', 'LOST']),
    source: z.string().optional().nullable(),
  }),
});
