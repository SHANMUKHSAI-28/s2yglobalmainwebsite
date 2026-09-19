import SEO from '../components/SEO';
import './Policy.css';

export default function RefundPolicy() {
  return (
    <main className="policy-page">
      <SEO 
        title="Cancellation & Refund Policy | S2Y Global"
        description="Cancellation, return and refund policy for orders placed on S2Y Global and S2Y Pure products."
      />
      <div className="container">
        <article className="policy-card">
          <header className="policy-header">
            <span className="policy-tag">Customer Assurance</span>
            <h1 className="policy-title">Cancellation & Refund Policy</h1>
            <p className="policy-date">Last Updated: September 19, 2026</p>
          </header>

          <div className="policy-content">
            <section className="policy-section">
              <h2>1. Order Cancellation Policy</h2>
              <p>
                You can request cancellation of your order at any time before it has been dispatched from our fulfillment facility.
              </p>
              <ul>
                <li>
                  <strong>Before Dispatch:</strong> To cancel an order before dispatch, please email 
                  <strong> support@s2ypure.com</strong> or call <strong>+91 90630 91887</strong> with your Order ID (e.g., S2Y-XXXX-XXXXXX). 
                  Upon confirmation of cancellation, a 100% full refund will be initiated immediately.
                </li>
                <li>
                  <strong>After Dispatch:</strong> Once an order has shipped and handed over to our courier partner, 
                  it cannot be cancelled in transit. You may instead request a return upon delivery in accordance with our return guidelines below.
                </li>
              </ul>
            </section>

            <section className="policy-section">
              <h2>2. Return & Replacement Window (7 Days)</h2>
              <p>
                Due to the natural and consumable nature of <strong>S2Y Pure</strong> agricultural products (such as Moringa Powder 
                and dehydrated powders), returns are accepted under the following conditions:
              </p>
              <div className="policy-highlight-box">
                <h4>Eligible Return Scenarios</h4>
                <ul>
                  <li>Item arrived physically damaged or leaking during transit.</li>
                  <li>Package seal was broken or tampered with at the time of delivery.</li>
                  <li>Incorrect product or variant received compared to your placed order.</li>
                  <li>Verified quality anomaly or defect within 7 days of delivery.</li>
                </ul>
              </div>
              <p>
                To initiate a return or replacement, please notify us within <strong>7 days</strong> of delivery with your Order ID 
                and clear photographs or video of the parcel and item.
              </p>
            </section>

            <section className="policy-section">
              <h2>3. Refund Process & Timelines</h2>
              <p>
                Once your return is received and inspected (or photo verification is approved by our quality control team):
              </p>
              <ul>
                <li>We will send you an email confirmation approving your refund.</li>
                <li>
                  The refund will be credited directly to the <strong>original method of payment</strong> used during checkout 
                  (UPI, Credit/Debit Card, or Net Banking) via our Razorpay payment gateway.
                </li>
                <li>
                  <strong>Timeline:</strong> Please allow <strong>5 to 7 business days</strong> for the refunded amount to reflect 
                  in your bank account or card statement, depending on your bank's processing cycles.
                </li>
              </ul>
            </section>

            <section className="policy-section">
              <h2>4. Non-Refundable Situations</h2>
              <p>Refunds will not be issued in cases where:</p>
              <ul>
                <li>The product was completely consumed, opened, or altered without evidence of defect.</li>
                <li>The return request was raised after the 7-day post-delivery eligibility window.</li>
                <li>An incorrect shipping address or non-contactable phone number was provided, resulting in repeated failed delivery attempts.</li>
              </ul>
            </section>

            <div className="policy-merchant-box">
              <h3>Help & Refund Inquiries</h3>
              <p><strong>Merchant:</strong> S2Y Global Private Limited</p>
              <p><strong>Support Email:</strong> support@s2ypure.com / contact@s2yglobal.com</p>
              <p><strong>Direct Helpline:</strong> +91 90630 91887</p>
              <p><strong>Operational Address:</strong> Vijayawada, Andhra Pradesh, India</p>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
