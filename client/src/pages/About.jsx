import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Target, Building, TrendingUp } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import Button from '../components/Button';
import TiltCard from '../components/TiltCard';
import GlowDivider from '../components/GlowDivider';
import MagneticButton from '../components/MagneticButton';
import TextReveal from '../components/TextReveal';
import SpotlightCard from '../components/SpotlightCard';
import GradientBorder from '../components/GradientBorder';
import Marquee from '../components/Marquee';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import './About.css';

// ... (skipping to line 38)
export default function About() {
  return (
    <main className="about-page">
      <SEO 
        title="About S2Y Global | Our Mission & Vision"
        description="S2Y Global is a technology holding company building integrated infrastructure platforms across food systems and digital ecosystems."
      />
      {/* Hero */}
      <section className="about-hero section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="section-label">About S2Y Global</p>
            <h1 className="section-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
              <TextReveal delay={0.2}>
                A Technology Holding Company Building Integrated Infrastructure Platforms
              </TextReveal>
            </h1>
            <p className="section-subtitle" style={{ maxWidth: '720px' }}>
              S2Y Global is a technology holding company building integrated infrastructure
              platforms across food systems and digital ecosystems. We operate with the discipline
              of institutional infrastructure — structured, deliberate, and designed for permanence.
            </p>
          </motion.div>
        </div>
      </section>

      <GlowDivider />

      {/* Key facts */}
      <section className="about-facts section">
        <div className="container">
          <motion.div
            className="about-facts__grid"
            variants={containerVar}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { icon: <Calendar size={20} />, label: 'Founded', value: '16 September 2025' },
              { icon: <MapPin size={20} />, label: 'Headquarters', value: 'Vijayawada, AP' },
              { icon: <Users size={20} />, label: 'Structure', value: 'Founder-Led' },
              { icon: <Building size={20} />, label: 'Type', value: 'Private Limited' },
            ].map((fact, i) => (
              <motion.div key={i} variants={itemVar}>
                <SpotlightCard className="about-fact">
                  <div className="about-fact__icon">{fact.icon}</div>
                  <span className="about-fact__label">{fact.label}</span>
                  <span className="about-fact__value">{fact.value}</span>
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <GlowDivider />

      {/* Positioning */}
      <section className="section about-positioning">
        <div className="container">
          <div className="about-positioning__inner">
            <GradientBorder>
              <div style={{ padding: '3rem' }}>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                >
                  <SectionHeader
                    label="Our Positioning"
                    title="Not a Startup. An Infrastructure Builder."
                  />
                  <p className="about-positioning__text">
                    We do not chase viral growth or optimize for vanity metrics. S2Y Global is
                    building integrated, vertically controlled platforms designed to become essential
                    infrastructure — the kind that compounds value over decades.
                  </p>
                  <p className="about-positioning__text">
                    Our approach mirrors the institutional discipline of India's most enduring
                    conglomerates: patient capital deployment, deep operational control, and a
                    multi-generational perspective on value creation. <Link to="/portfolio" style={{ color: 'var(--color-gold)', textDecoration: 'underline', textUnderlineOffset: '4px' }}>Learn more about our Companies.</Link>
                  </p>
                </motion.div>
              </div>
            </GradientBorder>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section about-values">
        <div className="container">
          <SectionHeader
            label="Our Values"
            title="The Principles That Guide Us"
            center
          />
          <motion.div
            className="about-values__grid"
            variants={containerVar}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {values.map((v, i) => (
              <motion.div key={i} variants={itemVar}>
                <TiltCard className="about-value-card">
                  <div className="about-value-card__icon">{v.icon}</div>
                  <h3>{v.title}</h3>
                  <p>{v.desc}</p>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <GlowDivider />

      {/* Timeline */}
      <section className="section about-timeline">
        <div className="container">
          <SectionHeader label="Our Journey" title="Key Milestones" center />
          <div className="about-timeline__list">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                className="about-timeline__item"
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className="about-timeline__dot" />
                <div className="about-timeline__content">
                  <span className="about-timeline__date">{item.date}</span>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Marquee
        items={['Institutional Discipline', 'Vertical Integration', 'Founder-Led', 'Sustainable Economics', 'Long-Term Vision', 'Multi-Generational Value']}
        speed={40}
        separator="◆"
      />

      {/* CTA */}
      <section className="section">
        <div className="container text-center">
          <SectionHeader
            label="Join Our Journey"
            title="Building the Future Together"
            center
            subtitle="Whether you're a partner, vendor, or talent — we'd love to connect."
          />
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem', flexWrap: 'wrap' }}>
            <MagneticButton><Button to="/contact" variant="primary" icon>Contact Us</Button></MagneticButton>
            <MagneticButton><Button to="/portfolio" variant="secondary" icon>Our Portfolio</Button></MagneticButton>
          </div>
        </div>
      </section>
    </main>
  );
}
