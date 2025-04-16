
import React from 'react';
import { Shield, Lock, Key, Clock, Code } from 'lucide-react';

const FeatureCards: React.FC = () => {
  return (
    <section className="py-24 px-4 md:px-8">
      <div className="container max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          <span className="text-credping-green">Smart</span> Credential Detection
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="card-raised p-6 group hover:border-credping-green transition-all duration-300 flex flex-col h-full"
            >
              <div className="bg-credping-green/10 p-4 rounded-lg w-fit mb-4 group-hover:bg-credping-green/20 transition-all">
                <feature.icon className="text-credping-green" size={28} />
              </div>
              
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground flex-grow">{feature.description}</p>
              
              <div className="mt-6 flex items-center text-credping-green text-sm font-medium">
                <span>{feature.tagline}</span>
                <div className="ml-2 w-4 h-0.5 bg-credping-green/50"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const features = [
  {
    icon: Key,
    title: "API Key Protection",
    description: "Instantly detect API keys, tokens, and credentials that may have been accidentally committed in your code. Protect your most valuable access points.",
    tagline: "Security First"
  },
  {
    icon: Code,
    title: "Multi-language Support",
    description: "Scan code in multiple programming languages including JavaScript, Python, Java, and more. Our detection works across all popular file formats.",
    tagline: "Universal Protection"
  },
  {
    icon: Shield,
    title: "Real-time Scanning",
    description: "Get immediate feedback on potentially exposed credentials with severity ratings and precise location information down to the exact line.",
    tagline: "Instant Results"
  },
  {
    icon: Lock,
    title: "Best Practice Guidance",
    description: "Receive actionable recommendations for securing your credentials properly with environment variables, secret managers, and more.",
    tagline: "Expert Recommendations"
  },
  {
    icon: Clock,
    title: "Quick & Painless",
    description: "No complex setup or installation. Simply paste your code or provide a GitHub repository URL and get results in seconds.",
    tagline: "Zero Friction"
  },
  {
    icon: Shield,
    title: "Secure By Design",
    description: "Your code stays on your machine. We never store your sensitive information, ensuring your security and privacy at all times.",
    tagline: "Privacy Protected"
  }
];

export default FeatureCards;
