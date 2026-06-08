import prisma from '../config/prisma';

export const createEmployee = async (organizationId: string, data: any) => {
  return prisma.employee.create({
    data: {
      ...data,
      organizationId,
    },
  });
};

export const getEmployees = async (organizationId: string) => {
  return prisma.employee.findMany({
    where: { organizationId },
  });
};

export const createAttendance = async (employeeId: string, data: any) => {
  return prisma.attendance.create({
    data: {
      ...data,
      employeeId,
    },
  });
};
