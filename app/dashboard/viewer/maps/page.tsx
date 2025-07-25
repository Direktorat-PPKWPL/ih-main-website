import { cookies } from 'next/headers';
import { verifyAccessToken } from '@/lib/auth';
import { redirect } from 'next/navigation';
import NewDashboardLayout from '@/app/components/NewDashboardLayout';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { MapPin, Search, Filter, Layers, ZoomIn, ZoomOut, Navigation, TreePine, Building, Users, Ruler, Info, Eye, Maximize } from 'lucide-react';

export default async function MapsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;

  if (!token) {
    redirect('/login');
  }

  const user = verifyAccessToken(token);
  if (!user || user.role !== 'Low') {
    redirect('/login');
  }

  // Mock data untuk lokasi infrastruktur
  const mapLocations = [
    {
      id: 1,
      name: 'Taman Kota Jakarta Pusat',
      type: 'Taman Kota',
      coordinates: { lat: -6.1751, lng: 106.8650 },
      status: 'Aktif',
      area: '2.5 ha',
      visitors: 1500,
      description: 'Taman kota dengan fasilitas lengkap'
    },
    {
      id: 2,
      name: 'Green Corridor Sudirman',
      type: 'Koridor Hijau',
      coordinates: { lat: -6.2088, lng: 106.8456 },
      status: 'Dalam Pembangunan',
      area: '5.2 km',
      visitors: 2800,
      description: 'Koridor hijau sepanjang Jalan Sudirman'
    },
    {
      id: 3,
      name: 'Hutan Kota Senayan',
      type: 'Hutan Kota',
      coordinates: { lat: -6.2250, lng: 106.8000 },
      status: 'Aktif',
      area: '3.7 ha',
      visitors: 800,
      description: 'Area konservasi dengan keanekaragaman hayati'
    },
    {
      id: 4,
      name: 'Roof Garden Plaza Indonesia',
      type: 'Roof Garden',
      coordinates: { lat: -6.1928, lng: 106.8230 },
      status: 'Aktif',
      area: '0.8 ha',
      visitors: 1200,
      description: 'Taman atap dengan konsep modern'
    },
    {
      id: 5,
      name: 'Vertical Garden Menteng',
      type: 'Vertical Garden',
      coordinates: { lat: -6.1944, lng: 106.8294 },
      status: 'Maintenance',
      area: '200 m²',
      visitors: 300,
      description: 'Sistem taman vertikal hidroponik'
    }
  ];

  const mapLayers = [
    { id: 'satellite', name: 'Satelit', active: false },
    { id: 'terrain', name: 'Terrain', active: false },
    { id: 'traffic', name: 'Lalu Lintas', active: false },
    { id: 'air-quality', name: 'Kualitas Udara', active: true },
    { id: 'green-coverage', name: 'Cakupan Hijau', active: true }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Taman Kota': return 'bg-teal-600';
      case 'Hutan Kota': return 'bg-teal-700';
      case 'Koridor Hijau': return 'bg-blue-600';
      case 'Roof Garden': return 'bg-orange-600';
      case 'Vertical Garden': return 'bg-orange-600';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aktif': return 'text-teal-600';
      case 'Dalam Pembangunan': return 'text-blue-600';
      case 'Maintenance': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <NewDashboardLayout 
      user={{ email: user.email, role: user.role }} 
      title="Peta Infrastruktur"
    >
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <MapPin className="h-8 w-8 text-green-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Peta Infrastruktur Hijau</h1>
                <p className="text-gray-600">Visualisasi sebaran infrastruktur hijau Jakarta</p>
              </div>
            </div>
            <Button variant="outline">
              <Maximize className="h-4 w-4 mr-2" />
              Fullscreen
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Map Controls & Filters */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search & Filter */}
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Pencarian & Filter</h3>
                
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Cari lokasi..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tipe Infrastruktur</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm">
                      <option value="">Semua Tipe</option>
                      <option value="Taman Kota">Taman Kota</option>
                      <option value="Hutan Kota">Hutan Kota</option>
                      <option value="Koridor Hijau">Koridor Hijau</option>
                      <option value="Roof Garden">Roof Garden</option>
                      <option value="Vertical Garden">Vertical Garden</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm">
                      <option value="">Semua Status</option>
                      <option value="Aktif">Aktif</option>
                      <option value="Dalam Pembangunan">Dalam Pembangunan</option>
                      <option value="Maintenance">Maintenance</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Wilayah</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm">
                      <option value="">Semua Wilayah</option>
                      <option value="Jakarta Pusat">Jakarta Pusat</option>
                      <option value="Jakarta Selatan">Jakarta Selatan</option>
                      <option value="Jakarta Utara">Jakarta Utara</option>
                      <option value="Jakarta Timur">Jakarta Timur</option>
                      <option value="Jakarta Barat">Jakarta Barat</option>
                    </select>
                  </div>

                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <Filter className="h-4 w-4 mr-2" />
                    Terapkan Filter
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Map Layers */}
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Layers className="h-5 w-5 mr-2" />
                  Layer Peta
                </h3>
                
                <div className="space-y-3">
                  {mapLayers.map((layer) => (
                    <div key={layer.id} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">{layer.name}</span>
                      <input
                        type="checkbox"
                        defaultChecked={layer.active}
                        className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Map Controls */}
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Kontrol Peta</h3>
                
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <ZoomIn className="h-4 w-4 mr-2" />
                    Zoom In
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <ZoomOut className="h-4 w-4 mr-2" />
                    Zoom Out
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Navigation className="h-4 w-4 mr-2" />
                    Reset View
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MapPin className="h-4 w-4 mr-2" />
                    My Location
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Legend */}
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Legenda</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Taman Kota</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-emerald-600 rounded-full"></div>
                    <span className="text-sm text-gray-700">Hutan Kota</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Koridor Hijau</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Roof Garden</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Vertical Garden</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Map Area */}
          <div className="lg:col-span-3">
            <Card className="h-[800px]">
              <CardContent className="p-0 h-full">
                {/* Map placeholder - In real implementation, this would be replaced with actual map component */}
                <div className="relative h-full bg-gradient-to-br from-green-100 to-blue-100 rounded-lg overflow-hidden">
                  {/* Map Background */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg">Interactive Map Area</p>
                        <p className="text-gray-400 text-sm">Map integration dengan Google Maps/Leaflet</p>
                      </div>
                    </div>
                  </div>

                  {/* Map Points/Markers */}
                  {mapLocations.map((location, index) => (
                    <div
                      key={location.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                      style={{
                        left: `${20 + (index * 15)}%`,
                        top: `${30 + (index * 10)}%`
                      }}
                    >
                      {/* Marker */}
                      <div className={`w-6 h-6 ${getTypeColor(location.type)} rounded-full border-2 border-white shadow-lg hover:scale-110 transition-transform`}>
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      </div>

                      {/* Tooltip */}
                      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-3 min-w-64 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-gray-900 text-sm">{location.name}</h4>
                          <span className={`text-xs font-medium ${getStatusColor(location.status)}`}>
                            {location.status}
                          </span>
                        </div>
                        <div className="space-y-1 text-xs text-gray-600">
                          <div className="flex items-center">
                            <Building className="h-3 w-3 mr-1" />
                            {location.type}
                          </div>
                          <div className="flex items-center">
                            <Ruler className="h-3 w-3 mr-1" />
                            {location.area}
                          </div>
                          <div className="flex items-center">
                            <Users className="h-3 w-3 mr-1" />
                            {location.visitors.toLocaleString()} pengunjung/bulan
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">{location.description}</p>
                        <div className="flex space-x-2 mt-3">
                          <Button size="sm" variant="outline" className="text-xs">
                            <Info className="h-3 w-3 mr-1" />
                            Detail
                          </Button>
                          <Button size="sm" variant="outline" className="text-xs">
                            <Eye className="h-3 w-3 mr-1" />
                            Lihat
                          </Button>
                        </div>
                        
                        {/* Tooltip arrow */}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
                      </div>
                    </div>
                  ))}

                  {/* Map Info Panel */}
                  <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-xs">
                    <h4 className="font-semibold text-gray-900 mb-2">Informasi Peta</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Lokasi:</span>
                        <span className="font-medium">{mapLocations.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Area Terluas:</span>
                        <span className="font-medium">5.2 km</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Zoom Level:</span>
                        <span className="font-medium">12</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Center:</span>
                        <span className="font-medium">Jakarta</span>
                      </div>
                    </div>
                  </div>

                  {/* Distance Measurement Tool */}
                  <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3">
                    <div className="flex items-center space-x-2 text-sm">
                      <Ruler className="h-4 w-4 text-gray-600" />
                      <span className="text-gray-600">Jarak:</span>
                      <span className="font-medium">2.3 km</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Map Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{mapLocations.length}</div>
                  <div className="text-sm text-gray-600">Total Lokasi</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {mapLocations.filter(l => l.status === 'Aktif').length}
                  </div>
                  <div className="text-sm text-gray-600">Aktif</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {mapLocations.reduce((sum, l) => sum + l.visitors, 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Pengunjung/Bulan</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">12.4</div>
                  <div className="text-sm text-gray-600">Total Area (ha)</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </NewDashboardLayout>
  );
}
