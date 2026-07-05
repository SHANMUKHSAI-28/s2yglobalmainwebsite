import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, ArrowRight } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import TextReveal from '../components/TextReveal';
import GlowDivider from '../components/GlowDivider';
import SEO from '../components/SEO';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };

  return (
    <main className="contact-page">
      <SEO 
        title="Contact Us | S2Y Global"
        description="Get in touch with S2Y Global Private Limited for partnerships, inquiries, and more."
      />
      <section className="section contact-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="section-label">Get In Touch</p>
            <h1 className="section-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
              <TextReveal delay={0.2}>Let's Build Something Together</TextReveal>
            </h1>
            <p className="section-subtitle" style={{ maxWidth: '700px' }}>
              Whether you are a potential partner, vendor, talent, or investor —
              we welcome meaningful conversations about building the future.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section contact-main">
        <div className="container">
          <div className="contact-grid">
            <motion.div
              className="contact-info"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3>Contact Information</h3>
              <p className="contact-info__desc">
                We respond to all inquiries within 48 business hours. For urgent matters,
                please reference your inquiry type in the subject line.
              </p>

              <div className="contact-info__items">
                <div className="contact-info__item">
                  <Mail size={20} />
                  <div>
                    <span className="contact-info__label">Email</span>
                    <a href="mailto:contact@s2yglobal.com">contact@s2yglobal.com</a>
                  </div>
                </div>
                <div className="contact-info__item">
                  <MapPin size={20} />
                  <div>
                    <span className="contact-info__label">Headquarters</span>
                    <span>Vijayawada, Andhra Pradesh, India</span>
                  </div>
                </div>
                <div className="contact-info__item">
                  <Phone size={20} />
                  <div>
                    <span className="contact-info__label">Phone</span>
                    <span>Available upon request</span>
                  </div>
                </div>
              </div>

              <div className="contact-info__inquiries">
                <h4>Inquiry Types</h4>
                <div className="contact-info__tags">
                  {['Partnership', 'Vendor Onboarding', 'Career', 'Media', 'Investment', 'General'].map((tag) => (
                    <span key={tag} className="contact-info__tag">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.form
              className="contact-form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="contact-form__field">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                />
              </div>
              <div className="contact-form__field">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                />
              </div>
              <div className="contact-form__field">
                <label htmlFor="subject">Subject</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select inquiry type</option>
                  <option value="partnership">Partnership</option>
                  <option value="vendor">Vendor Onboarding</option>
                  <option value="career">Career Opportunity</option>
                  <option value="media">Media Inquiry</option>
                  <option value="investment">Investment</option>
                  <option value="general">General Inquiry</option>
                </select>
              </div>
              <div className="contact-form__field">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell us about your inquiry..."
                />
              </div>
              <motion.button
                type="submit"
                className="contact-form__submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Send size={16} />
                Send Message
              </motion.button>

              {submitted && (
                <motion.div
                  className="contact-form__success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Thank you for reaching out. We will respond within 48 business hours.
                </motion.div>
              )}
            </motion.form>
          </div>
        </div>
      </section>
    </main>
  );
}
