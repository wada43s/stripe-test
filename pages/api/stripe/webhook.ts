import { NextApiRequest, NextApiResponse } from 'next';
import { buffer } from 'micro';
import { stripe } from '../../../lib/stripe';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'] as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
  
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      buf.toString(),
      sig,
      webhookSecret
    );
  } catch (err: any) {
    console.error(`Webhookエラー: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      console.log('サブスクリプション作成完了:', session);
      break;
    
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted':
      const subscription = event.data.object;
      console.log('サブスクリプション更新:', subscription);
      break;
    
    default:
      console.log(`未処理のイベントタイプ: ${event.type}`);
  }

  res.json({ received: true });
}
