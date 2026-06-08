import prisma from '../config/prisma';

export const getPlans = async () => {
  return prisma.subscriptionPlan.findMany({
    where: { isActive: true },
  });
};

export const getOrganizationSubscription = async (organizationId: string) => {
  return prisma.organizationSubscription.findFirst({
    where: { organizationId },
  });
};
