
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-credping-black/90 backdrop-blur-md border-b border-white/5 py-4 px-4 md:px-8">
      <div className="container max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Logo />
        </div>

        {/* Desktop Navigation */}
        {!isMobile && (
          <div className="flex gap-6 items-center">
            <NavLinks />
            <LoginButton />
          </div>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            className="text-white"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        )}
      </div>

      {/* Mobile Menu Drawer */}
      {isMobile && (
        <div 
          className={`fixed top-[68px] right-0 w-full h-screen bg-credping-black transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col p-6 gap-6">
            <NavLinks onClick={toggleMenu} />
            <LoginButton onClick={toggleMenu} />
          </div>
        </div>
      )}
    </nav>
  );
};

const Logo = () => (
  <a href="/" className="flex items-center gap-2 font-orbitron font-bold text-xl md:text-2xl text-white">
    <span>Cred</span>
    <div className="relative">
      <span className="text-credping-green">Ping</span>
      <span className="absolute -right-2 -top-1 w-2 h-2 bg-credping-green rounded-full animate-ping opacity-75"></span>
      <span className="absolute -right-2 -top-1 w-2 h-2 bg-credping-green rounded-full"></span>
    </div>
  </a>
);

interface NavLinksProps {
  onClick?: () => void;
}

const NavLinks = ({ onClick }: NavLinksProps) => (
  <ul className="flex md:flex-row flex-col md:items-center gap-8">
    {['Home', 'Detection', 'About', 'Contact'].map((item) => (
      <li key={item}>
        <a 
          href={`#${item.toLowerCase()}`} 
          className="nav-link" 
          onClick={onClick}
        >
          {item}
        </a>
      </li>
    ))}
  </ul>
);

interface LoginButtonProps {
  onClick?: () => void;
}

const LoginButton = ({ onClick }: LoginButtonProps) => (
  <a 
    href="/login" 
    className="px-4 py-2 rounded border border-credping-green text-credping-green hover:bg-credping-green/10 transition-colors"
    onClick={onClick}
  >
    Login
  </a>
);

export default Navbar;
