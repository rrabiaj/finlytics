import { Router, Request, Response } from 'express';
import { handleWebhook } from '../services/stripe.service';

const router = Router();

router.post('/stripe', async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'] as string;

  try {
    const result = await handleWebhook(req.body, sig);
    res.json(result);
  } catch (err: any) {
    console.error('Webhook Error:', err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
});

export default router;
