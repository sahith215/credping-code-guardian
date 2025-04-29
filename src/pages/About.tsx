
import React from 'react';
import Navbar from '@/components/Navbar';
import AboutUs from '@/components/AboutUs';
import StatsSection from '@/components/StatsSection';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <div className="min-h-screen bg-credping-black text-white">
      <Navbar />
      <div className="page-transition pt-20">
        <div id="about">
          <AboutUs />
        </div>
        <StatsSection />
      </div>
      <Footer />
    </div>
  );
};

export default About;
