import { cookies } from 'next/headers';
import { verifyAccessToken } from '@/lib/auth';
import { redirect } from 'next/navigation';
import NewDashboardLayout from '@/app/components/NewDashboardLayout';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { FileText, Search, Filter, Download, Eye, Calendar, User, Tag, BookOpen, Video, Image, File, ExternalLink } from 'lucide-react';

export default async function DocumentsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;

  if (!token) {
    redirect('/login');
  }

  const user = verifyAccessToken(token);
  if (!user || user.role !== 'Low') {
    redirect('/login');
  }

  // Mock data untuk dokumentasi
  const documents = [
    {
      id: 1,
      title: 'Panduan Implementasi Infrastruktur Hijau',
      type: 'PDF',
      category: 'Panduan',
      description: 'Dokumen komprehensif untuk implementasi infrastruktur hijau di area urban',
      size: '2.4 MB',
      pages: 45,
      author: 'Tim Teknis Infrastruktur Hijau',
      publishDate: '2025-01-15',
      downloadCount: 1245,
      tags: ['infrastruktur', 'panduan', 'implementasi'],
      thumbnail: '/placeholder-pdf.png'
    },
    {
      id: 2,
      title: 'Video Tutorial: Maintenance Taman Vertikal',
      type: 'Video',
      category: 'Tutorial',
      description: 'Video panduan maintenance sistem taman vertikal untuk gedung perkantoran',
      size: '125 MB',
      duration: '15:30',
      author: 'Dr. Sari Wijaya',
      publishDate: '2025-01-10',
      downloadCount: 789,
      tags: ['video', 'maintenance', 'taman-vertikal'],
      thumbnail: '/placeholder-video.png'
    },
    {
      id: 3,
      title: 'Standar Operasional Prosedur Hutan Kota',
      type: 'PDF',
      category: 'SOP',
      description: 'SOP lengkap untuk pengelolaan dan pemeliharaan hutan kota',
      size: '1.8 MB',
      pages: 32,
      author: 'Direktorat Kehutanan Kota',
      publishDate: '2025-01-08',
      downloadCount: 567,
      tags: ['sop', 'hutan-kota', 'pengelolaan'],
      thumbnail: '/placeholder-pdf.png'
    },
    {
      id: 4,
      title: 'Katalog Tanaman untuk Infrastruktur Hijau',
      type: 'PDF',
      category: 'Referensi',
      description: 'Daftar lengkap tanaman yang cocok untuk berbagai jenis infrastruktur hijau',
      size: '5.2 MB',
      pages: 78,
      author: 'Pusat Penelitian Botani',
      publishDate: '2025-01-05',
      downloadCount: 2156,
      tags: ['katalog', 'tanaman', 'referensi'],
      thumbnail: '/placeholder-pdf.png'
    },
    {
      id: 5,
      title: 'Galeri Foto: Best Practice Taman Kota',
      type: 'Gallery',
      category: 'Inspirasi',
      description: 'Koleksi foto taman kota terbaik dari berbagai negara',
      size: '45 MB',
      imageCount: 156,
      author: 'Tim Dokumentasi',
      publishDate: '2025-01-03',
      downloadCount: 892,
      tags: ['galeri', 'foto', 'best-practice'],
      thumbnail: '/placeholder-gallery.png'
    },
    {
      id: 6,
      title: 'Manual Instalasi Sistem Irigasi Otomatis',
      type: 'PDF',
      category: 'Manual',
      description: 'Panduan teknis instalasi dan konfigurasi sistem irigasi otomatis',
      size: '3.1 MB',
      pages: 52,
      author: 'Tim Teknologi Irigasi',
      publishDate: '2024-12-28',
      downloadCount: 445,
      tags: ['manual', 'irigasi', 'otomatis'],
      thumbnail: '/placeholder-pdf.png'
    },
    {
      id: 7,
      title: 'Webinar: Teknologi IoT untuk Smart Garden',
      type: 'Video',
      category: 'Webinar',
      description: 'Recording webinar tentang implementasi IoT dalam pengelolaan taman pintar',
      size: '890 MB',
      duration: '1:45:20',
      author: 'Prof. Dr. Ahmad Sutanto',
      publishDate: '2024-12-25',
      downloadCount: 1567,
      tags: ['webinar', 'iot', 'smart-garden'],
      thumbnail: '/placeholder-video.png'
    },
    {
      id: 8,
      title: 'Studi Kasus: Green Building Jakarta',
      type: 'PDF',
      category: 'Studi Kasus',
      description: 'Analisis mendalam implementasi green building di Jakarta dengan fokus infrastruktur hijau',
      size: '4.7 MB',
      pages: 89,
      author: 'Institut Teknologi Hijau',
      publishDate: '2024-12-20',
      downloadCount: 1234,
      tags: ['studi-kasus', 'green-building', 'jakarta'],
      thumbnail: '/placeholder-pdf.png'
    }
  ];

  const categories = [
    { name: 'Semua', count: documents.length },
    { name: 'Panduan', count: documents.filter(d => d.category === 'Panduan').length },
    { name: 'Tutorial', count: documents.filter(d => d.category === 'Tutorial').length },
    { name: 'SOP', count: documents.filter(d => d.category === 'SOP').length },
    { name: 'Referensi', count: documents.filter(d => d.category === 'Referensi').length },
    { name: 'Manual', count: documents.filter(d => d.category === 'Manual').length },
    { name: 'Webinar', count: documents.filter(d => d.category === 'Webinar').length },
    { name: 'Studi Kasus', count: documents.filter(d => d.category === 'Studi Kasus').length }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'PDF': return FileText;
      case 'Video': return Video;
      case 'Gallery': return Image;
      default: return File;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'PDF': return 'bg-red-100 text-red-800';
      case 'Video': return 'bg-blue-100 text-blue-800';
      case 'Gallery': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <NewDashboardLayout 
      user={{ email: user.email, role: user.role }} 
      title="Dokumentasi"
    >
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dokumentasi</h1>
                <p className="text-gray-600">Akses panduan, tutorial, dan referensi infrastruktur hijau</p>
              </div>
            </div>
            <Button variant="outline">
              <ExternalLink className="h-4 w-4 mr-2" />
              Portal Eksternal
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Dokumen</p>
                  <p className="text-2xl font-bold text-gray-900">{documents.length}</p>
                </div>
                <FileText className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Download</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {documents.reduce((sum, doc) => sum + doc.downloadCount, 0).toLocaleString()}
                  </p>
                </div>
                <Download className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Video Tutorial</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {documents.filter(d => d.type === 'Video').length}
                  </p>
                </div>
                <Video className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Update Terbaru</p>
                  <p className="text-2xl font-bold text-gray-900">5</p>
                </div>
                <Calendar className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Categories & Filters */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search */}
            <Card>
              <CardContent className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Cari dokumentasi..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Kategori</h3>
                <div className="space-y-2">
                  {categories.map((category, index) => (
                    <div key={index} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <span className="text-sm text-gray-700">{category.name}</span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {category.count}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Filters */}
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tipe File</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm">
                      <option value="">Semua Tipe</option>
                      <option value="PDF">PDF</option>
                      <option value="Video">Video</option>
                      <option value="Gallery">Gallery</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tahun</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm">
                      <option value="">Semua Tahun</option>
                      <option value="2025">2025</option>
                      <option value="2024">2024</option>
                      <option value="2023">2023</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Popularitas</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm">
                      <option value="">Semua</option>
                      <option value="popular">Paling Populer</option>
                      <option value="recent">Terbaru</option>
                      <option value="featured">Unggulan</option>
                    </select>
                  </div>

                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <Filter className="h-4 w-4 mr-2" />
                    Terapkan Filter
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistik</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Dokumen dilihat hari ini</span>
                    <span className="font-medium">24</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Download minggu ini</span>
                    <span className="font-medium">156</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Favorit Anda</span>
                    <span className="font-medium">8</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Documents Grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Menampilkan {documents.length} dokumen
                </span>
                <select className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm">
                  <option value="newest">Terbaru</option>
                  <option value="popular">Paling Populer</option>
                  <option value="alphabetical">A-Z</option>
                  <option value="size">Ukuran File</option>
                </select>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {documents.map((doc) => {
                const IconComponent = getTypeIcon(doc.type);
                return (
                  <Card key={doc.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <IconComponent className="h-6 w-6 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-1">
                              {doc.title}
                            </h3>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(doc.type)}`}>
                              {doc.type}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {doc.description}
                      </p>

                      <div className="space-y-2 mb-4 text-xs text-gray-500">
                        <div className="flex items-center">
                          <User className="h-3 w-3 mr-1" />
                          {doc.author}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(doc.publishDate).toLocaleDateString('id-ID')}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center">
                            <File className="h-3 w-3 mr-1" />
                            {doc.size}
                            {doc.pages && ` • ${doc.pages} hal`}
                            {doc.duration && ` • ${doc.duration}`}
                            {doc.imageCount && ` • ${doc.imageCount} foto`}
                          </span>
                          <span className="flex items-center">
                            <Download className="h-3 w-3 mr-1" />
                            {doc.downloadCount.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {doc.tags.map((tag, index) => (
                            <span 
                              key={index} 
                              className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                            >
                              <Tag className="h-2 w-2 mr-1" />
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Eye className="h-4 w-4 mr-2" />
                          Preview
                        </Button>
                        <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Menampilkan <span className="font-medium">1</span> sampai <span className="font-medium">{documents.length}</span> dari{' '}
                <span className="font-medium">{documents.length}</span> hasil
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled>
                  Sebelumnya
                </Button>
                <Button variant="outline" size="sm" className="bg-blue-600 text-white">
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
        </div>
      </div>
    </NewDashboardLayout>
  );
}
