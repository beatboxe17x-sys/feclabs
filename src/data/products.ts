export interface Product {
  id: string;
  name: string;
  image: string;
  variants: { label: string; color: string; textColor: string }[];
  priceMin: number;
  priceMax: number;
  inStock: boolean;
  stockCount?: number;
  cryptoOnly: boolean;
}

export interface Review {
  id: number;
  stars: number;
  text: string;
  date: string;
  verified: boolean;
}

export const popularProducts: Product[] = [
  {
    id: 'cod',
    name: 'CALL OF DUTY',
    image: '/product_cod.jpg',
    variants: [
      { label: 'BO7', color: '#f59e0b', textColor: '#000' },
      { label: 'BO6', color: '#ff3366', textColor: '#fff' },
      { label: 'MWIII', color: '#00d4ff', textColor: '#000' },
      { label: 'MWII', color: '#7c3aed', textColor: '#fff' },
      { label: 'VG', color: '#f59e0b', textColor: '#000' },
      { label: 'MW19', color: '#00d4ff', textColor: '#000' },
    ],
    priceMin: 5,
    priceMax: 65,
    inStock: true,
    cryptoOnly: true,
  },
  {
    id: 'delta',
    name: 'DELTA FORCE',
    image: '/product_delta.jpg',
    variants: [],
    priceMin: 10,
    priceMax: 100,
    inStock: true,
    cryptoOnly: true,
  },
  {
    id: 'battlefield',
    name: 'BATTLEFIELD',
    image: '/product_battlefield.jpg',
    variants: [
      { label: 'BF6', color: '#f59e0b', textColor: '#000' },
      { label: 'BF2042', color: '#00d4ff', textColor: '#000' },
      { label: 'BF5', color: '#ff3366', textColor: '#fff' },
      { label: 'BF1', color: '#7c3aed', textColor: '#fff' },
    ],
    priceMin: 8,
    priceMax: 70,
    inStock: true,
    cryptoOnly: true,
  },
];

export const newProducts: Product[] = [
  {
    id: 'new1',
    name: 'NEO-BLADE',
    image: '/product_new1.jpg',
    variants: [
      { label: 'ELITE', color: '#00d4ff', textColor: '#000' },
      { label: 'PRO', color: '#ff3366', textColor: '#fff' },
    ],
    priceMin: 5,
    priceMax: 65,
    inStock: true,
    stockCount: 804,
    cryptoOnly: true,
  },
  {
    id: 'new2',
    name: 'SHADOW OPS',
    image: '/product_new2.jpg',
    variants: [
      { label: 'STEALTH', color: '#7c3aed', textColor: '#fff' },
    ],
    priceMin: 3,
    priceMax: 40,
    inStock: true,
    cryptoOnly: true,
  },
  {
    id: 'new3',
    name: 'MECH WARFARE',
    image: '/product_new3.jpg',
    variants: [
      { label: 'TITAN', color: '#f59e0b', textColor: '#000' },
      { label: 'MEGA', color: '#00d4ff', textColor: '#000' },
    ],
    priceMin: 6.5,
    priceMax: 46,
    inStock: true,
    cryptoOnly: true,
  },
];

export const reviews: Review[] = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  stars: 5,
  text: 'Automatic feedback after 7 days.',
  date: 'Apr 23, 2026',
  verified: true,
}));
