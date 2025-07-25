import { cookies } from 'next/headers';
import { verifyAccessToken } from '@/lib/auth';
import { redirect } from 'next/navigation';
import NewDashboardLayout from '@/app/components/NewDashboardLayout';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Clock, FileText, Search, Filter, Eye, Download, Edit, Trash2, CheckCircle, XCircle, AlertCircle, RefreshCw } from 'lucide-react';

// Mock data - dalam implementasi nyata, data ini akan diambil dari database
const mockSubmissions = [
  {
    id: 1,
    title: 'Pengembangan Taman Kota Menteng',
    category: 'Taman Kota',
    status: 'approved',
    submittedAt: '2025-01-20 10:30',
    reviewedAt: '2025-01-22 14:15',
    priority: 'high',
    budget: 250000000,
    location: 'Jakarta Pusat',
    reviewer: 'Dr. Ahmad Setiawan',
    feedback: 'Proposal sangat baik dan sesuai dengan standar infrastruktur hijau. Disetujui untuk tahap implementasi.',
    documentsCount: 5
  },
  {
    id: 2,
    title: 'Koridor Hijau Jl. Sudirman',
    category: 'Koridor Hijau',
    status: 'in_review',
    submittedAt: '2025-01-22 09:15',
    reviewedAt: null,
    priority: 'medium',
    budget: 150000000,
    location: 'Jakarta Selatan',
    reviewer: null,
    feedback: null,
    documentsCount: 3
  },
  {
    id: 3,
    title: 'Urban Farming Kampung Hijau',
    category: 'Urban Farming',
    status: 'rejected',
    submittedAt: '2025-01-18 14:45',
    reviewedAt: '2025-01-21 11:30',
    priority: 'low',
    budget: 75000000,
    location: 'Jakarta Timur',
    reviewer: 'Prof. Siti Nurhaliza',
    feedback: 'Proposal perlu dilengkapi dengan analisis dampak lingkungan yang lebih detail dan rencana pemeliharaan jangka panjang.',
    documentsCount: 2
  },
  {
    id: 4,
    title: 'Green Building Kompleks Perkantoran',
    category: 'Green Building',
    status: 'pending',
    submittedAt: '2025-01-23 16:20',
    reviewedAt: null,
    priority: 'high',
    budget: 500000000,
    location: 'Jakarta Barat',
    reviewer: null,
    feedback: null,
    documentsCount: 7
  },
  {
    id: 5,
    title: 'Revitalisasi Taman Suropati',
    category: 'Revitalisasi',
    status: 'draft',
    submittedAt: null,
    reviewedAt: null,
    priority: 'medium',
    budget: 180000000,
    location: 'Jakarta Pusat',
    reviewer: null,
    feedback: null,
    documentsCount: 1
  }
];

export default async function SubmissionHistoryPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;

  if (!token) {
    redirect('/login');
  }

  const user = verifyAccessToken(token);
  if (!user || user.role !== 'Medium') {
    redirect('/login');
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-4 w-4 text-teal-600" />;
      case 'rejected': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'in_review': return <RefreshCw className="h-4 w-4 text-blue-600" />;
      case 'pending': return <Clock className="h-4 w-4 text-orange-600" />;
      case 'draft': return <Edit className="h-4 w-4 text-gray-500" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-teal-100 text-teal-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'in_review': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-orange-100 text-orange-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved': return 'Disetujui';
      case 'rejected': return 'Ditolak';
      case 'in_review': return 'Sedang Direview';
      case 'pending': return 'Menunggu Review';
      case 'draft': return 'Draft';
      default: return 'Unknown';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <NewDashboardLayout 
      user={{ email: user.email, role: user.role }} 
      title="Riwayat Pengajuan"
    >
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Clock className="h-8 w-8 text-purple-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Riwayat Pengajuan</h1>
                <p className="text-gray-600">Track status dan kelola pengajuan Anda</p>
              </div>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <FileText className="h-4 w-4 mr-2" />
              Buat Pengajuan Baru
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Pengajuan</p>
                  <p className="text-2xl font-bold text-gray-900">5</p>
                </div>
                <FileText className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Disetujui</p>
                  <p className="text-2xl font-bold text-gray-900">1</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Dalam Review</p>
                  <p className="text-2xl font-bold text-gray-900">2</p>
                </div>
                <RefreshCw className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Ditolak</p>
                  <p className="text-2xl font-bold text-gray-900">1</p>
                </div>
                <XCircle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Draft</p>
                  <p className="text-2xl font-bold text-gray-900">1</p>
                </div>
                <Edit className="h-8 w-8 text-gray-500" />
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
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                  <option value="">Semua Status</option>
                  <option value="approved">Disetujui</option>
                  <option value="rejected">Ditolak</option>
                  <option value="in_review">Sedang Direview</option>
                  <option value="pending">Menunggu Review</option>
                  <option value="draft">Draft</option>
                </select>
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                  <option value="">Semua Kategori</option>
                  <option value="taman-kota">Taman Kota</option>
                  <option value="koridor-hijau">Koridor Hijau</option>
                  <option value="green-building">Green Building</option>
                  <option value="urban-farming">Urban Farming</option>
                  <option value="revitalisasi">Revitalisasi</option>
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
                    <div className="flex items-center space-x-3 mb-3">
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
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Kategori:</span> {submission.category}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Lokasi:</span> {submission.location}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Budget:</span> {formatCurrency(submission.budget)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Tanggal Pengajuan:</span>{' '}
                          {submission.submittedAt ? formatDate(submission.submittedAt) : 'Belum dikirim'}
                        </p>
                        {submission.reviewedAt && (
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Tanggal Review:</span> {formatDate(submission.reviewedAt)}
                          </p>
                        )}
                        {submission.reviewer && (
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Reviewer:</span> {submission.reviewer}
                          </p>
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Dokumen:</span> {submission.documentsCount} file
                        </p>
                      </div>
                    </div>
                    
                    {submission.feedback && (
                      <div className={`p-3 rounded-lg mb-4 ${
                        submission.status === 'approved' ? 'bg-green-50 border border-green-200' :
                        submission.status === 'rejected' ? 'bg-red-50 border border-red-200' :
                        'bg-blue-50 border border-blue-200'
                      }`}>
                        <p className="text-sm font-medium text-gray-800 mb-1">Feedback Reviewer:</p>
                        <p className="text-sm text-gray-700">{submission.feedback}</p>
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        Lihat Detail
                      </Button>
                      
                      {submission.status !== 'draft' && (
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Unduh Dokumen
                        </Button>
                      )}
                      
                      {(submission.status === 'draft' || submission.status === 'rejected') && (
                        <Button size="sm" variant="outline" className="text-blue-600 hover:text-blue-700">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      )}
                      
                      {submission.status === 'draft' && (
                        <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Hapus
                        </Button>
                      )}
                      
                      {submission.status === 'rejected' && (
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          <FileText className="h-4 w-4 mr-2" />
                          Ajukan Ulang
                        </Button>
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
            Menampilkan <span className="font-medium">1</span> sampai <span className="font-medium">5</span> dari{' '}
            <span className="font-medium">5</span> hasil
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              Sebelumnya
            </Button>
            <Button variant="outline" size="sm">
              1
            </Button>
            <Button variant="outline" size="sm" disabled>
              Selanjutnya
            </Button>
          </div>
        </div>
      </div>
    </NewDashboardLayout>
  );
}
