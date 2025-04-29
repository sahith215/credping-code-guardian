
import React from 'react';
import { Shield, Zap, Code, FileText, Users, Cpu } from 'lucide-react';

const AboutUs: React.FC = () => {
  return (
    <section id="about" className="py-24 px-4 md:px-8 bg-credping-black">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            About <span className="text-credping-green">Us</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The story, the mission, and the passion behind CredPing
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {aboutCards.map((card, index) => (
            <div 
              key={index}
              className="bg-credping-gray p-6 rounded-lg border border-transparent hover:border-credping-green transition-all duration-300 hover:shadow-lg group"
            >
              <div className="bg-credping-green/10 p-3 rounded-lg w-fit mb-4 group-hover:bg-credping-green/20 transition-all">
                <card.icon className="text-credping-green" size={24} />
              </div>
              
              <h3 className="text-xl font-semibold mb-3">{card.title}</h3>
              
              {Array.isArray(card.content) ? (
                <ul className="space-y-2 text-muted-foreground">
                  {card.content.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-credping-green text-lg leading-tight">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">{card.content}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const aboutCards = [
  {
    icon: Shield,
    title: "Mission",
    content: "To help developers secure their code and prevent credential leaks before they cause damage."
  },
  {
    icon: Zap,
    title: "Vision",
    content: "To become the go-to security layer for dev teams — intuitive, real-time, and trustworthy."
  },
  {
    icon: Code,
    title: "What We Offer",
    content: [
      "Paste-to-scan code analysis",
      "GitHub repo scanning", 
      "Line-based fix suggestions", 
      "Developer-friendly UI"
    ]
  },
  {
    icon: FileText,
    title: "Story Behind CredPing",
    content: "Born from real-world leak incidents, CredPing was crafted to protect, simplify, and empower developers."
  },
  {
    icon: Users,
    title: "Why Choose Us",
    content: [
      "Real-time detection",
      "Privacy-first design",
      "Built by devs, for devs"
    ]
  },
  {
    icon: Cpu,
    title: "Our Technology",
    content: [
      "Advanced pattern recognition",
      "Low false positive rate",
      "Continuous improvement"
    ]
  }
];

export default AboutUs;
