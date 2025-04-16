
import React, { useState } from 'react';
import { Mail, Phone, Linkedin, Github, Twitter, MessageSquare, Send } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card';

const ContactUs: React.FC = () => {
  const { toast } = useToast();
  const [showChat, setShowChat] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent",
      description: "We've received your message and will get back to you soon!",
      variant: "default",
    });
    
    // Reset form (in a real app, we'd handle this with a form library)
    const form = e.target as HTMLFormElement;
    form.reset();
  };
  
  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatMessage.trim()) {
      toast({
        title: "Support message sent",
        description: "We'll get back to you soon!",
        variant: "default",
      });
      setChatMessage('');
    }
  };
  
  return (
    <section id="contact" className="py-24 px-4 md:px-8 bg-credping-gray code-grid-bg">
      <div className="container max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Contact <span className="text-credping-green">Us</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Let's connect — your questions, feedback, and ideas are always welcome.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Email */}
          <div className="flex flex-col items-center text-center p-6 rounded-lg border border-white/5 bg-credping-black/40">
            <div className="bg-credping-green/10 p-4 rounded-full mb-4">
              <Mail className="text-credping-green" size={24} />
            </div>
            <h3 className="text-xl font-medium mb-2">Email</h3>
            <a href="mailto:support@credping.dev" className="text-credping-green hover:underline">
              support@credping.dev
            </a>
          </div>
          
          {/* Phone */}
          <div className="flex flex-col items-center text-center p-6 rounded-lg border border-white/5 bg-credping-black/40">
            <div className="bg-credping-green/10 p-4 rounded-full mb-4">
              <Phone className="text-credping-green" size={24} />
            </div>
            <h3 className="text-xl font-medium mb-2">Phone</h3>
            <a href="tel:+919000012345" className="text-credping-green hover:underline">
              +91 90000 12345
            </a>
          </div>
          
          {/* Social Media */}
          <div className="flex flex-col items-center text-center p-6 rounded-lg border border-white/5 bg-credping-black/40">
            <div className="bg-credping-green/10 p-4 rounded-full mb-4">
              <Users className="text-credping-green" size={24} />
            </div>
            <h3 className="text-xl font-medium mb-2">Social Media</h3>
            <div className="flex space-x-4 mt-2">
              <SocialLink icon={Linkedin} href="https://linkedin.com" tooltip="LinkedIn" />
              <SocialLink icon={Github} href="https://github.com" tooltip="GitHub" />
              <SocialLink icon={Twitter} href="https://twitter.com" tooltip="Twitter" />
            </div>
          </div>
        </div>
        
        {/* Contact Form */}
        <div className="max-w-xl mx-auto">
          <div className="bg-credping-black border border-white/10 rounded-lg p-8">
            <h3 className="text-2xl font-semibold mb-6">Send us a message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your name" required className="bg-credping-gray border-credping-green/20" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your@email.com" required className="bg-credping-gray border-credping-green/20" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Type your message here..." required className="bg-credping-gray border-credping-green/20 min-h-[120px]" />
              </div>
              
              <Button type="submit" className="w-full bg-credping-black border border-credping-green text-credping-green hover:bg-credping-green/10">
                Send Message
              </Button>
            </form>
          </div>
        </div>
        
        {/* Chat Support Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <Button 
            onClick={() => setShowChat(!showChat)}
            className={`rounded-full p-4 shadow-lg ${showChat ? 'bg-credping-green text-credping-black' : 'bg-credping-black border border-credping-green text-credping-green'}`}
          >
            <MessageSquare size={24} />
          </Button>
          
          {/* Chat Panel */}
          {showChat && (
            <div className="absolute bottom-16 right-0 w-80 bg-credping-black border border-white/10 rounded-lg shadow-xl animate-fade-in">
              <div className="p-4 border-b border-white/10">
                <h3 className="font-semibold text-credping-green">CredPing Support</h3>
              </div>
              
              <div className="p-4 h-64 overflow-y-auto flex flex-col space-y-3">
                <div className="bg-credping-gray rounded-lg p-3 max-w-[80%] self-start">
                  <p className="text-sm">How can I help you today?</p>
                </div>
              </div>
              
              <form onSubmit={handleChatSubmit} className="p-4 border-t border-white/10 flex gap-2">
                <Input 
                  placeholder="Type your question..." 
                  className="bg-credping-gray border-credping-green/20 flex-1"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                />
                <Button type="submit" className="bg-credping-green text-credping-black">
                  <Send size={16} />
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

interface SocialLinkProps {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  href: string;
  tooltip: string;
}

const SocialLink = ({ icon: Icon, href, tooltip }: SocialLinkProps) => (
  <HoverCard>
    <HoverCardTrigger asChild>
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-white hover:text-credping-green transition-colors"
      >
        <Icon size={24} />
      </a>
    </HoverCardTrigger>
    <HoverCardContent className="bg-credping-black border border-credping-green/30 text-white">
      <div className="text-sm">Visit our {tooltip}</div>
    </HoverCardContent>
  </HoverCard>
);

export default ContactUs;
