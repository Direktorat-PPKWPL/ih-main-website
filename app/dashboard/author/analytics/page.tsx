import { cookies } from 'next/headers';
import { verifyAccessToken } from '@/lib/auth';
import { redirect } from 'next/navigation';
import NewDashboardLayout from '@/app/components/NewDashboardLayout';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { TrendingUp, Eye, Heart, MessageCircle, Share2, Users, Calendar, Target, Download, Filter, BarChart3, PieChart, ArrowUp, ArrowDown } from 'lucide-react';

export default async function AnalyticsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;

  if (!token) {
    redirect('/login');
  }

  const user = verifyAccessToken(token);
  if (!user || user.role !== 'Author') {
    redirect('/login');
  }

  // Mock data untuk analytics
  const overallStats = {
    totalViews: 15420,
    totalLikes: 892,
    totalComments: 234,
    totalShares: 156,
    followers: 1240,
    avgReadTime: '4.2 min',
    bounceRate: 32,
    returningReaders: 68
  };

  const monthlyData = [
    { month: 'Jul', views: 2400, likes: 120, comments: 28, shares: 15 },
    { month: 'Aug', views: 3200, likes: 145, comments: 35, shares: 22 },
    { month: 'Sep', views: 2800, likes: 132, comments: 31, shares: 18 },
    { month: 'Oct', views: 3800, likes: 168, comments: 42, shares: 28 },
    { month: 'Nov', views: 4200, likes: 189, comments: 48, shares: 32 },
    { month: 'Dec', views: 4800, likes: 212, comments: 55, shares: 38 }
  ];

  const topArticles = [
    {
      id: 1,
      title: 'Panduan Lengkap Pemilihan Tanaman untuk Vertical Garden',
      views: 3456,
      likes: 189,
      comments: 67,
      shares: 45,
      engagementRate: 87,
      publishDate: '2024-11-15'
    },
    {
      id: 2,
      title: 'Smart Irrigation: Teknologi IoT untuk Efisiensi Air',
      views: 2890,
      likes: 156,
      comments: 52,
      shares: 34,
      engagementRate: 82,
      publishDate: '2024-12-02'
    },
    {
      id: 3,
      title: 'Case Study: Transformasi RTH Jakarta dengan Community Garden',
      views: 2345,
      likes: 134,
      comments: 48,
      shares: 28,
      engagementRate: 79,
      publishDate: '2024-10-20'
    },
    {
      id: 4,
      title: 'Biodiversitas Urban: Peran Taman Kota dalam Konservasi',
      views: 1987,
      likes: 112,
      comments: 39,
      shares: 22,
      engagementRate: 76,
      publishDate: '2024-12-10'
    },
    {
      id: 5,
      title: 'Green Building Standards untuk Iklim Tropis Indonesia',
      views: 1756,
      likes: 98,
      comments: 31,
      shares: 19,
      engagementRate: 73,
      publishDate: '2024-11-28'
    }
  ];

  const audienceDemographics = {
    ageGroups: [
      { range: '18-24', percentage: 15 },
      { range: '25-34', percentage: 35 },
      { range: '35-44', percentage: 28 },
      { range: '45-54', percentage: 16 },
      { range: '55+', percentage: 6 }
    ],
    interests: [
      { topic: 'Sustainable Design', percentage: 42 },
      { topic: 'Urban Planning', percentage: 38 },
      { topic: 'Technology', percentage: 35 },
      { topic: 'Environment', percentage: 32 },
      { topic: 'Architecture', percentage: 28 }
    ],
    sources: [
      { source: 'Direct', percentage: 45 },
      { source: 'Social Media', percentage: 28 },
      { source: 'Search Engine', percentage: 18 },
      { source: 'Referral', percentage: 9 }
    ]
  };

  const engagementTrends = [
    { metric: 'Views', thisMonth: 4800, lastMonth: 4200, change: 14.3 },
    { metric: 'Likes', thisMonth: 212, lastMonth: 189, change: 12.2 },
    { metric: 'Comments', thisMonth: 55, lastMonth: 48, change: 14.6 },
    { metric: 'Shares', thisMonth: 38, lastMonth: 32, change: 18.8 },
    { metric: 'Followers', thisMonth: 1240, lastMonth: 1156, change: 7.3 },
    { metric: 'Avg Read Time', thisMonth: 4.2, lastMonth: 3.9, change: 7.7 }
  ];

  const contentPerformance = [
    { category: 'Tutorial', articles: 8, avgViews: 2340, avgEngagement: 84 },
    { category: 'Case Study', articles: 5, avgViews: 1890, avgEngagement: 78 },
    { category: 'Technology', articles: 6, avgViews: 2150, avgEngagement: 81 },
    { category: 'Research', articles: 4, avgViews: 1650, avgEngagement: 75 },
    { category: 'Trend', articles: 2, avgViews: 1420, avgEngagement: 72 }
  ];

  return (
    <NewDashboardLayout 
      user={{ email: user.email, role: user.role }} 
      title="Analytics"
    >
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Statistik & Analytics</h1>
                <p className="text-gray-600">Pantau performa konten dan engagement pembaca</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter Periode
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Views</p>
                  <p className="text-2xl font-bold text-gray-900">{overallStats.totalViews.toLocaleString()}</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <ArrowUp className="h-3 w-3 mr-1" />
                    +14.3% dari bulan lalu
                  </p>
                </div>
                <Eye className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Engagement</p>
                  <p className="text-2xl font-bold text-gray-900">{overallStats.totalLikes + overallStats.totalComments + overallStats.totalShares}</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <ArrowUp className="h-3 w-3 mr-1" />
                    +12.8% dari bulan lalu
                  </p>
                </div>
                <Heart className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Followers</p>
                  <p className="text-2xl font-bold text-gray-900">{overallStats.followers.toLocaleString()}</p>
                  <p className="text-xs text-teal-600 flex items-center mt-1">
                    <ArrowUp className="h-3 w-3 mr-1" />
                    +7.3% dari bulan lalu
                  </p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Read Time</p>
                  <p className="text-2xl font-bold text-gray-900">{overallStats.avgReadTime}</p>
                  <p className="text-xs text-teal-600 flex items-center mt-1">
                    <ArrowUp className="h-3 w-3 mr-1" />
                    +7.7% dari bulan lalu
                  </p>
                </div>
                <Target className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Performance Trends */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Tren Performa 6 Bulan Terakhir</h3>
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  6 Bulan
                </Button>
              </div>

              {/* Simple chart representation */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Views</span>
                    <span className="font-medium">4.8K (+14.3%)</span>
                  </div>
                  <div className="flex space-x-1 h-8">
                    {monthlyData.map((data, index) => (
                      <div key={index} className="flex-1 bg-gray-100 rounded flex items-end">
                        <div 
                          className="bg-blue-500 rounded w-full" 
                          style={{ height: `${(data.views / 5000) * 100}%` }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    {monthlyData.map((data) => (
                      <span key={data.month}>{data.month}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Likes</span>
                    <span className="font-medium">212 (+12.2%)</span>
                  </div>
                  <div className="flex space-x-1 h-8">
                    {monthlyData.map((data, index) => (
                      <div key={index} className="flex-1 bg-gray-100 rounded flex items-end">
                        <div 
                          className="bg-red-500 rounded w-full" 
                          style={{ height: `${(data.likes / 250) * 100}%` }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Comments</span>
                    <span className="font-medium">55 (+14.6%)</span>
                  </div>
                  <div className="flex space-x-1 h-8">
                    {monthlyData.map((data, index) => (
                      <div key={index} className="flex-1 bg-gray-100 rounded flex items-end">
                        <div 
                          className="bg-green-500 rounded w-full" 
                          style={{ height: `${(data.comments / 60) * 100}%` }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Shares</span>
                    <span className="font-medium">38 (+18.8%)</span>
                  </div>
                  <div className="flex space-x-1 h-8">
                    {monthlyData.map((data, index) => (
                      <div key={index} className="flex-1 bg-gray-100 rounded flex items-end">
                        <div 
                          className="bg-purple-500 rounded w-full" 
                          style={{ height: `${(data.shares / 40) * 100}%` }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Audience Demographics */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Demografi Pembaca</h3>
                <PieChart className="h-5 w-5 text-gray-400" />
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Kelompok Usia</h4>
                  {audienceDemographics.ageGroups.map((group, index) => (
                    <div key={index} className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">{group.range}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${group.percentage}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-900 w-8">{group.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Minat Pembaca</h4>
                  {audienceDemographics.interests.map((interest, index) => (
                    <div key={index} className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">{interest.topic}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-teal-600 h-2 rounded-full" 
                            style={{ width: `${interest.percentage}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-900 w-8">{interest.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Performing Articles */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Artikel Terpopuler</h3>
              <Button variant="outline" size="sm">
                <BarChart3 className="h-4 w-4 mr-2" />
                Lihat Detail
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Artikel</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Views</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Likes</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Comments</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Shares</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Engagement</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {topArticles.map((article, index) => (
                    <tr key={article.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4">
                        <div>
                          <div className="flex items-center">
                            <span className="text-sm font-medium text-gray-900 mr-2">#{index + 1}</span>
                            <div>
                              <p className="text-sm font-medium text-gray-900 line-clamp-1">{article.title}</p>
                              <p className="text-xs text-gray-500">{new Date(article.publishDate).toLocaleDateString('id-ID')}</p>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 text-blue-500 mr-1" />
                          <span className="text-sm font-medium text-gray-900">{article.views.toLocaleString()}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center">
                          <Heart className="h-4 w-4 text-red-500 mr-1" />
                          <span className="text-sm font-medium text-gray-900">{article.likes}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center">
                          <MessageCircle className="h-4 w-4 text-green-500 mr-1" />
                          <span className="text-sm font-medium text-gray-900">{article.comments}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center">
                          <Share2 className="h-4 w-4 text-purple-500 mr-1" />
                          <span className="text-sm font-medium text-gray-900">{article.shares}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className="bg-orange-500 h-2 rounded-full" 
                              style={{ width: `${article.engagementRate}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-900">{article.engagementRate}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Content Performance by Category */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Performa per Kategori</h3>
              <div className="space-y-4">
                {contentPerformance.map((category, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-gray-900">{category.category}</h4>
                      <span className="text-sm text-gray-600">{category.articles} artikel</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Avg Views:</span>
                        <span className="font-medium text-gray-900 ml-2">{category.avgViews.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Avg Engagement:</span>
                        <span className="font-medium text-gray-900 ml-2">{category.avgEngagement}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Traffic Sources */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Sumber Traffic</h3>
              <div className="space-y-4">
                {audienceDemographics.sources.map((source, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{source.source}</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            index === 0 ? 'bg-blue-500' :
                            index === 1 ? 'bg-green-500' :
                            index === 2 ? 'bg-purple-500' : 'bg-orange-500'
                          }`}
                          style={{ width: `${source.percentage}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900 w-8">{source.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">💡 Insight</h4>
                <p className="text-sm text-blue-700">
                  Direct traffic menunjukkan loyalitas pembaca yang tinggi. Fokus pada konten berkualitas untuk mempertahankan engagement.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </NewDashboardLayout>
  );
}
