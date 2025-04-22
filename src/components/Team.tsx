
const Team = () => {
  const teamMembers = [
    {
      name: 'Dr. Anna Schmidt',
      title: 'Zahnärztin',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop',
      description: 'Spezialisiert auf ästhetische Zahnheilkunde und Kinderzahnheilkunde.'
    },
    {
      name: 'Dr. Thomas Meyer',
      title: 'Zahnarzt',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=2564&auto=format&fit=crop',
      description: 'Experte für Implantologie und chirurgische Eingriffe.'
    },
    {
      name: 'Maria Wagner',
      title: 'Zahnmedizinische Fachangestellte',
      image: 'https://images.unsplash.com/photo-1619895862022-09114b41f16f?q=80&w=2070&auto=format&fit=crop',
      description: 'Verantwortlich für die Prophylaxe und Patientenbetreuung.'
    }
  ];

  return (
    <div id="team" className="bg-dental-blue-light/30 container-section">
      <h2 className="section-title">Unser Team</h2>
      <p className="section-subtitle">
        Lernen Sie unser erfahrenes und freundliches Praxisteam kennen, das sich auf Ihre Gesundheit und Ihr Wohlbefinden konzentriert.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {teamMembers.map((member, index) => (
          <div 
            key={index} 
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow group"
          >
            <div className="relative overflow-hidden h-64">
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
              <p className="text-dental-blue font-medium mb-2">{member.title}</p>
              <p className="text-gray-600">{member.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
