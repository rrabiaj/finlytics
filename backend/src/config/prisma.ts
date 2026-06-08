import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

export default prisma;

/**
 * Helper to ensure a query is scoped to an organization.
 */
export const scopeToTenant = (organizationId: string) => {
  return {
    where: { organizationId },
  };
};
