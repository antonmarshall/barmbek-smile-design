
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const ContactSection = () => {
  const openingHours = [
    { day: 'Montag', hours: '8:00 - 18:00' },
    { day: 'Dienstag', hours: '8:00 - 18:00' },
    { day: 'Mittwoch', hours: '8:00 - 16:00' },
    { day: 'Donnerstag', hours: '8:00 - 18:00' },
    { day: 'Freitag', hours: '8:00 - 14:00' }
  ];

  return (
    <div id="contact" className="bg-dental-blue-light/30 container-section">
      <h2 className="section-title">Kontakt & Termine</h2>
      <p className="section-subtitle">
        Vereinbaren Sie einen Termin oder kontaktieren Sie uns bei Fragen zu unseren Leistungen.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Contact info */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800">Kontaktinformationen</h3>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <Phone className="text-dental-blue mr-4 mt-1" size={20} />
              <div>
                <p className="font-medium text-gray-800">Telefon</p>
                <p className="text-gray-600">040 12345678</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Mail className="text-dental-blue mr-4 mt-1" size={20} />
              <div>
                <p className="font-medium text-gray-800">E-Mail</p>
                <p className="text-gray-600">info@barmbek-smile-design.de</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <MapPin className="text-dental-blue mr-4 mt-1" size={20} />
              <div>
                <p className="font-medium text-gray-800">Anschrift</p>
                <p className="text-gray-600">Beispielstraße 123<br />22083 Hamburg-Barmbek</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Clock className="text-dental-blue mr-4 mt-1" size={20} />
              <div>
                <p className="font-medium text-gray-800 mb-2">Sprechzeiten</p>
                <div className="grid grid-cols-2 gap-1">
                  {openingHours.map((item, index) => (
                    <div key={index} className="flex justify-between col-span-2">
                      <span className="text-gray-600">{item.day}</span>
                      <span className="text-gray-600">{item.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Map */}
        <div className="bg-white p-8 rounded-lg shadow-md flex flex-col">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800">Lage & Anfahrt</h3>
          
          <div className="flex-grow rounded-lg overflow-hidden border border-gray-200">
            <iframe
              className="w-full h-full"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d37890.58457842634!2d10.008628621731265!3d53.58222462644861!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b18ec7a1499091%3A0x426f7ec5e5e00e0!2sBarmbek-Nord%2C%20Hamburg!5e0!3m2!1sen!2sde!4v1713889242034!5m2!1sen!2sde"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Praxisstandort auf Google Maps"
            ></iframe>
          </div>
          
          <div className="mt-6">
            <p className="text-gray-600 mb-4">
              Unsere Praxis ist gut mit öffentlichen Verkehrsmitteln erreichbar. Die U-Bahn Station Barmbek ist nur wenige Gehminuten entfernt.
            </p>
            <a
              href="https://maps.google.com/?q=Hamburg+Barmbek"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center"
            >
              Route planen
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
