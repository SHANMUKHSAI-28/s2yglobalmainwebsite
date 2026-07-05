import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { 
  Truck, ShoppingCart, Warehouse, Users, 
  Leaf, Globe, Package, FlaskConical,
  MessageCircle, Shield, Phone, Sparkles,
  ArrowRight
} from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import Button from '../components/Button';
import TiltCard from '../components/TiltCard';
import GlowDivider from '../components/GlowDivider';
import MagneticButton from '../components/MagneticButton';
import TextReveal from '../components/TextReveal';
import SpotlightCard from '../components/SpotlightCard';
import GradientBorder from '../components/GradientBorder';
import Marquee from '../components/Marquee';
import './Portfolio.css';

const containerVar = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const itemVar = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const brands = [
  {
    id: 'fresh',
    name: 'S2Y Fresh',
    tagline: 'Integrated Food, Grocery & Supply Chain Platform',
    color: 'var(--color-fresh)',
    bgGrad: 'rgba(34, 197, 94, 0.05)',
    borderColor: 'rgba(34, 197, 94, 0.15)',
    description: 'S2Y Fresh is building a vertically integrated food and grocery delivery platform with proprietary micro supply chain infrastructure. Our vendor-first economics model ensures sustainable growth for all stakeholders.',
    features: [
      { icon: <Truck size={20} />, title: 'Food Delivery', desc: 'Fast, reliable food delivery powered by optimized logistics.' },
      { icon: <ShoppingCart size={20} />, title: 'Grocery Delivery', desc: 'Fresh groceries delivered with full supply chain visibility.' },
      { icon: <Warehouse size={20} />, title: 'S2Y Hubs', desc: 'Micro supply chain infrastructure nodes for last-mile efficiency.' },
      { icon: <Users size={20} />, title: 'Vendor-First Economics', desc: 'Fair, sustainable economics that empower local vendors.' },
    ],
    status: 'Early-stage development',
  },
  {
    id: 'pure',
    name: 'S2Y Pure',
    tagline: 'Premium Dry Leaf & Agricultural Derivatives Brand',
    color: 'var(--color-pure)',
    bgGrad: 'rgba(132, 204, 22, 0.05)',
    borderColor: 'rgba(132, 204, 22, 0.15)',
    description: 'S2Y Pure transforms high-quality Indian agricultural produce into premium, export-ready derivatives. Our value-added processing unlocks significant margin potential while supporting farmer ecosystems.',
    features: [
      { icon: <FlaskConical size={20} />, title: 'Tomato Powder', desc: 'High-quality dehydrated tomato products for domestic and export markets.' },
      { icon: <Leaf size={20} />, title: 'Moringa Powder', desc: 'Premium moringa leaf derivatives with verified sourcing.' },
      { icon: <Globe size={20} />, title: 'Export Potential', desc: 'Positioned for international markets with quality certifications.' },
      { icon: <Package size={20} />, title: 'Value-Added Processing', desc: 'Advanced processing techniques that maximize agricultural value.' },
    ],
    status: 'Pre-scale phase',
  },
  {
    id: 'glimpzo',
    name: 'Glimpzo',
    tagline: 'Privacy-First Social Platform',
    color: 'var(--color-glimpzo)',
    bgGrad: 'rgba(139, 92, 246, 0.05)',
    borderColor: 'rgba(139, 92, 246, 0.15)',
    description: 'Glimpzo is an early-stage social ecosystem focused on trust, privacy, and long-term creator visibility. Built with encrypted communication at its core, Glimpzo prioritizes user sovereignty over attention extraction.',
    features: [
      { icon: <Shield size={20} />, title: 'Encrypted Messaging', desc: 'End-to-end encryption as a default, not a premium feature.' },
      { icon: <MessageCircle size={20} />, title: 'Social Discovery', desc: 'Meaningful connections through trust-based social graph.' },
      { icon: <Phone size={20} />, title: 'Native Calling', desc: 'Built-in calling infrastructure — no third-party dependencies.' },
      { icon: <Sparkles size={20} />, title: 'Creator-First Ecosystem', desc: 'Early ecosystem designed to elevate authentic creators.' },
    ],
    status: 'Pre-network-effect stage',
    positioning: 'Glimpzo is designed for a world where users demand ownership of their digital identity. We are not building another attention marketplace — we are building communication infrastructure rooted in trust.',
  },
];

export default function Portfolio() {
  return (
    <main className="portfolio-page">
      <SEO 
        title="Companies | S2Y Global"
        description="Explore S2Y Global's portfolio of companies: S2Y Fresh, S2Y Pure, and Glimpzo."
      />
      <section className="section portfolio-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="section-label">Our Portfolio</p>
            <h1 className="section-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
              <TextReveal delay={0.2}>Three Verticals. One Integrated Vision.</TextReveal>
            </h1>
            <p className="section-subtitle" style={{ maxWidth: '700px' }}>
              Each company in the S2Y ecosystem operates independently while contributing to a
              unified infrastructure layer — creating compounding value across food, agriculture,
              and digital communication.
            </p>
          </motion.div>
        </div>
      </section>

      {brands.map((brand, idx) => (
        <section
          key={brand.id}
          id={brand.id}
          className="section portfolio-brand"
          style={{ background: idx % 2 === 1 ? 'var(--color-gray-900)' : 'var(--color-black)' }}
        >
          <div className="container">
            <motion.div
              className="portfolio-brand__header"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="portfolio-brand__tag" style={{ color: brand.color }}>
                {brand.name}
              </span>
              <h2 className="portfolio-brand__title">{brand.tagline}</h2>
              <p className="portfolio-brand__desc">{brand.description}</p>
              <span className="portfolio-brand__status" style={{ borderColor: brand.borderColor, color: brand.color }}>
                {brand.status}
              </span>
            </motion.div>

            <motion.div
              className="portfolio-brand__features"
              variants={containerVar}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {brand.features.map((f, i) => (
                <motion.div
                  key={i}
                  variants={itemVar}
                  style={{ '--brand-color': brand.color, '--brand-bg': brand.bgGrad, '--brand-border': brand.borderColor }}
                >
                  <TiltCard className="portfolio-feature">
                    <div className="portfolio-feature__icon">{f.icon}</div>
                    <h4>{f.title}</h4>
                    <p>{f.desc}</p>
                  </TiltCard>
                </motion.div>
              ))}
            </motion.div>

            {brand.positioning && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <GradientBorder>
                  <div className="portfolio-brand__positioning" style={{ borderColor: brand.borderColor }}>
                    <p>{brand.positioning}</p>
                  </div>
                </GradientBorder>
              </motion.div>
            )}
          </div>
        </section>
      ))}

      <Marquee
        items={['Food Delivery', 'Grocery Delivery', 'S2Y Hubs', 'Tomato Powder', 'Moringa Powder', 'Encrypted Messaging', 'Social Discovery', 'Native Calling', 'Creator Economy']}
        speed={38}
        separator="◆"
      />

      <section className="section">
        <div className="container text-center">
          <SectionHeader
            label="Ecosystem Synergy"
            title="Stronger Together"
            subtitle="Our portfolio companies share infrastructure, data insights, and operational learnings — creating a compounding advantage that isolated companies cannot replicate."
            center
          />
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem', flexWrap: 'wrap' }}>
            <MagneticButton><Button to="/philosophy" variant="primary" icon>Our Philosophy</Button></MagneticButton>
            <MagneticButton><Button to="/contact" variant="secondary" icon>Partner With Us</Button></MagneticButton>
          </div>
        </div>
      </section>
    </main>
  );
}
