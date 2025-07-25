import { cookies } from 'next/headers';
import { verifyAccessToken } from '@/lib/auth';
import { redirect } from 'next/navigation';
import NewDashboardLayout from '@/app/components/NewDashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { FileText, User } from 'lucide-react';

export default async function UserDashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;

  if (!token) {
    redirect('/login');
  }

  const user = verifyAccessToken(token);
  if (!user || user.role !== 'Medium') {
    redirect('/login');
  }

  return (
    <NewDashboardLayout 
      user={{ email: user.email, role: user.role }} 
      title="Dashboard User"
    >
      <div className="p-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg shadow-lg p-6 text-white">
            <div className="flex items-center space-x-3">
              <User className="h-8 w-8" />
              <div>
                <h1 className="text-2xl font-bold">Selamat Datang, {user.email}</h1>
                <p className="text-blue-100">
                  Anda dapat mengajukan formulir dan mengelola dokumen infrastruktur hijau
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Status Pengajuan */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Status Pengajuan Terbaru</h2>
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600">Belum Ada Pengajuan</h3>
                <p className="text-sm text-gray-500 mt-2">
                  Mulai buat pengajuan baru untuk infrastruktur hijau melalui menu sidebar
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tips Section */}
        <div className="mb-8">
          <Card className="border-l-4 border-l-teal-600">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-2">💡 Tips Pengajuan</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Pastikan semua dokumen yang diupload dalam format PDF atau JPG</li>
                <li>• Ukuran file maksimal 5MB per dokumen</li>
                <li>• Lengkapi semua informasi yang diperlukan sebelum submit</li>
                <li>• Periksa kembali data sebelum mengirim pengajuan</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Pengajuan</p>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                </div>
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Dalam Proses</p>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                </div>
                <FileText className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Disetujui</p>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                </div>
                <FileText className="h-8 w-8 text-teal-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </NewDashboardLayout>
  );
}
