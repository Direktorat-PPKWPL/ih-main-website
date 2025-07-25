import { cookies } from 'next/headers';
import { verifyAccessToken } from '@/lib/auth';
import { redirect } from 'next/navigation';
import NewDashboardLayout from '@/app/components/NewDashboardLayout';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { FileText, Clock, CheckCircle, XCircle, AlertCircle, Search, Filter, Eye, Download } from 'lucide-react';

// Mock data - dalam implementasi nyata, data ini akan diambil dari database
const mockSubmissions = [
  {
    id: 1,
    title: 'Pengajuan Taman Kota Menteng',
    submitter: 'Ahmad Setiawan',
    submitterEmail: 'ahmad.setiawan@email.com',
    submittedAt: '2025-01-23 09:15',
    category: 'Taman Kota',
    status: 'pending',
    priority: 'high',
    description: 'Pengajuan pembangunan taman kota di area Menteng dengan fokus pada infrastruktur hijau berkelanjutan.',
    documentsCount: 5,
    location: 'Jakarta Pusat'
  },
  {
    id: 2,
    title: 'Revitalisasi Taman Suropati',
    submitter: 'Siti Nurhaliza',
    submitterEmail: 'siti.nurhaliza@email.com',
    submittedAt: '2025-01-22 14:30',
    category: 'Revitalisasi',
    status: 'approved',
    priority: 'medium',
    description: 'Proposal revitalisasi Taman Suropati dengan penambahan fitur ramah lingkungan.',
    documentsCount: 8,
    location: 'Jakarta Pusat'
  },
  {
    id: 3,
    title: 'Green Building Sudirman',
    submitter: 'Budi Pratama',
    submitterEmail: 'budi.pratama@email.com',
    submittedAt: '2025-01-21 11:20',
    category: 'Bangunan Hijau',
    status: 'rejected',
    priority: 'low',
    description: 'Pengajuan sertifikasi green building untuk gedung perkantoran di Sudirman.',
    documentsCount: 3,
    location: 'Jakarta Selatan'
  },
  {
    id: 4,
    title: 'Koridor Hijau Kemang',
    submitter: 'Maya Sari',
    submitterEmail: 'maya.sari@email.com',
    submittedAt: '2025-01-23 16:45',
    category: 'Koridor Hijau',
    status: 'in_review',
    priority: 'high',
    description: 'Pembangunan koridor hijau sepanjang Jalan Kemang untuk meningkatkan kualitas udara.',
    documentsCount: 6,
    location: 'Jakarta Selatan'
  }
];

export default async function ReviewsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;

  if (!token) {
    redirect('/login');
  }

  const user = verifyAccessToken(token);
  if (!user || user.role !== 'High') {
    redirect('/login');
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      case 'in_review': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-orange-100 text-orange-800';
      case 'approved': return 'bg-teal-100 text-teal-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'in_review': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      case 'low': return 'bg-teal-100 text-teal-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Menunggu Review';
      case 'approved': return 'Disetujui';
      case 'rejected': return 'Ditolak';
      case 'in_review': return 'Sedang Direview';
      default: return 'Unknown';
    }
  };

  return (
    <NewDashboardLayout 
      user={{ email: user.email, role: user.role }} 
      title="Review Pengajuan"
    >
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3">
            <FileText className="h-8 w-8 text-orange-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Review Pengajuan</h1>
              <p className="text-gray-600">Kelola dan review pengajuan infrastruktur hijau</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Pengajuan</p>
                  <p className="text-2xl font-bold text-gray-900">56</p>
                </div>
                <FileText className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Menunggu Review</p>
                  <p className="text-2xl font-bold text-gray-900">23</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Disetujui</p>
                  <p className="text-2xl font-bold text-gray-900">28</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Ditolak</p>
                  <p className="text-2xl font-bold text-gray-900">5</p>
                </div>
                <XCircle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Cari pengajuan..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                  <option value="">Semua Status</option>
                  <option value="pending">Menunggu Review</option>
                  <option value="in_review">Sedang Direview</option>
                  <option value="approved">Disetujui</option>
                  <option value="rejected">Ditolak</option>
                </select>
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                  <option value="">Semua Kategori</option>
                  <option value="taman">Taman Kota</option>
                  <option value="revitalisasi">Revitalisasi</option>
                  <option value="green-building">Bangunan Hijau</option>
                  <option value="koridor">Koridor Hijau</option>
                </select>
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                  <option value="">Semua Prioritas</option>
                  <option value="high">Tinggi</option>
                  <option value="medium">Sedang</option>
                  <option value="low">Rendah</option>
                </select>
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter Lanjutan
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Submissions List */}
        <div className="space-y-4">
          {mockSubmissions.map((submission) => (
            <Card key={submission.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{submission.title}</h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(submission.status)}`}>
                        {getStatusIcon(submission.status)}
                        <span className="ml-1">{getStatusText(submission.status)}</span>
                      </span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(submission.priority)}`}>
                        {submission.priority === 'high' ? 'Prioritas Tinggi' : 
                         submission.priority === 'medium' ? 'Prioritas Sedang' : 'Prioritas Rendah'}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Pengaju:</span> {submission.submitter}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Email:</span> {submission.submitterEmail}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Kategori:</span> {submission.category}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Tanggal Pengajuan:</span> {submission.submittedAt}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Lokasi:</span> {submission.location}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Dokumen:</span> {submission.documentsCount} file
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-700 mb-4">{submission.description}</p>
                    
                    <div className="flex items-center space-x-2">
                      <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                        <Eye className="h-4 w-4 mr-2" />
                        Review Detail
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Unduh Dokumen
                      </Button>
                      {submission.status === 'pending' && (
                        <>
                          <Button size="sm" variant="outline" className="text-green-600 hover:text-green-700 border-green-600">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Setujui
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 border-red-600">
                            <XCircle className="h-4 w-4 mr-2" />
                            Tolak
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Menampilkan <span className="font-medium">1</span> sampai <span className="font-medium">4</span> dari{' '}
            <span className="font-medium">56</span> hasil
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              Sebelumnya
            </Button>
            <Button variant="outline" size="sm">
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
