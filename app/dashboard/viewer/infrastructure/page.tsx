import { cookies } from 'next/headers';
import { verifyAccessToken } from '@/lib/auth';
import { redirect } from 'next/navigation';
import NewDashboardLayout from '@/app/components/NewDashboardLayout';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Eye, Search, Filter, MapPin, Calendar, Ruler, TreePine, Building, Users, MoreVertical, ArrowUpRight, Download } from 'lucide-react';

export default async function InfrastructureDataPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;

  if (!token) {
    redirect('/login');
  }

  const user = verifyAccessToken(token);
  if (!user || user.role !== 'Low') {
    redirect('/login');
  }

  // Mock data infrastruktur
  const infrastructureData = [
    {
      id: 1,
      name: 'Taman Kota Jakarta Pusat',
      type: 'Taman Kota',
      location: 'Jakarta Pusat',
      address: 'Jl. Medan Merdeka Selatan, Jakarta Pusat',
      area: '2.5 ha',
      status: 'Aktif',
      established: '2020-03-15',
      lastMaintenance: '2025-01-20',
      facilities: ['Jogging Track', 'Playground', 'Gazebo', 'Toilet'],
      visitors: 1500,
      greenCoverage: 85,
      coordinates: '-6.1751, 106.8650',
      description: 'Taman kota dengan fasilitas lengkap untuk rekreasi keluarga dan olahraga.'
    },
    {
      id: 2,
      name: 'Green Corridor Sudirman',
      type: 'Koridor Hijau',
      location: 'Jakarta Selatan',
      address: 'Jl. Jenderal Sudirman, Jakarta Selatan',
      area: '5.2 km',
      status: 'Dalam Pembangunan',
      established: '2024-06-20',
      lastMaintenance: '2025-01-18',
      facilities: ['Jalur Sepeda', 'Pedestrian', 'Shelter'],
      visitors: 2800,
      greenCoverage: 70,
      coordinates: '-6.2088, 106.8456',
      description: 'Koridor hijau sepanjang Jalan Sudirman untuk meningkatkan kualitas udara.'
    },
    {
      id: 3,
      name: 'Hutan Kota Senayan',
      type: 'Hutan Kota',
      location: 'Jakarta Pusat',
      address: 'Kawasan Senayan, Jakarta Pusat',
      area: '3.7 ha',
      status: 'Aktif',
      established: '2019-11-10',
      lastMaintenance: '2025-01-15',
      facilities: ['Trail Walking', 'Bird Watching', 'Education Center'],
      visitors: 800,
      greenCoverage: 95,
      coordinates: '-6.2250, 106.8000',
      description: 'Area konservasi dengan keanekaragaman hayati tinggi di pusat kota.'
    },
    {
      id: 4,
      name: 'Roof Garden Plaza Indonesia',
      type: 'Roof Garden',
      location: 'Jakarta Pusat',
      address: 'Plaza Indonesia, Jakarta Pusat',
      area: '0.8 ha',
      status: 'Aktif',
      established: '2021-08-05',
      lastMaintenance: '2025-01-10',
      facilities: ['Cafe', 'Seating Area', 'Green Wall'],
      visitors: 1200,
      greenCoverage: 60,
      coordinates: '-6.1928, 106.8230',
      description: 'Taman atap dengan konsep modern untuk mengurangi urban heat island.'
    },
    {
      id: 5,
      name: 'Vertical Garden Menteng',
      type: 'Vertical Garden',
      location: 'Jakarta Pusat',
      address: 'Jl. HOS Cokroaminoto, Menteng',
      area: '200 m²',
      status: 'Maintenance',
      established: '2022-02-14',
      lastMaintenance: '2025-01-05',
      facilities: ['LED Lighting', 'Auto Irrigation', 'Air Purifier'],
      visitors: 300,
      greenCoverage: 90,
      coordinates: '-6.1944, 106.8294',
      description: 'Sistem taman vertikal dengan teknologi hidroponik untuk pembersihan udara.'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aktif': return 'bg-teal-100 text-teal-800';
      case 'Dalam Pembangunan': return 'bg-blue-100 text-blue-800';
      case 'Maintenance': return 'bg-orange-100 text-orange-800';
      case 'Tidak Aktif': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Taman Kota': return TreePine;
      case 'Hutan Kota': return TreePine;
      case 'Koridor Hijau': return Building;
      case 'Roof Garden': return Building;
      case 'Vertical Garden': return Building;
      default: return TreePine;
    }
  };

  return (
    <NewDashboardLayout 
      user={{ email: user.email, role: user.role }} 
      title="Data Infrastruktur"
    >
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Eye className="h-8 w-8 text-green-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Data Infrastruktur Hijau</h1>
                <p className="text-gray-600">Lihat dan analisis data infrastruktur hijau yang tersedia</p>
              </div>
            </div>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Infrastruktur</p>
                  <p className="text-2xl font-bold text-gray-900">{infrastructureData.length}</p>
                </div>
                <Building className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Status Aktif</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {infrastructureData.filter(item => item.status === 'Aktif').length}
                  </p>
                </div>
                <TreePine className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Pengunjung</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {infrastructureData.reduce((total, item) => total + item.visitors, 0).toLocaleString()}
                  </p>
                </div>
                <Users className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Rata-rata Cakupan Hijau</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {Math.round(infrastructureData.reduce((total, item) => total + item.greenCoverage, 0) / infrastructureData.length)}%
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Cari infrastruktur..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                  <option value="">Semua Tipe</option>
                  <option value="Taman Kota">Taman Kota</option>
                  <option value="Hutan Kota">Hutan Kota</option>
                  <option value="Koridor Hijau">Koridor Hijau</option>
                  <option value="Roof Garden">Roof Garden</option>
                  <option value="Vertical Garden">Vertical Garden</option>
                </select>
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                  <option value="">Semua Status</option>
                  <option value="Aktif">Aktif</option>
                  <option value="Dalam Pembangunan">Dalam Pembangunan</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                  <option value="">Semua Lokasi</option>
                  <option value="Jakarta Pusat">Jakarta Pusat</option>
                  <option value="Jakarta Selatan">Jakarta Selatan</option>
                  <option value="Jakarta Utara">Jakarta Utara</option>
                  <option value="Jakarta Timur">Jakarta Timur</option>
                  <option value="Jakarta Barat">Jakarta Barat</option>
                </select>
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter Lanjutan
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Infrastructure Data Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {infrastructureData.map((item) => {
            const IconComponent = getTypeIcon(item.type);
            return (
              <Card key={item.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <IconComponent className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-600">{item.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {item.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Ruler className="h-4 w-4 mr-2" />
                      Luas: {item.area}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      Dibuat: {new Date(item.established).toLocaleDateString('id-ID')}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-2" />
                      Pengunjung: {item.visitors.toLocaleString()}/bulan
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Cakupan Hijau</span>
                      <span className="font-medium text-gray-900">{item.greenCoverage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${item.greenCoverage}%` }}
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Fasilitas:</p>
                    <div className="flex flex-wrap gap-1">
                      {item.facilities.map((facility, index) => (
                        <span 
                          key={index} 
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {facility}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <Button variant="outline" size="sm">
                      <MapPin className="h-4 w-4 mr-2" />
                      Lihat di Peta
                    </Button>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <ArrowUpRight className="h-4 w-4 mr-2" />
                      Detail
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Menampilkan <span className="font-medium">1</span> sampai <span className="font-medium">{infrastructureData.length}</span> dari{' '}
            <span className="font-medium">{infrastructureData.length}</span> hasil
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              Sebelumnya
            </Button>
            <Button variant="outline" size="sm" className="bg-green-600 text-white">
              1
            </Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              3
            </Button>
            <Button variant="outline" size="sm">
              Selanjutnya
            </Button>
          </div>
        </div>
      </div>
    </NewDashboardLayout>
  );
}
