import prisma from '../config/prisma';

export const getDashboardStats = async (organizationId: string) => {
  const [customerCount, invoiceCount, projectCount, expenseTotal] = await Promise.all([
    prisma.customer.count({ where: { organizationId } }),
    prisma.invoice.count({ where: { organizationId } }),
    prisma.project.count({ where: { organizationId } }),
    prisma.expense.aggregate({
      where: { organizationId },
      _sum: { amount: true },
    }),
  ]);

  return {
    customerCount,
    invoiceCount,
    projectCount,
    expenseTotal: expenseTotal._sum.amount || 0,
    mrr: 12500, // Placeholder
    nrr: 105, // Placeholder
  };
};
