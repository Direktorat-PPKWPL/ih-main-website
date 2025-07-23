import { cookies } from 'next/headers';
import { verifyAccessToken } from '@/lib/auth';
import { redirect } from 'next/navigation';
import NewDashboardLayout from '@/app/components/NewDashboardLayout';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Edit3, Calendar, Clock, Search, Filter, Trash2, Copy, Send, Save, AlertCircle, CheckCircle, Plus, BookOpen } from 'lucide-react';

export default async function DraftsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;

  if (!token) {
    redirect('/login');
  }

  const user = verifyAccessToken(token);
  if (!user || user.role !== 'Author') {
    redirect('/login');
  }

  // Mock data untuk draft artikel
  const drafts = [
    {
      id: 1,
      title: 'Tren Terbaru Arsitektur Lansekap Berkelanjutan di Asia',
      excerpt: 'Analisis mendalam tentang inovasi dan tren terbaru dalam desain lansekap berkelanjutan yang berkembang di kawasan Asia...',
      category: 'Trend',
      tags: ['landscape-architecture', 'sustainability', 'asia', 'green-design'],
      createdDate: '2025-01-15',
      lastModified: '2025-01-22',
      wordCount: 1250,
      targetWordCount: 1500,
      progress: 75,
      estimatedReadTime: '6 min',
      completionItems: {
        title: true,
        content: false,
        featuredImage: false,
        metaDescription: true,
        tags: true,
        category: true
      },
      priority: 'high',
      deadline: '2025-01-25'
    },
    {
      id: 2,
      title: 'Implementasi AI dalam Monitoring Kesehatan Tanaman Urban',
      excerpt: 'Eksplorasi penggunaan artificial intelligence dan machine learning untuk monitoring real-time kesehatan tanaman di lingkungan urban...',
      category: 'Teknologi',
      tags: ['ai', 'machine-learning', 'plant-health', 'smart-city'],
      createdDate: '2025-01-18',
      lastModified: '2025-01-20',
      wordCount: 850,
      targetWordCount: 1200,
      progress: 60,
      estimatedReadTime: '5 min',
      completionItems: {
        title: true,
        content: false,
        featuredImage: false,
        metaDescription: false,
        tags: true,
        category: true
      },
      priority: 'medium',
      deadline: '2025-01-30'
    },
    {
      id: 3,
      title: 'Panduan Praktis: Membuat Kompos dari Limbah Organik Kota',
      excerpt: 'Tutorial step-by-step untuk membuat kompos berkualitas tinggi dari limbah organik perkotaan sebagai solusi waste management...',
      category: 'Tutorial',
      tags: ['composting', 'organic-waste', 'urban-farming', 'sustainability'],
      createdDate: '2025-01-10',
      lastModified: '2025-01-19',
      wordCount: 2100,
      targetWordCount: 2000,
      progress: 90,
      estimatedReadTime: '8 min',
      completionItems: {
        title: true,
        content: true,
        featuredImage: true,
        metaDescription: true,
        tags: true,
        category: true
      },
      priority: 'low',
      deadline: '2025-02-05'
    },
    {
      id: 4,
      title: 'Studi Komparasi: Green Roof vs Living Wall Performance',
      excerpt: 'Analisis perbandingan performa antara sistem green roof dan living wall dalam konteks efisiensi energi dan kualitas udara...',
      category: 'Research',
      tags: ['green-roof', 'living-wall', 'energy-efficiency', 'comparative-study'],
      createdDate: '2025-01-12',
      lastModified: '2025-01-21',
      wordCount: 450,
      targetWordCount: 1800,
      progress: 25,
      estimatedReadTime: '2 min',
      completionItems: {
        title: true,
        content: false,
        featuredImage: false,
        metaDescription: false,
        tags: true,
        category: true
      },
      priority: 'medium',
      deadline: '2025-02-10'
    },
    {
      id: 5,
      title: 'Inovasi Material Biodegradable untuk Infrastruktur Hijau',
      excerpt: 'Penelitian terbaru tentang material biodegradable yang dapat digunakan dalam pembangunan infrastruktur hijau berkelanjutan...',
      category: 'Innovation',
      tags: ['biodegradable', 'sustainable-materials', 'green-infrastructure'],
      createdDate: '2025-01-08',
      lastModified: '2025-01-16',
      wordCount: 320,
      targetWordCount: 1000,
      progress: 15,
      estimatedReadTime: '2 min',
      completionItems: {
        title: true,
        content: false,
        featuredImage: false,
        metaDescription: false,
        tags: false,
        category: true
      },
      priority: 'low',
      deadline: '2025-02-15'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCompletionScore = (items: any) => {
    const total = Object.keys(items).length;
    const completed = Object.values(items).filter(Boolean).length;
    return Math.round((completed / total) * 100);
  };

  const getDaysUntilDeadline = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
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
                <p className="text-gray-600">Kelola dan selesaikan artikel yang sedang dalam proses</p>
              </div>
            </div>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Tulis Artikel Baru
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Draft</p>
                  <p className="text-2xl font-bold text-gray-900">{drafts.length}</p>
                </div>
                <Edit3 className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Hampir Selesai</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {drafts.filter(d => d.progress >= 80).length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Mendekati Deadline</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {drafts.filter(d => getDaysUntilDeadline(d.deadline) <= 5).length}
                  </p>
                </div>
                <AlertCircle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Kata</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {drafts.reduce((sum, d) => sum + d.wordCount, 0).toLocaleString()}
                  </p>
                </div>
                <BookOpen className="h-8 w-8 text-blue-500" />
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
                    placeholder="Cari draft..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                  <option value="">Semua Prioritas</option>
                  <option value="high">High Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="low">Low Priority</option>
                </select>
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                  <option value="">Semua Kategori</option>
                  <option value="Teknologi">Teknologi</option>
                  <option value="Tutorial">Tutorial</option>
                  <option value="Research">Research</option>
                  <option value="Trend">Trend</option>
                  <option value="Innovation">Innovation</option>
                </select>
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                  <option value="recent">Terbaru Dimodifikasi</option>
                  <option value="oldest">Terlama</option>
                  <option value="progress">Progress Tertinggi</option>
                  <option value="deadline">Deadline Terdekat</option>
                </select>
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter Lanjutan
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Drafts List */}
        <div className="space-y-4">
          {drafts.map((draft) => {
            const daysUntilDeadline = getDaysUntilDeadline(draft.deadline);
            const completionScore = getCompletionScore(draft.completionItems);
            
            return (
              <Card key={draft.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{draft.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(draft.priority)}`}>
                          {draft.priority.toUpperCase()}
                        </span>
                        {daysUntilDeadline <= 5 && (
                          <span className="flex items-center px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            {daysUntilDeadline} hari lagi
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {draft.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-4">
                    {/* Progress & Stats */}
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-medium">{draft.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-orange-500 h-2 rounded-full" 
                            style={{ width: `${draft.progress}%` }}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Kelengkapan</span>
                          <span className="font-medium">{completionScore}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${completionScore}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>{draft.wordCount.toLocaleString()} / {draft.targetWordCount.toLocaleString()} kata</span>
                        <span>{draft.estimatedReadTime}</span>
                      </div>
                    </div>

                    {/* Completion Checklist */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Checklist:</h4>
                      <div className="space-y-1 text-xs">
                        <div className={`flex items-center ${draft.completionItems.title ? 'text-green-600' : 'text-gray-500'}`}>
                          {draft.completionItems.title ? '✅' : '⏳'} Judul
                        </div>
                        <div className={`flex items-center ${draft.completionItems.content ? 'text-green-600' : 'text-gray-500'}`}>
                          {draft.completionItems.content ? '✅' : '⏳'} Konten
                        </div>
                        <div className={`flex items-center ${draft.completionItems.featuredImage ? 'text-green-600' : 'text-gray-500'}`}>
                          {draft.completionItems.featuredImage ? '✅' : '⏳'} Featured Image
                        </div>
                        <div className={`flex items-center ${draft.completionItems.metaDescription ? 'text-green-600' : 'text-gray-500'}`}>
                          {draft.completionItems.metaDescription ? '✅' : '⏳'} Meta Description
                        </div>
                        <div className={`flex items-center ${draft.completionItems.tags ? 'text-green-600' : 'text-gray-500'}`}>
                          {draft.completionItems.tags ? '✅' : '⏳'} Tags
                        </div>
                        <div className={`flex items-center ${draft.completionItems.category ? 'text-green-600' : 'text-gray-500'}`}>
                          {draft.completionItems.category ? '✅' : '⏳'} Kategori
                        </div>
                      </div>
                    </div>

                    {/* Metadata */}
                    <div>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          Dibuat: {new Date(draft.createdDate).toLocaleDateString('id-ID')}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          Dimodifikasi: {new Date(draft.lastModified).toLocaleDateString('id-ID')}
                        </div>
                        <div className="flex items-center">
                          <AlertCircle className="h-4 w-4 mr-2" />
                          Deadline: {new Date(draft.deadline).toLocaleDateString('id-ID')}
                        </div>
                      </div>

                      <div className="mt-3">
                        <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs mb-2">
                          {draft.category}
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {draft.tags.slice(0, 2).map((tag, index) => (
                            <span key={index} className="inline-block bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                              #{tag}
                            </span>
                          ))}
                          {draft.tags.length > 2 && (
                            <span className="text-xs text-gray-500">+{draft.tags.length - 2} lagi</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2">
                      <Button className="bg-orange-600 hover:bg-orange-700">
                        <Edit3 className="h-4 w-4 mr-2" />
                        Lanjutkan Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Save className="h-4 w-4 mr-2" />
                        Quick Save
                      </Button>
                      {draft.progress >= 80 && (
                        <Button variant="outline" size="sm" className="text-green-600 hover:text-green-700">
                          <Send className="h-4 w-4 mr-2" />
                          Submit Review
                        </Button>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Copy className="h-4 w-4 mr-2" />
                        Duplikasi
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Tips */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 Tips Menyelesaikan Draft</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">Prioritaskan Progress</h4>
                <p className="text-blue-700">Fokus pada draft dengan progress tertinggi untuk diselesaikan lebih dulu.</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <h4 className="font-medium text-orange-800 mb-2">Perhatikan Deadline</h4>
                <p className="text-orange-700">Set reminder untuk draft yang mendekati deadline.</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-800 mb-2">Batch Similar Tasks</h4>
                <p className="text-green-700">Kerjakan tugas serupa secara bersamaan untuk efisiensi.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </NewDashboardLayout>
  );
}
