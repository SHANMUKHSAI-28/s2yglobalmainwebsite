const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://s2ypureserver.vercel.app/api';

// Pre-seeded fallback catalog matching official S2Y Pure products & live pricing
export const FALLBACK_PRODUCTS = [
  {
    _id: '6a315b0e3f713c0aa97d71be',
    name: 'S2Y Pure Moringa Powder',
    slug: 's2y-pure-moringa-powder',
    category: 'leaf',
    tagline: '100% Pure & Organically Sourced Moringa Oleifera',
    shortDescription: 'Premium Moringa Powder made from carefully selected moringa leaves. Rich in vitamins, minerals, antioxidants, and plant-based nutrients to support energy, immunity, and overall vitality.',
    description: 'Experience the pure power of nature with S2Y Pure Moringa Powder. Our moringa is sustainably cultivated and shade-dried to preserve maximum nutrient density. Every batch is lab-tested for purity.',
    benefits: [
      'Rich in Essential Nutrients, Vitamin A, C & Iron',
      'Supports Natural Energy & Immune Defense',
      'High in Potent Antioxidants & Plant Protein',
      'Promotes Digestion & Daily Cellular Wellness',
      '100% Pure, Raw & Additive-Free'
    ],
    ingredients: '100% Pure Moringa Leaf Powder (Moringa oleifera). No preservatives, fillers, or artificial colors.',
    howToUse: 'Mix 1 teaspoon (approx. 5g) daily into warm water, morning smoothies, juices, herbal teas, or protein shakes.',
    storageInstructions: 'Store in a cool, dry place away from direct sunlight. Reseal pouch tightly after each use.',
    shelfLife: '12 Months',
    manufacturedBy: 'S2Y Global Private Limited, Vijayawada, Andhra Pradesh, India',
    fssaiNumber: '10126020000333',
    featured: true,
    images: [
      'https://pub-e889185a379c437ba823f5d9976d6e5b.r2.dev/products/1781619547884-100g.png',
      'https://pub-e889185a379c437ba823f5d9976d6e5b.r2.dev/products/1781619309068-250g.png'
    ],
    weights: [
      {
        _id: '6a315b623f713c0aa97d7237',
        label: '100g',
        mrp: 299,
        price: 249,
        stock: 48,
        sku: 'S2Y-MOR-100',
        badgeText: 'TRIAL PACK',
        isDefault: false
      },
      {
        _id: '6a315b623f713c0aa97d7238',
        label: '250g',
        mrp: 599,
        price: 499,
        stock: 50,
        sku: 'S2Y-MOR-200',
        badgeText: 'MOST POPULAR',
        isDefault: true
      },
      {
        _id: '6a315b623f713c0aa97d7239',
        label: '500g',
        mrp: 999,
        price: 799,
        stock: 49,
        sku: 'S2Y-MOR-500G',
        badgeText: 'BEST VALUE',
        isDefault: false
      }
    ]
  },
  {
    _id: 'pure-tomato-powder-export',
    name: 'S2Y Pure Tomato Powder',
    slug: 's2y-pure-tomato-powder',
    category: 'vegetable',
    tagline: 'Dehydrated Sun-Ripened Red Tomato Derivative',
    shortDescription: 'High-grade dehydrated tomato powder offering concentrated nutrition and rich flavor. 1 tablespoon equals 2 fresh tomatoes. Ideal for culinary and health formulations.',
    description: 'Our tomato powder is crafted from hand-picked ripe Indian tomatoes, vacuum dehydrated at gentle temperatures to retain natural lycopene, vitamin C, and authentic savory taste.',
    benefits: [
      'Rich in Lycopene — Powerful Natural Antioxidant',
      'Concentrated Tomato Nutrition (1 tbsp = 2 Tomatoes)',
      '100% Free of Salt, MSG, or Artificial Additives',
      'Instant Dissolve in Warm Water for Pure Puree',
      'Extended 12-Month Ambient Shelf Life'
    ],
    ingredients: '100% Dehydrated Ripe Tomatoes (Solanum lycopersicum).',
    howToUse: 'Add 1-2 tablespoons to soups, curries, broths, seasonings, or mix with water for fresh tomato sauce.',
    storageInstructions: 'Keep airtight in a dry, cool cabinet. Avoid moisture exposure.',
    shelfLife: '12 Months',
    manufacturedBy: 'S2Y Global Private Limited, Vijayawada, Andhra Pradesh, India',
    fssaiNumber: '10126020000333',
    featured: true,
    images: [
      'https://pub-e889185a379c437ba823f5d9976d6e5b.r2.dev/products/1781619547884-100g.png'
    ],
    weights: [
      {
        _id: 'tomato-100g',
        label: '100g',
        mrp: 189,
        price: 149,
        stock: 40,
        sku: 'S2Y-TOM-100',
        badgeText: 'STARTER',
        isDefault: true
      },
      {
        _id: 'tomato-250g',
        label: '250g',
        mrp: 349,
        price: 279,
        stock: 35,
        sku: 'S2Y-TOM-250',
        badgeText: 'POPULAR',
        isDefault: false
      },
      {
        _id: 'tomato-500g',
        label: '500g',
        mrp: 599,
        price: 489,
        stock: 25,
        sku: 'S2Y-TOM-500',
        badgeText: 'KITCHEN VALUE',
        isDefault: false
      }
    ]
  },
  {
    _id: 'pure-beetroot-powder-derivative',
    name: 'S2Y Pure Beetroot Powder',
    slug: 's2y-pure-beetroot-powder',
    category: 'vegetable',
    tagline: 'Organic Nitric Oxide Booster & Natural Superfood',
    shortDescription: 'Deep crimson beetroot powder rich in nitrates, folate, and iron. Enhances workout endurance, supports blood flow, and acts as a pure natural food colorant.',
    description: 'Made from farm-fresh root beetroots, thoroughly washed, dehydrated and micro-milled to an ultra-smooth consistency. Great for daily pre-workout smoothies and nutrition shakes.',
    benefits: [
      'Supports Healthy Blood Pressure & Circulation',
      'High in Dietary Nitrates for Athletic Endurance',
      'Rich in Iron, Folate & Antioxidant Betalains',
      'Zero Added Sugars, Flavors, or Preservatives'
    ],
    ingredients: '100% Dehydrated Beetroot (Beta vulgaris).',
    howToUse: 'Mix 1 teaspoon in 200ml cold water, fresh juice, or pre-workout beverage 30 mins before exercise.',
    storageInstructions: 'Store sealed in a cool, dry place. Protect from heat and light.',
    shelfLife: '12 Months',
    manufacturedBy: 'S2Y Global Private Limited, Vijayawada, Andhra Pradesh, India',
    fssaiNumber: '10126020000333',
    featured: true,
    images: [
      'https://pub-e889185a379c437ba823f5d9976d6e5b.r2.dev/products/1781619547884-100g.png'
    ],
    weights: [
      {
        _id: 'beetroot-100g',
        label: '100g',
        mrp: 229,
        price: 179,
        stock: 35,
        sku: 'S2Y-BET-100',
        badgeText: 'TRIAL',
        isDefault: true
      },
      {
        _id: 'beetroot-250g',
        label: '250g',
        mrp: 449,
        price: 349,
        stock: 30,
        sku: 'S2Y-BET-250',
        badgeText: 'VALUE PACK',
        isDefault: false
      }
    ]
  }
];

