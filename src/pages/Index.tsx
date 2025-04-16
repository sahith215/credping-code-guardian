
import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeatureCards from '@/components/FeatureCards';
import AboutUs from '@/components/AboutUs';
import StatsSection from '@/components/StatsSection';
import ContactUs from '@/components/ContactUs';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-credping-black text-white">
      <Navbar />
      <HeroSection />
      <FeatureCards />
      <AboutUs />
      <StatsSection />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default Index;
