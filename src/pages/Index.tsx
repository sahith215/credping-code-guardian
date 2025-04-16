
import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeatureCards from '@/components/FeatureCards';
import AboutSection from '@/components/AboutSection';
import StatsSection from '@/components/StatsSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-credping-black text-white">
      <Navbar />
      <HeroSection />
      <FeatureCards />
      <AboutSection />
      <StatsSection />
      <Footer />
    </div>
  );
};

export default Index;
