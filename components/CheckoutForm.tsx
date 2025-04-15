import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { PriceData } from '../lib/price-data';

interface CheckoutFormProps {
  plan: PriceData;
  onSuccess: (sessionId: string) => void;
}

export default function CheckoutForm({ plan, onSuccess }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }
    
    setIsLoading(true);
    setErrorMessage(null);
    
    try {
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: plan.id,
        }),
      });
      
      const { sessionId, url } = await response.json();
      
      if (url) {
        window.location.href = url;
      } else {
        onSuccess(sessionId);
      }
    } catch (error: any) {
      console.error('Checkout error:', error);
      setErrorMessage(error.message || 'エラーが発生しました。もう一度お試しください。');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-md border border-gray-300 p-4">
        <h3 className="mb-2 font-semibold">支払い情報</h3>
        <CardElement 
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </div>
      
      {errorMessage && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
          {errorMessage}
        </div>
      )}
      
      <button
        type="submit"
        disabled={!stripe || isLoading}
        className="w-full rounded-md bg-blue-600 py-2 font-medium text-white transition-colors hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isLoading ? '処理中...' : `¥${plan.price.toLocaleString()}で購入する`}
      </button>
    </form>
  );
}
