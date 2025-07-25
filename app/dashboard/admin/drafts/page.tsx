import { cookies } from 'next/headers';
import { verifyAccessToken } from '@/lib/auth';
import { redirect } from 'next/navigation';
import NewDashboardLayout from '@/app/components/NewDashboardLayout';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Edit3, Search, Calendar, Clock, Edit, Trash2, Eye, MoreVertical, Save, Globe, PenTool } from 'lucide-react';

export default async function DraftsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;

  if (!token) {
    redirect('/login');
  }

  const user = verifyAccessToken(token);
  if (!user || user.role !== 'High') {
    redirect('/login');
  }

  // Mock data draft artikel
  const drafts = [
    {
      id: 1,
      title: 'Studi Kasus: Transformasi RTH Jakarta Menjadi Smart Green Space',
      excerpt: 'Analisis mendalam tentang transformasi ruang terbuka hijau di Jakarta menggunakan teknologi smart city...',
      lastModified: '2025-01-22T14:30:00',
      created: '2025-01-20T09:15:00',
      category: 'Case Study',
      tags: ['jakarta', 'smart-city', 'urban-planning', 'rth'],
      wordCount: 2150,
      readTime: '12 min',
      autoSaved: true,
      completion: 75
    },
    {
      id: 2,
      title: 'Implementasi Sensor IoT untuk Monitoring Kualitas Udara',
      excerpt: 'Panduan teknis implementasi jaringan sensor IoT untuk monitoring real-time kualitas udara di area hijau...',
      lastModified: '2025-01-21T16:45:00',
      created: '2025-01-19T11:20:00',
      category: 'Teknologi',
      tags: ['iot', 'air-quality', 'sensor', 'monitoring'],
      wordCount: 1680,
      readTime: '9 min',
      autoSaved: true,
      completion: 60
    },
    {
      id: 3,
      title: 'Panduan Pemilihan Material Sustainable untuk Green Building',
      excerpt: 'Kriteria dan rekomendasi material ramah lingkungan untuk konstruksi bangunan hijau berkelanjutan...',
      lastModified: '2025-01-22T10:15:00',
      created: '2025-01-21T08:30:00',
      category: 'Sustainability',
      tags: ['green-building', 'sustainable-materials', 'construction'],
      wordCount: 945,
      readTime: '5 min',
      autoSaved: false,
      completion: 35
    },
    {
      id: 4,
      title: 'Machine Learning untuk Prediksi Pertumbuhan Tanaman Urban',
      excerpt: 'Penggunaan algoritma machine learning untuk memprediksi dan mengoptimalkan pertumbuhan tanaman...',
      lastModified: '2025-01-20T13:20:00',
      created: '2025-01-18T15:45:00',
      category: 'Innovation',
      tags: ['machine-learning', 'plant-growth', 'prediction', 'optimization'],
      wordCount: 1320,
      readTime: '7 min',
      autoSaved: true,
      completion: 50
    },
    {
      id: 5,
      title: 'Framework Evaluasi Dampak Lingkungan Infrastruktur Hijau',
      excerpt: 'Kerangka kerja komprehensif untuk mengevaluasi dampak lingkungan dari implementasi infrastruktur hijau...',
      lastModified: '2025-01-19T17:00:00',
      created: '2025-01-17T14:10:00',
      category: 'Research',
      tags: ['environmental-impact', 'evaluation', 'framework', 'assessment'],
      wordCount: 780,
      readTime: '4 min',
      autoSaved: true,
      completion: 25
    }
  ];

  const getCompletionBadge = (completion: number) => {
    if (completion >= 75) return 'bg-green-100 text-green-800';
    if (completion >= 50) return 'bg-yellow-100 text-yellow-800';
    if (completion >= 25) return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Kemarin';
    if (diffDays < 7) return `${diffDays} hari lalu`;
    return date.toLocaleDateString('id-ID');
  };

  return (
    <NewDashboardLayout 
      user={{ email: user.email, role: user.role }} 
      title="Draft Artikel"
    >
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Edit3 className="h-8 w-8 text-orange-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Draft Artikel</h1>
                <p className="text-gray-600">Kelola artikel yang belum dipublikasi</p>
              </div>
            </div>
            <Button className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-700">
              <PenTool className="h-4 w-4" />
              <span>Tulis Baru</span>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Draft</p>
                  <p className="text-2xl font-bold text-gray-900">{drafts.length}</p>
                </div>
                <Edit3 className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Hampir Selesai</p>
                  <p className="text-2xl font-bold text-green-600">
                    {drafts.filter(d => d.completion >= 75).length}
                  </p>
                </div>
                <Save className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Auto-Saved</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {drafts.filter(d => d.autoSaved).length}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Words</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {drafts.reduce((acc, draft) => acc + draft.wordCount, 0).toLocaleString()}
                  </p>
                </div>
                <Edit className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search & Filter */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Cari draft..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="flex space-x-3">
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                  <option value="">Semua Kategori</option>
                  <option value="teknologi">Teknologi</option>
                  <option value="tutorial">Tutorial</option>
                  <option value="case-study">Case Study</option>
                  <option value="research">Research</option>
                </select>
                
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                  <option value="">Urutkan</option>
                  <option value="modified">Terakhir Dimodifikasi</option>
                  <option value="created">Tanggal Dibuat</option>
                  <option value="completion">Tingkat Penyelesaian</option>
                  <option value="title">Judul A-Z</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Draft List */}
        <div className="space-y-4">
          {drafts.map((draft) => (
            <Card key={draft.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0 mr-4">
                    {/* Header */}
                    <div className="flex items-center space-x-3 mb-2">
                      <Edit3 className="h-5 w-5 text-orange-600 flex-shrink-0" />
                      <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {draft.title}
                      </h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCompletionBadge(draft.completion)}`}>
                        {draft.completion}% selesai
                      </span>
                      {draft.autoSaved && (
                        <span className="flex items-center text-xs text-green-600">
                          <Save className="h-3 w-3 mr-1" />
                          Auto-saved
                        </span>
                      )}
                    </div>
                    
                    {/* Excerpt */}
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {draft.excerpt}
                    </p>
                    
                    {/* Meta Info */}
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        Dimodifikasi {formatDate(draft.lastModified)}
                      </span>
                      <span>•</span>
                      <span>{draft.category}</span>
                      <span>•</span>
                      <span>{draft.wordCount} kata</span>
                      <span>•</span>
                      <span>{draft.readTime}</span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-500">Progress</span>
                        <span className="text-xs text-gray-500">{draft.completion}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            draft.completion >= 75 ? 'bg-green-500' :
                            draft.completion >= 50 ? 'bg-yellow-500' :
                            draft.completion >= 25 ? 'bg-orange-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${draft.completion}%` }}
                        />
                      </div>
                    </div>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {draft.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                      {draft.tags.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                          +{draft.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex flex-col space-y-2">
                    <Button variant="outline" size="sm" className="flex items-center space-x-1">
                      <Edit className="h-4 w-4" />
                      <span>Lanjutkan</span>
                    </Button>
                    
                    <Button variant="outline" size="sm" className="flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span>Preview</span>
                    </Button>
                    
                    {draft.completion >= 75 && (
                      <Button size="sm" className="flex items-center space-x-1 bg-green-600 hover:bg-green-700">
                        <Globe className="h-4 w-4" />
                        <span>Publish</span>
                      </Button>
                    )}
                    
                    <Button variant="outline" size="sm" className="p-2">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State (if no drafts) */}
        {drafts.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Edit3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Belum ada draft artikel
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Mulai menulis artikel baru atau simpan artikel yang sedang Anda kerjakan sebagai draft.
              </p>
              <Button className="flex items-center space-x-2 mx-auto bg-orange-600 hover:bg-orange-700">
                <PenTool className="h-4 w-4" />
                <span>Tulis Artikel Baru</span>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </NewDashboardLayout>
  );
}
