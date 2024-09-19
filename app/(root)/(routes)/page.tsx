
import Stats from '@/components/Stats';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import styles from '@/styles/style';
import Link from 'next/link';
import Business from '@/components/Business';
import Billing from '@/components/Billing';
import CardDeal from '@/components/CardDeal';
import Testimonials from '@/components/Testimonials';
import Clients from '@/components/Clients';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <div className="bg-primary w-full overflow-hidden">
        <div className={`bg-primary ${styles.flexStart}`}>
          <div className={`${styles.boxWidth}`}>
            <Hero />
          </div>
        </div>
        <div className={`bg-primary ${styles.paddingX} ${styles.flexStart}`}>
          <div className={`${styles.boxWidth}`}>
            <Stats />
            <Business />
            <Testimonials />
            <Clients />
            <CTA />
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
