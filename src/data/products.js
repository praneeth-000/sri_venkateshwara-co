export const grabItCategories = [
  { id: 'fans', name: 'Ceiling Fans' },
  { id: 'lights', name: 'Crompton Ceiling Lights' },
  { id: 'starters', name: 'LTLK Starter' },
  { id: 'panel', name: 'Syntex Panel Box' }
];

export const grabItProducts = [
  {
    id: 'fan-1',
    categoryId: 'fans',
    name: 'Crompton Ceiling Fan',
    originalPrice: '₹3000',
    salePrice: '₹2,500',
    price: '₹2,500', // required for cart parsing
    description: 'High-speed performance with elegant design. Energy efficient and durable.',
    image: '/grab_it/crompton fan.png'
  },
  {
    id: 'fan-2',
    categoryId: 'fans',
    name: 'Fybros Ceiling Fan',
    originalPrice: '₹2,200',
    salePrice: '₹1,650',
    price: '₹1,650',
    description: 'Aerodynamic blades for superior air delivery. Whisper quiet operation.',
    image: '/grab_it/fybros fan.png'
  },
  {
    id: 'fan-3',
    categoryId: 'fans',
    name: 'V-Guard Ceiling Fan',
    originalPrice: '₹2,800',
    salePrice: '₹2,100',
    price: '₹2,100',
    description: 'Premium build quality with anti-dust coating. Long lasting performance.',
    image: '/grab_it/vguard fan.png'
  },
  {
    id: 'light-1',
    categoryId: 'lights',
    name: 'Crompton LED Light',
    originalPrice: '₹850',
    salePrice: '₹600',
    price: '₹600',
    description: 'Bright and energy-saving LED light. Perfect for living spaces.',
    image: '/grab_it/crompton ceiling lights.png'
  },
  {
    id: 'starter-1',
    categoryId: 'starters',
    name: 'LTLK Motor Starter',
    originalPrice: '₹1,500',
    salePrice: '₹1,200',
    price: '₹1,200',
    description: 'Reliable motor protection with robust design. Easy to install.',
    image: '/grab_it/ltlk starter.png'
  },
  {
    id: 'panel-1',
    categoryId: 'panel',
    name: 'Syntex Panel Box',
    originalPrice: '₹3,200',
    salePrice: '₹2,500',
    price: '₹2,500',
    description: 'Heavy duty panel box for industrial and residential use. Weather resistant.',
    image: '/grab_it/syntex panel box.png'
  }
];
