import prisma from '../config/prisma';

export const createInvoice = async (organizationId: string, userId: string, data: any) => {
  const { items, ...invoiceData } = data;
  return prisma.invoice.create({
    data: {
      ...invoiceData,
      organizationId,
      createdById: userId,
      items: {
        create: items,
      },
    },
    include: { items: true },
  });
};

export const getInvoices = async (organizationId: string, options: { skip?: number, take?: number } = {}) => {
  return prisma.invoice.findMany({
    where: { organizationId },
    include: { customer: true },
    skip: options.skip,
    take: options.take,
    orderBy: { createdAt: 'desc' },
  });
};

export const createExpense = async (organizationId: string, data: any) => {
  return prisma.expense.create({
    data: {
      ...data,
      organizationId,
    },
  });
};

export const getExpenses = async (organizationId: string, options: { skip?: number, take?: number } = {}) => {
  return prisma.expense.findMany({
    where: { organizationId },
    skip: options.skip,
    take: options.take,
    orderBy: { date: 'desc' },
  });
};
