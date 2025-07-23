import { cookies } from 'next/headers';
import { verifyAccessToken } from '@/lib/auth';
import { redirect } from 'next/navigation';
import NewDashboardLayout from '@/app/components/NewDashboardLayout';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Upload, FileText, Image, File, Folder, Search, Filter, Download, Eye, Trash2, MoreVertical, Plus } from 'lucide-react';

// Mock data - dalam implementasi nyata, data ini akan diambil dari database
const mockDocuments = [
  {
    id: 1,
    name: 'Proposal_Taman_Menteng.pdf',
    type: 'pdf',
    size: '2.5 MB',
    uploadedBy: 'Ahmad Setiawan',
    uploadedAt: '2025-01-23 09:15',
    category: 'Proposal',
    status: 'approved',
    downloads: 15,
    folder: 'Taman Kota'
  },
  {
    id: 2,
    name: 'Blueprints_Suropati.dwg',
    type: 'dwg',
    size: '8.1 MB',
    uploadedBy: 'Siti Nurhaliza',
    uploadedAt: '2025-01-22 14:30',
    category: 'Teknis',
    status: 'approved',
    downloads: 8,
    folder: 'Revitalisasi'
  },
  {
    id: 3,
    name: 'Environmental_Impact.xlsx',
    type: 'xlsx',
    size: '1.2 MB',
    uploadedBy: 'Budi Pratama',
    uploadedAt: '2025-01-21 11:20',
    category: 'Analisis',
    status: 'pending',
    downloads: 3,
    folder: 'Analisis Lingkungan'
  },
  {
    id: 4,
    name: 'Site_Photos.zip',
    type: 'zip',
    size: '15.7 MB',
    uploadedBy: 'Maya Sari',
    uploadedAt: '2025-01-23 16:45',
    category: 'Dokumentasi',
    status: 'approved',
    downloads: 12,
    folder: 'Foto Lokasi'
  },
  {
    id: 5,
    name: 'Budget_Analysis.docx',
    type: 'docx',
    size: '850 KB',
    uploadedBy: 'Rudi Hartono',
    uploadedAt: '2025-01-20 10:15',
    category: 'Keuangan',
    status: 'rejected',
    downloads: 0,
    folder: 'Anggaran'
  }
];

const mockFolders = [
  { name: 'Taman Kota', count: 24, updated: '2025-01-23' },
  { name: 'Revitalisasi', count: 18, updated: '2025-01-22' },
  { name: 'Bangunan Hijau', count: 12, updated: '2025-01-21' },
  { name: 'Koridor Hijau', count: 9, updated: '2025-01-20' },
  { name: 'Analisis Lingkungan', count: 15, updated: '2025-01-19' },
  { name: 'Anggaran', count: 7, updated: '2025-01-18' }
];

export default async function DocumentsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;

  if (!token) {
    redirect('/login');
  }

  const user = verifyAccessToken(token);
  if (!user || user.role !== 'High') {
    redirect('/login');
  }

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf': return <FileText className="h-5 w-5 text-red-500" />;
      case 'docx':
      case 'doc': return <FileText className="h-5 w-5 text-blue-500" />;
      case 'xlsx':
      case 'xls': return <FileText className="h-5 w-5 text-green-500" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif': return <Image className="h-5 w-5 text-purple-500" />;
      case 'zip':
      case 'rar': return <File className="h-5 w-5 text-yellow-500" />;
      default: return <File className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved': return 'Disetujui';
      case 'pending': return 'Menunggu';
      case 'rejected': return 'Ditolak';
      default: return 'Unknown';
    }
  };

  return (
    <NewDashboardLayout 
      user={{ email: user.email, role: user.role }} 
      title="Manajemen Dokumen"
    >
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Upload className="h-8 w-8 text-purple-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Manajemen Dokumen</h1>
                <p className="text-gray-600">Kelola dokumen dan file sistem infrastruktur hijau</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline">
                <Folder className="h-4 w-4 mr-2" />
                Buat Folder
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Upload className="h-4 w-4 mr-2" />
                Upload Dokumen
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Dokumen</p>
                  <p className="text-2xl font-bold text-gray-900">1,847</p>
                </div>
                <FileText className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Storage Terpakai</p>
                  <p className="text-2xl font-bold text-gray-900">12.5 GB</p>
                </div>
                <Upload className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Upload Hari Ini</p>
                  <p className="text-2xl font-bold text-gray-900">23</p>
                </div>
                <Plus className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Download</p>
                  <p className="text-2xl font-bold text-gray-900">5,621</p>
                </div>
                <Download className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Folders Section */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Folder</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {mockFolders.map((folder, index) => (
                <div key={index} className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <Folder className="h-12 w-12 text-blue-500 mb-2" />
                  <span className="text-sm font-medium text-gray-900 text-center">{folder.name}</span>
                  <span className="text-xs text-gray-500">{folder.count} file</span>
                  <span className="text-xs text-gray-400">{folder.updated}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Cari dokumen..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                  <option value="">Semua Kategori</option>
                  <option value="proposal">Proposal</option>
                  <option value="teknis">Teknis</option>
                  <option value="analisis">Analisis</option>
                  <option value="dokumentasi">Dokumentasi</option>
                  <option value="keuangan">Keuangan</option>
                </select>
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                  <option value="">Semua Status</option>
                  <option value="approved">Disetujui</option>
                  <option value="pending">Menunggu</option>
                  <option value="rejected">Ditolak</option>
                </select>
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                  <option value="">Semua Format</option>
                  <option value="pdf">PDF</option>
                  <option value="docx">Word</option>
                  <option value="xlsx">Excel</option>
                  <option value="image">Gambar</option>
                  <option value="zip">Archive</option>
                </select>
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter Lanjutan
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Documents Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dokumen
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Kategori
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Diupload Oleh
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Download
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockDocuments.map((document) => (
                    <tr key={document.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getFileIcon(document.type)}
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">{document.name}</div>
                            <div className="text-sm text-gray-500">{document.size} • {document.folder}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">{document.category}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm text-gray-900">{document.uploadedBy}</div>
                          <div className="text-sm text-gray-500">{document.uploadedAt}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(document.status)}`}>
                          {getStatusText(document.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {document.downloads}x
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Menampilkan <span className="font-medium">1</span> sampai <span className="font-medium">5</span> dari{' '}
            <span className="font-medium">1,847</span> hasil
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
