import { cookies } from 'next/headers';
import { verifyAccessToken } from '@/lib/auth';
import { redirect } from 'next/navigation';
import NewDashboardLayout from '@/app/components/NewDashboardLayout';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { BookOpen, Search, Filter, Edit, Trash2, Eye, MoreVertical, Calendar, TrendingUp, Heart, MessageCircle, Share2, Globe, Lock, Clock, Plus } from 'lucide-react';

export default async function ArticlesPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;

  if (!token) {
    redirect('/login');
  }

  const user = verifyAccessToken(token);
  if (!user || user.role !== 'High') {
    redirect('/login');
  }

  // Mock data artikel
  const articles = [
    {
      id: 1,
      title: 'Implementasi Smart Irrigation dalam Infrastruktur Hijau Modern',
      excerpt: 'Panduan lengkap implementasi sistem irigasi pintar untuk meningkatkan efisiensi penggunaan air...',
      status: 'published',
      publishDate: '2025-01-20',
      lastModified: '2025-01-20',
      category: 'Teknologi',
      tags: ['smart-irrigation', 'iot', 'water-management'],
      featuredImage: '/placeholder-1.jpg',
      author: 'Admin',
      stats: {
        views: 1245,
        likes: 89,
        comments: 23,
        shares: 12
      },
      readTime: '5 min',
      seoScore: 85
    },
    {
      id: 2,
      title: 'Panduan Lengkap Pemilihan Tanaman untuk Vertical Garden',
      excerpt: 'Kriteria dan rekomendasi tanaman yang cocok untuk sistem taman vertikal di iklim tropis...',
      status: 'published',
      publishDate: '2025-01-18',
      lastModified: '2025-01-19',
      category: 'Tutorial',
      tags: ['vertical-garden', 'plant-selection', 'tropical-climate'],
      featuredImage: '/placeholder-2.jpg',
      author: 'Admin',
      stats: {
        views: 892,
        likes: 67,
        comments: 15,
        shares: 8
      },
      readTime: '8 min',
      seoScore: 92
    },
    {
      id: 3,
      title: 'Studi Kasus: Transformasi RTH Jakarta Menjadi Smart Green Space',
      excerpt: 'Analisis mendalam tentang transformasi ruang terbuka hijau di Jakarta menggunakan teknologi smart city...',
      status: 'draft',
      publishDate: null,
      lastModified: '2025-01-22',
      category: 'Case Study',
      tags: ['jakarta', 'smart-city', 'urban-planning', 'rth'],
      featuredImage: '/placeholder-3.jpg',
      author: 'Admin',
      stats: {
        views: 0,
        likes: 0,
        comments: 0,
        shares: 0
      },
      readTime: '12 min',
      seoScore: 78
    },
    {
      id: 4,
      title: 'Teknologi AI untuk Monitoring Kesehatan Tanaman Urban',
      excerpt: 'Pemanfaatan artificial intelligence dan computer vision untuk monitoring real-time kesehatan tanaman...',
      status: 'scheduled',
      publishDate: '2025-01-25',
      lastModified: '2025-01-22',
      category: 'Innovation',
      tags: ['ai', 'computer-vision', 'plant-health', 'monitoring'],
      featuredImage: '/placeholder-4.jpg',
      author: 'Admin',
      stats: {
        views: 0,
        likes: 0,
        comments: 0,
        shares: 0
      },
      readTime: '10 min',
      seoScore: 88
    }
  ];

  const getStatusBadge = (status: string) => {
    const styles = {
      published: 'bg-green-100 text-green-800',
      draft: 'bg-gray-100 text-gray-800',
      scheduled: 'bg-blue-100 text-blue-800',
      archived: 'bg-yellow-100 text-yellow-800'
    };
    
    const labels = {
      published: 'Terpublikasi',
      draft: 'Draft',
      scheduled: 'Terjadwal',
      archived: 'Diarsipkan'
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[status as keyof typeof styles] || styles.draft}`}>
        {labels[status as keyof typeof labels] || status}
      </span>
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published':
        return <Globe className="h-4 w-4 text-green-600" />;
      case 'draft':
        return <Edit className="h-4 w-4 text-gray-600" />;
      case 'scheduled':
        return <Clock className="h-4 w-4 text-blue-600" />;
      default:
        return <Lock className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <NewDashboardLayout 
      user={{ email: user.email, role: user.role }} 
      title="Kelola Artikel"
    >
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Kelola Artikel</h1>
                <p className="text-gray-600">Kelola semua artikel dan konten sistem</p>
              </div>
            </div>
            <Button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4" />
              <span>Artikel Baru</span>
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Artikel</p>
                  <p className="text-2xl font-bold text-gray-900">24</p>
                </div>
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Terpublikasi</p>
                  <p className="text-2xl font-bold text-green-600">18</p>
                </div>
                <Globe className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Draft</p>
                  <p className="text-2xl font-bold text-gray-600">5</p>
                </div>
                <Edit className="h-8 w-8 text-gray-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Views</p>
                  <p className="text-2xl font-bold text-purple-600">12.5K</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters & Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Cari artikel..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="flex space-x-3">
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">Semua Status</option>
                  <option value="published">Terpublikasi</option>
                  <option value="draft">Draft</option>
                  <option value="scheduled">Terjadwal</option>
                </select>
                
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">Semua Kategori</option>
                  <option value="teknologi">Teknologi</option>
                  <option value="tutorial">Tutorial</option>
                  <option value="case-study">Case Study</option>
                </select>
                
                <Button variant="outline" className="flex items-center space-x-2">
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Articles List */}
        <div className="space-y-4">
          {articles.map((article) => (
            <Card key={article.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  {/* Featured Image */}
                  <div className="flex-shrink-0">
                    <div className="w-24 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-400 text-xs">Image</span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0 mr-4">
                        <div className="flex items-center space-x-2 mb-2">
                          {getStatusIcon(article.status)}
                          <h3 className="text-lg font-semibold text-gray-900 truncate">
                            {article.title}
                          </h3>
                          {getStatusBadge(article.status)}
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {article.excerpt}
                        </p>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {article.publishDate || article.lastModified}
                          </span>
                          <span>•</span>
                          <span>{article.category}</span>
                          <span>•</span>
                          <span>{article.readTime}</span>
                          <span>•</span>
                          <span>SEO: {article.seoScore}%</span>
                        </div>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mt-2">
                          {article.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
                            >
                              {tag}
                            </span>
                          ))}
                          {article.tags.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                              +{article.tags.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Stats & Actions */}
                      <div className="flex flex-col items-end space-y-2">
                        {/* Stats */}
                        <div className="flex items-center space-x-3 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            {article.stats.views}
                          </span>
                          <span className="flex items-center">
                            <Heart className="h-4 w-4 mr-1" />
                            {article.stats.likes}
                          </span>
                          <span className="flex items-center">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            {article.stats.comments}
                          </span>
                        </div>
                        
                        {/* Actions */}
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm" className="flex items-center space-x-1">
                            <Eye className="h-4 w-4" />
                            <span>View</span>
                          </Button>
                          <Button variant="outline" size="sm" className="flex items-center space-x-1">
                            <Edit className="h-4 w-4" />
                            <span>Edit</span>
                          </Button>
                          <Button variant="outline" size="sm" className="p-2">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex items-center justify-center">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
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
              Next
            </Button>
          </div>
        </div>
      </div>
    </NewDashboardLayout>
  );
}
