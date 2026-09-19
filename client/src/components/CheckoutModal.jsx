import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, CheckCircle2, ArrowRight, ArrowLeft, Loader2, AlertCircle, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { createOrder, createRazorpayOrder, verifyPayment } from '../services/pureApi';
import { openRazorpayCheckout } from '../utils/razorpay';
import './CheckoutModal.css';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu & Kashmir', 'Ladakh', 'Puducherry', 'Chandigarh'
];

export default function CheckoutModal() {
  const {
    cart,
    isCheckoutOpen,
    setIsCheckoutOpen,
    subtotal,
    deliveryCharge,
    total,
    clearCart,
  } = useCart();

  const { user, setAuth } = useAuth();

  const [step, setStep] = useState(1); // 1 = Address, 2 = Review & Pay, 3 = Confirmed
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    line1: '',
    line2: '',
    city: '',
    state: 'Andhra Pradesh',
    pincode: '',
  });

  useEffect(() => {
    if (user) {
      const defaultAddr = user.addresses?.find((a) => a.isDefault) || user.addresses?.[0];
      setFormData((prev) => ({
        ...prev,
        name: prev.name || user.name || '',
        email: prev.email || user.email || '',
        phone: prev.phone || user.phone || '',
        line1: prev.line1 || defaultAddr?.line1 || '',
        line2: prev.line2 || defaultAddr?.line2 || '',
        city: prev.city || defaultAddr?.city || '',
        state: prev.state || defaultAddr?.state || 'Andhra Pradesh',
        pincode: prev.pincode || defaultAddr?.pincode || '',
      }));
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateAddress = () => {
    if (!formData.name.trim()) return 'Please enter your full name';
    if (!formData.email.trim() || !formData.email.includes('@')) return 'Please enter a valid email address';
    if (!formData.phone.trim() || formData.phone.replace(/\D/g, '').length < 10) return 'Please enter a valid 10-digit phone number';
    if (!formData.line1.trim()) return 'Please enter house/flat/building number and street';
    if (!formData.city.trim()) return 'Please enter your city';
    if (!formData.state) return 'Please select your state';
    if (!formData.pincode.trim() || formData.pincode.replace(/\D/g, '').length !== 6) return 'Please enter a valid 6-digit PIN code';
    return null;
  };

  const handleProceedToReview = (e) => {
    e.preventDefault();
    const error = validateAddress();
    if (error) {
      setErrorMessage(error);
      return;
    }
    setErrorMessage('');
    setStep(2);
  };

  const handlePayment = async () => {
    setLoading(true);
    setErrorMessage('');

    try {
      // 1. Prepare Order Payload for S2Y Pure Backend
      const itemsPayload = cart.map((item) => ({
        productId: item.productId,
        variantId: item.variantId,
        quantity: item.quantity,
      }));

      const addressPayload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        line1: formData.line1.trim(),
        line2: formData.line2.trim() || '',
        city: formData.city.trim(),
        state: formData.state,
        pincode: formData.pincode.trim(),
      };

      // 2. Call backend /api/orders
      const orderResult = await createOrder({
        items: itemsPayload,
        address: addressPayload,
        paymentMethod: 'upi', // Default prepaid method
      });

      const serverOrderId = orderResult.order?.orderId;
      if (!serverOrderId) {
        throw new Error('Could not retrieve order ID from server');
      }

      // 3. Initiate Razorpay Order via /api/payment/create-order
      const payData = await createRazorpayOrder(serverOrderId);

      // 4. Open Razorpay Checkout modal
      await openRazorpayCheckout({
        razorpay_order_id: payData.razorpay_order_id,
        amount: payData.amount,
        currency: payData.currency || 'INR',
        key: payData.key,
        orderId: serverOrderId,
        customerInfo: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        },
        onSuccess: async (paymentResponse) => {
          try {
            // 5. Verify payment on server
            const verifyResult = await verifyPayment(paymentResponse);
            if (verifyResult?.user) {
              setAuth(verifyResult.user);
            }
            setConfirmedOrder({
              orderId: serverOrderId,
              total,
              customer: formData,
              items: [...cart],
            });
            clearCart();
            setStep(3); // Show confirmed state
          } catch (verifyErr) {
            setErrorMessage(verifyErr.message || 'Payment received, but verification failed. Support will verify your order.');
          } finally {
            setLoading(false);
          }
        },
        onFailure: (failureMsg) => {
          setLoading(false);
          setErrorMessage(failureMsg || 'Payment was not completed. You can retry.');
        },
      });
    } catch (err) {
      console.error('[Checkout] Error:', err);
      setErrorMessage(err.message || 'An error occurred while creating your order. Please check all details and try again.');
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (step === 3) {
      setConfirmedOrder(null);
      setStep(1);
    }
    setIsCheckoutOpen(false);
  };

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <motion.div
          className="checkout-modal__backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            className="checkout-modal"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="checkout-modal__header">
              <div className="checkout-modal__title">
                <ShieldCheck size={22} style={{ color: 'var(--color-pure)' }} />
                <span>
                  {step === 3 ? 'Order Confirmed' : 'Secure Checkout — S2Y Pure'}
                </span>
              </div>
              <button className="checkout-modal__close" onClick={handleClose} aria-label="Close">
                <X size={18} />
              </button>
            </div>

            {/* Steps Indicator */}
            {step < 3 && (
              <div className="checkout-steps">
                <div className={`checkout-step ${step === 1 ? 'checkout-step--active' : ''}`}>
                  <span className="checkout-step__num">1</span>
                  <span>Shipping Address</span>
                </div>
                <div className={`checkout-step ${step === 2 ? 'checkout-step--active' : ''}`}>
                  <span className="checkout-step__num">2</span>
                  <span>Payment & Review</span>
                </div>
              </div>
            )}

            {/* Modal Body */}
            <div className="checkout-modal__body">
              {errorMessage && (
                <div className="checkout-error" style={{ marginBottom: '1.25rem' }}>
                  <AlertCircle size={18} />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* STEP 1: Address Information */}
              {step === 1 && (
                <form id="checkout-address-form" onSubmit={handleProceedToReview} className="checkout-form">
                  <div className="checkout-grid-2">
                    <div className="form-field">
                      <label htmlFor="name">Full Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g. Shanmukh Sai"
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor="phone">Mobile Phone (10 digits) *</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g. 9063091887"
                        maxLength={10}
                      />
                    </div>
                  </div>

                  <div className="form-field">
                    <label htmlFor="email">Email Address (for invoice & tracking) *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. yourname@example.com"
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="line1">Flat, House No., Building Name *</label>
                    <input
                      type="text"
                      id="line1"
                      name="line1"
                      value={formData.line1}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. Flat 302, Green Meadows"
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="line2">Street, Area, Landmark (Optional)</label>
                    <input
                      type="text"
                      id="line2"
                      name="line2"
                      value={formData.line2}
                      onChange={handleInputChange}
                      placeholder="e.g. Near Benz Circle"
                    />
                  </div>

                  <div className="checkout-grid-2">
                    <div className="form-field">
                      <label htmlFor="city">City / Town *</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g. Vijayawada"
                      />
                    </div>

                    <div className="form-field">
                      <label htmlFor="state">State *</label>
                      <select
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                      >
                        {INDIAN_STATES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="checkout-grid-2">
                    <div className="form-field">
                      <label htmlFor="pincode">PIN Code (6 digits) *</label>
                      <input
                        type="text"
                        id="pincode"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g. 520001"
                        maxLength={6}
                      />
                    </div>
                  </div>
                </form>
              )}

              {/* STEP 2: Order Review & Razorpay Trigger */}
              {step === 2 && (
                <div>
                  <h4 style={{ fontSize: '1rem', color: '#fff', marginBottom: '0.75rem', fontWeight: 600 }}>
                    Review Items & Delivery Details
                  </h4>

                  <div className="checkout-summary-box">
                    {cart.map((item) => (
                      <div key={`${item.productId}-${item.variantId}`} className="checkout-summary-item">
                        <span>{item.productName} ({item.weight}) × {item.quantity}</span>
                        <span style={{ fontWeight: 600 }}>₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                    <div className="checkout-summary-item" style={{ paddingTop: '0.4rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                      <span>Subtotal</span>
                      <span>₹{subtotal}</span>
                    </div>
                    <div className="checkout-summary-item">
                      <span>Standard Shipping</span>
                      <span>{deliveryCharge === 0 ? <span style={{ color: 'var(--color-pure)', fontWeight: 600 }}>FREE</span> : `₹${deliveryCharge}`}</span>
                    </div>
                    <div className="checkout-summary-item checkout-summary-total">
                      <span>Total Amount</span>
                      <span style={{ color: 'var(--color-pure)' }}>₹{total}</span>
                    </div>
                  </div>

                  <div style={{ marginTop: '1.25rem', padding: '0.9rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', fontSize: '0.84rem' }}>
                    <span style={{ color: 'var(--color-gray-400)', display: 'block', marginBottom: '0.25rem' }}>Shipping To:</span>
                    <strong style={{ color: '#fff' }}>{formData.name}</strong>, {formData.phone}
                    <div style={{ color: 'var(--color-gray-300)', marginTop: '0.2rem' }}>
                      {formData.line1}, {formData.line2 ? `${formData.line2}, ` : ''}{formData.city}, {formData.state} - {formData.pincode}
                    </div>
                  </div>

                  {/* Razorpay Trust Box */}
                  <div className="razorpay-secure-card">
                    <div className="razorpay-secure-card__icon">
                      <ShieldCheck size={24} />
                    </div>
                    <div className="razorpay-secure-card__text">
                      <h5>Razorpay Payment Gateway</h5>
                      <p>
                        Safe, encrypted instant payments via UPI (Google Pay, PhonePe, Paytm), Credit/Debit Cards, and Net Banking.
                      </p>
                    </div>
                  </div>

                  <p className="checkout-legal-disclaimer">
                    By confirming this order, you accept S2Y Global Private Limited's{' '}
                    <a href="/terms" target="_blank" rel="noreferrer">Terms of Service</a>,{' '}
                    <a href="/privacy" target="_blank" rel="noreferrer">Privacy Policy</a>, and{' '}
                    <a href="/refund-policy" target="_blank" rel="noreferrer">Cancellation & Refund Policy</a>.
                  </p>
                </div>
              )}

              {/* STEP 3: Order Confirmed */}
              {step === 3 && confirmedOrder && (
                <div className="order-success-screen">
                  <div className="order-success-icon">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3>Thank You for Your Order!</h3>
                  <p style={{ color: 'var(--color-gray-300)', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
                    Your payment was successfully processed. A confirmation has been logged with S2Y Pure.
                  </p>
                  <span className="order-success-orderid">Order ID: {confirmedOrder.orderId}</span>

                  <div className="order-success-details">
                    <div><strong>Customer:</strong> {confirmedOrder.customer.name} ({confirmedOrder.customer.phone})</div>
                    <div><strong>Email:</strong> {confirmedOrder.customer.email}</div>
                    <div><strong>Delivery To:</strong> {confirmedOrder.customer.line1}, {confirmedOrder.customer.city}, {confirmedOrder.customer.state} - {confirmedOrder.customer.pincode}</div>
                    <div><strong>Estimated Delivery:</strong> 3 to 5 business days</div>
                    <div><strong>Payment Method:</strong> Prepaid via Razorpay (Amount Paid: ₹{confirmedOrder.total})</div>
                  </div>

                  <button className="checkout-btn-pay" onClick={handleClose}>
                    <span>Continue Browsing</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            {step < 3 && (
              <div className="checkout-modal__footer">
                {step === 2 ? (
                  <button className="checkout-btn-back" onClick={() => setStep(1)} disabled={loading}>
                    <ArrowLeft size={16} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                    Edit Address
                  </button>
                ) : (
                  <div />
                )}

                {step === 1 ? (
                  <button
                    type="submit"
                    form="checkout-address-form"
                    className="checkout-btn-pay"
                  >
                    <span>Continue to Review</span>
                    <ArrowRight size={16} />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handlePayment}
                    className="checkout-btn-pay"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Processing Payment...</span>
                      </>
                    ) : (
                      <>
                        <span>Pay ₹{total} via Razorpay</span>
                        <ShieldCheck size={16} />
                      </>
                    )}
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
