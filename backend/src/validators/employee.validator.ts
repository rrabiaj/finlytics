import { z } from 'zod';

export const createEmployeeSchema = z.object({
  body: z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
    phone: z.string().optional().nullable(),
    position: z.string().optional().nullable(),
    department: z.string().optional().nullable(),
    joinDate: z.string().transform((str) => new Date(str)),
    salary: z.number().optional().nullable(),
    status: z.enum(['ACTIVE', 'INACTIVE', 'TERMINATED', 'ON_LEAVE']).default('ACTIVE'),
  }),
});

export const createAttendanceSchema = z.object({
  body: z.object({
    date: z.string().transform((str) => new Date(str)),
    checkIn: z.string().optional().nullable().transform((str) => str ? new Date(str) : null),
    checkOut: z.string().optional().nullable().transform((str) => str ? new Date(str) : null),
    status: z.enum(['PRESENT', 'ABSENT', 'LATE', 'SICK']).default('PRESENT'),
    employeeId: z.string().cuid(),
  }),
});
