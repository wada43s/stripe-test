import { NextApiRequest, NextApiResponse } from 'next';
import { stripe } from '../../../lib/stripe';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { customerId } = req.body;
    
    if (!customerId) {
      return res.status(400).json({ error: '顧客IDが必要です' });
    }

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${req.headers.origin}/account`,
    });

    res.status(200).json({ url: portalSession.url });
  } catch (error: any) {
    console.error('Stripeポータルセッション作成エラー:', error);
    res.status(500).json({ error: error.message });
  }
}
