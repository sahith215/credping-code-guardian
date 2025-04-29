
import React from 'react';
import { Github, Mail, Twitter, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-credping-black border-t border-white/5 py-12 px-4 md:px-8">
      <div className="container max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Tagline */}
          <div className="md:col-span-1">
            <a href="/" className="flex items-center gap-2 font-orbitron font-bold text-xl text-white mb-3">
              <span>Cred</span>
              <div className="relative">
                <span className="text-credping-green">Ping</span>
                <span className="absolute -right-2 -top-1 w-2 h-2 bg-credping-green rounded-full"></span>
              </div>
            </a>
            <p className="text-sm text-muted-foreground mt-4">
              Protecting your code from credential leaks and making the digital world a safer place.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {['Home', 'Detection', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <a href={`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`} className="text-muted-foreground hover:text-credping-green transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              {['Documentation', 'API', 'Blog', 'Privacy Policy'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-muted-foreground hover:text-credping-green transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="text-muted-foreground hover:text-credping-green transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-credping-green transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-credping-green transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="mailto:contact@credping.com" className="text-muted-foreground hover:text-credping-green transition-colors">
                <Mail size={20} />
              </a>
            </div>
            <a href="mailto:contact@credping.com" className="text-sm text-muted-foreground hover:text-credping-green transition-colors">
              contact@credping.com
            </a>
          </div>
        </div>
        
        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} CredPing. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
