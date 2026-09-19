import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Leaf, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  CheckCircle2, 
  ShoppingBag, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp, 
  Award,
  Zap
} from 'lucide-react';
import SEO from '../components/SEO';
import SectionHeader from '../components/SectionHeader';
import TextReveal from '../components/TextReveal';
import { fetchProducts } from '../services/pureApi';
import { useCart } from '../context/CartContext';
import './PureStore.css';

const trustPillars = [
  {
    icon: <Leaf size={24} />,
    title: '100% Organically Sourced',
    desc: 'Direct from certified South Indian agricultural ecosystems without chemical fertilizers or pesticide residues.'
  },
  {
    icon: <Award size={24} />,
    title: 'Zero Additives or Fillers',
    desc: 'No artificial colorants, anti-caking chemicals, preservatives, or bulking starches. Just pure dehydrated leaf and produce.'
  },
  {
    icon: <ShieldCheck size={24} />,
    title: 'FSSAI Certified & Tested',
    desc: 'Manufactured by S2Y Global Private Limited under FSSAI License #10126020000333 with rigorous laboratory quality protocols.'
  },
  {
    icon: <Truck size={24} />,
    title: 'Pan-India Express Shipping',
    desc: 'Reliable doorstep delivery in 3 to 5 business days with live email tracking and free delivery for orders above ₹449.'
  }
];

const pureFaqs = [
  {
    q: 'How do I incorporate S2Y Pure Moringa Powder into my daily routine?',
    a: 'Mix 1 teaspoon (approx. 5 grams) into a glass of warm water, lemon water, fresh green smoothies, or herbal teas in the morning. It can also be sprinkled over salads, soups, or dal.'
  },
  {
    q: 'Are S2Y Pure products 100% natural and free of preservatives?',
    a: 'Yes. Every product from S2Y Pure contains exactly 100% pure dehydrated agricultural produce. We add zero preservatives, zero sugars, zero anti-caking agents, and zero synthetic food dyes.'
  },
  {
    q: 'What is the delivery timeline and shipping fee?',
    a: 'Orders are dispatched within 24–48 business hours. Delivery takes 3–5 business days for metro cities and 5–7 days for all other regions across India. Shipping is completely FREE on all orders of ₹449 or more (flat ₹59 for smaller orders).'
  },
  {
    q: 'Which payment methods are accepted on S2Y Global?',
    a: 'We securely accept all major digital payment methods via our verified Razorpay payment gateway, including UPI (Google Pay, PhonePe, Paytm, BHIM), Credit Cards, Debit Cards, and Net Banking.'
  },
  {
    q: 'What is your return and refund policy?',
    a: 'We provide a 7-day return and replacement window for any damaged, defective, or incorrect shipments. Refunds are processed within 5 to 7 business days directly to your original payment mode.'
  }
];

