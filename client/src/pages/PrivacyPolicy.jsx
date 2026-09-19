import SEO from '../components/SEO';
import './Policy.css';

export default function PrivacyPolicy() {
  return (
    <main className="policy-page">
      <SEO 
        title="Privacy Policy | S2Y Global"
        description="Privacy policy of S2Y Global Private Limited regarding data collection, protection, and Razorpay payment security."
      />
      <div className="container">
        <article className="policy-card">
          <header className="policy-header">
            <span className="policy-tag">Data Protection & Privacy</span>
            <h1 className="policy-title">Privacy Policy</h1>
            <p className="policy-date">Last Updated: September 19, 2026</p>
          </header>

          <div className="policy-content">
            <section className="policy-section">
              <h2>1. Overview</h2>
              <p>
                At <strong>S2Y Global Private Limited</strong> ("we", "our", or "us"), your privacy and personal data security 
                are paramount. This Privacy Policy details how we collect, use, store, and safeguard your personal data when 
                you visit <strong>https://s2yglobal.vercel.app</strong> or make purchases from our <strong>S2Y Pure</strong> product line.
              </p>
            </section>

            <section className="policy-section">
              <h2>2. Information We Collect</h2>
              <p>When you browse our website or purchase S2Y Pure products, we collect the following personal information:</p>
              <ul>
                <li><strong>Contact Information:</strong> Full Name, Mobile Phone Number, and Email Address.</li>
                <li><strong>Delivery Details:</strong> Complete Shipping Address (House/Flat Number, Street, City, State, and PIN Code).</li>
                <li><strong>Order History:</strong> Product items ordered, quantities, order timestamps, and order identifiers.</li>
                <li><strong>Technical Data:</strong> IP address, device type, and browser details for fraud prevention and security verification.</li>
              </ul>
            </section>

            <section className="policy-section">
              <h2>3. Payment Security & Razorpay Integration</h2>
              <div className="policy-highlight-box">
                <h4>Encrypted Financial Transactions</h4>
                <p>
                  All payments on our platform are processed securely by <strong>Razorpay Payment Services</strong>. 
                  We never view, collect, or store your sensitive card details, CVVs, net banking credentials, or UPI PINs. 
                  Razorpay adheres to the highest level of PCI-DSS (Payment Card Industry Data Security Standard) Level 1 compliance.
                </p>
              </div>
            </section>

            <section className="policy-section">
              <h2>4. How We Use Your Information</h2>
              <p>We utilize the collected information strictly for legitimate business purposes:</p>
              <ul>
                <li>Fulfilling, packaging, and dispatching your S2Y Pure product orders.</li>
                <li>Sending order confirmation notifications, invoices, and shipment tracking links via email or SMS.</li>
                <li>Providing customer assistance and addressing inquiries or refund requests.</li>
                <li>Complying with statutory accounting and tax regulations in India.</li>
              </ul>
            </section>

            <section className="policy-section">
              <h2>5. Data Retention & Sharing</h2>
              <p>
                We do not sell, rent, or trade your personal information to third parties. Your data is shared only with trusted 
                logistics and payment partners strictly for completing order fulfillment and processing transactions.
              </p>
            </section>

            <section className="policy-section">
              <h2>6. Your Rights & Grievance Officer</h2>
              <p>
                You have the right to request access to the personal data we hold about you, or request correction or deletion 
                of your information, subject to legal record-keeping obligations.
              </p>
            </section>

            <div className="policy-merchant-box">
              <h3>Privacy Inquiries & Data Protection Contact</h3>
              <p><strong>Entity Name:</strong> S2Y Global Private Limited</p>
              <p><strong>Address:</strong> Vijayawada, Andhra Pradesh, India</p>
              <p><strong>Privacy Officer Email:</strong> support@s2ypure.com / contact@s2yglobal.com</p>
              <p><strong>Contact Phone:</strong> +91 90630 91887</p>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
