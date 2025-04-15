import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Elements } from '@stripe/react-stripe-js';
import { getStripe } from '../lib/stripe';
import { SUBSCRIPTION_PLANS, PriceData } from '../lib/price-data';
import CheckoutForm from '../components/CheckoutForm';

export default function CheckoutPage() {
  const router = useRouter();
  const { plan: planId } = router.query;
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [selectedPlan, setSelectedPlan] = useState<PriceData | null>(null);
  
  useEffect(() => {
    const initializeStripe = async () => {
      const stripe = await getStripe();
      setStripePromise(stripe);
    };
    
    initializeStripe();
  }, []);
  
  useEffect(() => {
    if (planId && typeof planId === 'string') {
      const plan = SUBSCRIPTION_PLANS.find(p => p.id === planId);
      if (plan) {
        setSelectedPlan(plan);
      } else {
        router.push('/pricing');
      }
    }
  }, [planId, router]);
  
  const handleCheckoutSuccess = (sessionId: string) => {
    router.push(`/success?session_id=${sessionId}`);
  };
  
  if (!selectedPlan || !stripePromise) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>読み込み中...</p>
      </div>
    );
  }
  
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">チェックアウト</h1>
      
      <div className="mb-8 p-6 border rounded-lg bg-gray-50">
        <h2 className="text-xl font-semibold mb-4">注文内容</h2>
        <div className="flex justify-between mb-2">
          <span>プラン:</span>
          <span className="font-medium">{selectedPlan.name}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>料金:</span>
          <span className="font-medium">¥{selectedPlan.price.toLocaleString()}/{selectedPlan.interval === 'month' ? '月' : '年'}</span>
        </div>
      </div>
      
      <Elements stripe={stripePromise}>
        <CheckoutForm 
          plan={selectedPlan} 
          onSuccess={handleCheckoutSuccess} 
        />
      </Elements>
    </div>
  );
}
