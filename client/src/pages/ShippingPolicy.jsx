import SEO from '../components/SEO';
import './Policy.css';

export default function ShippingPolicy() {
  return (
    <main className="policy-page">
      <SEO 
        title="Shipping & Delivery Policy | S2Y Global"
        description="Shipping timelines, delivery rates, and courier tracking information for S2Y Pure orders across India."
      />
      <div className="container">
        <article className="policy-card">
          <header className="policy-header">
            <span className="policy-tag">Order Fulfillment</span>
            <h1 className="policy-title">Shipping & Delivery Policy</h1>
            <p className="policy-date">Last Updated: September 19, 2026</p>
          </header>

          <div className="policy-content">
            <section className="policy-section">
              <h2>1. Shipping Coverage & Destination</h2>
              <p>
                <strong>S2Y Global Private Limited</strong> proudly ships its <strong>S2Y Pure</strong> natural agricultural derivatives 
                to all serviceable postal PIN codes across India. We partner with India's leading logistics providers, 
                including Delhivery, Blue Dart, DTDC, and India Post.
              </p>
            </section>

            <section className="policy-section">
              <h2>2. Order Processing & Dispatch Timelines</h2>
              <ul>
                <li>All orders placed before 2:00 PM IST on working days are processed on the same day.</li>
                <li>Orders placed on Sundays or national holidays are dispatched on the next business day.</li>
                <li>Standard packaging and dispatch time is <strong>1 to 2 business days</strong> following order and payment confirmation.</li>
              </ul>
            </section>

            <section className="policy-section">
              <h2>3. Estimated Delivery Times</h2>
              <div className="policy-highlight-box">
                <h4>Estimated Delivery Window Across India</h4>
                <ul>
                  <li><strong>Metro Cities (Tier 1):</strong> 3 to 5 business days.</li>
                  <li><strong>Rest of India (Tier 2 & 3):</strong> 5 to 7 business days.</li>
                  <li><strong>Remote or North-East Regions:</strong> 7 to 9 business days.</li>
                </ul>
              </div>
            </section>

            <section className="policy-section">
              <h2>4. Shipping Charges & Free Delivery Threshold</h2>
              <p>Shipping fees are automatically calculated at checkout according to order value:</p>
              <ul>
                <li><strong>Orders ₹449 and Above:</strong> <strong style={{ color: 'var(--color-pure)' }}>FREE Delivery</strong> across all serviceable PIN codes in India.</li>
                <li><strong>Orders Under ₹449:</strong> A nominal flat delivery fee of <strong>₹59</strong> is applied.</li>
              </ul>
            </section>

            <section className="policy-section">
              <h2>5. Order Tracking</h2>
              <p>
                As soon as your shipment is handed over to our courier partner, you will receive an automated dispatch email 
                containing the courier partner name, Tracking AWB Number, and a direct link to track your shipment in real time.
              </p>
            </section>

            <section className="policy-section">
              <h2>6. Damaged or Delayed Shipments</h2>
              <p>
                If your order does not arrive within 8 business days, or arrives with visible package damage, please contact us immediately 
                at <strong>support@s2ypure.com</strong> or call <strong>+91 90630 91887</strong>. We will coordinate with the courier 
                to resolve delays or promptly dispatch a free replacement.
              </p>
            </section>

            <div className="policy-merchant-box">
              <h3>Fulfillment & Shipping Inquiries</h3>
              <p><strong>Merchant:</strong> S2Y Global Private Limited</p>
              <p><strong>Fulfillment Center:</strong> Vijayawada, Andhra Pradesh, India</p>
              <p><strong>Helpline:</strong> +91 90630 91887</p>
              <p><strong>Email:</strong> support@s2ypure.com / contact@s2yglobal.com</p>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
