import React from 'react';
import { useRouter } from 'next/router';
import { SUBSCRIPTION_PLANS } from '../lib/price-data';
import PricingCard from '../components/PricingCard';

export default function PricingPage() {
  const router = useRouter();
  
  const handleSelectPlan = (planId: string) => {
    router.push(`/checkout?plan=${planId}`);
  };
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">サブスクリプションプラン</h1>
        <p className="text-xl text-gray-600">ビジネスニーズに合った最適なプランをお選びください</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {SUBSCRIPTION_PLANS.map((plan, index) => (
          <PricingCard
            key={plan.id}
            plan={plan}
            isPopular={index === 1} // スタンダードプランをおすすめとして表示
            onSelect={() => handleSelectPlan(plan.id)}
          />
        ))}
      </div>
    </div>
  );
}
