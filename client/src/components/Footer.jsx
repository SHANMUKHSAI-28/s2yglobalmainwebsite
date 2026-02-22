import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Linkedin, 
  Twitter, 
  Mail, 
  MapPin, 
  ArrowUpRight 
} from 'lucide-react';
import GlowDivider from './GlowDivider';
import './Footer.css';

const footerLinks = {
  company: [
    { label: 'About', to: '/about' },
    { label: 'Portfolio', to: '/portfolio' },
    { label: 'Philosophy', to: '/philosophy' },
    { label: 'Governance', to: '/governance' },
  ],
  resources: [
    { label: 'Technology', to: '/technology' },
    { label: 'Media & Updates', to: '/media' },
    { label: 'Careers', to: '/careers' },
    { label: 'Contact', to: '/contact' },
  ],
  portfolio: [
    { label: 'S2Y Fresh', to: '/portfolio#fresh' },
    { label: 'S2Y Pure', to: '/portfolio#pure' },
    { label: 'Glimpzo', to: '/portfolio#glimpzo' },
  ],
};

const containerVar = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const itemVar = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Footer() {
  return (
    <footer className="footer">
      <GlowDivider />
      <div className="container">
        <motion.div
          className="footer__top"
          variants={containerVar}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <motion.div className="footer__brand" variants={itemVar}>
            <Link to="/" className="footer__logo">
              <span className="footer__logo-s2y">S2Y</span>
              <span className="footer__logo-global">Global</span>
            </Link>
            <p className="footer__tagline">
              A technology-driven ecosystem builder across Food, Social, and Digital Infrastructure.
            </p>
            <div className="footer__social">
              <a href="#" className="footer__social-link" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href="#" className="footer__social-link" aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href="mailto:contact@s2yglobal.com" className="footer__social-link" aria-label="Email">
                <Mail size={18} />
              </a>
            </div>
          </motion.div>

          {Object.entries(footerLinks).map(([key, links]) => (
            <motion.div key={key} className="footer__col" variants={itemVar}>
              <h4 className="footer__col-title">{key}</h4>
              <ul className="footer__col-links">
                {links.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="footer__col-link">
                      {link.label}
                      <ArrowUpRight size={12} />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <div className="footer__divider" />

        <motion.div
          className="footer__bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="footer__location">
            <MapPin size={14} />
            <span>Vijayawada, Andhra Pradesh, India</span>
          </div>
          <p className="footer__copy">
            &copy; {new Date().getFullYear()} S2Y Global Private Limited. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
