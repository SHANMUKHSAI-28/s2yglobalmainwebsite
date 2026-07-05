import { motion } from 'framer-motion';
import Button from '../components/Button';
import SEO from '../components/SEO';
import SectionHeader from '../components/SectionHeader';
import './Home.css'; // Reusing some base styles for layout

export default function NotFound() {
  return (
    <main className="not-found-page" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <SEO 
        title="Page Not Found | S2Y Global"
        description="The page you are looking for does not exist."
      />
      <div className="container text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            label="404 Error"
            title="Page Not Found"
            center
            subtitle="The route you requested could not be located in our infrastructure."
          />
          <div style={{ marginTop: '2rem' }}>
            <Button to="/" variant="primary" icon>
              Return to Home
            </Button>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
