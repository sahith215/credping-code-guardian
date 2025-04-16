
import { ArrowRight } from 'lucide-react';
import React from 'react';
import CodeAnimation from './CodeAnimation';
import { useNavigate } from 'react-router-dom';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  const handleRedirectToDetection = () => {
    navigate('/detection');
  };

  return (
    <section className="min-h-[90vh] flex flex-col md:flex-row items-center pt-20 overflow-hidden relative code-grid-bg">
      {/* Background animated elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i}
            className="absolute text-xs text-credping-green animate-code-rain"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-20px`,
              animationDuration: `${10 + Math.random() * 20}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            {"{"}API_KEY=sk_test_{Math.random().toString(36).substring(2, 10)}{"}"}
          </div>
        ))}
      </div>
      
      <div className="container max-w-7xl mx-auto px-4 md:px-8 py-12 flex flex-col lg:flex-row items-center gap-12">
        {/* Left side - Text Content */}
        <div className="flex-1 space-y-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight animate-glow">
            <span className="text-credping-green">Catch Leaks</span> Before <br />
            the World Does.
          </h1>
          
          <p className="text-muted-foreground text-lg md:text-xl max-w-xl">
            Real-time code scanner for secrets like API keys, tokens & passwords.
            Protect your credentials before they're exposed.
          </p>
          
          <button 
            onClick={handleRedirectToDetection}
            className="cta-button flex items-center gap-2"
          >
            <span>Paste Code</span>
            <ArrowRight size={20} />
          </button>
        </div>
        
        {/* Right side - Animated Code */}
        <div className="flex-1 lg:flex justify-end">
          <CodeAnimation />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
