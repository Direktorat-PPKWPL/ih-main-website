import { cookies } from 'next/headers';
import { verifyAccessToken } from '@/lib/auth';
import { redirect } from 'next/navigation';
import NewDashboardLayout from '@/app/components/NewDashboardLayout';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Upload, FileText, AlertCircle, CheckCircle, RefreshCw, Eye, Download, Trash2, Plus, X } from 'lucide-react';

// Mock data - dalam implementasi nyata, data ini akan diambil dari database
const mockPendingDocuments = [
  {
    id: 1,
    submissionId: 3,
    submissionTitle: 'Urban Farming Kampung Hijau',
    requiredDocuments: [
      {
        name: 'Analisis Dampak Lingkungan',
        description: 'Dokumen analisis dampak lingkungan yang lebih detail',
        status: 'missing',
        originalFile: null,
        newFile: null,
        deadline: '2025-01-30'
      },
      {
        name: 'Rencana Pemeliharaan Jangka Panjang',
        description: 'Dokumen rencana pemeliharaan untuk 5 tahun ke depan',
        status: 'missing',
        originalFile: null,
        newFile: null,
        deadline: '2025-01-30'
      }
    ],
    feedback: 'Proposal perlu dilengkapi dengan analisis dampak lingkungan yang lebih detail dan rencana pemeliharaan jangka panjang.',
    requestedAt: '2025-01-21 11:30',
    reviewer: 'Prof. Siti Nurhaliza'
  },
  {
    id: 2,
    submissionId: 2,
    submissionTitle: 'Koridor Hijau Jl. Sudirman',
    requiredDocuments: [
      {
        name: 'Izin Lingkungan',
        description: 'Surat izin lingkungan dari KLHK',
        status: 'uploaded',
        originalFile: null,
        newFile: 'izin_lingkungan_update.pdf',
        deadline: '2025-01-28'
      },
      {
        name: 'Site Plan Detail',
        description: 'Site plan dengan detail teknis yang lebih lengkap',
        status: 'pending_review',
        originalFile: 'site_plan_old.dwg',
        newFile: 'site_plan_detail_v2.dwg',
        deadline: '2025-01-28'
      }
    ],
    feedback: 'Diperlukan dokumen izin lingkungan dan site plan yang lebih detail untuk melanjutkan proses review.',
    requestedAt: '2025-01-22 15:45',
    reviewer: 'Dr. Ahmad Setiawan'
  }
];

