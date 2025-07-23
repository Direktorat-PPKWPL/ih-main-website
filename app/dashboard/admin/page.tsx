import { cookies } from 'next/headers';
import { verifyAccessToken } from '@/lib/auth';
import { redirect } from 'next/navigation';
import NewDashboardLayout from '@/app/components/NewDashboardLayout';
import { Card, CardContent } from '@/app/components/ui/card';
import { Users, FileText, Upload, Shield } from 'lucide-react';

export default async function AdminDashboard() {
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
      title="Dashboard Admin"
    >
      <div className="p-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-red-600 to-red-500 rounded-lg shadow-lg p-6 text-white">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8" />
              <div>
                <h1 className="text-2xl font-bold">Panel Administrator</h1>
                <p className="text-red-100">
                  Kelola sistem infrastruktur hijau dengan akses penuh administrator
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Pengguna</p>
                  <p className="text-2xl font-bold text-gray-900">142</p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pengajuan Pending</p>
                  <p className="text-2xl font-bold text-gray-900">23</p>
                </div>
                <FileText className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Dokumen Total</p>
                  <p className="text-2xl font-bold text-gray-900">1,847</p>
                </div>
                <Upload className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Status Sistem</p>
                  <p className="text-sm font-bold text-green-600">Online</p>
                </div>
                <Shield className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Aktivitas Sistem Terbaru</h2>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-800">Pengajuan baru dari user@example.com</span>
                  </div>
                  <span className="text-xs text-gray-500">2 menit lalu</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-800">Dokumen diupload ke sistem</span>
                  </div>
                  <span className="text-xs text-gray-500">5 menit lalu</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-gray-800">User baru terdaftar</span>
                  </div>
                  <span className="text-xs text-gray-500">10 menit lalu</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Management Tips */}
        <div>
          <Card className="border-l-4 border-l-red-500">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-2">🔧 Tips Manajemen</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Periksa pengajuan pending secara berkala</li>
                <li>• Monitor aktivitas pengguna untuk keamanan sistem</li>
                <li>• Backup data sistem secara rutin</li>
                <li>• Review dan update pengaturan sistem sesuai kebutuhan</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </NewDashboardLayout>
  );
}
