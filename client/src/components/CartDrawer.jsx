import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './CartDrawer.css';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    setIsCheckoutOpen,
    removeItem,
    updateQuantity,
    subtotal,
    deliveryCharge,
    total,
    totalItems,
    freeDeliveryThreshold,
  } = useCart();

  const navigate = useNavigate();

  const progressPercent = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));
  const remainingForFree = Math.max(0, freeDeliveryThreshold - subtotal);

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleBrowseProducts = () => {
    setIsCartOpen(false);
    navigate('/pure');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <motion.div
          className="cart-drawer__backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartOpen(false)}
        >
          <motion.div
            className="cart-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="cart-drawer__header">
              <div className="cart-drawer__title">
                <ShoppingBag size={20} className="text-pure" />
                <span>Your Cart</span>
                {totalItems > 0 && (
                  <span className="cart-drawer__badge">{totalItems} {totalItems === 1 ? 'item' : 'items'}</span>
                )}
              </div>
              <button
                className="cart-drawer__close"
                onClick={() => setIsCartOpen(false)}
                aria-label="Close cart"
              >
                <X size={18} />
              </button>
            </div>

            {/* Free Delivery Bar */}
            {cart.length > 0 && (
              <div className="cart-drawer__shipping-bar">
                <p className="cart-drawer__shipping-text">
                  {remainingForFree > 0 ? (
                    <>
                      Add <span className="cart-drawer__shipping-highlight">₹{remainingForFree}</span> more to unlock <span className="cart-drawer__shipping-highlight">FREE Delivery</span>!
                    </>
                  ) : (
                    <span className="cart-drawer__shipping-highlight">✓ You unlocked FREE Delivery across India!</span>
                  )}
                </p>
                <div className="cart-drawer__progress-track">
                  <div
                    className="cart-drawer__progress-fill"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            )}

            {/* Item List */}
            <div className="cart-drawer__items">
              {cart.length === 0 ? (
                <div className="cart-drawer__empty">
                  <div className="cart-drawer__empty-icon">
                    <ShoppingBag size={30} />
                  </div>
                  <p className="cart-drawer__empty-text">Your cart is currently empty</p>
                  <button className="cart-drawer__shop-btn" onClick={handleBrowseProducts}>
                    Explore S2Y Pure Products
                    <ArrowRight size={16} />
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={`${item.productId}-${item.variantId}`} className="cart-item">
                    <img
                      src={item.image || 'https://pub-e889185a379c437ba823f5d9976d6e5b.r2.dev/products/1781619547884-100g.png'}
                      alt={item.productName}
                      className="cart-item__thumb"
                    />
                    <div className="cart-item__details">
                      <div className="cart-item__header">
                        <div>
                          <h4 className="cart-item__name">{item.productName}</h4>
                          <span className="cart-item__weight">{item.weight}</span>
                        </div>
                        <button
                          className="cart-item__remove"
                          onClick={() => removeItem(item.productId, item.variantId)}
                          aria-label="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div className="cart-item__footer">
                        <div className="cart-item__pricing">
                          <span className="cart-item__price">₹{item.price}</span>
                          {item.mrp > item.price && (
                            <span className="cart-item__mrp">₹{item.mrp}</span>
                          )}
                        </div>

                        <div className="cart-item__qty">
                          <button
                            className="cart-item__qty-btn"
                            onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)}
                            aria-label="Decrease quantity"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="cart-item__qty-val">{item.quantity}</span>
                          <button
                            className="cart-item__qty-btn"
                            onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="cart-drawer__footer">
                <div className="cart-drawer__summary-row">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="cart-drawer__summary-row">
                  <span>Standard Delivery</span>
                  <span>{deliveryCharge === 0 ? <strong style={{ color: 'var(--color-pure)' }}>FREE</strong> : `₹${deliveryCharge}`}</span>
                </div>
                <div className="cart-drawer__summary-row cart-drawer__summary-row--total">
                  <span>Total Due</span>
                  <span style={{ color: 'var(--color-pure)' }}>₹{total}</span>
                </div>

                <button className="cart-drawer__checkout-btn" onClick={handleProceedToCheckout}>
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={18} />
                </button>

                <div className="cart-drawer__guarantee">
                  <span className="cart-drawer__guarantee-item">
                    <ShieldCheck size={14} style={{ color: 'var(--color-pure)' }} /> Razorpay Secured
                  </span>
                  <span>•</span>
                  <span className="cart-drawer__guarantee-item">
                    <Truck size={14} style={{ color: 'var(--color-pure)' }} /> 3-5 Days Delivery
                  </span>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
