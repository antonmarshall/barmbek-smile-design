
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import AppointmentButton from './AppointmentButton';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Startseite', href: '#home' },
    { name: 'Leistungen', href: '#services' },
    { name: 'Team', href: '#team' },
    { name: 'Kontakt', href: '#contact' }
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <a href="#home" className="flex items-center">
              <span className="text-2xl font-bold text-dental-blue">Barmbek Smile Design</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-dental-blue font-medium transition-colors 
                         hover:underline hover:underline-offset-8 decoration-dental-blue decoration-2"
              >
                {item.name}
              </a>
            ))}
            <AppointmentButton />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-dental-blue focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-gray-700 hover:text-dental-blue hover:bg-dental-blue-light 
                         rounded-md font-medium transition-colors"
              >
                {item.name}
              </a>
            ))}
            <div className="px-3 py-2">
              <AppointmentButton isMobile={true} />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
