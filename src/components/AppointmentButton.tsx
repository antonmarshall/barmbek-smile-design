
import { Calendar } from 'lucide-react';

interface AppointmentButtonProps {
  isMobile?: boolean;
}

const AppointmentButton = ({ isMobile = false }: AppointmentButtonProps) => {
  return (
    <a
      href="#contact"
      className={`${
        isMobile ? 'w-full' : ''
      } btn-primary inline-flex items-center justify-center gap-2`}
    >
      <Calendar size={18} />
      <span>Termin vereinbaren</span>
    </a>
  );
};

export default AppointmentButton;
