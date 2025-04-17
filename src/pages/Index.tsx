
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeatureCards from '@/components/FeatureCards';
import AboutUs from '@/components/AboutUs';
import StatsSection from '@/components/StatsSection';
import ContactUs from '@/components/ContactUs';
import Footer from '@/components/Footer';

const Index = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Handle hash in URL for direct section navigation
    if (location.hash) {
      const id = location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      // If no hash, scroll to top on page load
      window.scrollTo(0, 0);
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen bg-credping-black text-white">
      <Navbar />
      <div className="page-transition">
        <HeroSection />
        <FeatureCards />
        <AboutUs />
        <StatsSection />
        <ContactUs />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
