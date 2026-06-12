import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 1. Create Subscription Plans
  const plans = [
    {
      name: 'Free',
      description: 'Perfect for freelancers',
      price: 0,
      interval: 'month',
      stripePriceId: 'price_free',
      features: { users: 1, customers: 20, reports: 'basic' },
    },
    {
      name: 'Professional',
      description: 'For small teams',
      price: 29,
      interval: 'month',
      stripePriceId: 'price_prof',
      features: { users: 5, customers: -1, reports: 'advanced', ai: true },
    },
    {
      name: 'Business',
      description: 'For growing businesses',
      price: 79,
      interval: 'month',
      stripePriceId: 'price_biz',
      features: { users: 20, customers: -1, reports: 'custom', ai: true, forecasting: true },
    },
  ];

  for (const plan of plans) {
    await prisma.subscriptionPlan.upsert({
      where: { stripePriceId: plan.stripePriceId },
      update: plan,
      create: plan,
    });
  }

  // 2. Create Default Organization & Admin User
  const hashedPassword = await bcrypt.hash('password123', 10);
  
  const organization = await prisma.organization.upsert({
    where: { slug: 'acme-corp' },
    update: {},
    create: {
      name: 'Acme Corp',
      slug: 'acme-corp',
      currency: 'USD',
    },
  });

  const admin = await prisma.user.upsert({
    where: { email: 'admin@acme.com' },
    update: {},
    create: {
      email: 'admin@acme.com',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
      organizationId: organization.id,
    },
  });

  // 3. Create Sample Customer
  const customer = await prisma.customer.create({
    data: {
      name: 'Big Client LLC',
      email: 'billing@bigclient.com',
      type: 'COMPANY',
      organizationId: organization.id,
      contacts: {
        create: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@bigclient.com',
        },
      },
    },
  });

  // 4. Create Sample Invoice
  await prisma.invoice.create({
    data: {
      invoiceNumber: 'INV-2026-001',
      issueDate: new Date(),
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      amount: 1000,
      taxAmount: 200,
      totalAmount: 1200,
      status: 'SENT',
      organizationId: organization.id,
      customerId: customer.id,
      createdById: admin.id,
      items: {
        create: {
          description: 'Consulting services',
          quantity: 10,
          unitPrice: 100,
          amount: 1000,
        },
      },
    },
  });

  // 5. Create Sample Expense
  await prisma.expense.create({
    data: {
      description: 'Office Rent',
      amount: 500,
      date: new Date(),
      category: 'Rent',
      organizationId: organization.id,
    },
  });

  // 6. Create Sample Project
  const project = await prisma.project.create({
    data: {
      name: 'Website Redesign',
      description: 'New corporate website',
      organizationId: organization.id,
      boards: {
        create: {
          name: 'Main Board',
          columns: {
            create: [
              { name: 'To Do', order: 1 },
              { name: 'In Progress', order: 2 },
              { name: 'Done', order: 3 },
            ],
          },
        },
      },
    },
  });

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
