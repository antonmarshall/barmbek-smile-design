
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-4">Barmbek Smile Design</h3>
            <p className="text-gray-300 mb-4">
              Ihre Zahnarztpraxis für die ganze Familie in Hamburg-Barmbek. 
              Wir legen Wert auf eine angenehme Atmosphäre und moderne Behandlungsmethoden.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Schnelllinks</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-300 hover:text-dental-blue transition-colors">Startseite</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-dental-blue transition-colors">Leistungen</a></li>
              <li><a href="#team" className="text-gray-300 hover:text-dental-blue transition-colors">Team</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-dental-blue transition-colors">Kontakt</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Rechtliches</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-dental-blue transition-colors">Impressum</a></li>
              <li><a href="#" className="text-gray-300 hover:text-dental-blue transition-colors">Datenschutz</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 mt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
          <p>© {currentYear} Barmbek Smile Design. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
