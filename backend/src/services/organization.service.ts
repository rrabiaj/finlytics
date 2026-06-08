import prisma from '../config/prisma';

export const getOrganization = async (id: string) => {
  return prisma.organization.findUnique({
    where: { id },
  });
};

export const updateOrganization = async (id: string, data: any) => {
  return prisma.organization.update({
    where: { id },
    data,
  });
};

export const getOrganizationBySlug = async (slug: string) => {
  return prisma.organization.findUnique({
    where: { slug },
  });
};
