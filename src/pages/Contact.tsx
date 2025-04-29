
import React from 'react';
import Navbar from '@/components/Navbar';
import ContactUs from '@/components/ContactUs';
import Footer from '@/components/Footer';

const Contact = () => {
  return (
    <div className="min-h-screen bg-credping-black text-white">
      <Navbar />
      <div className="page-transition pt-20">
        <div id="contact">
          <ContactUs />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
