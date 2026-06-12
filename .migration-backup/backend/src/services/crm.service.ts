import prisma from '../config/prisma';

export const createCustomer = async (organizationId: string, data: any) => {
  return prisma.customer.create({
    data: {
      ...data,
      organizationId,
    },
  });
};

export const getCustomers = async (organizationId: string, options: { skip?: number, take?: number } = {}) => {
  return prisma.customer.findMany({
    where: { organizationId },
    include: { contacts: true },
    skip: options.skip,
    take: options.take,
    orderBy: { createdAt: 'desc' },
  });
};

export const getCustomerById = async (organizationId: string, id: string) => {
  return prisma.customer.findFirst({
    where: { id, organizationId },
    include: { contacts: true, invoices: true },
  });
};

export const updateCustomer = async (organizationId: string, id: string, data: any) => {
  // Use updateMany because it allows scoping by organizationId easily
  return prisma.customer.updateMany({
    where: { id, organizationId },
    data,
  });
};

export const deleteCustomer = async (organizationId: string, id: string) => {
  return prisma.customer.deleteMany({
    where: { id, organizationId },
  });
};

// Leads
export const createLead = async (organizationId: string, data: any) => {
  return prisma.lead.create({
    data: {
      ...data,
      organizationId,
    },
  });
};

export const getLeads = async (organizationId: string, options: { skip?: number, take?: number } = {}) => {
  return prisma.lead.findMany({
    where: { organizationId },
    skip: options.skip,
    take: options.take,
    orderBy: { createdAt: 'desc' },
  });
};