export async function fetchProducts() {
  try {
    const res = await fetch(`${API_BASE_URL}/products`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    if (data && data.success && Array.isArray(data.products) && data.products.length > 0) {
      // Merge live products with catalog details
      const liveProducts = data.products;
      // If server only has Moringa live, include additional companion items from catalog
      const existingIds = new Set(liveProducts.map(p => p._id));
      const companions = FALLBACK_PRODUCTS.filter(p => !existingIds.has(p._id));
      return [...liveProducts, ...companions];
    }
    return FALLBACK_PRODUCTS;
  } catch (err) {
    console.warn('[pureApi] Unable to reach live products endpoint, using fallback catalogue:', err);
    return FALLBACK_PRODUCTS;
  }
}

export async function createOrder(orderPayload) {
  const res = await fetch(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify(orderPayload),
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || 'Failed to create order');
  }
  return data;
}

export async function createRazorpayOrder(orderId) {
  const res = await fetch(`${API_BASE_URL}/payment/create-order`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({ orderId }),
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || 'Failed to initiate payment gateway');
  }
  return data;
}

export async function verifyPayment(paymentPayload) {
  const res = await fetch(`${API_BASE_URL}/payment/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify(paymentPayload),
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || 'Payment verification failed');
  }
  return data;
}
