import Image from "next/image";
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      <header className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Stripe Test</h1>
          <nav>
            <ul className="flex space-x-6">
              <li><Link href="/" className="hover:text-blue-600">ホーム</Link></li>
              <li><Link href="/pricing" className="hover:text-blue-600">料金プラン</Link></li>
            </ul>
          </nav>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Stripeサブスクリプション決済デモ</h2>
          <p className="text-xl text-gray-600 mb-8">
            このデモアプリケーションでは、Stripeを使用したサブスクリプション決済の実装方法を紹介しています。
          </p>
          <button
            onClick={() => router.push('/pricing')}
            className="rounded-md bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
          >
            プランを見る
          </button>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 border rounded-lg shadow-sm bg-white">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">安全な決済処理</h3>
            <p className="text-gray-600">
              Stripeの安全な決済インフラストラクチャを利用して、顧客の支払い情報を保護します。
            </p>
          </div>
          
          <div className="p-6 border rounded-lg shadow-sm bg-white">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">サブスクリプション管理</h3>
            <p className="text-gray-600">
              定期的な請求、アップグレード、ダウングレード、解約などのサブスクリプション管理機能を提供します。
            </p>
          </div>
          
          <div className="p-6 border rounded-lg shadow-sm bg-white">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">シームレスな統合</h3>
            <p className="text-gray-600">
              Next.jsとStripeを組み合わせて、シームレスな決済体験を提供します。
            </p>
          </div>
        </div>
      </main>
      
      <footer className="container mx-auto px-4 py-8 mt-16 border-t">
        <div className="text-center text-gray-500">
          <p>&copy; 2023 Stripe Test Demo. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
