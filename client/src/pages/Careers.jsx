import { motion } from 'framer-motion';
import { MapPin, Briefcase, Code2, TrendingUp, Users } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import Button from '../components/Button';
import './Careers.css';

const openings = [
  {
    title: 'Full-Stack Engineer',
    team: 'S2Y Fresh',
    location: 'Vijayawada / Remote',
    type: 'Full-time',
    icon: <Code2 size={20} />,
  },
  {
    title: 'Mobile Developer (React Native)',
    team: 'Glimpzo',
    location: 'Vijayawada / Remote',
    type: 'Full-time',
    icon: <Code2 size={20} />,
  },
  {
    title: 'Backend Engineer',
    team: 'Platform',
    location: 'Vijayawada / Remote',
    type: 'Full-time',
    icon: <Code2 size={20} />,
  },
  {
    title: 'Operations Lead',
    team: 'S2Y Fresh',
    location: 'Vijayawada',
    type: 'Full-time',
    icon: <TrendingUp size={20} />,
  },
  {
    title: 'Product Designer',
    team: 'Design',
    location: 'Remote',
    type: 'Full-time / Contract',
    icon: <Users size={20} />,
  },
];

const values = [
  { title: 'Build What Matters', desc: 'Work on real infrastructure that impacts industries — not features that chase metrics.' },
  { title: 'Own Your Domain', desc: 'Every team member has clear ownership and the autonomy to make impactful decisions.' },
  { title: 'Long-Term Thinking', desc: 'We optimize for sustainable growth and career development, not burnout cycles.' },
  { title: 'First Principles', desc: 'We approach every problem from fundamentals, not from "how others did it."' },
];

const containerVar = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const itemVar = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Careers() {
  return (
    <main className="careers-page">
      <section className="section careers-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="section-label">Careers at S2Y Global</p>
            <h1 className="section-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
              Build Infrastructure That Matters
            </h1>
            <p className="section-subtitle" style={{ maxWidth: '700px' }}>
              Join a founder-led team building integrated technology platforms across food, agriculture,
              and digital communication. We value ownership, craftsmanship, and long-term thinking.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section careers-values">
        <div className="container">
          <SectionHeader
            label="Why S2Y Global"
            title="What We Stand For"
            center
          />
          <motion.div
            className="careers-values__grid"
            variants={containerVar}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {values.map((v, i) => (
              <motion.div key={i} className="careers-value" variants={itemVar}>
                <h4>{v.title}</h4>
                <p>{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section careers-openings">
        <div className="container">
          <SectionHeader
            label="Open Positions"
            title="Current Openings"
            subtitle="We are in early stages and actively building our founding teams across all verticals."
            center
          />
          <motion.div
            className="careers-list"
            variants={containerVar}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {openings.map((job, i) => (
              <motion.div key={i} className="careers-job" variants={itemVar}>
                <div className="careers-job__icon">{job.icon}</div>
                <div className="careers-job__info">
                  <h4>{job.title}</h4>
                  <div className="careers-job__meta">
                    <span>{job.team}</span>
                    <span className="careers-job__dot">·</span>
                    <span><MapPin size={12} /> {job.location}</span>
                    <span className="careers-job__dot">·</span>
                    <span><Briefcase size={12} /> {job.type}</span>
                  </div>
                </div>
                <Button to="/contact" variant="outline-gold">Apply</Button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h3 className="section-title">Don't See Your Role?</h3>
            <p className="section-subtitle" style={{ margin: '0 auto 2rem' }}>
              We are always open to hearing from exceptional people. Send us your profile and tell
              us what you want to build.
            </p>
            <Button to="/contact" variant="primary" icon>Get In Touch</Button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