export default async function ReuploadPage() {
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
      case 'uploaded': return <CheckCircle className="h-4 w-4 text-teal-600" />;
      case 'pending_review': return <RefreshCw className="h-4 w-4 text-blue-600" />;
      case 'missing': return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'uploaded': return 'bg-teal-100 text-teal-800';
      case 'pending_review': return 'bg-blue-100 text-blue-800';
      case 'missing': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'uploaded': return 'Sudah Diupload';
      case 'pending_review': return 'Menunggu Review';
      case 'missing': return 'Belum Diupload';
      default: return 'Unknown';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isDeadlineNear = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 3;
  };

  return (
    <NewDashboardLayout 
      user={{ email: user.email, role: user.role }} 
      title="Upload Ulang Dokumen"
    >
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3">
            <Upload className="h-8 w-8 text-orange-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Upload Ulang Dokumen</h1>
              <p className="text-gray-600">Lengkapi dokumen yang diminta oleh reviewer</p>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Permintaan</p>
                  <p className="text-2xl font-bold text-gray-900">2</p>
                </div>
                <FileText className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Dokumen Missing</p>
                  <p className="text-2xl font-bold text-gray-900">2</p>
                </div>
                <AlertCircle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Sudah Diupload</p>
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
                  <p className="text-sm font-medium text-gray-600">Pending Review</p>
                  <p className="text-2xl font-bold text-gray-900">1</p>
                </div>
                <RefreshCw className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Instructions */}
        <Card className="mb-8 border-l-4 border-l-orange-500">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-orange-800 mb-2">Petunjuk Upload Ulang</h3>
                <ul className="text-sm text-orange-700 space-y-1">
                  <li>• Pastikan dokumen yang diupload sesuai dengan permintaan reviewer</li>
                  <li>• Format file yang diizinkan: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG</li>
                  <li>• Maksimum ukuran file 10MB per dokumen</li>
                  <li>• Perhatikan deadline untuk setiap dokumen</li>
                  <li>• Dokumen akan direview kembali setelah upload selesai</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pending Document Requests */}
        <div className="space-y-6">
          {mockPendingDocuments.map((request) => (
            <Card key={request.id} className="border-l-4 border-l-orange-400">
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{request.submissionTitle}</h3>
                    <span className="text-sm text-gray-500">
                      Diminta pada: {formatDate(request.requestedAt)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">Reviewer:</span> {request.reviewer}
                  </p>
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                    <p className="text-sm font-medium text-orange-800 mb-1">Feedback Reviewer:</p>
                    <p className="text-sm text-orange-700">{request.feedback}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-md font-semibold text-gray-800">Dokumen yang Diminta:</h4>
                  
                  {request.requiredDocuments.map((doc, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h5 className="text-md font-medium text-gray-900">{doc.name}</h5>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                              {getStatusIcon(doc.status)}
                              <span className="ml-1">{getStatusText(doc.status)}</span>
                            </span>
                            {isDeadlineNear(doc.deadline) && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                Deadline Dekat!
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{doc.description}</p>
                          <p className="text-sm text-gray-500">
                            <span className="font-medium">Deadline:</span> {formatDate(doc.deadline)}
                          </p>
                        </div>
                      </div>

                      {/* File Upload Section */}
                      {doc.status === 'missing' && (
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
                          <div className="text-center">
                            <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                            <div>
                              <label htmlFor={`file-upload-${index}`} className="cursor-pointer">
                                <span className="text-sm font-medium text-blue-600 hover:text-blue-500">
                                  Klik untuk upload file
                                </span>
                                <span className="text-sm text-gray-500"> atau drag and drop</span>
                              </label>
                              <input 
                                id={`file-upload-${index}`}
                                name={`file-upload-${index}`}
                                type="file" 
                                className="sr-only"
                                accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                              />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              PDF, DOC, DOCX, XLS, XLSX, JPG, PNG hingga 10MB
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Current File Display */}
                      {doc.newFile && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <FileText className="h-4 w-4 text-blue-500" />
                              <span className="text-sm font-medium text-blue-800">{doc.newFile}</span>
                              {doc.status === 'uploaded' && (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              )}
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-1" />
                                Lihat
                              </Button>
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4 mr-1" />
                                Unduh
                              </Button>
                              {doc.status !== 'pending_review' && (
                                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                                  <Trash2 className="h-4 w-4 mr-1" />
                                  Hapus
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Replace File Option */}
                      {doc.status === 'uploaded' && (
                        <div className="mt-3">
                          <Button variant="outline" size="sm">
                            <Plus className="h-4 w-4 mr-2" />
                            Ganti File
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
                  <Button variant="outline">
                    Simpan Draft
                  </Button>
                  <Button className="bg-orange-600 hover:bg-orange-700">
                    <Upload className="h-4 w-4 mr-2" />
                    Kirim Semua Dokumen
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {mockPendingDocuments.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak Ada Permintaan Upload</h3>
              <p className="text-gray-600 mb-4">
                Saat ini tidak ada dokumen yang perlu diupload ulang.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <FileText className="h-4 w-4 mr-2" />
                Lihat Riwayat Pengajuan
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Upload Progress */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Progress Upload</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Dokumen Lengkap</span>
                <span className="text-sm font-medium text-gray-900">50% (1/2)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-orange-500 h-2 rounded-full" style={{ width: '50%' }}></div>
              </div>
              <p className="text-xs text-gray-500">
                1 pengajuan sudah lengkap, 1 pengajuan masih memerlukan dokumen tambahan
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </NewDashboardLayout>
  );
}
