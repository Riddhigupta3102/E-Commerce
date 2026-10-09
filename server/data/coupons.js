export const COUPONS = [
  {
    code: 'SHOPX20',
    type: 'percentage',
    value: 20,
    minSpend: 50,
    description: '20% OFF orders over ₹50'
  },
  {
    code: 'WELCOME10',
    type: 'fixed',
    value: 10,
    minSpend: 30,
    description: '₹10 OFF your entire purchase'
  },
  {
    code: 'FREESHIP',
    type: 'shipping',
    value: 100, // 100% off shipping
    minSpend: 0,
    description: 'Free standard shipping on any order'
  },
  {
    code: 'VIP30',
    type: 'percentage',
    value: 30,
    minSpend: 150,
    description: '30% OFF premium luxury orders over ₹150'
  }
];
