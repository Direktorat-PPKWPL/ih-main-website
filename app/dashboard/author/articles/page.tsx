import { cookies } from 'next/headers';
import { verifyAccessToken } from '@/lib/auth';
import { redirect } from 'next/navigation';
import NewDashboardLayout from '@/app/components/NewDashboardLayout';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { BookOpen, Search, Filter, Edit, Trash2, Eye, MoreVertical, Calendar, TrendingUp, Heart, MessageCircle, Share2, Globe, Lock, Clock, Plus } from 'lucide-react';

export default async function MyArticlesPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;

  if (!token) {
    redirect('/login');
  }

  const user = verifyAccessToken(token);
  if (!user || user.role !== 'Author') {
    redirect('/login');
  }

  // Mock data artikel author
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
      tags: ['vertical-garden', 'plants', 'gardening'],
      featuredImage: '/placeholder-2.jpg',
      stats: {
        views: 2156,
        likes: 134,
        comments: 45,
        shares: 28
      },
      readTime: '7 min',
      seoScore: 92
    },
    {
      id: 3,
      title: 'Tren Terbaru Arsitektur Lansekap Berkelanjutan di Asia',
      excerpt: 'Analisis tren dan inovasi terbaru dalam desain lansekap berkelanjutan...',
      status: 'draft',
      publishDate: null,
      lastModified: '2025-01-22',
      category: 'Trend',
      tags: ['landscape-architecture', 'sustainability', 'asia'],
      featuredImage: null,
      stats: {
        views: 0,
        likes: 0,
        comments: 0,
        shares: 0
      },
      readTime: '6 min',
      seoScore: 0,
      progress: 75
    },
    {
      id: 4,
      title: 'Case Study: Transformasi RTH Jakarta melalui Community Garden',
      excerpt: 'Studi kasus implementasi community garden dalam meningkatkan kualitas ruang terbuka hijau...',
      status: 'published',
      publishDate: '2025-01-15',
      lastModified: '2025-01-15',
      category: 'Case Study',
      tags: ['community-garden', 'jakarta', 'urban-planning'],
      featuredImage: '/placeholder-3.jpg',
      stats: {
        views: 1789,
        likes: 98,
        comments: 34,
        shares: 19
      },
      readTime: '8 min',
      seoScore: 88
    },
    {
      id: 5,
      title: 'Teknologi IoT untuk Monitoring Kualitas Udara di Taman Kota',
      excerpt: 'Implementasi sensor IoT untuk monitoring real-time kualitas udara...',
      status: 'pending',
      publishDate: null,
      lastModified: '2025-01-21',
      category: 'Teknologi',
      tags: ['iot', 'air-quality', 'smart-city'],
      featuredImage: '/placeholder-4.jpg',
      stats: {
        views: 0,
        likes: 0,
        comments: 0,
        shares: 0
      },
      readTime: '6 min',
      seoScore: 79
    },
    {
      id: 6,
      title: 'Biodiversitas Urban: Peran Taman Kota dalam Konservasi',
      excerpt: 'Eksplorasi peran taman kota dalam menjaga biodiversitas di lingkungan urban...',
      status: 'published',
      publishDate: '2025-01-12',
      lastModified: '2025-01-12',
      category: 'Research',
      tags: ['biodiversity', 'conservation', 'urban-parks'],
      featuredImage: '/placeholder-5.jpg',
      stats: {
        views: 987,
        likes: 67,
        comments: 18,
        shares: 8
      },
      readTime: '9 min',
      seoScore: 90
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published': return Globe;
      case 'draft': return Edit;
      case 'pending': return Clock;
      case 'archived': return Lock;
      default: return Edit;
    }
  };

  const totalStats = articles.reduce((acc, article) => ({
    views: acc.views + article.stats.views,
    likes: acc.likes + article.stats.likes,
    comments: acc.comments + article.stats.comments,
    shares: acc.shares + article.stats.shares
  }), { views: 0, likes: 0, comments: 0, shares: 0 });

  return (
    <NewDashboardLayout 
      user={{ email: user.email, role: user.role }} 
      title="Artikel Saya"
    >
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BookOpen className="h-8 w-8 text-purple-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Artikel Saya</h1>
                <p className="text-gray-600">Kelola dan pantau performa artikel Anda</p>
              </div>
            </div>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Tulis Artikel Baru
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
                  <p className="text-2xl font-bold text-gray-900">{articles.length}</p>
                  <p className="text-xs text-green-600">
                    {articles.filter(a => a.status === 'published').length} published
                  </p>
                </div>
                <BookOpen className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Views</p>
                  <p className="text-2xl font-bold text-gray-900">{totalStats.views.toLocaleString()}</p>
                  <p className="text-xs text-blue-600">+324 minggu ini</p>
                </div>
                <Eye className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Engagement</p>
                  <p className="text-2xl font-bold text-gray-900">{totalStats.likes}</p>
                  <p className="text-xs text-purple-600">{totalStats.comments} komentar</p>
                </div>
                <Heart className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg. SEO Score</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {Math.round(articles.filter(a => a.seoScore > 0).reduce((acc, a) => acc + a.seoScore, 0) / articles.filter(a => a.seoScore > 0).length)}
                  </p>
                  <p className="text-xs text-orange-600">Good performance</p>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters & Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Cari artikel..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                  <option value="">Semua Status</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="pending">Pending Review</option>
                  <option value="archived">Archived</option>
                </select>
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                  <option value="">Semua Kategori</option>
                  <option value="Teknologi">Teknologi</option>
                  <option value="Tutorial">Tutorial</option>
                  <option value="Case Study">Case Study</option>
                  <option value="Trend">Trend</option>
                  <option value="Research">Research</option>
                </select>
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                  <option value="newest">Terbaru</option>
                  <option value="oldest">Terlama</option>
                  <option value="most-views">Paling Banyak Dilihat</option>
                  <option value="most-likes">Paling Disukai</option>
                </select>
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter Lanjutan
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Articles List */}
        <div className="space-y-4">
          {articles.map((article) => {
            const StatusIcon = getStatusIcon(article.status);
            return (
              <Card key={article.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    {/* Featured Image */}
                    <div className="w-24 h-24 flex-shrink-0">
                      {article.featuredImage ? (
                        <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                          <span className="text-gray-400 text-xs">Image</span>
                        </div>
                      ) : (
                        <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
                          <BookOpen className="h-8 w-8 text-gray-400" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
                            {article.title}
                          </h3>
                          <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                            {article.excerpt}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(article.status)}`}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {article.status.charAt(0).toUpperCase() + article.status.slice(1)}
                          </span>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {article.publishDate ? 
                            `Published: ${new Date(article.publishDate).toLocaleDateString('id-ID')}` :
                            `Modified: ${new Date(article.lastModified).toLocaleDateString('id-ID')}`
                          }
                        </span>
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                          {article.category}
                        </span>
                        <span>{article.readTime}</span>
                        {article.seoScore > 0 && (
                          <span className={`${article.seoScore >= 80 ? 'text-green-600' : article.seoScore >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                            SEO: {article.seoScore}%
                          </span>
                        )}
                      </div>

                      {/* Tags */}
                      <div className="flex items-center space-x-2 mb-3">
                        {article.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* Stats & Progress */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          {article.status === 'published' ? (
                            <>
                              <span className="flex items-center">
                                <Eye className="h-4 w-4 mr-1" />
                                {article.stats.views.toLocaleString()}
                              </span>
                              <span className="flex items-center">
                                <Heart className="h-4 w-4 mr-1" />
                                {article.stats.likes}
                              </span>
                              <span className="flex items-center">
                                <MessageCircle className="h-4 w-4 mr-1" />
                                {article.stats.comments}
                              </span>
                              <span className="flex items-center">
                                <Share2 className="h-4 w-4 mr-1" />
                                {article.stats.shares}
                              </span>
                            </>
                          ) : article.status === 'draft' && article.progress ? (
                            <div className="flex items-center space-x-2">
                              <span>Progress: {article.progress}%</span>
                              <div className="w-16 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-purple-500 h-2 rounded-full" 
                                  style={{ width: `${article.progress}%` }}
                                />
                              </div>
                            </div>
                          ) : null}
                        </div>

                        <div className="flex items-center space-x-2">
                          {article.status === 'published' && (
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                          {article.status === 'published' && (
                            <Button variant="outline" size="sm">
                              <TrendingUp className="h-4 w-4 mr-2" />
                              Analytics
                            </Button>
                          )}
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Menampilkan <span className="font-medium">1</span> sampai <span className="font-medium">{articles.length}</span> dari{' '}
            <span className="font-medium">{articles.length}</span> artikel
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              Sebelumnya
            </Button>
            <Button variant="outline" size="sm" className="bg-purple-600 text-white">
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
