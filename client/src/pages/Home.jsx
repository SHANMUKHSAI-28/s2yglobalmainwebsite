import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Building2, Leaf, Smartphone, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import Button from '../components/Button';
import SectionHeader from '../components/SectionHeader';
import ParticleField from '../components/ParticleField';
import TextReveal from '../components/TextReveal';
import AnimatedCounter from '../components/AnimatedCounter';
import TiltCard from '../components/TiltCard';
import GlowDivider from '../components/GlowDivider';
import MagneticButton from '../components/MagneticButton';
import Marquee from '../components/Marquee';
import SpotlightCard from '../components/SpotlightCard';
import SEO from '../components/SEO';
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
  { value: '3', label: 'Portfolio Companies', prefix: '', suffix: '+' },
  { value: '5', label: 'Sector Verticals', prefix: '', suffix: '+' },
  { value: '2025', label: 'Year Founded', prefix: '', suffix: '' },
  { value: '100', label: 'Vision Driven', prefix: '', suffix: '%' },
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
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main>
      <SEO 
        title="S2Y Global | Creating Businesses Through Innovation"
        description="S2Y Global Private Limited is building the foundational infrastructure for the next decade across food systems and digital ecosystems."
      />
      {/* ===== HERO ===== */}
      <section className="hero" ref={heroRef}>
        <ParticleField />
        <div className="hero__gradient" />
        <div className="hero__mesh-bg" />
        <motion.div className="container hero__content" style={{ y: heroY, opacity: heroOpacity }}>
          <div className="hero__text">
            <motion.div
              className="hero__label-wrap"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <span className="hero__label-line" />
              <p className="hero__label">S2Y Global Private Limited</p>
              <span className="hero__label-line" />
            </motion.div>
            <h1 className="hero__title">
              <TextReveal delay={0.4}>
                Building Integrated Digital &amp; Food
              </TextReveal>
              <br />
              <span className="hero__title-accent">
                <TextReveal delay={0.8}>Ecosystems</TextReveal>
              </span>
              <br />
              <TextReveal delay={1.0}>for the Future of India</TextReveal>
            </h1>
            <motion.p
              className="hero__subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
            >
              From food supply chains to privacy-focused social platforms, S2Y Global builds
              high-trust systems designed for scale.
            </motion.p>
            <motion.div
              className="hero__cta"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7, duration: 0.6 }}
            >
              <MagneticButton>
                <Button to="/portfolio" variant="primary" icon>
                  Explore Our Ecosystem
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button to="/about" variant="secondary" icon>
                  Our Companies
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button to="/contact" variant="outline-gold">
                  Partner With Us
                </Button>
              </MagneticButton>
            </motion.div>
          </div>
        </motion.div>
        <motion.div
          className="hero__scroll"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.6 }}
        >
          <div className="hero__scroll-mouse">
            <div className="hero__scroll-wheel" />
          </div>
          <span className="hero__scroll-text">Scroll to explore</span>
        </motion.div>
      </section>

      <GlowDivider />

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
                <span className="stats-bar__value">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                </span>
                <span className="stats-bar__label">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <GlowDivider />

      {/* ===== MARQUEE ===== */}
      <Marquee
        items={['Food Systems', 'Digital Infrastructure', 'Agricultural Derivatives', 'Encrypted Communication', 'Supply Chain', 'Privacy-First', 'Micro Logistics', 'Creator Economy', 'Vertical Integration', 'Sustainable Growth']}
        speed={35}
        separator="◆"
      />

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
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <SpotlightCard className="home-about__feature">
                      <div className="home-about__feature-dot" />
                      <div>
                        <h4>{f.title}</h4>
                        <p>{f.desc}</p>
                      </div>
                    </SpotlightCard>
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
              <motion.div key={i} variants={itemVariants}>
                <TiltCard className="portfolio-card">
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
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <GlowDivider />

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
              <MagneticButton>
                <Button to="/philosophy" variant="outline-gold" icon>
                  Our Philosophy
                </Button>
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <Marquee
        items={['S2Y Fresh', 'S2Y Pure', 'Glimpzo', 'S2Y Global', 'Infrastructure', 'Innovation', 'Trust', 'Scale']}
        speed={45}
        separator="●"
      />
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
              <MagneticButton>
                <Button to="/contact" variant="primary" icon>
                  Get In Touch
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button to="/careers" variant="secondary" icon>
                  View Careers
                </Button>
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
