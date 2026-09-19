import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

const STORAGE_KEY = 's2y_global_cart';
const FREE_DELIVERY_THRESHOLD = 449;
const BASE_DELIVERY_FEE = 59;

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (err) {
      console.warn('Unable to persist cart:', err);
    }
  }, [cart]);

  const addItem = (product, variant, qty = 1) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (i) => i.productId === product._id && i.variantId === variant._id
      );
      if (existingIdx > -1) {
        const copy = [...prev];
        copy[existingIdx].quantity += qty;
        return copy;
      }
      return [
        ...prev,
        {
          productId: product._id,
          variantId: variant._id,
          productName: product.name,
          slug: product.slug,
          weight: variant.label,
          price: variant.price,
          mrp: variant.mrp || variant.price,
          image: variant.image || product.images?.[0] || '',
          quantity: qty,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const instantBuy = (product, variant, qty = 1) => {
    addItem(product, variant, qty);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const removeItem = (productId, variantId) => {
    setCart((prev) => prev.filter((i) => !(i.productId === productId && i.variantId === variantId)));
  };

  const updateQuantity = (productId, variantId, qty) => {
    if (qty <= 0) {
      removeItem(productId, variantId);
      return;
    }
    setCart((prev) =>
      prev.map((i) =>
        i.productId === productId && i.variantId === variantId ? { ...i, quantity: qty } : i
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryCharge = subtotal >= FREE_DELIVERY_THRESHOLD || cart.length === 0 ? 0 : BASE_DELIVERY_FEE;
  const total = subtotal + deliveryCharge;
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        addItem,
        instantBuy,
        removeItem,
        updateQuantity,
        clearCart,
        subtotal,
        deliveryCharge,
        total,
        totalItems,
        freeDeliveryThreshold: FREE_DELIVERY_THRESHOLD,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
