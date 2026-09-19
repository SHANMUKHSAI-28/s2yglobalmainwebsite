const API_BASE_URL = import.meta.env.VITE_API_URL || '/api/pure';

/**
 * Official S2Y Pure live product catalog:
 * Only real active products from https://s2ypureserver.vercel.app/api/products
 */
export const FALLBACK_PRODUCTS = [
  {
    _id: '6a315b0e3f713c0aa97d71be',
    name: 'S2Y Pure Moringa Powder',
    slug: 's2y-pure-moringa-powder',
    category: 'leaf',
    tagline: '100% Pure & Organically Sourced Moringa Oleifera',
    shortDescription: 'Premium Moringa Powder made from carefully selected moringa leaves. Rich in vitamins, minerals, antioxidants, and plant-based nutrients to support energy, immunity, and overall vitality.',
    description: 'Experience the power of nature with S2Y Pure Moringa Powder. Our moringa is carefully sourced and processed to preserve its natural nutrients while delivering a premium wellness experience.\n\nWhy Choose S2Y Pure?\n✓ 100% Pure & Natural\n✓ No Artificial Additives\n✓ No Fillers\n✓ Rich in Vitamins & Minerals\n✓ Naturally Rich in Antioxidants\n✓ Supports Energy & Immunity\n✓ Premium Quality Packaging\n\nHow To Use:\n• Mix 1 teaspoon with water\n• Add to smoothies or juices\n• Blend into protein shakes\n• Use daily as part of a balanced diet.\n\nIngredients: 100% Pure Moringa Leaf Powder.\nStorage: Store in a cool and dry place away from direct sunlight.',
    benefits: [
      'Rich in Nutrients, Vitamin A, C & Iron',
      'Supports Natural Energy & Immunity',
      'Naturally Rich in Antioxidants',
      'Supports Daily Wellness & Digestion',
      '100% Pure & Natural with Zero Additives or Fillers'
    ],
    ingredients: '100% Pure Moringa Leaf Powder (Moringa oleifera)',
    howToUse: 'Mix one teaspoon daily with water, juice, smoothies, or protein shakes.',
    storageInstructions: 'Store in a cool and dry place away from direct sunlight.',
    shelfLife: '12 Months',
    manufacturedBy: 'S2Y Global Private Limited, Vijayawada, Andhra Pradesh, India',
    fssaiNumber: '10126020000333',
    featured: true,
    images: [
      'https://pub-e889185a379c437ba823f5d9976d6e5b.r2.dev/products/1781619547884-100g.png',
      'https://pub-e889185a379c437ba823f5d9976d6e5b.r2.dev/products/1781619309068-250g.png',
      'https://pub-e889185a379c437ba823f5d9976d6e5b.r2.dev/products/1781619353241-500g.png'
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
        image: 'https://pub-e889185a379c437ba823f5d9976d6e5b.r2.dev/products/1781619249059-100g.png',
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
        image: 'https://pub-e889185a379c437ba823f5d9976d6e5b.r2.dev/products/1781619309068-250g.png',
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
        image: 'https://pub-e889185a379c437ba823f5d9976d6e5b.r2.dev/products/1781619353241-500g.png',
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
      credentials: 'include',
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    if (data && data.success && Array.isArray(data.products) && data.products.length > 0) {
      return data.products;
    }
    return FALLBACK_PRODUCTS;
  } catch (err) {
    console.warn('[pureApi] Fetching products from live API failed, falling back to real catalogue:', err);
    return FALLBACK_PRODUCTS;
  }
}

export async function createOrder(orderPayload) {
  const res = await fetch(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    credentials: 'include',
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
    credentials: 'include',
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
    credentials: 'include',
    body: JSON.stringify(paymentPayload),
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || 'Payment verification failed');
  }
  return data;
}
