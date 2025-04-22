
const Testimonials = () => {
  const testimonials = [
    {
      name: 'Julia K.',
      text: 'Ich hatte immer Angst vor dem Zahnarzt, aber das Team der Barmbek Smile Design Praxis hat mir diese komplett genommen. Sehr einfühlsam und professionell!',
    },
    {
      name: 'Markus S.',
      text: 'Die Behandlung war schmerzfrei und die Ergebnisse sind fantastisch. Das freundliche Team erklärt jeden Schritt und nimmt sich Zeit für individuelle Bedürfnisse.',
    },
    {
      name: 'Petra M.',
      text: 'Meine Kinder gehen gerne zum Zahnarzt, seit wir bei Barmbek Smile Design sind. Die kinderfreundliche Atmosphäre und das geduldige Personal machen den Unterschied.',
    }
  ];

  return (
    <div className="bg-white container-section">
      <h2 className="section-title">Das sagen unsere Patienten</h2>
      <p className="section-subtitle">
        Erfahren Sie, wie zufrieden unsere Patienten mit unseren Behandlungen und unserem Service sind.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <div 
            key={index} 
            className="p-6 rounded-lg bg-dental-blue-light/20 relative"
          >
            <div className="absolute top-4 left-4 text-5xl text-dental-blue opacity-20">"</div>
            <div className="relative z-10">
              <p className="italic text-gray-700 mb-4">{testimonial.text}</p>
              <p className="font-semibold text-dental-blue">{testimonial.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