export default function PureStore() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVariants, setSelectedVariants] = useState({});
  const [openFaq, setOpenFaq] = useState(null);

  const { addItem, instantBuy } = useCart();

  useEffect(() => {
    let mounted = true;
    async function loadData() {
      try {
        const list = await fetchProducts();
        if (mounted) {
          setProducts(list);
          // Initialize default variant selection for each product
          const defaults = {};
          list.forEach((prod) => {
            const defaultVar = prod.weights?.find((w) => w.isDefault) || prod.weights?.[0];
            if (defaultVar) {
              defaults[prod._id] = defaultVar._id;
            }
          });
          setSelectedVariants(defaults);
        }
      } catch (err) {
        console.error('Failed to load products:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    loadData();
    return () => { mounted = false; };
  }, []);

  const handleSelectVariant = (productId, variantId) => {
    setSelectedVariants((prev) => ({ ...prev, [productId]: variantId }));
  };

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <main className="pure-store-page">
      <SEO 
        title="S2Y Pure — Premium Agricultural Derivatives & Superfoods"
        description="Shop pure, laboratory-tested Moringa Powder, Tomato Powder, and agricultural derivatives online from S2Y Global Private Limited. Accurate pricing, Razorpay secured checkout."
      />

      {/* Hero Banner */}
      <section className="pure-hero">
        <div className="container">
          <motion.div 
            className="pure-hero__inner"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="pure-hero__tag">
              <Leaf size={15} />
              <span>S2Y Global Vertical • Direct Farm Processing</span>
            </div>

            <h1 className="pure-hero__title">
              <TextReveal delay={0.1}>Pure Agricultural Derivatives. Concentrated Vitality.</TextReveal>
            </h1>

            <p className="pure-hero__subtitle">
              S2Y Pure transforms farm-fresh Indian produce into premium, lab-tested, nutrient-dense derivatives.
              100% natural, vacuum-dehydrated, and packaged with zero synthetic additives.
            </p>

            <div className="pure-hero__badges">
              <span className="pure-hero__badge-item">
                <CheckCircle2 size={16} style={{ color: 'var(--color-pure)' }} /> 100% Pure & Natural
              </span>
              <span className="pure-hero__badge-item">
                <ShieldCheck size={16} style={{ color: 'var(--color-pure)' }} /> FSSAI #10126020000333
              </span>
              <span className="pure-hero__badge-item">
                <Zap size={16} style={{ color: 'var(--color-pure)' }} /> Razorpay Verified Checkout
              </span>
              <span className="pure-hero__badge-item">
                <Truck size={16} style={{ color: 'var(--color-pure)' }} /> Free Shipping on ₹449+
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Product Catalog Section */}
      <section className="section pure-products-section">
        <div className="container">
          <SectionHeader
            label="Available Products & Transparent Pricing"
            title="Farm-Fresh Derivative Catalogue"
            subtitle="Select your preferred pack size and enjoy verified farm-gate purity delivered straight to your doorstep."
            center
          />

          <div className="pure-grid">
            {products.map((product) => {
              const activeVariantId = selectedVariants[product._id];
              const activeVariant = product.weights?.find((w) => w._id === activeVariantId) || product.weights?.[0];
              const discountPercent = activeVariant?.mrp && activeVariant?.price
                ? Math.round(((activeVariant.mrp - activeVariant.price) / activeVariant.mrp) * 100)
                : 0;

              return (
                <motion.article 
                  key={product._id} 
                  className="pure-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Image & Badges */}
                  <div className="pure-card__media">
                    <span className="pure-card__badge">
                      {activeVariant?.badgeText || '100% Pure'}
                    </span>
                    <span className="pure-card__stock-badge">
                      <CheckCircle2 size={12} /> In Stock
                    </span>
                    <img 
                      src={activeVariant?.image || product.images?.[0] || 'https://pub-e889185a379c437ba823f5d9976d6e5b.r2.dev/products/1781619547884-100g.png'} 
                      alt={product.name} 
                      className="pure-card__img"
                      loading="lazy"
                    />
                  </div>

                  {/* Content */}
                  <div className="pure-card__content">
                    <div className="pure-card__header">
                      <h3 className="pure-card__title">{product.name}</h3>
                      <p className="pure-card__tagline">{product.tagline || 'Premium Quality Extract'}</p>
                    </div>

                    <p className="pure-card__desc">
                      {product.shortDescription || product.description}
                    </p>

                    {/* Benefits Preview */}
                    {product.benefits && product.benefits.length > 0 && (
                      <div className="pure-card__benefits">
                        {product.benefits.slice(0, 3).map((benefit, i) => (
                          <div key={i} className="pure-card__benefit-item">
                            <CheckCircle2 size={14} style={{ color: 'var(--color-pure)', flexShrink: 0 }} />
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Weight / Pack Options */}
                    <div className="pure-card__weights-section">
                      <span className="pure-card__weights-label">Choose Pack Size:</span>
                      <div className="pure-card__weights-row">
                        {product.weights?.map((w) => (
                          <button
                            key={w._id}
                            type="button"
                            className={`pure-card__weight-btn ${activeVariant?._id === w._id ? 'pure-card__weight-btn--active' : ''}`}
                            onClick={() => handleSelectVariant(product._id, w._id)}
                          >
                            <span>{w.label}</span>
                            {w.badgeText && (
                              <span className="pure-card__weight-badge">{w.badgeText}</span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="pure-card__price-row">
                      <span className="pure-card__current-price">₹{activeVariant?.price}</span>
                      {activeVariant?.mrp > activeVariant?.price && (
                        <>
                          <span className="pure-card__mrp">MRP ₹{activeVariant.mrp}</span>
                          {discountPercent > 0 && (
                            <span className="pure-card__discount-tag">{discountPercent}% OFF</span>
                          )}
                        </>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="pure-card__actions">
                      <button 
                        className="pure-btn-buy"
                        onClick={() => instantBuy(product, activeVariant, 1)}
                      >
                        <Zap size={16} />
                        <span>Buy Now</span>
                      </button>
                      <button 
                        className="pure-btn-cart"
                        onClick={() => addItem(product, activeVariant, 1)}
                      >
                        <ShoppingBag size={16} />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust & Quality Pillars */}
      <section className="pure-trust-section">
        <div className="container">
          <SectionHeader
            label="Verified Standards"
            title="The S2Y Pure Purity Commitment"
            subtitle="From organic farm cultivation to airtight pharmaceutical packaging, every detail is engineered for maximum bio-availability."
            center
          />

          <div className="pure-trust-grid">
            {trustPillars.map((pillar, i) => (
              <div key={i} className="pure-trust-card">
                <div className="pure-trust-card__icon">{pillar.icon}</div>
                <h4>{pillar.title}</h4>
                <p>{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="section pure-faq-section">
        <div className="container">
          <SectionHeader
            label="Customer Inquiries"
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about our sourcing, usage recommendations, and ordering process."
            center
          />

          <div className="pure-faq-list">
            {pureFaqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="pure-faq-item"
                onClick={() => toggleFaq(idx)}
              >
                <div className="pure-faq-question">
                  <span>{faq.q}</span>
                  {openFaq === idx ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
                {openFaq === idx && (
                  <motion.div 
                    className="pure-faq-answer"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    {faq.a}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
