import { motion } from 'framer-motion';
import { Layers, Shield, Eye, Clock, Coins, Network } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import Button from '../components/Button';
import SpotlightCard from '../components/SpotlightCard';
import GlowDivider from '../components/GlowDivider';
import MagneticButton from '../components/MagneticButton';
import TextReveal from '../components/TextReveal';
import GradientBorder from '../components/GradientBorder';
import './Philosophy.css';

const principles = [
  {
    icon: <Layers size={28} />,
    title: 'Vertical Integration',
    description: 'We control every critical layer of our infrastructure stack. From logistics hubs to communication protocols, ownership of the full stack enables us to deliver quality and efficiency that fragmented ecosystems cannot.',
  },
  {
    icon: <Shield size={28} />,
    title: 'Controlled Infrastructure',
    description: 'We build and operate our own infrastructure rather than renting it. This gives us pricing power, reliability guarantees, and the ability to evolve our platforms independently of third-party constraints.',
  },
  {
    icon: <Eye size={28} />,
    title: 'Trust-Driven Design',
    description: 'Every product and platform we build starts with a simple question: does this earn long-term trust? From encrypted messaging to transparent vendor economics, trust is the foundation of our architecture.',
  },
  {
    icon: <Clock size={28} />,
    title: 'Founder-Led Long-Term Thinking',
    description: 'We are not optimizing for the next funding round. We are building for the next decade. This means patient capital deployment, deliberate market entry, and decisions measured in years, not sprints.',
  },
  {
    icon: <Coins size={28} />,
    title: 'Sustainable Economics',
    description: 'No burn-heavy growth models. We architect every platform to be revenue-positive from inception. Growth should be a byproduct of genuine value creation, not subsidized demand.',
  },
  {
    icon: <Network size={28} />,
    title: 'Ecosystem Synergy',
    description: 'Our portfolio companies are not isolated bets. They share infrastructure, data learnings, and operational capacity — creating compounding returns that accelerate with each new vertical.',
  },
];

const containerVar = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
const itemVar = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Philosophy() {
  return (
    <main className="philosophy-page">
      <section className="section philosophy-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="section-label">Ecosystem Philosophy</p>
            <h1 className="section-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
              <TextReveal delay={0.2}>How We Think About Building</TextReveal>
            </h1>
            <p className="section-subtitle" style={{ maxWidth: '700px' }}>
              Our philosophy is not just a set of principles — it is the operating system that
              governs every decision we make across technology, operations, and growth.
            </p>
          </motion.div>
        </div>
      </section>

      <GlowDivider />

      <section className="section philosophy-principles">
        <div className="container">
          <SectionHeader
            label="Core Principles"
            title="The Architecture of Our Thinking"
            center
          />
          <motion.div
            className="philosophy-grid"
            variants={containerVar}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {principles.map((p, i) => (
              <motion.div key={i} variants={itemVar}>
                <SpotlightCard className="philosophy-card">
                  <div className="philosophy-card__icon">{p.icon}</div>
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <GlowDivider />

      <section className="section philosophy-quote">
        <div className="container">
          <motion.blockquote
            className="philosophy-blockquote"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p>
              "We are not building companies. We are building infrastructure that becomes the
              foundation on which industries operate. That requires patience, precision, and
              an unwavering commitment to getting the architecture right."
            </p>
            <cite>— Founding Principle, S2Y Global</cite>
          </motion.blockquote>
        </div>
      </section>

      <section className="section">
        <div className="container text-center">
          <SectionHeader
            label="Learn More"
            title="Explore Our Ecosystem"
            subtitle="See how our philosophy manifests in real products and platforms."
            center
          />
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem', flexWrap: 'wrap' }}>
            <MagneticButton><Button to="/portfolio" variant="primary" icon>Our Portfolio</Button></MagneticButton>
            <MagneticButton><Button to="/technology" variant="secondary" icon>Technology</Button></MagneticButton>
          </div>
        </div>
      </section>
    </main>
  );
}
