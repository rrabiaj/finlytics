import prisma from '../config/prisma';

export const getForecasts = async (organizationId: string) => {
  // Logic to calculate forecast based on invoices and expenses
  const invoices = await prisma.invoice.findMany({ where: { organizationId, status: 'SENT' } });
  const expenses = await prisma.expense.findMany({ where: { organizationId } });
  
  // Simplified calculation
  const incoming = invoices.reduce((sum, inv) => sum + inv.totalAmount, 0);
  const outgoing = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  
  return {
    incoming,
    outgoing,
    net: incoming - outgoing,
    forecast: [
      { date: new Date(), amount: incoming - outgoing },
      // ... more points
    ]
  };
};

export const getHealthScore = async (organizationId: string) => {
  return { score: 85, status: 'HEALTHY' };
};
