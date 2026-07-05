import { motion } from 'framer-motion';
import { FileText, MapPin, Building2, Scale, CheckCircle } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import SpotlightCard from '../components/SpotlightCard';
import GlowDivider from '../components/GlowDivider';
import TextReveal from '../components/TextReveal';
import GradientBorder from '../components/GradientBorder';
import SEO from '../components/SEO';
import './Governance.css';

const compliancePrinciples = [
  'Full regulatory compliance across all operational jurisdictions',
  'Transparent financial reporting and audit readiness',
  'Data protection and privacy adherence in all products',
  'Ethical business practices embedded in corporate culture',
  'Regular governance reviews and policy updates',
  'Stakeholder communication and accountability frameworks',
];

const containerVar = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } };
const itemVar = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Governance() {
  return (
    <main className="governance-page">
      <SEO 
        title="Governance & Compliance | S2Y Global"
        description="S2Y Global's corporate governance framework, compliance principles, and entity information."
      />
      <section className="section governance-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="section-label">Governance & Structure</p>
            <h1 className="section-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
              <TextReveal delay={0.2}>Structured for Trust. Built for Accountability.</TextReveal>
            </h1>
            <p className="section-subtitle" style={{ maxWidth: '700px' }}>
              S2Y Global operates with institutional-grade governance standards. Transparency,
              compliance, and accountability are not aspirations — they are operational requirements.
            </p>
          </motion.div>
        </div>
      </section>

      <GlowDivider />

      <section className="section governance-info">
        <div className="container">
          <div className="governance-info__grid">
            {[
              {
                icon: <FileText size={24} />,
                label: 'CIN',
                value: 'S2Y Global Private Limited',
                sub: 'Corporate Identification Number on file with MCA',
              },
              {
                icon: <MapPin size={24} />,
                label: 'Registered Address',
                value: 'Vijayawada, Andhra Pradesh',
                sub: 'India',
              },
              {
                icon: <Building2 size={24} />,
                label: 'Corporate Structure',
                value: 'Private Limited Company',
                sub: 'Incorporated under the Companies Act, 2013',
              },
              {
                icon: <Scale size={24} />,
                label: 'Compliance Framework',
                value: 'Full Regulatory Compliance',
                sub: 'MCA, GST, and applicable statutory requirements',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <SpotlightCard className="governance-info__card">
                  <div className="governance-info__icon">{item.icon}</div>
                  <span className="governance-info__label">{item.label}</span>
                  <h3 className="governance-info__value">{item.value}</h3>
                  <p className="governance-info__sub">{item.sub}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section governance-compliance">
        <div className="container">
          <div className="governance-compliance__inner">
            <SectionHeader
              label="Compliance Philosophy"
              title="Governance Is Not Overhead — It Is Architecture"
            />
            <p className="governance-compliance__text">
              We believe that strong governance is a competitive advantage. It builds trust with
              partners, regulators, and users alike. Every compliance framework we adopt is treated
              as an integral part of our business architecture, not as a burden.
            </p>
            <motion.div
              className="governance-compliance__list"
              variants={containerVar}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {compliancePrinciples.map((p, i) => (
                <motion.div key={i} className="governance-compliance__item" variants={itemVar}>
                  <CheckCircle size={16} className="governance-compliance__check" />
                  <span>{p}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
