import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function SuccessPage() {
  const router = useRouter();
  const { session_id } = router.query;
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (session_id) {
      setIsLoading(false);
    }
  }, [session_id]);
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>処理中...</p>
      </div>
    );
  }
  
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center">
      <div className="mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold mb-2">ご購入ありがとうございます！</h1>
        <p className="text-lg text-gray-600 mb-6">サブスクリプションの設定が完了しました。</p>
      </div>
      
      <div className="space-y-4">
        <p>注文ID: {session_id}</p>
        <p>確認メールを送信しました。</p>
      </div>
      
      <div className="mt-8">
        <Link href="/" className="inline-block rounded-md bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-700">
          ホームに戻る
        </Link>
      </div>
    </div>
  );
}
