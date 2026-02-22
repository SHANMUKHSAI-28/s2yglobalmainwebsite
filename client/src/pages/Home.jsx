import { motion } from 'framer-motion';
import { ArrowRight, Building2, Leaf, Smartphone, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import SectionHeader from '../components/SectionHeader';
import ParticleField from '../components/ParticleField';
import './Home.css';

const portfolioCards = [
  {
    icon: <Building2 size={28} />,
    tag: 'S2Y Fresh',
    color: 'var(--color-fresh)',
    title: 'Integrated Food, Grocery & Supply Chain Platform',
    description: 'Food delivery, grocery delivery, S2Y Hubs (micro supply chain infrastructure), and vendor-first economics.',
    link: '/portfolio#fresh',
  },
  {
    icon: <Leaf size={28} />,
    tag: 'S2Y Pure',
    color: 'var(--color-pure)',
    title: 'Premium Dry Leaf & Agricultural Derivatives Brand',
    description: 'Tomato powder, moringa powder, export potential, and value-added agri processing for global markets.',
    link: '/portfolio#pure',
  },
  {
    icon: <Smartphone size={28} />,
    tag: 'Glimpzo',
    color: 'var(--color-glimpzo)',
    title: 'Privacy-First Social Platform',
    description: 'Encrypted messaging, social discovery, native calling infrastructure, and a creator-first early ecosystem.',
    link: '/portfolio#glimpzo',
  },
];

const stats = [
  { value: '3', label: 'Portfolio Companies' },
  { value: 'Multi', label: 'Sector Focus' },
  { value: '2025', label: 'Year Founded' },
  { value: 'AP', label: 'Headquartered' },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};

export default function Home() {
  return (
    <main>
      {/* ===== HERO ===== */}
      <section className="hero">
        <ParticleField />
        <div className="hero__gradient" />
        <div className="container hero__content">
          <motion.div
            className="hero__text"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.p
              className="hero__label"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              S2Y Global Private Limited
            </motion.p>
            <h1 className="hero__title">
              Building Integrated Digital &amp; Food{' '}
              <span className="hero__title-accent">Ecosystems</span>{' '}
              for the Future of India
            </h1>
            <p className="hero__subtitle">
              From food supply chains to privacy-focused social platforms, S2Y Global builds
              high-trust systems designed for scale.
            </p>
            <div className="hero__cta">
              <Button to="/portfolio" variant="primary" icon>
                Explore Our Ecosystem
              </Button>
              <Button to="/about" variant="secondary" icon>
                Our Companies
              </Button>
              <Button to="/contact" variant="outline-gold">
                Partner With Us
              </Button>
            </div>
          </motion.div>
        </div>
        <motion.div
          className="hero__scroll"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <ChevronDown size={24} className="hero__scroll-icon" />
        </motion.div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="stats-bar">
        <div className="container">
          <motion.div
            className="stats-bar__grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stats.map((stat, i) => (
              <motion.div key={i} className="stats-bar__item" variants={itemVariants}>
                <span className="stats-bar__value">{stat.value}</span>
                <span className="stats-bar__label">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== ABOUT PREVIEW ===== */}
      <section className="section home-about">
        <div className="container">
          <div className="home-about__grid">
            <motion.div
              className="home-about__left"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="section-label">About S2Y Global</p>
              <h2 className="section-title">
                A Technology Holding Company Building Integrated Infrastructure Platforms
              </h2>
              <p className="section-subtitle">
                Founded on 16 September 2025 in Vijayawada, Andhra Pradesh, S2Y Global is a
                founder-led, multi-vertical technology company building integrated infrastructure
                platforms across food systems and digital ecosystems.
              </p>
              <p className="home-about__note">
                We operate with the discipline of institutional infrastructure — not the velocity of
                venture-backed speculation.
              </p>
              <Button to="/about" variant="outline-gold" icon>
                Learn More About Us
              </Button>
            </motion.div>
            <motion.div
              className="home-about__right"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="home-about__features">
                {[
                  { title: 'Founder-Led', desc: 'Long-term vision over short-term metrics' },
                  { title: 'Multi-Sector', desc: 'Food, agriculture, and digital infrastructure' },
                  { title: 'Integrated', desc: 'Vertical integration across portfolio' },
                  { title: 'Trust-Driven', desc: 'High-trust systems designed for scale' },
                ].map((f, i) => (
                  <motion.div
                    key={i}
                    className="home-about__feature"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <div className="home-about__feature-dot" />
                    <div>
                      <h4>{f.title}</h4>
                      <p>{f.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== PORTFOLIO PREVIEW ===== */}
      <section className="section portfolio-preview">
        <div className="container">
          <SectionHeader
            label="Our Portfolio"
            title="Three Verticals. One Integrated Vision."
            subtitle="Each company in the S2Y ecosystem is designed to operate independently while contributing to a unified infrastructure layer."
            center
          />
          <motion.div
            className="portfolio-preview__grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {portfolioCards.map((card, i) => (
              <motion.div key={i} className="portfolio-card" variants={itemVariants}>
                <div className="portfolio-card__icon" style={{ color: card.color }}>
                  {card.icon}
                </div>
                <span className="portfolio-card__tag" style={{ color: card.color }}>
                  {card.tag}
                </span>
                <h3 className="portfolio-card__title">{card.title}</h3>
                <p className="portfolio-card__desc">{card.description}</p>
                <Link to={card.link} className="portfolio-card__link" style={{ color: card.color }}>
                  Learn More <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== VISION 2030 PREVIEW ===== */}
      <section className="section vision-preview">
        <div className="container">
          <motion.div
            className="vision-preview__inner"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="section-label text-center">Vision 2030</p>
            <h2 className="section-title text-center">
              Building Foundational Infrastructure for the Next Decade
            </h2>
            <p className="vision-preview__text">
              Our long-term goal is to build foundational infrastructure across agriculture,
              logistics, and digital communication. We believe in sustainable economics — not
              burn-heavy growth models — and architect every platform for long-term institutional
              relevance.
            </p>
            <div className="vision-preview__cta">
              <Button to="/philosophy" variant="outline-gold" icon>
                Our Philosophy
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="section cta-section">
        <div className="container">
          <motion.div
            className="cta-section__inner"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title text-center">Ready to Build With Us?</h2>
            <p className="section-subtitle text-center" style={{ margin: '0 auto 2rem' }}>
              Whether you are a vendor, a partner, or a talent exploring opportunities — we would be glad to hear from you.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button to="/contact" variant="primary" icon>
                Get In Touch
              </Button>
              <Button to="/careers" variant="secondary" icon>
                View Careers
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
