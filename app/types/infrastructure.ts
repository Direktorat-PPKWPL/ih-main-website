export interface InfrastructureProject {
  id: string;
  name: string;
  location: string;
  lat: number;
  lng: number;
  year: number;
  description: string;
  timeline: {
    start: string;
    end: string;
    status: 'completed' | 'ongoing' | 'planned';
  };
  budget: string;
  images: string[];
  technicalAssistance: {
    name: string;
    phone: string;
    email: string;
  };
  achievements: string[];
}

export interface MapFilterProps {
  selectedYear: number | null;
  onYearChange: (year: number | null) => void;
  availableYears: number[];
}

export interface ProjectModalProps {
  project: InfrastructureProject | null;
  isOpen: boolean;
  onClose: () => void;
}
