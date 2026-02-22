import { motion } from 'framer-motion';
import { Server, Lock, Zap, Cloud, Code2, Database } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import Button from '../components/Button';
import './Technology.css';

const techAreas = [
  {
    icon: <Server size={28} />,
    title: 'Secure Backend Systems',
    description: 'Our backend infrastructure is built on hardened, modular architectures designed for reliability and horizontal scalability across all portfolio companies.',
  },
  {
    icon: <Lock size={28} />,
    title: 'Encrypted Communication Models',
    description: 'End-to-end encryption is not an afterthought — it is a foundational design principle embedded in our messaging, calling, and data transfer protocols.',
  },
  {
    icon: <Zap size={28} />,
    title: 'Real-Time Logistics',
    description: 'Our logistics engine processes real-time location, demand forecasting, and route optimization to power efficient food and grocery delivery networks.',
  },
  {
    icon: <Cloud size={28} />,
    title: 'Scalable Cloud Architecture',
    description: 'Cloud-native deployment with auto-scaling, redundancy, and geographic distribution ensures consistent performance as our platforms grow.',
  },
  {
    icon: <Code2 size={28} />,
    title: 'Clean Architecture Principles',
    description: 'We follow clean architecture patterns — domain-driven design, separation of concerns, and dependency inversion — enabling teams to iterate without systemic risk.',
  },
  {
    icon: <Database size={28} />,
    title: 'Data Integrity & Governance',
    description: 'Our data infrastructure enforces strict governance policies, ensuring compliance, auditability, and user privacy across every touchpoint.',
  },
];

const containerVar = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const itemVar = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Technology() {
  return (
    <main className="tech-page">
      <section className="section tech-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="section-label">Technology & Architecture</p>
            <h1 className="section-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
              Built for Scale, Designed for Trust
            </h1>
            <p className="section-subtitle" style={{ maxWidth: '700px' }}>
              Our technology stack is the backbone of the S2Y ecosystem. Every architectural
              decision is made with security, scalability, and long-term maintainability as
              non-negotiable priorities.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section tech-stack">
        <div className="container">
          <SectionHeader
            label="Our Capabilities"
            title="Engineering Excellence at Every Layer"
            center
          />
          <motion.div
            className="tech-grid"
            variants={containerVar}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {techAreas.map((t, i) => (
              <motion.div key={i} className="tech-card" variants={itemVar}>
                <div className="tech-card__icon">{t.icon}</div>
                <h3>{t.title}</h3>
                <p>{t.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Architecture overview visualization */}
      <section className="section tech-arch">
        <div className="container">
          <motion.div
            className="tech-arch__inner"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <SectionHeader
              label="Architecture Overview"
              title="Layered, Modular, Resilient"
              center
            />
            <div className="tech-arch__layers">
              {[
                { label: 'Presentation Layer', desc: 'React Native, Web Apps, APIs', color: '#c9a84c' },
                { label: 'Application Layer', desc: 'Microservices, Event-Driven Architecture', color: '#8b5cf6' },
                { label: 'Domain Layer', desc: 'Business Logic, Domain Services', color: '#22c55e' },
                { label: 'Infrastructure Layer', desc: 'Cloud, Databases, Message Queues', color: '#0f3460' },
              ].map((layer, i) => (
                <motion.div
                  key={i}
                  className="tech-arch__layer"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.15 }}
                  style={{ borderLeftColor: layer.color }}
                >
                  <h4 style={{ color: layer.color }}>{layer.label}</h4>
                  <p>{layer.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container text-center">
          <SectionHeader
            label="Join Our Team"
            title="Build With the Best"
            subtitle="We are always looking for engineers, architects, and builders who share our commitment to excellence."
            center
          />
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem', flexWrap: 'wrap' }}>
            <Button to="/careers" variant="primary" icon>View Careers</Button>
            <Button to="/contact" variant="secondary" icon>Contact Us</Button>
          </div>
        </div>
      </section>
    </main>
  );
}
