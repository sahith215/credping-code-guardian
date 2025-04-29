
import React from 'react';
import Navbar from '@/components/Navbar';
import AboutUs from '@/components/AboutUs';
import StatsSection from '@/components/StatsSection';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-credping-black text-white">
      <Navbar />
      <div className="page-transition pt-20">
        <div className="container max-w-7xl mx-auto px-4 py-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)} 
            className="mb-4 text-white hover:text-credping-green"
          >
            <ArrowLeft className="mr-2" size={16} />
            Back
          </Button>
        </div>
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
