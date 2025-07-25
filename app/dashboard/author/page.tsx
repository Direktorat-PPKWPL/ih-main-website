import { cookies } from 'next/headers';
import { verifyAccessToken } from '@/lib/auth';
import { redirect } from 'next/navigation';
import NewDashboardLayout from '@/app/components/NewDashboardLayout';
import { Card, CardContent } from '@/app/components/ui/card';
import { PenTool, FileText, Edit3, BookOpen, TrendingUp } from 'lucide-react';

export default async function AuthorDashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;

  if (!token) {
    redirect('/login');
  }

  const user = verifyAccessToken(token);
  if (!user || user.role !== 'Author') {
    redirect('/login');
  }

  return (
    <NewDashboardLayout 
      user={{ email: user.email, role: user.role }} 
      title="Dashboard Author"
    >
      <div className="p-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-purple-600 to-purple-500 rounded-lg shadow-lg p-6 text-white">
            <div className="flex items-center space-x-3">
              <PenTool className="h-8 w-8" />
              <div>
                <h1 className="text-2xl font-bold">Dashboard Author</h1>
                <p className="text-purple-100">
                  Tulis dan kelola artikel tentang infrastruktur hijau
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Articles */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Artikel Terbaru</h2>
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600">Belum Ada Artikel</h3>
                <p className="text-sm text-gray-500 mt-2">
                  Mulai tulis artikel pertama tentang infrastruktur hijau melalui menu sidebar
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Writing Tips */}
        <div className="mb-8">
          <Card className="border-l-4 border-l-orange-600">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-2">✍️ Tips Menulis</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Gunakan bahasa yang mudah dipahami dan engaging</li>
                <li>• Sertakan gambar dan data pendukung yang relevan</li>
                <li>• Fokus pada solusi dan manfaat infrastruktur hijau</li>
                <li>• Selalu review dan edit artikel sebelum publikasi</li>
                <li>• Gunakan heading dan subheading untuk struktur yang jelas</li>
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
                  <p className="text-sm font-medium text-gray-600">Total Artikel</p>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                </div>
                <BookOpen className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Draft Tersimpan</p>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                </div>
                <Edit3 className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Views</p>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                </div>
                <TrendingUp className="h-8 w-8 text-teal-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </NewDashboardLayout>
  );
}
