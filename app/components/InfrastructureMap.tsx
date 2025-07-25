"use client";

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { InfrastructureProject } from '../types/infrastructure';
import { infrastructureProjects, getProjectsByYear, getAvailableYears } from '../data/infrastructureData';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const greenIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 41" width="25" height="41">
      <path d="M12.5,0C5.6,0,0,5.6,0,12.5c0,12.5,12.5,28.5,12.5,28.5s12.5-16,12.5-28.5C25,5.6,19.4,0,12.5,0z" 
            fill="#059669" stroke="#ffffff" stroke-width="1"/>
      <circle cx="12.5" cy="12.5" r="6" fill="#ffffff"/>
      <path d="M12.5 8l1.5 3h3l-2.5 2 1 3-3-2-3 2 1-3-2.5-2h3z" fill="#059669"/>
    </svg>
  `),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41],
  shadowAnchor: [12, 41]
});

interface InfrastructureMapProps {
  className?: string;
}

export default function InfrastructureMap({ className = '' }: InfrastructureMapProps) {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [filteredProjects, setFilteredProjects] = useState<InfrastructureProject[]>(infrastructureProjects);
  const [imageIndexes, setImageIndexes] = useState<Record<string, number>>({});

  useEffect(() => {
    setFilteredProjects(getProjectsByYear(selectedYear));
  }, [selectedYear]);

  const years = getAvailableYears();

  const handleMarkerClick = (project: InfrastructureProject) => {
    setImageIndexes(prev => ({ ...prev, [project.id]: 0 }));
  };

  const nextImage = (projectId: string, totalImages: number) => {
    setImageIndexes(prev => {
      const currentIndex = prev[projectId] || 0;
      return {
        ...prev,
        [projectId]: currentIndex === totalImages - 1 ? 0 : currentIndex + 1
      };
    });
  };

  const prevImage = (projectId: string, totalImages: number) => {
    setImageIndexes(prev => {
      const currentIndex = prev[projectId] || 0;
      return {
        ...prev,
        [projectId]: currentIndex === 0 ? totalImages - 1 : currentIndex - 1
      };
    });
  };

  const setImageIndex = (projectId: string, index: number) => {
    setImageIndexes(prev => ({ ...prev, [projectId]: index }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'ongoing': return 'text-orange-600 bg-orange-100';
      case 'planned': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Selesai';
      case 'ongoing': return 'Berlangsung';
      case 'planned': return 'Direncanakan';
      default: return 'Unknown';
    }
  };

  return (
    <div className={`w-full font-sans ${className}`}>
      <style jsx global>{`
        .custom-popup .leaflet-popup-content-wrapper {
          border-radius: 12px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          border: 1px solid #e5e7eb;
          overflow: hidden;
        }
        .custom-popup .leaflet-popup-content {
          margin: 0;
          padding: 0;
          width: 320px !important;
          max-height: 400px;
          overflow-y: auto;
          font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
        }
        .custom-popup .leaflet-popup-tip {
          background: white;
          border: 1px solid #e5e7eb;
        }
        .custom-popup .leaflet-popup-close-button {
          color: #6b7280;
          font-size: 18px;
          font-weight: bold;
          width: 24px;
          height: 24px;
          background: #f3f4f6;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          top: 8px;
          right: 8px;
          padding: 0;
          border: none;
          transition: all 0.2s;
        }
        .custom-popup .leaflet-popup-close-button:hover {
          background: #e5e7eb;
          color: #374151;
        }
        
        /* Custom scrollbar for popup */
        .custom-popup .leaflet-popup-content::-webkit-scrollbar {
          width: 6px;
        }
        .custom-popup .leaflet-popup-content::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 3px;
        }
        .custom-popup .leaflet-popup-content::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }
        .custom-popup .leaflet-popup-content::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
        
        /* Gallery navigation buttons */
        .gallery-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0, 0, 0, 0.6);
          color: white;
          border: none;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          z-index: 10;
        }
        .gallery-nav-btn:hover {
          background: rgba(0, 0, 0, 0.8);
        }
        .gallery-nav-btn.left {
          left: 8px;
        }
        .gallery-nav-btn.right {
          right: 8px;
        }
        
        /* Gallery indicators */
        .gallery-indicators {
          position: absolute;
          bottom: 8px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 6px;
          z-index: 10;
        }
        .gallery-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          cursor: pointer;
          transition: all 0.2s;
        }
        .gallery-indicator.active {
          background: white;
        }
        
        /* Gallery counter */
        .gallery-counter {
          position: absolute;
          top: 8px;
          right: 8px;
          background: rgba(0, 0, 0, 0.6);
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          z-index: 10;
        }
      `}</style>
      
      {/* Filter Section */}
      <div className="mb-4 md:mb-6">
        <h3 className="text-base md:text-lg font-semibold text-teal-800 mb-3 md:mb-4 px-2 md:px-0">
          Filter berdasarkan Tahun
        </h3>
        <div className="flex flex-wrap gap-2 md:gap-3 px-2 md:px-0">
          <button
            onClick={() => setSelectedYear(null)}
            className={`px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-200 ${
              selectedYear === null
                ? 'bg-orange-600 text-white shadow-md border-2 border-orange-600'
                : 'bg-white text-gray-700 border-2 border-gray-300 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-300'
            }`}
          >
            Semua Tahun
          </button>
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-200 ${
                selectedYear === year
                  ? 'bg-orange-600 text-white shadow-md border-2 border-orange-600'
                  : 'bg-white text-gray-700 border-2 border-gray-300 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-300'
              }`}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      {/* Map Container */}
      <div className="relative px-2 md:px-0">
        <div 
          className="h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-lg md:rounded-xl overflow-hidden shadow-lg border border-gray-200"
        >
          <MapContainer
            center={[-2.5489, 118.0149]} 
            zoom={5}
            style={{ height: '100%', width: '100%' }}
            className="z-10 leaflet-container"
            scrollWheelZoom={false}
            touchZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filteredProjects.map((project) => (
              <Marker
                key={project.id}
                position={[project.lat, project.lng]}
                icon={greenIcon}
                eventHandlers={{
                  click: () => handleMarkerClick(project),
                }}
              >
                <Popup maxWidth={340} className="custom-popup">
                  <div className="font-sans">
                    {/* Header */}
                    <div className="p-4 bg-teal-50 border-b border-gray-200">
                      <h3 className="text-lg font-bold text-teal-800 mb-1">{project.name}</h3>
                      <p className="text-sm text-gray-700 font-medium mb-2">{project.location}</p>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.timeline.status)}`}>
                        {getStatusText(project.timeline.status)}
                      </span>
                    </div>

                    {/* Scrollable Content */}
                    <div className="p-4 space-y-4">
                      <div className="relative">
                        <img
                          src={project.images[imageIndexes[project.id] || 0]}
                          alt={`${project.name} - Image ${(imageIndexes[project.id] || 0) + 1}`}
                          className="w-full h-40 object-cover rounded-lg"
                        />
                        {project.images.length > 1 && (
                          <>
                            <button
                              onClick={() => prevImage(project.id, project.images.length)}
                              className="gallery-nav-btn left"
                            >
                              <span className="text-lg font-bold">‹</span>
                            </button>
                            <button
                              onClick={() => nextImage(project.id, project.images.length)}
                              className="gallery-nav-btn right"
                            >
                              <span className="text-lg font-bold">›</span>
                            </button>
                            <div className="gallery-indicators">
                              {project.images.map((_, index) => (
                                <button
                                  key={index}
                                  onClick={() => setImageIndex(project.id, index)}
                                  className={`gallery-indicator ${index === (imageIndexes[project.id] || 0) ? 'active' : ''}`}
                                />
                              ))}
                            </div>
                            <div className="gallery-counter">
                              {(imageIndexes[project.id] || 0) + 1}/{project.images.length}
                            </div>
                          </>
                        )}
                      </div>

                      {/* Description */}
                      <div>
                        <h4 className="font-semibold text-teal-800 mb-2 text-sm">Deskripsi</h4>
                        <p className="text-gray-700 text-sm leading-relaxed">{project.description}</p>
                      </div>

                      {/* Timeline */}
                      <div>
                        <h4 className="font-semibold text-teal-800 mb-2 text-sm">Timeline</h4>
                        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-600">Mulai</span>
                            <span className="text-sm font-semibold text-gray-800">{new Date(project.timeline.start).toLocaleDateString('id-ID')}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Selesai</span>
                            <span className="text-sm font-semibold text-gray-800">{new Date(project.timeline.end).toLocaleDateString('id-ID')}</span>
                          </div>
                        </div>
                      </div>

                      {/* Budget */}
                      <div>
                        <h4 className="font-semibold text-teal-800 mb-2 text-sm">Anggaran</h4>
                        <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                          <span className="text-sm font-bold text-orange-600">{project.budget}</span>
                        </div>
                      </div>

                      {/* Achievements */}
                      <div>
                        <h4 className="font-semibold text-teal-800 mb-2 text-sm">Capaian</h4>
                        <ul className="space-y-2">
                          {project.achievements.map((achievement, index) => (
                            <li key={index} className="flex items-start text-sm text-gray-700">
                              <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                              <span className="leading-relaxed">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Technical Assistance */}
                      <div>
                        <h4 className="font-semibold text-teal-800 mb-2 text-sm">Kontak</h4>
                        <div className="bg-teal-50 p-3 rounded-lg border border-teal-200">
                          <p className="font-semibold text-teal-800 text-sm mb-1">{project.technicalAssistance.name}</p>
                          <p className="text-sm text-gray-600 mb-1">
                            📞 {project.technicalAssistance.phone}
                          </p>
                          <p className="text-sm text-gray-600">
                            📧 {project.technicalAssistance.email}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Statistics */}
        <div className="mt-4 md:mt-6 grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 px-2 md:px-0">
          <div className="bg-white p-3 md:p-4 rounded-lg shadow-md text-center border border-gray-100">
            <div className="text-xl md:text-2xl font-bold text-green-600">{filteredProjects.length}</div>
            <div className="text-xs md:text-sm text-gray-700 font-medium">Total Proyek</div>
          </div>
          <div className="bg-white p-3 md:p-4 rounded-lg shadow-md text-center border border-gray-100">
            <div className="text-xl md:text-2xl font-bold text-orange-600">
              {filteredProjects.filter(p => p.timeline.status === 'completed').length}
            </div>
            <div className="text-xs md:text-sm text-gray-700 font-medium">Selesai</div>
          </div>
          <div className="bg-white p-3 md:p-4 rounded-lg shadow-md text-center border border-gray-100">
            <div className="text-xl md:text-2xl font-bold text-blue-600">
              {filteredProjects.filter(p => p.timeline.status === 'ongoing').length}
            </div>
            <div className="text-xs md:text-sm text-gray-700 font-medium">Berlangsung</div>
          </div>
          <div className="bg-white p-3 md:p-4 rounded-lg shadow-md text-center border border-gray-100">
            <div className="text-xl md:text-2xl font-bold text-teal-600">15+</div>
            <div className="text-xs md:text-sm text-gray-700 font-medium">Provinsi</div>
          </div>
        </div>
      </div>
    </div>
  );
}
