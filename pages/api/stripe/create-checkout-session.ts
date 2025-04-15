import { NextApiRequest, NextApiResponse } from 'next';
import { stripe } from '../../../lib/stripe';
import { SUBSCRIPTION_PLANS } from '../../../lib/price-data';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { priceId, customerId } = req.body;
    
    const selectedPlan = SUBSCRIPTION_PLANS.find(plan => plan.id === priceId);
    
    if (!selectedPlan) {
      return res.status(400).json({ error: '無効なプランIDです' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      customer: customerId || undefined,
      line_items: [
        {
          price_data: {
            currency: selectedPlan.currency,
            product_data: {
              name: selectedPlan.name,
              description: selectedPlan.description,
            },
            unit_amount: selectedPlan.price,
            recurring: {
              interval: selectedPlan.interval,
            },
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/`,
    });

    res.status(200).json({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error('Stripeセッション作成エラー:', error);
    res.status(500).json({ error: error.message });
  }
}
