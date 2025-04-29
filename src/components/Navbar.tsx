
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Handle scroll to section from navigation - improved for smooth scrolling
  const scrollToSection = (sectionId: string) => {
    // Close mobile menu if open
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
    
    // If we're not on the home page, navigate there first
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
      return;
    }
    
    // If already on home page, scroll to the section with enhanced smooth behavior
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Handle navigation to Detection or About page
  const navigateToPage = (path: string) => {
    // Close mobile menu if open
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
    
    // Navigate to the specified page and scroll to top
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle URL with hashtag for direct section navigation
  useEffect(() => {
    // Check for location state with scrollTo parameter
    if (location.state && location.state.scrollTo) {
      const sectionId = location.state.scrollTo;
      const element = document.getElementById(sectionId);
      if (element) {
        // Wait a bit for the page to render properly
        setTimeout(() => {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
          // Clear the state so it doesn't re-scroll on page refresh
          navigate('/', { replace: true, state: {} });
        }, 100);
      }
    }
    
    // Also handle direct URL with hash
    if (location.hash && location.pathname === '/') {
      const id = location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }, 100);
      }
    }
  }, [location, navigate]);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-credping-black/90 backdrop-blur-md border-b border-white/5 py-4 px-4 md:px-8">
      <div className="container max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Logo />
        </div>

        {/* Desktop Navigation */}
        {!isMobile && (
          <div className="flex gap-6 items-center">
            <NavLinks 
              currentPath={location.pathname} 
              scrollToSection={scrollToSection}
              navigateToPage={navigateToPage}
            />
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
            <NavLinks 
              currentPath={location.pathname} 
              scrollToSection={scrollToSection}
              navigateToPage={navigateToPage}
              onClick={toggleMenu}
            />
            <LoginButton onClick={toggleMenu} />
          </div>
        </div>
      )}
    </nav>
  );
};

const Logo = () => (
  <Link to="/" className="flex items-center gap-2 font-orbitron font-bold text-xl md:text-2xl text-white">
    <span>Cred</span>
    <div className="relative">
      <span className="text-credping-green">Ping</span>
      <span className="absolute -right-2 -top-1 w-2 h-2 bg-credping-green rounded-full animate-ping opacity-75"></span>
      <span className="absolute -right-2 -top-1 w-2 h-2 bg-credping-green rounded-full"></span>
    </div>
  </Link>
);

interface NavLinksProps {
  currentPath: string;
  scrollToSection: (sectionId: string) => void;
  navigateToPage: (path: string) => void;
  onClick?: () => void;
}

const NavLinks = ({ currentPath, scrollToSection, navigateToPage, onClick }: NavLinksProps) => {
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Detection', path: '/detection' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/#contact' },
  ];

  return (
    <ul className="flex md:flex-row flex-col md:items-center gap-8">
      {navItems.map((item) => {
        // Determine if this is a hash link on the home page
        const isHashLink = item.path.includes('#');
        const isDirectPage = !isHashLink && item.path !== '/';
        
        // For regular paths, check if current path starts with item path
        // For hash links, check if we're on the home page
        const isActive = isHashLink 
          ? currentPath === '/' 
          : currentPath === item.path;
          
        return (
          <li key={item.name}>
            {isHashLink ? (
              <a 
                href={item.path}
                className={`nav-link transition-colors duration-200 ${isActive ? 'text-credping-green' : 'text-white hover:text-credping-green'}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.path.split('#')[1]);
                  if (onClick) onClick();
                }}
              >
                {item.name}
              </a>
            ) : isDirectPage ? (
              <a
                href={item.path}
                className={`nav-link transition-colors duration-200 ${currentPath === item.path ? 'text-credping-green' : 'text-white hover:text-credping-green'}`}
                onClick={(e) => {
                  e.preventDefault();
                  navigateToPage(item.path);
                  if (onClick) onClick();
                }}
              >
                {item.name}
              </a>
            ) : (
              <Link 
                to={item.path} 
                className={`nav-link transition-colors duration-200 ${isActive ? 'text-credping-green' : 'text-white hover:text-credping-green'}`}
                onClick={onClick}
              >
                {item.name}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
};

interface LoginButtonProps {
  onClick?: () => void;
}

const LoginButton = ({ onClick }: LoginButtonProps) => (
  <Link 
    to="/login" 
    className="px-4 py-2 rounded border border-credping-green text-credping-green hover:bg-credping-green/10 transition-colors"
    onClick={onClick}
  >
    Login
  </Link>
);

export default Navbar;
