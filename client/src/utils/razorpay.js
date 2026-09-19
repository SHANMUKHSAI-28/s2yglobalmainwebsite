/**
 * Razorpay script loader and checkout initiator for S2Y Global / S2Y Pure
 */

const RAZORPAY_SCRIPT_URL = 'https://checkout.razorpay.com/v1/checkout.js';
const DEFAULT_KEY_ID = 'rzp_live_SQIywWcqoq6Ff1';

export function loadRazorpayScript() {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      return reject(new Error('Window not available'));
    }
    if (window.Razorpay) {
      return resolve(true);
    }
    const existing = document.querySelector(`script[src="${RAZORPAY_SCRIPT_URL}"]`);
    if (existing) {
      existing.addEventListener('load', () => resolve(true));
      existing.addEventListener('error', () => reject(new Error('Failed to load Razorpay SDK')));
      return;
    }
    const script = document.createElement('script');
    script.src = RAZORPAY_SCRIPT_URL;
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => reject(new Error('Failed to load Razorpay payment SDK'));
    document.body.appendChild(script);
  });
}

export async function openRazorpayCheckout({
  razorpay_order_id,
  amount,
  currency = 'INR',
  key,
  orderId,
  customerInfo = {},
  onSuccess,
  onFailure,
}) {
  await loadRazorpayScript();

  const activeKey = key || import.meta.env.VITE_RAZORPAY_KEY_ID || DEFAULT_KEY_ID;

  const options = {
    key: activeKey,
    amount,
    currency,
    name: 'S2Y Global — S2Y Pure',
    description: `Order #${orderId}`,
    image: 'https://pub-e889185a379c437ba823f5d9976d6e5b.r2.dev/products/1781619547884-100g.png',
    order_id: razorpay_order_id,
    prefill: {
      name: customerInfo.name || '',
      email: customerInfo.email || '',
      contact: customerInfo.phone || '',
    },
    notes: {
      orderId,
      source: 's2yglobal.vercel.app',
      brand: 'S2Y Pure',
    },
    theme: {
      color: '#84cc16', // S2Y Pure Vibrant Green
      backdrop_color: 'rgba(10, 10, 10, 0.85)',
    },
    modal: {
      confirm_close: true,
      ondismiss: () => {
        if (onFailure) {
          onFailure('Payment was cancelled by user. You can retry anytime.');
        }
      },
    },
    handler: (response) => {
      // response contains: razorpay_payment_id, razorpay_order_id, razorpay_signature
      if (onSuccess) {
        onSuccess(response);
      }
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.on('payment.failed', (response) => {
    const errorMsg = response?.error?.description || response?.error?.reason || 'Payment failed';
    if (onFailure) {
      onFailure(errorMsg);
    }
  });

  rzp.open();
}
