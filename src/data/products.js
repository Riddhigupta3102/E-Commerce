export const PRODUCTS = [
  // ==================== ELECTRONICS & AUDIO (1-8) ====================
  {
    id: 'prod-1',
    name: 'Apex Pro ANC Wireless Headphones',
    slug: 'apex-pro-anc-wireless-headphones',
    category: 'electronics',
    subcategory: 'Headphones',
    brand: 'SonicWave',
    price: 249.99,
    originalPrice: 329.99,
    discount: 24,
    rating: 4.8,
    reviewsCount: 312,
    inStock: true,
    stock: 28,
    isFeatured: true,
    isTrending: true,
    isBestSeller: true,
    isNewArrival: false,
    isFlashDeal: true,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Midnight Black', hex: '#1e293b' },
      { name: 'Silver Mist', hex: '#cbd5e1' },
      { name: 'Navy Blue', hex: '#1e3a8a' }
    ],
    sizes: ['Standard Over-Ear'],
    shortDescription: 'Studio-grade hybrid active noise cancellation with 40-hour battery life and spatial audio.',
    description: 'Immerse yourself in acoustic perfection with the Apex Pro ANC headphones. Featuring custom-tuned 45mm neodymium drivers, ultra-soft memory foam ear cushions, and intelligent noise-cancelling algorithms that adapt to your environment.',
    features: [
      'Industry-leading Hybrid Active Noise Cancellation (ANC)',
      '40-Hour continuous playtime with Fast USB-C Quick Charge (10 min = 5 hrs)',
      'High-Resolution Spatial Audio with dynamic head tracking',
      'Multipoint Bluetooth 5.3 connection for seamless device switching',
      'Quad-beamforming microphone array for crystal-clear calls'
    ],
    specifications: {
      'Driver Size': '45mm Neodymium',
      'Frequency Response': '10Hz - 40kHz',
      'Bluetooth Version': 'v5.3',
      'Weight': '255g',
      'Charging Port': 'USB-C',
      'Warranty': '2 Years'
    },
    reviews: [
      { id: 'r1', user: 'Liam K.', rating: 5, date: '2026-08-15', comment: 'The noise cancellation is on par with the absolute top brands. Soundstage is broad and warm!' },
      { id: 'r2', user: 'Sarah M.', rating: 5, date: '2026-08-02', comment: 'Battery lasts for entire week of commuting. Extremely comfortable during long flights.' }
    ]
  },
  {
    id: 'prod-2',
    name: 'Chronos Ultra GPS Smartwatch',
    slug: 'chronos-ultra-gps-smartwatch',
    category: 'electronics',
    subcategory: 'Smartwatches',
    brand: 'Aegis',
    price: 319.00,
    originalPrice: 399.00,
    discount: 20,
    rating: 4.7,
    reviewsCount: 184,
    inStock: true,
    stock: 15,
    isFeatured: true,
    isTrending: true,
    isBestSeller: false,
    isNewArrival: true,
    isFlashDeal: false,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Titanium Gray', hex: '#475569' },
      { name: 'Obsidian Black', hex: '#0f172a' },
      { name: 'Orange Trail', hex: '#ea580c' }
    ],
    sizes: ['42mm', '46mm'],
    shortDescription: 'Aerospace-grade titanium casing with dual-frequency GPS, AMOLED sapphire display, and 14-day battery.',
    description: 'Engineered for athletes and adventurers. Chronos Ultra combines rugged endurance with sophisticated biomonitoring, tracking ECG, SpO2, sleep stages, and over 120 sports modes.',
    features: [
      'Sapphire Crystal 1.43" Always-On AMOLED Display (1000 nits)',
      'Dual-frequency Multi-GNSS GPS accurate to within 1 meter',
      '100m Water Resistance (10 ATM) certified for diving',
      'Biometric Sensor Array: ECG, SpO2, Continuous Heart Rate & Stress',
      'Up to 14 Days battery in smartwatch mode, 36 hours GPS mode'
    ],
    specifications: {
      'Display': '1.43" AMOLED (466x466)',
      'Case Material': 'Grade 5 Titanium',
      'Water Resistance': '10 ATM (100m)',
      'Battery': '500 mAh (14 Days)',
      'Compatibility': 'iOS & Android'
    },
    reviews: [
      { id: 'r1', user: 'Tyler B.', rating: 5, date: '2026-07-28', comment: 'Battery life is unbelievable. GPS lock happens in literally 2 seconds.' }
    ]
  },
  {
    id: 'prod-3',
    name: 'NovaBook Pro 15 M-Core Laptop',
    slug: 'novabook-pro-15-m-core-laptop',
    category: 'electronics',
    subcategory: 'Laptops',
    brand: 'NovaTech',
    price: 1299.00,
    originalPrice: 1499.00,
    discount: 13,
    rating: 4.9,
    reviewsCount: 96,
    inStock: true,
    stock: 9,
    isFeatured: true,
    isTrending: false,
    isBestSeller: true,
    isNewArrival: false,
    isFlashDeal: false,
    images: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Space Gray', hex: '#334155' },
      { name: 'Starlight Silver', hex: '#e2e8f0' }
    ],
    sizes: ['16GB RAM / 512GB SSD', '32GB RAM / 1TB SSD'],
    shortDescription: 'Ultra-thin unibody workstation powered by 12-core silicon with Liquid Retina XDR display.',
    description: 'Engineered for developers, designers, and creators. The NovaBook Pro delivers blazing performance while staying completely whisper-quiet, with all-day 18-hour battery longevity.',
    features: [
      '15.6" 3K Mini-LED Liquid Display (120Hz ProMotion)',
      '12-Core Processor with 18-Core GPU & Neural Engine',
      'MagSafe Quick Charge & 3x Thunderbolt 4 ports',
      'Studio-quality 6-speaker sound system with force-cancelling woofers',
      'Magnesium-aluminum alloy chassis weighing only 1.58 kg'
    ],
    specifications: {
      'Processor': 'Nova M3 Pro 12-Core',
      'Display': '15.6" 3024x1964 120Hz',
      'RAM': 'Up to 32GB Unified',
      'Storage': 'Up to 1TB NVMe PCIe 4.0',
      'Battery Life': 'Up to 18 Hours'
    },
    reviews: [
      { id: 'r1', user: 'Alex D.', rating: 5, date: '2026-08-11', comment: 'Renders 4K video instantly. The screen color accuracy is stunning.' }
    ]
  },
  {
    id: 'prod-4',
    name: 'Pulse 360 Portable Waterproof Speaker',
    slug: 'pulse-360-portable-waterproof-speaker',
    category: 'electronics',
    subcategory: 'Speakers',
    brand: 'SonicWave',
    price: 89.99,
    originalPrice: 119.99,
    discount: 25,
    rating: 4.6,
    reviewsCount: 420,
    inStock: true,
    stock: 45,
    isFeatured: false,
    isTrending: true,
    isBestSeller: true,
    isNewArrival: false,
    isFlashDeal: true,
    images: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Teal Coral', hex: '#0d9488' },
      { name: 'Charcoal Black', hex: '#1e293b' },
      { name: 'Flame Red', hex: '#ef4444' }
    ],
    sizes: ['Compact'],
    shortDescription: '360-degree immersive sound with punchy bass, IP67 waterproof and 24-hour battery.',
    description: 'Take high-fidelity sound anywhere. From pool parties to mountain trails, the Pulse 360 delivers rich omnidirectional sound with dual passive bass radiators.',
    features: [
      'IP67 Dustproof & Submersible Waterproof (floats in water)',
      '24 Hours non-stop playtime on a single charge',
      'PartyBoost mode to sync 100+ speakers wirelessly',
      'Durable drop-resistant rubber armor bumper'
    ],
    specifications: {
      'Output Power': '30W RMS',
      'Battery': '5200 mAh',
      'Waterproof Rating': 'IP67',
      'Weight': '540g'
    },
    reviews: [
      { id: 'r1', user: 'Emily R.', rating: 5, date: '2026-08-01', comment: 'Dropped it in the lake and it floated and kept playing music! Unreal quality.' }
    ]
  },
  {
    id: 'prod-5',
    name: 'AeroPods True Wireless Earbuds',
    slug: 'aeropods-true-wireless-earbuds',
    category: 'electronics',
    subcategory: 'Headphones',
    brand: 'SonicWave',
    price: 129.99,
    originalPrice: 169.99,
    discount: 23,
    rating: 4.7,
    reviewsCount: 275,
    inStock: true,
    stock: 32,
    isFeatured: true,
    isTrending: false,
    isBestSeller: false,
    isNewArrival: true,
    isFlashDeal: false,
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Pure White', hex: '#f8fafc' },
      { name: 'Matte Slate', hex: '#334155' }
    ],
    sizes: ['Includes S, M, L Tips'],
    shortDescription: 'Ergonomic stemless earbuds with active transparency mode, wireless Qi charging, and low-latency gaming mode.',
    description: 'Experience pure freedom with AeroPods. Designed to lock securely into your ears for all-day comfort during workouts, calls, and listening.',
    features: [
      'Adaptive Transparency & Active Noise Control',
      '32 Hours total battery with wireless charging case',
      'IPX5 sweat and water resistance',
      'Touch gesture controls for volume, track skip, and voice assistant'
    ],
    specifications: {
      'Bluetooth': 'v5.3',
      'Playtime': '8h earbud + 24h case',
      'Water Resistance': 'IPX5'
    },
    reviews: [
      { id: 'r1', user: 'Chris G.', rating: 5, date: '2026-08-19', comment: 'Extremely comfortable for running. Never fall out.' }
    ]
  },
  {
    id: 'prod-6',
    name: 'Vortex Lumina Mechanical Keyboard',
    slug: 'vortex-lumina-mechanical-keyboard',
    category: 'electronics',
    subcategory: 'Accessories',
    brand: 'VortexTech',
    price: 139.00,
    originalPrice: 179.00,
    discount: 22,
    rating: 4.9,
    reviewsCount: 142,
    inStock: true,
    stock: 18,
    isFeatured: false,
    isTrending: true,
    isBestSeller: false,
    isNewArrival: false,
    isFlashDeal: false,
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Retro Cream', hex: '#fef3c7' },
      { name: 'Cyber Dark', hex: '#0f172a' }
    ],
    sizes: ['75% Compact', '100% Full Size'],
    shortDescription: 'Hot-swappable gasket-mounted mechanical keyboard with south-facing RGB and lubricated linear switches.',
    description: 'A typing experience second to none. Built with aluminum top plate, 5-layer acoustic dampening foam, and pre-lubed switches for that creamy marbly sound.',
    features: [
      'Hot-swappable 3/5-pin PCB for easy switch customization',
      'Tri-mode connectivity: Bluetooth 5.0, 2.4GHz Dongle, Type-C',
      '4000mAh rechargeable battery lasting up to 200 hours without RGB',
      'Double-shot PBT keycaps with cherry profile'
    ],
    specifications: {
      'Layout': '75% Layout (82 Keys)',
      'Switches': 'Gateron Yellow Pro Pre-Lubed',
      'Battery': '4000 mAh'
    },
    reviews: [
      { id: 'r1', user: 'Daniel P.', rating: 5, date: '2026-07-15', comment: 'The sound profile right out of the box is unreal. No modding required.' }
    ]
  },

  // ==================== MEN'S FASHION (7-13) ====================
  {
    id: 'prod-7',
    name: 'Nordic Heritage Wool Overcoat',
    slug: 'nordic-heritage-wool-overcoat',
    category: 'mens-fashion',
    subcategory: 'Jackets & Coats',
    brand: 'Avenue & Co.',
    price: 189.99,
    originalPrice: 259.99,
    discount: 27,
    rating: 4.8,
    reviewsCount: 118,
    inStock: true,
    stock: 20,
    isFeatured: true,
    isTrending: true,
    isBestSeller: true,
    isNewArrival: false,
    isFlashDeal: false,
    images: [
      'https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Camel Tan', hex: '#d97706' },
      { name: 'Charcoal Wool', hex: '#334155' },
      { name: 'Oatmeal', hex: '#e2e8f0' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    shortDescription: 'Tailored double-breasted coat made from premium 80% recycled virgin wool blend.',
    description: 'Elevate your winter silhouette with this minimalist Scandinavian overcoat. Cut with a structured shoulder, horn buttons, and a smooth satin lining.',
    features: [
      '80% Recycled Virgin Wool, 20% Technical Polyamide',
      'Tailored notch lapel with reinforced collar stand',
      'Dual deep exterior flap pockets & interior passport pocket',
      'Wind-resistant and naturally temperature regulating'
    ],
    specifications: {
      'Material': '80% Wool, 20% Polyamide',
      'Fit': 'Regular Tailored Fit',
      'Care': 'Dry Clean Only',
      'Origin': 'Portugal'
    },
    reviews: [
      { id: 'r1', user: 'James H.', rating: 5, date: '2026-08-14', comment: 'Drapes magnificently. The wool feels extraordinarily soft and substantial.' }
    ]
  },
  {
    id: 'prod-8',
    name: 'Minimalist Heavyweight French Terry Hoodie',
    slug: 'minimalist-heavyweight-french-terry-hoodie',
    category: 'mens-fashion',
    subcategory: 'Hoodies & Sweats',
    brand: 'Avenue & Co.',
    price: 74.50,
    originalPrice: 95.00,
    discount: 22,
    rating: 4.9,
    reviewsCount: 389,
    inStock: true,
    stock: 50,
    isFeatured: false,
    isTrending: true,
    isBestSeller: true,
    isNewArrival: false,
    isFlashDeal: false,
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Heather Gray', hex: '#94a3b8' },
      { name: 'Forest Green', hex: '#166534' },
      { name: 'Washed Black', hex: '#1e293b' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    shortDescription: '450 GSM ultra-dense loopback organic cotton hoodie with double-layered hood and no drawstrings.',
    description: 'The ultimate luxury streetwear staple. Custom milled from 100% organic cotton, preshrunk to hold its structured drape wash after wash.',
    features: [
      '450 GSM Heavyweight Organic French Terry',
      'Clean boxy oversized streetwear silhouette',
      'Seamless double-layered self-fabric hood',
      'Ribbed side gussets for increased mobility'
    ],
    specifications: {
      'Material': '100% Organic Cotton',
      'Fit': 'Boxy Relaxed Fit',
      'Care': 'Machine wash cold'
    },
    reviews: [
      { id: 'r1', user: 'Sean M.', rating: 5, date: '2026-07-20', comment: 'Best hoodie on the market. Thick, structured, and cozy without being suffocating.' }
    ]
  },
  {
    id: 'prod-9',
    name: 'Oxford Pure Linen Casual Shirt',
    slug: 'oxford-pure-linen-casual-shirt',
    category: 'mens-fashion',
    subcategory: 'Shirts',
    brand: 'Avenue & Co.',
    price: 58.00,
    originalPrice: 78.00,
    discount: 26,
    rating: 4.7,
    reviewsCount: 165,
    inStock: true,
    stock: 35,
    isFeatured: false,
    isTrending: false,
    isBestSeller: false,
    isNewArrival: true,
    isFlashDeal: false,
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Sky Blue', hex: '#bae6fd' },
      { name: 'Crisp White', hex: '#ffffff' },
      { name: 'Sage Olive', hex: '#84cc16' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    shortDescription: '100% Normandy flax linen woven for lightweight breathability and effortless summer styling.',
    description: 'Stay effortlessly crisp in warm climates. Pre-washed for a supple handfeel that gets softer with every wear.',
    features: [
      '100% French Normandy Flax Linen',
      'Garment dyed for rich depth of tone',
      'Mother-of-pearl buttons & curved hemline'
    ],
    specifications: {
      'Material': '100% Flax Linen',
      'Fit': 'Modern Slim-Regular',
      'Care': 'Machine wash gentle'
    },
    reviews: [
      { id: 'r1', user: 'Nathan R.', rating: 5, date: '2026-08-05', comment: 'Keeps me cool in 90-degree heat. Outstanding stitching.' }
    ]
  },
  {
    id: 'prod-10',
    name: 'Modern Utility Cargo Trousers',
    slug: 'modern-utility-cargo-trousers',
    category: 'mens-fashion',
    subcategory: 'Trousers & Jeans',
    brand: 'Avenue & Co.',
    price: 82.00,
    originalPrice: 110.00,
    discount: 25,
    rating: 4.6,
    reviewsCount: 92,
    inStock: true,
    stock: 19,
    isFeatured: false,
    isTrending: true,
    isBestSeller: false,
    isNewArrival: false,
    isFlashDeal: false,
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Military Khaki', hex: '#a3a3a3' },
      { name: 'Stealth Black', hex: '#18181b' }
    ],
    sizes: ['30', '32', '34', '36'],
    shortDescription: 'Durable stretch ripstop fabric with low-profile magnetic cargo pockets and tapered ankle cuffs.',
    description: 'Contemporary technical cargo pants built for urban exploration. Crafted from water-repellent stretch cotton ripstop.',
    features: [
      '97% Cotton Ripstop, 3% Elastane 4-Way Stretch',
      'Dual magnetic cargo bellow pockets',
      'Reinforced crotch gusset for unrestricted range of motion'
    ],
    specifications: {
      'Material': 'Cotton Ripstop Blend',
      'Fit': 'Tapered Utility Fit'
    },
    reviews: [
      { id: 'r1', user: 'Oliver S.', rating: 4, date: '2026-07-29', comment: 'Great fit around the thighs and comfortable stretch.' }
    ]
  },

  // ==================== WOMEN'S FASHION (11-17) ====================
  {
    id: 'prod-11',
    name: 'Silk Touch Belted Wrap Maxi Dress',
    slug: 'silk-touch-belted-wrap-maxi-dress',
    category: 'womens-fashion',
    subcategory: 'Dresses',
    brand: 'Elysian Studio',
    price: 145.00,
    originalPrice: 195.00,
    discount: 26,
    rating: 4.9,
    reviewsCount: 215,
    inStock: true,
    stock: 24,
    isFeatured: true,
    isTrending: true,
    isBestSeller: true,
    isNewArrival: true,
    isFlashDeal: false,
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Emerald Jewel', hex: '#047857' },
      { name: 'Champagne Gold', hex: '#fde047' },
      { name: 'Midnight Navy', hex: '#1e3a8a' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    shortDescription: 'Flowing satin wrap dress with bishop sleeves, self-tie sash belt, and delicate side slit.',
    description: 'An ethereal statement piece suited for gala evenings, cocktail celebrations, or sunset dinners. Cut from premium mulberry silk-blend charmeuse with a luxurious sheen.',
    features: [
      'Luxurious 65% Mulberry Silk, 35% Eco-Vero Viscose',
      'Adjustable wrap front with interior security button',
      'Graceful sweeping maxi hem with elegant movement',
      'Subtle elasticized cuffs with mother-of-pearl buttons'
    ],
    specifications: {
      'Material': 'Mulberry Silk Blend',
      'Length': 'Maxi (140cm)',
      'Care': 'Hand wash cold or Dry Clean'
    },
    reviews: [
      { id: 'r1', user: 'Victoria L.', rating: 5, date: '2026-08-18', comment: 'Wore this to an evening wedding and received compliments all night. The drape is breathtaking!' }
    ]
  },
  {
    id: 'prod-12',
    name: 'Oversized Cashmere-Blend Knit Cardigan',
    slug: 'oversized-cashmere-blend-knit-cardigan',
    category: 'womens-fashion',
    subcategory: 'Sweaters',
    brand: 'Elysian Studio',
    price: 119.00,
    originalPrice: 159.00,
    discount: 25,
    rating: 4.8,
    reviewsCount: 174,
    inStock: true,
    stock: 30,
    isFeatured: false,
    isTrending: true,
    isBestSeller: false,
    isNewArrival: false,
    isFlashDeal: true,
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Almond Beige', hex: '#f5ebe0' },
      { name: 'Soft Charcoal', hex: '#4b5563' },
      { name: 'Dusty Rose', hex: '#fda4af' }
    ],
    sizes: ['XS/S', 'M/L'],
    shortDescription: 'Plush ribbed knit spun with Mongolian cashmere and ultrafine merino wool with tortoiseshell buttons.',
    description: 'Cocoon yourself in heavenly softness. Designed with a slouchy relaxed shoulder, deep V-neckline, and two patch pockets.',
    features: [
      '30% Grade-A Mongolian Cashmere, 70% Superfine Merino Wool',
      'Chunky 7-gauge fisherman rib stitch',
      'Deep functional front pockets & tortoiseshell resin buttons'
    ],
    specifications: {
      'Material': 'Cashmere & Wool Blend',
      'Fit': 'Oversized Slouchy Fit'
    },
    reviews: [
      { id: 'r1', user: 'Camilla P.', rating: 5, date: '2026-08-10', comment: 'Zero itchiness. Incredibly warm and soft against bare skin.' }
    ]
  },
  {
    id: 'prod-13',
    name: 'Sculpt Luxe Seamless Leggings & Top Set',
    slug: 'sculpt-luxe-seamless-leggings-top-set',
    category: 'womens-fashion',
    subcategory: 'Loungewear',
    brand: 'Elysian Studio',
    price: 88.00,
    originalPrice: 120.00,
    discount: 27,
    rating: 4.9,
    reviewsCount: 310,
    inStock: true,
    stock: 40,
    isFeatured: false,
    isTrending: true,
    isBestSeller: true,
    isNewArrival: false,
    isFlashDeal: false,
    images: [
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Espresso Brown', hex: '#451a03' },
      { name: 'Sage Green', hex: '#84cc16' },
      { name: 'Midnight Onyx', hex: '#0f172a' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    shortDescription: 'High-waisted compression rib set with butter-soft 4-way stretch and squat-proof opacity.',
    description: 'Engineered for high-intensity pilates, yoga flows, and coffee runs. Contours and supports your physique with targeted compression zones.',
    features: [
      'Buttery soft 78% Nylon, 22% Spandex blend',
      'High-rise double-layered waistband that never rolls down',
      'Moisture-wicking quick-dry treatment',
      'Seamless flatlock stitching prevents chafing'
    ],
    specifications: {
      'Set Includes': 'High-Waist Legging + Longline Sports Bra',
      'Opacity': '100% Squat-Proof'
    },
    reviews: [
      { id: 'r1', user: 'Chloe B.', rating: 5, date: '2026-08-04', comment: 'Best gym set I have ever owned. Compresses without pinching!' }
    ]
  },

  // ==================== FOOTWEAR & SNEAKERS (14-20) ====================
  {
    id: 'prod-14',
    name: 'Strata Flow Carbon Running Shoes',
    slug: 'strata-flow-carbon-running-shoes',
    category: 'footwear',
    subcategory: 'Running',
    brand: 'Veloce Athletics',
    price: 179.99,
    originalPrice: 229.99,
    discount: 22,
    rating: 4.9,
    reviewsCount: 264,
    inStock: true,
    stock: 22,
    isFeatured: true,
    isTrending: true,
    isBestSeller: true,
    isNewArrival: false,
    isFlashDeal: true,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Crimson Surge', hex: '#dc2626' },
      { name: 'Hyper Volt Neon', hex: '#84cc16' },
      { name: 'Phantom Black', hex: '#18181b' }
    ],
    sizes: ['US 7.5', 'US 8', 'US 8.5', 'US 9', 'US 9.5', 'US 10', 'US 10.5', 'US 11'],
    shortDescription: 'Full-length carbon fiber propulsion plate with dual-density nitrogen-infused supercritical foam midsole.',
    description: 'Designed for race day and fast tempo training. Delivers 88% energy return with rockered geometry that transitions smoothly from heel strike to toe off.',
    features: [
      'Full-length 3D Carbon Fiber propulsive plate',
      'Supercritical PEBA Nitrogen-infused foam cushioning',
      'Engineered mono-mesh upper with targeted breathability',
      'Continental rubber traction pods with multi-surface grip'
    ],
    specifications: {
      'Weight': '198g (Size US 9)',
      'Stack Height': '38mm heel / 30mm toe (8mm drop)',
      'Intended Use': 'Marathon, 10K, Tempo runs'
    },
    reviews: [
      { id: 'r1', user: 'Austin F.', rating: 5, date: '2026-08-16', comment: 'Shaved 4 minutes off my 10K time. The carbon plate spring feels effortless.' }
    ]
  },
  {
    id: 'prod-15',
    name: 'Retro Classic Leather Minimalist Sneaker',
    slug: 'retro-classic-leather-minimalist-sneaker',
    category: 'footwear',
    subcategory: 'Sneakers',
    brand: 'Veloce Athletics',
    price: 115.00,
    originalPrice: 145.00,
    discount: 21,
    rating: 4.8,
    reviewsCount: 198,
    inStock: true,
    stock: 35,
    isFeatured: false,
    isTrending: true,
    isBestSeller: false,
    isNewArrival: true,
    isFlashDeal: false,
    images: [
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Chalk White & Gum', hex: '#fafaf9' },
      { name: 'Monochrome Black', hex: '#18181b' }
    ],
    sizes: ['US 8', 'US 9', 'US 10', 'US 11', 'US 12'],
    shortDescription: 'Handcrafted full-grain Italian calf leather low-top sneaker with Margom vulcanized rubber cupsole.',
    description: 'A timeless silhouette that pairs with tailored trousers, denim, or shorts. Hand-burnished edges, waxed cotton laces, and calfskin leather footbeds.',
    features: [
      '100% Full-Grain Italian Nappa Leather',
      'Hand-stitched Margom rubber cupsole',
      'Removable antimicrobial OrthoLite memory insole'
    ],
    specifications: {
      'Upper': 'Full-Grain Calfskin',
      'Sole': 'Natural Rubber',
      'Crafted in': 'Italy'
    },
    reviews: [
      { id: 'r1', user: 'Julian W.', rating: 5, date: '2026-07-22', comment: 'Better leather quality than sneakers costing double. Zero break-in time.' }
    ]
  },
  {
    id: 'prod-16',
    name: 'Summit Waterproof All-Terrain Hiking Boot',
    slug: 'summit-waterproof-all-terrain-hiking-boot',
    category: 'footwear',
    subcategory: 'Boots',
    brand: 'Veloce Athletics',
    price: 165.00,
    originalPrice: 210.00,
    discount: 21,
    rating: 4.7,
    reviewsCount: 112,
    inStock: true,
    stock: 14,
    isFeatured: false,
    isTrending: false,
    isBestSeller: false,
    isNewArrival: false,
    isFlashDeal: false,
    images: [
      'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Earth Ochre', hex: '#78350f' },
      { name: 'Slate Granite', hex: '#475569' }
    ],
    sizes: ['US 8', 'US 8.5', 'US 9', 'US 9.5', 'US 10', 'US 11'],
    shortDescription: 'Nubuck leather boots with Gore-Tex waterproof membrane and Vibram Megagrip lugged outsoles.',
    description: 'Conquer rocky summits and muddy trails. Designed with high-top ankle stability support, TPU rock plate protection, and sealed seam waterproofing.',
    features: [
      'GORE-TEX waterproof & breathable bootie membrane',
      'Vibram Megagrip outsole with 5mm multidirectional lugs',
      'Anatomical ankle collar with gusseted tongue keeps debris out'
    ],
    specifications: {
      'Membrane': 'GORE-TEX 3-Layer',
      'Outsole': 'Vibram Megagrip',
      'Weight': '440g per boot'
    },
    reviews: [
      { id: 'r1', user: 'Brad T.', rating: 5, date: '2026-08-08', comment: 'Hiked 18 miles in Pacific Northwest rain without a single leak or blister.' }
    ]
  },

  // ==================== WATCHES & ACCESSORIES (17-23) ====================
  {
    id: 'prod-17',
    name: 'Aethel Automatic Mechanical Watch',
    slug: 'aethel-automatic-mechanical-watch',
    category: 'accessories',
    subcategory: 'Watches',
    brand: 'Horology Atelier',
    price: 389.00,
    originalPrice: 499.00,
    discount: 22,
    rating: 4.9,
    reviewsCount: 140,
    inStock: true,
    stock: 11,
    isFeatured: true,
    isTrending: true,
    isBestSeller: true,
    isNewArrival: false,
    isFlashDeal: false,
    images: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Sunburst Blue / Steel', hex: '#1e40af' },
      { name: 'Champagne / Rose Gold', hex: '#fbbf24' },
      { name: 'Obsidian / Leather', hex: '#0f172a' }
    ],
    sizes: ['40mm Case'],
    shortDescription: 'Japanese Miyota 9015 24-jewel automatic movement with sapphire crystal and exhibition caseback.',
    description: 'An homage to classic horology. Self-winding with 42 hours power reserve, 28,800 beats per hour sweeping second hand, and 316L stainless steel case.',
    features: [
      'Automatic self-winding movement (no batteries required)',
      'Scratch-proof Sapphire Crystal with anti-reflective coating',
      'Exhibition sapphire caseback revealing decorated rotor',
      '5 ATM water resistance (50 meters / 165 ft)'
    ],
    specifications: {
      'Case Diameter': '40mm',
      'Case Thickness': '10.5mm',
      'Movement': 'Miyota 9015 Automatic (28,800 vph)',
      'Lug Width': '20mm'
    },
    reviews: [
      { id: 'r1', user: 'Harrison E.', rating: 5, date: '2026-08-22', comment: 'The sweeping second hand is buttery smooth. Looks like a \$2,000 Swiss luxury piece.' }
    ]
  },
  {
    id: 'prod-18',
    name: 'Aviator Horizon Polarized Sunglasses',
    slug: 'aviator-horizon-polarized-sunglasses',
    category: 'accessories',
    subcategory: 'Sunglasses',
    brand: 'Horology Atelier',
    price: 85.00,
    originalPrice: 115.00,
    discount: 26,
    rating: 4.7,
    reviewsCount: 188,
    inStock: true,
    stock: 28,
    isFeatured: false,
    isTrending: false,
    isBestSeller: true,
    isNewArrival: false,
    isFlashDeal: true,
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Gold / Forest Green', hex: '#ca8a04' },
      { name: 'Matte Black / Smoke', hex: '#18181b' },
      { name: 'Silver / Gradient Blue', hex: '#94a3b8' }
    ],
    sizes: ['Medium 58mm'],
    shortDescription: 'Japanese titanium frame with TAC polarized 100% UV400 anti-glare scratch-resistant lenses.',
    description: 'Classic teardrop silhouette reimagined with ultralight aerospace titanium. Features spring hinges and silicone hypoallergenic nose pads for custom comfort.',
    features: [
      'TAC Multi-layer Polarized lenses (UV400 100% UVA/UVB protection)',
      'Ultra-lightweight Japanese Titanium frame (only 18g)',
      'Hydrophobic and oleophobic smudge-resistant coating',
      'Includes genuine leather magnetic hard case & microfiber cloth'
    ],
    specifications: {
      'Frame Width': '140mm',
      'Bridge Width': '14mm',
      'Lens Width': '58mm',
      'Weight': '18 grams'
    },
    reviews: [
      { id: 'r1', user: 'Zoe K.', rating: 5, date: '2026-08-01', comment: 'Crystal clear driving vision. So light you forget you are wearing them.' }
    ]
  },
  {
    id: 'prod-19',
    name: 'Executive Full-Grain Leather Commuter Backpack',
    slug: 'executive-full-grain-leather-commuter-backpack',
    category: 'accessories',
    subcategory: 'Wallets & Bags',
    brand: 'Horology Atelier',
    price: 195.00,
    originalPrice: 260.00,
    discount: 25,
    rating: 4.8,
    reviewsCount: 167,
    inStock: true,
    stock: 16,
    isFeatured: true,
    isTrending: false,
    isBestSeller: false,
    isNewArrival: true,
    isFlashDeal: false,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Cognac Brown', hex: '#7c2d12' },
      { name: 'Charcoal Black', hex: '#18181b' }
    ],
    sizes: ['20L Capacity'],
    shortDescription: 'Full-grain vegetable-tanned leather with 16" padded laptop vault, luggage pass-through and waterproof YKK zippers.',
    description: 'Designed for discerning travelers and modern executives. Combines rugged heirloom leather with smart modular internal organization.',
    features: [
      'Vegetable-tanned full grain cowhide leather that patinas with age',
      'Dedicated suspended 16" padded laptop and tablet compartment',
      'Hidden passport security pocket & trolley sleeve strap',
      'Waterproof Japanese YKK Aquaguard zippers'
    ],
    specifications: {
      'Dimensions': '44 x 31 x 15 cm',
      'Capacity': '20 Liters',
      'Laptop Fit': 'Up to 16-inch MacBook Pro'
    },
    reviews: [
      { id: 'r1', user: 'Derek M.', rating: 5, date: '2026-07-30', comment: 'Smells incredible, leather is premium, and fits under airline seats perfectly.' }
    ]
  },

  // ==================== HOME & LIVING (20-26) ====================
  {
    id: 'prod-20',
    name: 'Ceramic Ultrasonic Aroma Diffuser & Ambient Lamp',
    slug: 'ceramic-ultrasonic-aroma-diffuser-lamp',
    category: 'home-lifestyle',
    subcategory: 'Diffusers',
    brand: 'Lumina Living',
    price: 68.00,
    originalPrice: 89.00,
    discount: 24,
    rating: 4.9,
    reviewsCount: 284,
    inStock: true,
    stock: 38,
    isFeatured: true,
    isTrending: true,
    isBestSeller: true,
    isNewArrival: false,
    isFlashDeal: true,
    images: [
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Terracotta Matte', hex: '#9a3412' },
      { name: 'Stone White', hex: '#f4f4f5' },
      { name: 'Charcoal Basalt', hex: '#27272a' }
    ],
    sizes: ['300ml Capacity'],
    shortDescription: 'Hand-poured porcelain stone diffuser with warm candlelight LED glow and ultrasonic whisper-quiet atomization.',
    description: 'Transform your living space into a sanctuary. Ultrasonic vibrations diffuse 100% pure essential oils without heat, preserving therapeutic benefits.',
    features: [
      'Handcrafted artisan ceramic matte stone cover',
      'Continuous and intermittent mist modes (up to 10 hours runtime)',
      'Warm ambient breathing LED nightlight with independent control',
      'Auto shut-off safety sensor when water level runs out'
    ],
    specifications: {
      'Water Tank': '300 ml',
      'Coverage': 'Up to 400 sq. ft.',
      'Noise Level': '< 20 dB'
    },
    reviews: [
      { id: 'r1', user: 'Rachel V.', rating: 5, date: '2026-08-12', comment: 'The ceramic stone look is gorgeous on my nightstand. The mist output is very fine!' }
    ]
  },
  {
    id: 'prod-21',
    name: 'Nordic Minimalist Adjustable Desk Lamp',
    slug: 'nordic-minimalist-adjustable-desk-lamp',
    category: 'home-lifestyle',
    subcategory: 'Lighting',
    brand: 'Lumina Living',
    price: 94.00,
    originalPrice: 125.00,
    discount: 25,
    rating: 4.7,
    reviewsCount: 146,
    inStock: true,
    stock: 21,
    isFeatured: false,
    isTrending: false,
    isBestSeller: false,
    isNewArrival: true,
    isFlashDeal: false,
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Matte Brass / White', hex: '#d97706' },
      { name: 'Stealth Black', hex: '#18181b' }
    ],
    sizes: ['Standard Desk'],
    shortDescription: 'Solid brass and spun aluminum task lamp with 3 color temperatures, stepless touch dimming and Qi fast charging base.',
    description: 'Precision task lighting designed for architects and creators. Emits flicker-free CRI 95+ light that reduces eye strain during late work sessions.',
    features: [
      '95+ CRI high-color-rendering flicker-free LEDs',
      'Stepless touch slider for brightness (5% - 100%)',
      'Integrated 15W wireless charging pad in base',
      'Dual articulated brass counterweight arms'
    ],
    specifications: {
      'Color Temperature': '2700K - 6500K Tunable',
      'Luminance': '800 Lumens',
      'Power': '12W LED'
    },
    reviews: [
      { id: 'r1', user: 'Simon K.', rating: 5, date: '2026-07-25', comment: 'Clean architectural look and the integrated phone charger is super convenient.' }
    ]
  },
  {
    id: 'prod-22',
    name: 'Artisan Matte Ceramic Pour-Over & Mug Set',
    slug: 'artisan-matte-ceramic-pour-over-mug-set',
    category: 'home-lifestyle',
    subcategory: 'Drinkware',
    brand: 'Lumina Living',
    price: 48.00,
    originalPrice: 65.00,
    discount: 26,
    rating: 4.8,
    reviewsCount: 178,
    inStock: true,
    stock: 42,
    isFeatured: false,
    isTrending: true,
    isBestSeller: true,
    isNewArrival: false,
    isFlashDeal: false,
    images: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Oatmeal Speckle', hex: '#e7e5e4' },
      { name: 'Sage Celadon', hex: '#a3e635' },
      { name: 'Volcanic Ash', hex: '#3f3f46' }
    ],
    sizes: ['1-2 Cups'],
    shortDescription: 'Handcrafted stoneware dripper with matching 350ml ergonomic mug and wooden bamboo collar.',
    description: 'Elevate your morning coffee ritual. Dual-walled ceramic retains heat for optimal extraction temperature while staying cool to the touch.',
    features: [
      'High-fired durable artisan stoneware clay',
      'Spiral interior ribs optimize water flow rate',
      'Dishwasher and microwave safe'
    ],
    specifications: {
      'Includes': '1x Ceramic Dripper, 1x 350ml Mug',
      'Filter Compatibility': 'V60 02 paper or cloth filters'
    },
    reviews: [
      { id: 'r1', user: 'Maya S.', rating: 5, date: '2026-08-09', comment: 'Brews the sweetest, cleanest cup of coffee. The speckled glaze is so tactile.' }
    ]
  },

  // ==================== MORE ELECTRONICS & FASHION (23-32) ====================
  {
    id: 'prod-23',
    name: 'Horizon Pro Mirrorless Cinema Camera',
    slug: 'horizon-pro-mirrorless-cinema-camera',
    category: 'electronics',
    subcategory: 'Accessories',
    brand: 'NovaTech',
    price: 1899.00,
    originalPrice: 2199.00,
    discount: 14,
    rating: 5.0,
    reviewsCount: 78,
    inStock: true,
    stock: 6,
    isFeatured: true,
    isTrending: false,
    isBestSeller: false,
    isNewArrival: true,
    isFlashDeal: false,
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Magnesium Black', hex: '#0f172a' }
    ],
    sizes: ['Body Only', 'Body + 24-70mm Lens'],
    shortDescription: 'Full-frame 45MP sensor with 8K RAW video recording, 5-axis IBIS, and real-time AI subject tracking.',
    description: 'Uncompromising creative power for filmmakers and commercial photographers. Dynamic range of 15+ stops and dual native ISO.',
    features: [
      '45 Megapixel Back-Illuminated Full-Frame CMOS sensor',
      '8K 30p and 4K 120p 10-bit 4:2:2 internal recording',
      '8-stop 5-Axis In-Body Image Stabilization (IBIS)',
      'Dual CFexpress Type B and SD UHS-II card slots'
    ],
    specifications: {
      'Sensor': '45MP Full-Frame',
      'ISO Range': '100 - 51,200',
      'Mount': 'E-Mount'
    },
    reviews: [
      { id: 'r1', user: 'George T.', rating: 5, date: '2026-08-11', comment: 'Color science is cinematic perfection. Low light performance is mind-blowing.' }
    ]
  },
  {
    id: 'prod-24',
    name: 'AeroGlide Carbon Fiber Road Helmet',
    slug: 'aeroglide-carbon-fiber-road-helmet',
    category: 'footwear',
    subcategory: 'Running',
    brand: 'Veloce Athletics',
    price: 149.00,
    originalPrice: 190.00,
    discount: 22,
    rating: 4.8,
    reviewsCount: 95,
    inStock: true,
    stock: 19,
    isFeatured: false,
    isTrending: false,
    isBestSeller: false,
    isNewArrival: false,
    isFlashDeal: false,
    images: [
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Matte Carbon', hex: '#18181b' },
      { name: 'Gloss White', hex: '#ffffff' }
    ],
    sizes: ['S (51-55cm)', 'M (55-59cm)', 'L (59-63cm)'],
    shortDescription: 'Wind-tunnel tested aerodynamic cycling helmet with integrated MIPS safety rotational protection.',
    description: 'Stay fast, cool, and protected. 18 optimized ventilation channels pull cool air through internal brow ports.',
    features: [
      'MIPS Air rotational brain protection system',
      'In-mold carbon composite shell reinforcement',
      'Fidlock magnetic snap buckle with single-hand operation'
    ],
    specifications: {
      'Weight': '230g (Size M)',
      'Certifications': 'CPSC & EN1078'
    },
    reviews: [
      { id: 'r1', user: 'Kenneth M.', rating: 5, date: '2026-07-19', comment: 'Lightest helmet I have worn. Ventilation in the summer heat is fantastic.' }
    ]
  },
  {
    id: 'prod-25',
    name: 'Luxe Italian Saffiano Leather Bifold Wallet',
    slug: 'luxe-italian-saffiano-leather-bifold-wallet',
    category: 'accessories',
    subcategory: 'Wallets & Bags',
    brand: 'Horology Atelier',
    price: 65.00,
    originalPrice: 85.00,
    discount: 24,
    rating: 4.9,
    reviewsCount: 220,
    inStock: true,
    stock: 55,
    isFeatured: false,
    isTrending: true,
    isBestSeller: true,
    isNewArrival: false,
    isFlashDeal: true,
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1606503825008-909a67e65c10?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Midnight Black', hex: '#0f172a' },
      { name: 'Cognac Saddle', hex: '#78350f' },
      { name: 'Racing Green', hex: '#064e3b' }
    ],
    sizes: ['Slim Standard'],
    shortDescription: 'Scratch-resistant cross-grain Saffiano leather wallet with RFID blocking lining and 8 card slots.',
    description: 'Engineered for sleek front or back pocket carry. Features hand-painted edge burnishing and debossed metallic logo.',
    features: [
      'Genuine Italian cross-hatch Saffiano leather',
      'RFID security shield blocks 13.56 MHz frequency scanners',
      'Dual full-length billfold compartments & quick-access ID slot'
    ],
    specifications: {
      'Dimensions': '11 x 9 x 1.2 cm',
      'Card Slots': '8 Slots + 2 hidden slips'
    },
    reviews: [
      { id: 'r1', user: 'Trevor D.', rating: 5, date: '2026-08-14', comment: 'Doesn’t bulge in my suit pocket and the leather doesn’t scratch.' }
    ]
  },
  {
    id: 'prod-26',
    name: 'Signature Tailored Linen Blazer',
    slug: 'signature-tailored-linen-blazer',
    category: 'womens-fashion',
    subcategory: 'Blazers & Outerwear',
    brand: 'Elysian Studio',
    price: 155.00,
    originalPrice: 210.00,
    discount: 26,
    rating: 4.8,
    reviewsCount: 132,
    inStock: true,
    stock: 18,
    isFeatured: true,
    isTrending: false,
    isBestSeller: false,
    isNewArrival: true,
    isFlashDeal: false,
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1548624149-f9b1859aa9b4?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Sand Cream', hex: '#f5f5f4' },
      { name: 'Powder Blue', hex: '#93c5fd' },
      { name: 'Terracotta', hex: '#c2410c' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    shortDescription: 'Relaxed unstructured summer blazer cut from pure European flax linen with tortoiseshell resin buttons.',
    description: 'The definitive smart-casual layer. Pair with matching trousers or throw effortlessly over denim for an instant elevated look.',
    features: [
      '100% European Flax Linen with breathable half-lining',
      'Classic notch lapel with single-button closure',
      'Double back vent for effortless drape and comfort'
    ],
    specifications: {
      'Material': '100% Linen',
      'Fit': 'Tailored Relaxed Fit'
    },
    reviews: [
      { id: 'r1', user: 'Seraphina J.', rating: 5, date: '2026-08-03', comment: 'Perfection! Fits like it was custom made by a tailor.' }
    ]
  },
  {
    id: 'prod-27',
    name: 'Heritage Raw Japanese Selvedge Denim',
    slug: 'heritage-raw-japanese-selvedge-denim',
    category: 'mens-fashion',
    subcategory: 'Trousers & Jeans',
    brand: 'Avenue & Co.',
    price: 135.00,
    originalPrice: 175.00,
    discount: 23,
    rating: 4.9,
    reviewsCount: 155,
    inStock: true,
    stock: 22,
    isFeatured: false,
    isTrending: true,
    isBestSeller: false,
    isNewArrival: false,
    isFlashDeal: false,
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Deep Indigo Raw', hex: '#1e3a8a' }
    ],
    sizes: ['30x32', '32x32', '34x32', '36x32'],
    shortDescription: '14.5 oz red-line selvedge denim woven on vintage shuttle looms in Okayama, Japan.',
    description: 'Pure untreated raw denim designed to mold to your body over time and develop personalized fade patterns with continuous wear.',
    features: [
      '14.5 oz 100% Long-Staple Zimbabwe Cotton',
      'Red-line selvedge identification ID on coin pocket & outseam',
      'Solid copper donut button fly & concealed back pocket rivets'
    ],
    specifications: {
      'Origin': 'Okayama, Japan',
      'Weight': '14.5 oz',
      'Fit': 'Slim Straight'
    },
    reviews: [
      { id: 'r1', user: 'Jack N.', rating: 5, date: '2026-07-18', comment: 'The real deal. The texture of the shuttle loom weave is incredible.' }
    ]
  },
  {
    id: 'prod-28',
    name: 'Smart Ambient RGBIC Hexagon Wall Panels (9-Pack)',
    slug: 'smart-ambient-rgbic-hexagon-wall-panels',
    category: 'home-lifestyle',
    subcategory: 'Lighting',
    brand: 'NovaTech',
    price: 129.99,
    originalPrice: 169.99,
    discount: 24,
    rating: 4.8,
    reviewsCount: 310,
    inStock: true,
    stock: 25,
    isFeatured: true,
    isTrending: true,
    isBestSeller: false,
    isNewArrival: false,
    isFlashDeal: true,
    images: [
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'RGBIC Multi-Color', hex: '#6366f1' }
    ],
    sizes: ['9-Panel Starter Kit'],
    shortDescription: 'Modular geometric LED panels with music sync, 16 million colors, and dynamic animated scene presets.',
    description: 'Transform your gaming room or studio wall into a living canvas. Snaps together in any custom geometric pattern with tool-free adhesive brackets.',
    features: [
      'RGBIC technology displays multiple vibrant colors per panel simultaneously',
      'Real-time built-in acoustic microphone music visualization mode',
      'Compatible with HomeKit, Alexa, and Google Assistant voice controls'
    ],
    specifications: {
      'Panels Included': '9 Modular Hexagons',
      'Connectivity': 'Wi-Fi 2.4GHz + Bluetooth'
    },
    reviews: [
      { id: 'r1', user: 'Evan L.', rating: 5, date: '2026-08-17', comment: 'Music sync looks incredible in my desk setup stream. Easy setup.' }
    ]
  },
  {
    id: 'prod-29',
    name: 'AeroLite Carbon Gravel Bike Cage & Bottle',
    slug: 'aerolite-carbon-gravel-bike-cage-bottle',
    category: 'footwear',
    subcategory: 'Casual',
    brand: 'Veloce Athletics',
    price: 39.99,
    originalPrice: 49.99,
    discount: 20,
    rating: 4.7,
    reviewsCount: 88,
    inStock: true,
    stock: 60,
    isFeatured: false,
    isTrending: false,
    isBestSeller: false,
    isNewArrival: false,
    isFlashDeal: false,
    images: [
      'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Matte Carbon Black', hex: '#18181b' }
    ],
    sizes: ['650ml Bottle Included'],
    shortDescription: 'Ultralight 18g high-modulus 3K carbon bottle cage with insulated BPA-free membrane bottle.',
    description: 'Secure lock retention designed for rough gravel washboards and cobblestones without dropping your hydration bottle.',
    features: [
      '18 Grams high modulus 3K carbon weave',
      'Includes 650ml insulated high-flow squeezable bottle',
      'Titanium mounting bolts included'
    ],
    specifications: {
      'Weight': '18g',
      'Material': 'Toray T700 Carbon'
    },
    reviews: [
      { id: 'r1', user: 'Sammy P.', rating: 5, date: '2026-08-06', comment: 'Holds bottles firmly on extreme trails. Super sleek look.' }
    ]
  },
  {
    id: 'prod-30',
    name: 'AromaBotanica Pure Essential Oil Discovery Set (6x10ml)',
    slug: 'aromabotanica-pure-essential-oil-set',
    category: 'home-lifestyle',
    subcategory: 'Diffusers',
    brand: 'Lumina Living',
    price: 34.00,
    originalPrice: 45.00,
    discount: 24,
    rating: 4.9,
    reviewsCount: 245,
    inStock: true,
    stock: 50,
    isFeatured: false,
    isTrending: true,
    isBestSeller: true,
    isNewArrival: false,
    isFlashDeal: false,
    images: [
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Amber Glass Vials', hex: '#b45309' }
    ],
    sizes: ['6 x 10ml Set'],
    shortDescription: '100% therapeutic grade steam-distilled oils: French Lavender, Eucalyptus, Peppermint, Sweet Orange, Tea Tree, and Lemongrass.',
    description: 'GC/MS verified 100% pure undiluted botanicals bottled in UV-protective amber glass with precision dropper caps.',
    features: [
      'No synthetics, parabens, GMOs, or carrier fillers',
      'Sustainably wild-harvested and organic botanical sources',
      'Packed in recycled presentation gift box'
    ],
    specifications: {
      'Quantity': '6 Bottles (10ml each)',
      'Grade': '100% Pure Therapeutic Grade'
    },
    reviews: [
      { id: 'r1', user: 'Lily T.', rating: 5, date: '2026-08-20', comment: 'The French Lavender is so calming before bed. Incredible scent potency.' }
    ]
  }
];

export const BRANDS = [
  'SonicWave',
  'Aegis',
  'NovaTech',
  'VortexTech',
  'Avenue & Co.',
  'Elysian Studio',
  'Veloce Athletics',
  'Horology Atelier',
  'Lumina Living'
];
