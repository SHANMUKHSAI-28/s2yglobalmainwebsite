import SEO from '../components/SEO';
import './Policy.css';

export default function Terms() {
  return (
    <main className="policy-page">
      <SEO 
        title="Terms & Conditions | S2Y Global"
        description="Terms and conditions for S2Y Global Private Limited and S2Y Pure e-commerce platform and services."
      />
      <div className="container">
        <article className="policy-card">
          <header className="policy-header">
            <span className="policy-tag">Legal & Compliance</span>
            <h1 className="policy-title">Terms & Conditions</h1>
            <p className="policy-date">Last Updated: September 19, 2026</p>
          </header>

          <div className="policy-content">
            <section className="policy-section">
              <h2>1. Introduction & Acceptance of Terms</h2>
              <p>
                Welcome to S2Y Global (<strong>https://s2yglobal.vercel.app</strong>), owned and operated by 
                <strong> S2Y Global Private Limited</strong>, having its registered corporate office at Vijayawada, 
                Andhra Pradesh, India.
              </p>
              <p>
                By accessing our website, browsing our portfolio, or purchasing products (including our agricultural derivative line 
                <strong> S2Y Pure</strong>), you agree to be bound by these Terms and Conditions, our Privacy Policy, 
                and all applicable laws of the Republic of India.
              </p>
            </section>

            <section className="policy-section">
              <h2>2. Product Information & Pricing</h2>
              <p>
                We strive to ensure all product descriptions, ingredient listings, specifications, and nutritional information 
                for <strong>S2Y Pure</strong> products (such as Moringa Powder, Tomato Powder, and agricultural derivatives) are 
                accurate.
              </p>
              <div className="policy-highlight-box">
                <h4>Pricing Currency & Taxes</h4>
                <p>
                  All prices listed on this website are denominated in <strong>Indian Rupees (₹ INR)</strong>. Prices are inclusive 
                  of applicable Goods and Services Tax (GST) unless explicitly stated otherwise. We reserve the right to revise prices 
                  or promotional offers at any time prior to order confirmation.
                </p>
              </div>
            </section>

            <section className="policy-section">
              <h2>3. Orders & Payment Processing</h2>
              <p>
                When you place an order through our website, you agree to provide complete, accurate, and valid contact and shipping 
                information.
              </p>
              <p>
                All online payments on this website are securely processed through our authorized payment partner, 
                <strong> Razorpay</strong>. Accepted payment instruments include:
              </p>
              <ul>
                <li>Unified Payments Interface (UPI) — Google Pay, PhonePe, Paytm, BHIM</li>
                <li>Credit Cards & Debit Cards (Visa, MasterCard, RuPay, Maestro)</li>
                <li>Net Banking across all major Indian banks</li>
              </ul>
              <p>
                We do not store your card details, UPI PINs, or net banking passwords on our servers. All sensitive financial 
                transmissions are encrypted and secured in accordance with PCI-DSS standards.
              </p>
            </section>

            <section className="policy-section">
              <h2>4. Shipping, Cancellation & Refunds</h2>
              <p>
                Product delivery timelines and shipping charges are governed by our <a href="/shipping-policy" style={{ color: 'var(--color-pure)' }}>Shipping & Delivery Policy</a>.
              </p>
              <p>
                Order cancellations and refund requests are governed by our <a href="/refund-policy" style={{ color: 'var(--color-pure)' }}>Cancellation & Refund Policy</a>.
              </p>
            </section>

            <section className="policy-section">
              <h2>5. Intellectual Property Rights</h2>
              <p>
                All trademarks, trade names, brand logos (including S2Y Global, S2Y Pure, S2Y Fresh, and Glimpzo), text, 
                graphics, and software code are the exclusive intellectual property of S2Y Global Private Limited. Unauthorized 
                copying, redistribution, or commercial use is strictly prohibited.
              </p>
            </section>

            <section className="policy-section">
              <h2>6. Governing Law & Jurisdiction</h2>
              <p>
                These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any legal dispute, 
                claim, or proceeding arising out of or related to these Terms or transactions on this website shall be subject to the 
                exclusive jurisdiction of the courts in Vijayawada, Andhra Pradesh, India.
              </p>
            </section>

            <div className="policy-merchant-box">
              <h3>Merchant & Grievance Redressal Contact</h3>
              <p><strong>Company Name:</strong> S2Y Global Private Limited</p>
              <p><strong>Address:</strong> Vijayawada, Andhra Pradesh, India</p>
              <p><strong>Support Email:</strong> support@s2ypure.com / contact@s2yglobal.com</p>
              <p><strong>Phone:</strong> +91 90630 91887</p>
              <p><strong>Support Hours:</strong> Monday – Saturday, 9:00 AM – 6:00 PM IST</p>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
