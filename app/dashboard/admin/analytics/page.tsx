import { cookies } from 'next/headers';
import { verifyAccessToken } from '@/lib/auth';
import { redirect } from 'next/navigation';
import NewDashboardLayout from '@/app/components/NewDashboardLayout';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { BarChart3, TrendingUp, TrendingDown, Users, FileText, Download, Calendar, Filter } from 'lucide-react';

// Mock data untuk charts - dalam implementasi nyata akan menggunakan library charting seperti Chart.js atau Recharts
const mockAnalytics = {
  totalUsers: 142,
  activeUsers: 128,
  totalSubmissions: 56,
  approvedSubmissions: 28,
  totalDocuments: 1847,
  storageUsed: 12.5,
  monthlyGrowth: {
    users: 12.5,
    submissions: 8.3,
    documents: 15.2
  },
  recentActivity: [
    { date: '2025-01-23', users: 15, submissions: 3, documents: 12 },
    { date: '2025-01-22', users: 12, submissions: 5, documents: 8 },
    { date: '2025-01-21', users: 18, submissions: 2, documents: 15 },
    { date: '2025-01-20', users: 9, submissions: 4, documents: 6 },
    { date: '2025-01-19', users: 22, submissions: 1, documents: 20 }
  ],
  categoryDistribution: [
    { category: 'Taman Kota', count: 18, percentage: 32 },
    { category: 'Revitalisasi', count: 12, percentage: 21 },
    { category: 'Bangunan Hijau', count: 10, percentage: 18 },
    { category: 'Koridor Hijau', count: 8, percentage: 14 },
    { category: 'Lainnya', count: 8, percentage: 15 }
  ],
  userRoleDistribution: [
    { role: 'Medium', count: 85, percentage: 60 },
    { role: 'Low', count: 32, percentage: 23 },
    { role: 'Author', count: 18, percentage: 13 },
    { role: 'High', count: 7, percentage: 4 }
  ]
};

export default async function AnalyticsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;

  if (!token) {
    redirect('/login');
  }

  const user = verifyAccessToken(token);
  if (!user || user.role !== 'High') {
    redirect('/login');
  }

  return (
    <NewDashboardLayout 
      user={{ email: user.email, role: user.role }} 
      title="Laporan & Analytics"
    >
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BarChart3 className="h-8 w-8 text-green-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Laporan & Analytics</h1>
                <p className="text-gray-600">Analisis dan statistik sistem infrastruktur hijau</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Periode
              </Button>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Pengguna</p>
                  <p className="text-2xl font-bold text-gray-900">{mockAnalytics.totalUsers}</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">+{mockAnalytics.monthlyGrowth.users}%</span>
                    <span className="text-sm text-gray-500 ml-1">bulan ini</span>
                  </div>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Pengajuan</p>
                  <p className="text-2xl font-bold text-gray-900">{mockAnalytics.totalSubmissions}</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">+{mockAnalytics.monthlyGrowth.submissions}%</span>
                    <span className="text-sm text-gray-500 ml-1">bulan ini</span>
                  </div>
                </div>
                <FileText className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tingkat Persetujuan</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {Math.round((mockAnalytics.approvedSubmissions / mockAnalytics.totalSubmissions) * 100)}%
                  </p>
                  <div className="flex items-center mt-1">
                    <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                    <span className="text-sm text-red-600">-2.3%</span>
                    <span className="text-sm text-gray-500 ml-1">dari bulan lalu</span>
                  </div>
                </div>
                <BarChart3 className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Storage Usage</p>
                  <p className="text-2xl font-bold text-gray-900">{mockAnalytics.storageUsed} GB</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">+{mockAnalytics.monthlyGrowth.documents}%</span>
                    <span className="text-sm text-gray-500 ml-1">bulan ini</span>
                  </div>
                </div>
                <Download className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Activity Chart */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Aktivitas Harian (5 Hari Terakhir)</h3>
              <div className="space-y-4">
                {mockAnalytics.recentActivity.map((day, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{day.date}</span>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
                        <span>{day.users} users</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-orange-500 rounded-full mr-1"></div>
                        <span>{day.submissions} pengajuan</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-purple-500 rounded-full mr-1"></div>
                        <span>{day.documents} dokumen</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Category Distribution */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribusi Kategori Pengajuan</h3>
              <div className="space-y-3">
                {mockAnalytics.categoryDistribution.map((category, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center flex-1">
                      <span className="text-sm text-gray-700 w-24">{category.category}</span>
                      <div className="flex-1 mx-3">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${category.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 text-right">
                      <div>{category.count}</div>
                      <div className="text-xs">{category.percentage}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* User Role Distribution & System Health */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribusi Role Pengguna</h3>
              <div className="space-y-3">
                {mockAnalytics.userRoleDistribution.map((role, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center flex-1">
                      <span className="text-sm text-gray-700 w-16">{role.role}</span>
                      <div className="flex-1 mx-3">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${role.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 text-right">
                      <div>{role.count}</div>
                      <div className="text-xs">{role.percentage}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Sistem</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Server Status</span>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm text-green-600">Online</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Database</span>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm text-green-600">Connected</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Storage</span>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                    <span className="text-sm text-yellow-600">78% Used</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">API Response</span>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm text-green-600">~120ms</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Last Backup</span>
                  <span className="text-sm text-gray-600">2025-01-23 02:00</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Reports */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Laporan Terbaru</h3>
              <Button variant="outline" size="sm">
                Lihat Semua
              </Button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-blue-500" />
                  <div>
                    <span className="text-sm font-medium text-gray-900">Laporan Bulanan - Januari 2025</span>
                    <p className="text-xs text-gray-500">Generated: 2025-01-23 10:30</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <BarChart3 className="h-5 w-5 text-green-500" />
                  <div>
                    <span className="text-sm font-medium text-gray-900">Analisis Performa Q4 2024</span>
                    <p className="text-xs text-gray-500">Generated: 2025-01-20 15:45</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-purple-500" />
                  <div>
                    <span className="text-sm font-medium text-gray-900">Laporan Aktivitas Pengguna</span>
                    <p className="text-xs text-gray-500">Generated: 2025-01-19 09:15</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </NewDashboardLayout>
  );
}
