import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { ArrowUpRight, Calendar } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import TextReveal from '../components/TextReveal';
import GlowDivider from '../components/GlowDivider';
import SpotlightCard from '../components/SpotlightCard';
import './Media.css';

const updates = [
  {
    date: 'Q1 2026',
    category: 'S2Y Fresh',
    categoryColor: 'var(--color-fresh)',
    title: 'S2Y Fresh Platform Development Underway',
    description: 'The integrated food and grocery delivery platform enters active development with focus on S2Y Hubs micro-infrastructure.',
  },
  {
    date: 'Q1 2026',
    category: 'Glimpzo',
    categoryColor: 'var(--color-glimpzo)',
    title: 'Glimpzo Architecture Design Complete',
    description: 'Privacy-first messaging architecture finalized with end-to-end encryption and native calling infrastructure.',
  },
  {
    date: 'Q1 2026',
    category: 'S2Y Pure',
    categoryColor: 'var(--color-pure)',
    title: 'S2Y Pure Product Line Development',
    description: 'Premium agricultural derivatives brand development initiated with tomato and moringa powder products.',
  },
  {
    date: 'Q4 2025',
    category: 'Corporate',
    categoryColor: 'var(--color-gold)',
    title: 'S2Y Global Corporate Website Launch',
    description: 'Official corporate website launched to establish S2Y Global\'s digital presence and ecosystem visibility.',
  },
  {
    date: 'Sep 2025',
    category: 'Corporate',
    categoryColor: 'var(--color-gold)',
    title: 'S2Y Global Private Limited Founded',
    description: 'Company incorporated in Vijayawada, Andhra Pradesh as a multi-sector technology holding company.',
  },
];

const containerVar = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const itemVar = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Media() {
  return (
    <main className="media-page">
      <SEO 
        title="News & Updates | S2Y Global"
        description="Stay updated with the latest news, announcements, and progress from S2Y Global Private Limited."
      />
      <section className="section media-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="section-label">Media & Updates</p>
            <h1 className="section-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
              <TextReveal delay={0.2}>Latest From S2Y Global</TextReveal>
            </h1>
            <p className="section-subtitle" style={{ maxWidth: '700px' }}>
              Follow our progress as we build integrated infrastructure across food, agriculture,
              and digital communication.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section media-updates">
        <div className="container">
          <motion.div
            className="media-list"
            variants={containerVar}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {updates.map((update, i) => (
              <motion.article key={i} variants={itemVar}>
                <SpotlightCard className="media-card">
                <div className="media-card__meta">
                  <span className="media-card__date">
                    <Calendar size={14} />
                    {update.date}
                  </span>
                  <span className="media-card__category" style={{ color: update.categoryColor, borderColor: update.categoryColor }}>
                    {update.category}
                  </span>
                </div>
                <h3 className="media-card__title">{update.title}</h3>
                <p className="media-card__desc">{update.description}</p>
                </SpotlightCard>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
