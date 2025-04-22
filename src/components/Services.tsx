
import { Tooth, Clock, Users, Image } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Tooth size={32} className="text-dental-blue" />,
      title: 'Prophylaxe & Vorsorge',
      description: 'Regelmäßige Kontrollen und professionelle Zahnreinigung für ein gesundes Lächeln und zur Vorbeugung von Zahnerkrankungen.'
    },
    {
      icon: <Image size={32} className="text-dental-blue" />,
      title: 'Ästhetische Zahnheilkunde',
      description: 'Verbessern Sie Ihr Lächeln mit unseren ästhetischen Behandlungen wie Bleaching, Veneers und hochwertigen Füllungen.'
    },
    {
      icon: <Users size={32} className="text-dental-blue" />,
      title: 'Kinderzahnheilkunde',
      description: 'Kinderfreundliche Behandlungen in entspannter Atmosphäre. Wir nehmen uns Zeit, um Ihren Kindern die Angst zu nehmen.'
    },
    {
      icon: <Clock size={32} className="text-dental-blue" />,
      title: 'Implantologie',
      description: 'Modernste Implantatlösungen für den dauerhaften Zahnersatz, der natürlich aussieht und sich auch so anfühlt.'
    }
  ];

  return (
    <div id="services" className="bg-white container-section">
      <h2 className="section-title">Unsere Leistungen</h2>
      <p className="section-subtitle">
        In unserer Praxis bieten wir ein breites Spektrum zahnmedizinischer Leistungen an, die auf Ihre individuellen Bedürfnisse zugeschnitten sind.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <div 
            key={index} 
            className="p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md 
                    transition-shadow bg-white flex flex-col items-center text-center"
          >
            <div className="mb-4 p-3 bg-dental-blue-light rounded-full">
              {service.icon}
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">{service.title}</h3>
            <p className="text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <a 
          href="#contact" 
          className="btn-primary inline-flex items-center justify-center"
        >
          Fragen zu unseren Leistungen?
        </a>
      </div>
    </div>
  );
};

export default Services;
