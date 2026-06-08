import Stripe from 'stripe';
import { config } from '../config';
import prisma from '../config/prisma';

const stripe = new Stripe(config.stripe.secretKey || '', {
  apiVersion: '2025-01-27-preview' as any,
});

export const createCheckoutSession = async (organizationId: string, priceId: string) => {
  const org = await prisma.organization.findUnique({
    where: { id: organizationId },
    include: { users: { take: 1 } }
  });
  if (!org) throw new Error('Organization not found');

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    mode: 'subscription',
    success_url: `${config.frontendUrl}/billing/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${config.frontendUrl}/billing/cancel`,
    client_reference_id: organizationId,
    customer_email: org.users[0]?.email,
    metadata: { organizationId },
    subscription_data: {
      metadata: { organizationId }
    }
  });

  return session;
};

export const handleWebhook = async (payload: string | Buffer, sig: string) => {
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      payload,
      sig,
      config.stripe.webhookSecret || ''
    );
  } catch (err: any) {
    throw new Error(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const organizationId = session.client_reference_id;
      const stripeSubscriptionId = session.subscription as string;

      if (organizationId && stripeSubscriptionId) {
        const subscription = await stripe.subscriptions.retrieve(stripeSubscriptionId);
        
        await prisma.organizationSubscription.upsert({
          where: { stripeSubscriptionId },
          update: {
            status: subscription.status,
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
          },
          create: {
            organizationId,
            stripeSubscriptionId,
            status: subscription.status,
            planId: subscription.items.data[0].price.id,
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
          },
        });
      }
      break;
    }

    case 'customer.subscription.created':
    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription;
      const organizationId = subscription.metadata.organizationId;

      if (organizationId) {
        await prisma.organizationSubscription.upsert({
          where: { stripeSubscriptionId: subscription.id },
          update: {
            status: subscription.status,
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
            planId: subscription.items.data[0].price.id,
          },
          create: {
            organizationId,
            stripeSubscriptionId: subscription.id,
            status: subscription.status,
            planId: subscription.items.data[0].price.id,
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
          },
        });
      }
      break;
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      await prisma.organizationSubscription.updateMany({
        where: { stripeSubscriptionId: subscription.id },
        data: { status: 'canceled' },
      });
      break;
    }

    case 'invoice.paid': {
      const invoice = event.data.object as Stripe.Invoice;
      if (invoice.subscription) {
        await prisma.organizationSubscription.updateMany({
          where: { stripeSubscriptionId: invoice.subscription as string },
          data: { status: 'active' },
        });
      }
      break;
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object as Stripe.Invoice;
      if (invoice.subscription) {
        await prisma.organizationSubscription.updateMany({
          where: { stripeSubscriptionId: invoice.subscription as string },
          data: { status: 'past_due' },
        });
      }
      break;
    }
  }

  return { received: true };
};

export default stripe;
