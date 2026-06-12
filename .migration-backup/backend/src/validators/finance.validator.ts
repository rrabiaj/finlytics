import { z } from 'zod';

export const createInvoiceSchema = z.object({
  body: z.object({
    invoiceNumber: z.string().min(1),
    issueDate: z.string().transform((str) => new Date(str)),
    dueDate: z.string().transform((str) => new Date(str)),
    amount: z.number().positive(),
    taxAmount: z.number().nonnegative().default(0),
    totalAmount: z.number().positive(),
    notes: z.string().optional().nullable(),
    customerId: z.string().cuid(),
    items: z.array(z.object({
      description: z.string().min(1),
      quantity: z.number().positive(),
      unitPrice: z.number().positive(),
      amount: z.number().positive(),
    })).min(1),
  }),
});

export const createExpenseSchema = z.object({
  body: z.object({
    description: z.string().min(1),
    amount: z.number().positive(),
    date: z.string().transform((str) => new Date(str)),
    category: z.string().min(1),
    vendor: z.string().optional().nullable(),
    receiptUrl: z.string().url().optional().nullable(),
  }),
});
