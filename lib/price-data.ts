export interface PriceData {
  id: string;
  name: string;
  description: string;
  price: number;
  interval: 'month' | 'year';
  currency: string;
  features: string[];
}

export const SUBSCRIPTION_PLANS: PriceData[] = [
  {
    id: 'basic',
    name: 'ベーシックプラン',
    description: '個人向けの基本プラン',
    price: 980,
    interval: 'month',
    currency: 'jpy',
    features: ['基本機能', 'サポート（メールのみ）', 'アップデート情報'],
  },
  {
    id: 'standard',
    name: 'スタンダードプラン',
    description: '小規模チーム向けプラン',
    price: 1980,
    interval: 'month',
    currency: 'jpy',
    features: ['すべての基本機能', '優先サポート', 'チーム機能', 'APIアクセス'],
  },
  {
    id: 'premium',
    name: 'プレミアムプラン',
    description: '大規模組織向けの高機能プラン',
    price: 4980,
    interval: 'month',
    currency: 'jpy',
    features: ['すべての機能', '24時間サポート', '専任アカウントマネージャー', 'カスタム機能開発'],
  },
];
