import { InfrastructureProject } from '../types/infrastructure';

// Sample data - dalam implementasi sebenarnya, data ini akan berasal dari API
export const infrastructureProjects: InfrastructureProject[] = [
  {
    id: '1',
    name: 'Taman Hijau Jakarta Selatan',
    location: 'Jakarta Selatan, DKI Jakarta',
    lat: -6.2608,
    lng: 106.7817,
    year: 2023,
    description: 'Pembangunan taman hijau dengan sistem pengolahan air hujan terintegrasi dan panel surya untuk mendukung keberlanjutan lingkungan di area perkotaan.',
    timeline: {
      start: '2023-01-15',
      end: '2023-12-20',
      status: 'completed'
    },
    budget: 'Rp 2.5 Miliar',
    images: [
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=400&h=300&fit=crop'
    ],
    technicalAssistance: {
      name: 'Dr. Ahmad Susanto',
      phone: '+62 812-3456-7890',
      email: 'ahmad.susanto@kemenlh.go.id'
    },
    achievements: [
      'Pengurangan 40% konsumsi air',
      'Peningkatan 60% area hijau',
      'Penyerapan 500 ton CO2/tahun',
      'Edukasi 2,000+ masyarakat'
    ]
  },
  {
    id: '2',
    name: 'Smart Green Building Surabaya',
    location: 'Surabaya, Jawa Timur',
    lat: -7.2575,
    lng: 112.7521,
    year: 2024,
    description: 'Gedung ramah lingkungan dengan vertical garden dan sistem energi terbarukan yang terintegrasi untuk menciptakan lingkungan kerja yang berkelanjutan.',
    timeline: {
      start: '2024-03-01',
      end: '2024-11-30',
      status: 'ongoing'
    },
    budget: 'Rp 5.2 Miliar',
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop'
    ],
    technicalAssistance: {
      name: 'Ir. Siti Nurhaliza, M.T.',
      phone: '+62 813-7890-1234',
      email: 'siti.nurhaliza@kemenlh.go.id'
    },
    achievements: [
      'Efisiensi energi 70%',
      'Pengurangan emisi 55%',
      'Sertifikasi Green Building',
      'Penghematan biaya operasional 45%'
    ]
  },
  {
    id: '3',
    name: 'Eco-Park Bandung',
    location: 'Bandung, Jawa Barat',
    lat: -6.9175,
    lng: 107.6191,
    year: 2022,
    description: 'Taman ekologi dengan fasilitas edukasi lingkungan dan teknologi hijau yang menjadi pusat pembelajaran berkelanjutan untuk masyarakat.',
    timeline: {
      start: '2022-06-10',
      end: '2023-05-15',
      status: 'completed'
    },
    budget: 'Rp 3.8 Miliar',
    images: [
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=400&h=300&fit=crop'
    ],
    technicalAssistance: {
      name: 'Prof. Dr. Bambang Setiawan',
      phone: '+62 814-5678-9012',
      email: 'bambang.setiawan@kemenlh.go.id'
    },
    achievements: [
      'Edukasi 10,000+ pengunjung/tahun',
      'Konservasi 150+ spesies tanaman',
      'Pengurangan polusi udara 30%',
      'Program sekolah hijau untuk 50+ sekolah'
    ]
  },
  {
    id: '4',
    name: 'Green Infrastructure Medan',
    location: 'Medan, Sumatera Utara',
    lat: 3.5952,
    lng: 98.6722,
    year: 2023,
    description: 'Infrastruktur hijau terintegrasi dengan sistem drainase berkelanjutan untuk mengurangi risiko banjir dan meningkatkan kualitas lingkungan urban.',
    timeline: {
      start: '2023-08-01',
      end: '2024-06-30',
      status: 'ongoing'
    },
    budget: 'Rp 4.1 Miliar',
    images: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop'
    ],
    technicalAssistance: {
      name: 'Drs. Eko Prasetyo, M.Sc.',
      phone: '+62 815-2345-6789',
      email: 'eko.prasetyo@kemenlh.go.id'
    },
    achievements: [
      'Pengurangan banjir 80%',
      'Peningkatan kualitas air 65%',
      'Penciptaan 500 lapangan kerja',
      'Peningkatan biodiversitas lokal 40%'
    ]
  },
  {
    id: '5',
    name: 'Mangrove Conservation Bali',
    location: 'Denpasar, Bali',
    lat: -8.6500,
    lng: 115.2167,
    year: 2022,
    description: 'Program konservasi mangrove dengan pendekatan infrastruktur hijau untuk melindungi pantai dan ekosistem laut di wilayah pesisir Bali.',
    timeline: {
      start: '2022-09-01',
      end: '2023-08-30',
      status: 'completed'
    },
    budget: 'Rp 2.8 Miliar',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop'
    ],
    technicalAssistance: {
      name: 'Dr. I Made Suryana',
      phone: '+62 816-9876-5432',
      email: 'suryana@kemenlh.go.id'
    },
    achievements: [
      'Penanaman 25,000 bibit mangrove',
      'Perlindungan 15 km garis pantai',
      'Peningkatan populasi ikan 70%',
      'Pemberdayaan 200 nelayan lokal'
    ]
  },
  {
    id: '6',
    name: 'Urban Forest Makassar',
    location: 'Makassar, Sulawesi Selatan',
    lat: -5.1477,
    lng: 119.4327,
    year: 2024,
    description: 'Pembangunan hutan kota dengan teknologi smart irrigation dan monitoring lingkungan real-time untuk menciptakan ruang hijau terbuka yang berkelanjutan.',
    timeline: {
      start: '2024-01-10',
      end: '2024-12-15',
      status: 'ongoing'
    },
    budget: 'Rp 3.2 Miliar',
    images: [
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop'
    ],
    technicalAssistance: {
      name: 'Ir. Nurhayati Salim, M.T.',
      phone: '+62 817-1234-5678',
      email: 'nurhayati.salim@kemenlh.go.id'
    },
    achievements: [
      'Penanaman 5,000 pohon endemik',
      'Monitoring kualitas udara real-time',
      'Fasilitas olahraga ramah lingkungan',
      'Program edukasi lingkungan mingguan'
    ]
  }
];

// Fungsi helper untuk mendapatkan data berdasarkan filter
export const getProjectsByYear = (year: number | null): InfrastructureProject[] => {
  if (year === null) {
    return infrastructureProjects;
  }
  return infrastructureProjects.filter(project => project.year === year);
};

export const getAvailableYears = (): number[] => {
  const years = infrastructureProjects.map(project => project.year);
  return [...new Set(years)].sort((a, b) => b - a);
};

export const getProjectById = (id: string): InfrastructureProject | undefined => {
  return infrastructureProjects.find(project => project.id === id);
};

export const getProjectsByStatus = (status: 'completed' | 'ongoing' | 'planned'): InfrastructureProject[] => {
  return infrastructureProjects.filter(project => project.timeline.status === status);
};
