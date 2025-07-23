import { cookies } from 'next/headers';
import { verifyAccessToken } from '@/lib/auth';
import { redirect } from 'next/navigation';
import NewDashboardLayout from '@/app/components/NewDashboardLayout';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { BarChart3, TrendingUp, Download, Calendar, Filter, TreePine, Building, Users, MapPin, ArrowUp, ArrowDown, FileText, PieChart } from 'lucide-react';

export default async function ReportsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;

  if (!token) {
    redirect('/login');
  }

  const user = verifyAccessToken(token);
  if (!user || user.role !== 'Low') {
    redirect('/login');
  }

  // Mock data untuk statistik dan laporan
  const monthlyStats = [
    { month: 'Jan', infrastruktur: 240, pengunjung: 15200, cakupanHijau: 67 },
    { month: 'Feb', infrastruktur: 242, pengunjung: 16800, cakupanHijau: 68 },
    { month: 'Mar', infrastruktur: 245, pengunjung: 18500, cakupanHijau: 69 },
    { month: 'Apr', infrastruktur: 247, pengunjung: 19200, cakupanHijau: 70 },
    { month: 'May', infrastruktur: 249, pengunjung: 20100, cakupanHijau: 71 },
    { month: 'Jun', infrastruktur: 252, pengunjung: 21500, cakupanHijau: 72 }
  ];

  const typeDistribution = [
    { type: 'Taman Kota', count: 85, percentage: 34 },
    { type: 'Hutan Kota', count: 45, percentage: 18 },
    { type: 'Koridor Hijau', count: 62, percentage: 25 },
    { type: 'Roof Garden', count: 35, percentage: 14 },
    { type: 'Vertical Garden', count: 22, percentage: 9 }
  ];

  const recentReports = [
    {
      id: 1,
      title: 'Laporan Bulanan Infrastruktur Hijau - Juni 2025',
      type: 'Bulanan',
      date: '2025-06-30',
      size: '2.4 MB',
      downloads: 145
    },
    {
      id: 2,
      title: 'Analisis Kualitas Udara Q2 2025',
      type: 'Kuartalan',
      date: '2025-06-15',
      size: '1.8 MB',
      downloads: 89
    },
    {
      id: 3,
      title: 'Survey Kepuasan Pengunjung Taman Kota',
      type: 'Survey',
      date: '2025-06-10',
      size: '3.2 MB',
      downloads: 234
    },
    {
      id: 4,
      title: 'Laporan Maintenance Infrastruktur Mei 2025',
      type: 'Maintenance',
      date: '2025-05-31',
      size: '1.5 MB',
      downloads: 67
    }
  ];

  const keyMetrics = [
    {
      title: 'Total Infrastruktur',
      value: '249',
      change: '+2.4%',
      trend: 'up',
      description: 'Dari bulan lalu'
    },
    {
      title: 'Pengunjung Bulan Ini',
      value: '21.5K',
      change: '+12.8%',
      trend: 'up',
      description: 'Dari bulan lalu'
    },
    {
      title: 'Cakupan Hijau',
      value: '72%',
      change: '+1.4%',
      trend: 'up',
      description: 'Target: 75%'
    },
    {
      title: 'Tingkat Kepuasan',
      value: '4.6/5',
      change: '-0.1',
      trend: 'down',
      description: 'Rating pengunjung'
    }
  ];

  return (
    <NewDashboardLayout 
      user={{ email: user.email, role: user.role }} 
      title="Statistik & Laporan"
    >
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BarChart3 className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Statistik & Laporan</h1>
                <p className="text-gray-600">Analisis dan insight data infrastruktur hijau</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter Periode
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Download className="h-4 w-4 mr-2" />
                Download Laporan
              </Button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {keyMetrics.map((metric, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <div className={`flex items-center ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {metric.trend === 'up' ? 
                      <ArrowUp className="h-4 w-4" /> : 
                      <ArrowDown className="h-4 w-4" />
                    }
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</p>
                <div className="flex items-center space-x-2">
                  <span className={`text-sm font-medium ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {metric.change}
                  </span>
                  <span className="text-sm text-gray-500">{metric.description}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Tren Bulanan */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Tren Pertumbuhan</h3>
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  6 Bulan Terakhir
                </Button>
              </div>
              
              {/* Simple chart representation */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Infrastruktur</span>
                    <span className="font-medium">249 (+3.8%)</span>
                  </div>
                  <div className="flex space-x-1 h-8">
                    {monthlyStats.map((stat, index) => (
                      <div key={index} className="flex-1 bg-gray-100 rounded flex items-end">
                        <div 
                          className="bg-blue-500 rounded w-full" 
                          style={{ height: `${(stat.infrastruktur / 260) * 100}%` }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    {monthlyStats.map((stat) => (
                      <span key={stat.month}>{stat.month}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Pengunjung (ribu)</span>
                    <span className="font-medium">21.5K (+41.4%)</span>
                  </div>
                  <div className="flex space-x-1 h-8">
                    {monthlyStats.map((stat, index) => (
                      <div key={index} className="flex-1 bg-gray-100 rounded flex items-end">
                        <div 
                          className="bg-green-500 rounded w-full" 
                          style={{ height: `${(stat.pengunjung / 22000) * 100}%` }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    {monthlyStats.map((stat) => (
                      <span key={stat.month}>{stat.month}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Cakupan Hijau (%)</span>
                    <span className="font-medium">72% (+7.5%)</span>
                  </div>
                  <div className="flex space-x-1 h-8">
                    {monthlyStats.map((stat, index) => (
                      <div key={index} className="flex-1 bg-gray-100 rounded flex items-end">
                        <div 
                          className="bg-purple-500 rounded w-full" 
                          style={{ height: `${(stat.cakupanHijau / 75) * 100}%` }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    {monthlyStats.map((stat) => (
                      <span key={stat.month}>{stat.month}</span>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Distribusi Tipe */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Distribusi Tipe Infrastruktur</h3>
                <PieChart className="h-5 w-5 text-gray-400" />
              </div>
              
              <div className="space-y-4">
                {typeDistribution.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div 
                        className={`w-4 h-4 rounded-full ${
                          index === 0 ? 'bg-blue-500' :
                          index === 1 ? 'bg-green-500' :
                          index === 2 ? 'bg-purple-500' :
                          index === 3 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                      />
                      <span className="text-sm text-gray-700">{item.type}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium text-gray-900">{item.count}</span>
                      <span className="text-sm text-gray-500">({item.percentage}%)</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <div className="flex h-4 rounded-full overflow-hidden">
                  {typeDistribution.map((item, index) => (
                    <div
                      key={index}
                      className={`${
                        index === 0 ? 'bg-blue-500' :
                        index === 1 ? 'bg-green-500' :
                        index === 2 ? 'bg-purple-500' :
                        index === 3 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Reports */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Laporan Terbaru</h3>
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Lihat Semua
              </Button>
            </div>
            
            <div className="space-y-4">
              {recentReports.map((report) => (
                <div key={report.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{report.title}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(report.date).toLocaleDateString('id-ID')}
                        </span>
                        <span>{report.type}</span>
                        <span>{report.size}</span>
                        <span>{report.downloads} download</span>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Efisiensi Maintenance</h3>
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Scheduled</span>
                  <span className="font-medium text-green-600">95%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">On Time</span>
                  <span className="font-medium text-blue-600">87%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Completed</span>
                  <span className="font-medium text-purple-600">92%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Kualitas Udara</h3>
                <TreePine className="h-5 w-5 text-green-500" />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">PM2.5 Reduction</span>
                  <span className="font-medium text-green-600">24%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">CO2 Absorption</span>
                  <span className="font-medium text-blue-600">156 ton/tahun</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">O2 Production</span>
                  <span className="font-medium text-purple-600">234 ton/tahun</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Dampak Sosial</h3>
                <Users className="h-5 w-5 text-blue-500" />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Job Created</span>
                  <span className="font-medium text-green-600">1,240</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Community Engagement</span>
                  <span className="font-medium text-blue-600">78%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Educational Programs</span>
                  <span className="font-medium text-purple-600">156</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </NewDashboardLayout>
  );
}
