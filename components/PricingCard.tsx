import React from 'react';
import { PriceData } from '../lib/price-data';

interface PricingCardProps {
  plan: PriceData;
  onSelect: (plan: PriceData) => void;
  isPopular?: boolean;
}

export default function PricingCard({ plan, onSelect, isPopular = false }: PricingCardProps) {
  return (
    <div className={`
      rounded-lg border p-8 shadow-sm transition-all hover:shadow-md
      ${isPopular ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}
    `}>
      {isPopular && (
        <span className="inline-block rounded-full bg-blue-500 px-3 py-1 text-xs font-semibold uppercase text-white">
          おすすめ
        </span>
      )}
      <h3 className="mt-4 text-xl font-bold">{plan.name}</h3>
      <p className="mt-2 text-gray-500">{plan.description}</p>
      <p className="mt-4 text-4xl font-bold">
        ¥{plan.price.toLocaleString()}<span className="text-base font-normal text-gray-500">/{plan.interval === 'month' ? '月' : '年'}</span>
      </p>
      <ul className="mt-6 space-y-3">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="ml-2">{feature}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={() => onSelect(plan)}
        className={`mt-8 w-full rounded-md py-2 font-medium text-white transition-colors
          ${isPopular 
            ? 'bg-blue-500 hover:bg-blue-600' 
            : 'bg-gray-800 hover:bg-gray-900'
          }
        `}
      >
        選択する
      </button>
    </div>
  );
}
