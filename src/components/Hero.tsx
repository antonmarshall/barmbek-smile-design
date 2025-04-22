
import AppointmentButton from './AppointmentButton';

const Hero = () => {
  return (
    <div id="home" className="relative pt-20 md:pt-0">
      {/* Hero image */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-r from-dental-blue-light/80 to-dental-blue-light/40">
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1588776814546-daab30f310ce?q=80&w=2574&auto=format&fit=crop')] 
                        bg-cover bg-center opacity-30"></div>
        </div>
      </div>
      
      {/* Hero content */}
      <div className="relative z-10 min-h-[85vh] flex flex-col justify-center items-center container-section">
        <div className="text-center max-w-4xl animate-fade-in">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Ihr Lächeln in besten Händen
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 mx-auto max-w-2xl">
            Willkommen in unserer modernen Zahnarztpraxis in Hamburg-Barmbek. Wir bieten professionelle zahnmedizinische Versorgung für die ganze Familie.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <AppointmentButton />
            <a 
              href="#services" 
              className="px-6 py-3 rounded-full bg-white text-dental-blue border-2 border-dental-blue 
                      font-medium transition-all duration-300 hover:bg-dental-blue-light"
            >
              Unsere Leistungen
            </a>
          </div>
        </div>
      </div>
      
      {/* Curved divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="w-full h-auto">
          <path 
            fill="#ffffff" 
            fillOpacity="1" 
            d="M0,64L60,58.7C120,53,240,43,360,42.7C480,43,600,53,720,58.7C840,64,960,64,1080,56C1200,48,1320,32,1380,24L1440,16L1440,100L1380,100C1320,100,1200,100,1080,100C960,100,840,100,720,100C600,100,480,100,360,100C240,100,120,100,60,100L0,100Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;
