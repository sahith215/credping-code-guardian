
import React from 'react';
import { Shield, Eye, Zap, Code } from 'lucide-react';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 px-4 md:px-8 bg-credping-gray code-grid-bg">
      <div className="container max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Why <span className="text-credping-green">CredPing</span>?
            </h2>
            
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4">
                  <div className="bg-credping-green/10 p-3 rounded-lg h-fit">
                    <feature.icon className="text-credping-green" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Column - Animation */}
          <div className="flex justify-center">
            <div className="relative">
              <LockAnimation />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const features = [
  {
    icon: Shield,
    title: "Prevent Credential Leaks",
    description: "Identify exposed secrets, API keys, and tokens before they get committed to your repository."
  },
  {
    icon: Zap,
    title: "Simple & Fast",
    description: "No sign-up needed. Just paste your code and get instant feedback on potential security issues."
  },
  {
    icon: Code,
    title: "Works Across Languages",
    description: "Supports multiple programming languages and configuration file types to catch all credential formats."
  },
];

const LockAnimation: React.FC = () => {
  return (
    <div className="relative w-64 h-64">
      {/* Shield background with glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-48 h-48 rounded-full bg-credping-green/5 animate-pulse"></div>
      </div>
      
      {/* Code lines floating around */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-credping-gray border border-credping-green/30 text-xs p-2 rounded font-mono shadow-lg"
            style={{
              top: `${20 + Math.random() * 60}%`,
              left: `${20 + Math.random() * 60}%`,
              transform: `rotate(${Math.random() * 20 - 10}deg)`,
              animation: `float ${3 + Math.random() * 2}s ease-in-out infinite alternate`,
              animationDelay: `${Math.random() * 2}s`,
              opacity: 0.8,
            }}
          >
            {codeSamples[i % codeSamples.length]}
          </div>
        ))}
      </div>
      
      {/* Center shield */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-credping-green text-credping-black p-6 rounded-full shadow-lg shadow-credping-green/30">
          <Shield size={64} />
        </div>
      </div>
      
      {/* Orbit circle */}
      <div className="absolute inset-0 border-2 border-dashed border-credping-green/20 rounded-full animate-spin" style={{ animationDuration: '15s' }}></div>
      
      {/* Ping effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-credping-green/30 animate-ping opacity-75"></div>
      </div>
    </div>
  );
};

const codeSamples = [
  "API_KEY=sk...",
  "password: 'secure123'",
  "TOKEN=eyJhbGciO...",
  "AWS_SECRET=AKIA...",
  "db_password='admin'"
];

export default AboutSection;
