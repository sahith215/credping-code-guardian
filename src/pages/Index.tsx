
import React, { useEffect, useRef } from 'react';
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
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  
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

  // Handle scroll to section from navigation
  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const sectionId = location.state.scrollTo;
      const element = document.getElementById(sectionId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location.state]);

  return (
    <div className="min-h-screen bg-credping-black text-white">
      <Navbar />
      <div className="page-transition">
        <HeroSection />
        <FeatureCards />
        <div id="about" ref={aboutRef}>
          <AboutUs />
        </div>
        <StatsSection />
        <div id="contact" ref={contactRef}>
          <ContactUs />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
