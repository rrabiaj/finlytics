import prisma from '../config/prisma';

export const createProject = async (organizationId: string, data: any) => {
  return prisma.project.create({
    data: {
      ...data,
      organizationId,
    },
  });
};

export const getProjects = async (organizationId: string) => {
  return prisma.project.findMany({
    where: { organizationId },
    include: { boards: { include: { columns: { include: { tasks: true } } } } },
  });
};

export const createTask = async (projectId: string, data: any) => {
  return prisma.task.create({
    data: {
      ...data,
      projectId,
    },
  });
};
