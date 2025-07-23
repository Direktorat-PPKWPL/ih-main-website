import { cookies } from 'next/headers';
import { verifyAccessToken } from '@/lib/auth';
import { redirect } from 'next/navigation';
import NewDashboardLayout from '@/app/components/NewDashboardLayout';
import { Card, CardContent } from '@/app/components/ui/card';
import { Eye, BarChart3 } from 'lucide-react';

export default async function ViewerDashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;

  if (!token) {
    redirect('/login');
  }

  const user = verifyAccessToken(token);
  if (!user || user.role !== 'Low') {
    redirect('/login');
  }

  return (
    <NewDashboardLayout 
      user={{ email: user.email, role: user.role }} 
      title="Dashboard Viewer"
    >
      <div className="p-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-lg shadow-lg p-6 text-white">
            <div className="flex items-center space-x-3">
              <Eye className="h-8 w-8" />
              <div>
                <h1 className="text-2xl font-bold">Dashboard Viewer</h1>
                <p className="text-green-100">
                  Akses dan lihat informasi infrastruktur hijau yang tersedia
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Aktivitas Terbaru</h2>
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-8">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600">Belum Ada Aktivitas</h3>
                <p className="text-sm text-gray-500 mt-2">
                  Mulai jelajahi data infrastruktur hijau yang tersedia melalui menu sidebar
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Access Info */}
        <div className="mb-8">
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-2">🔍 Akses Cepat</h3>
              <p className="text-sm text-gray-600 mb-4">
                Gunakan menu sidebar untuk mengakses berbagai fitur yang tersedia:
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• <strong>Lihat Data Infrastruktur</strong> - Akses informasi lengkap infrastruktur hijau</li>
                <li>• <strong>Statistik & Laporan</strong> - Lihat laporan dan statistik terkini</li>
                <li>• <strong>Peta Infrastruktur</strong> - Jelajahi peta sebaran infrastruktur</li>
                <li>• <strong>Dokumentasi</strong> - Akses dokumen dan panduan</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Data Tersedia</p>
                  <p className="text-2xl font-bold text-gray-900">1,247</p>
                </div>
                <Eye className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Laporan Terbaru</p>
                  <p className="text-2xl font-bold text-gray-900">45</p>
                </div>
                <BarChart3 className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Terakhir Update</p>
                  <p className="text-sm font-bold text-gray-900">Hari ini</p>
                </div>
                <Eye className="h-8 w-8 text-gray-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </NewDashboardLayout>
  );
}
