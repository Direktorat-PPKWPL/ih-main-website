import { cookies } from 'next/headers';
import { verifyAccessToken } from '@/lib/auth';
import { redirect } from 'next/navigation';
import NewDashboardLayout from '@/app/components/NewDashboardLayout';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { FileText, Upload, MapPin, Calendar, Info, AlertCircle, CheckCircle, Save, Send } from 'lucide-react';

export default async function NewSubmissionPage() {
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
      title="Buat Pengajuan Baru"
    >
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3">
            <FileText className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Buat Pengajuan Baru</h1>
              <p className="text-gray-600">Ajukan proposal infrastruktur hijau Anda</p>
            </div>
          </div>
        </div>

        {/* Guidelines Card */}
        <Card className="mb-8 border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <Info className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Panduan Pengajuan</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Pastikan semua field wajib telah diisi dengan lengkap</li>
                  <li>• Upload dokumen pendukung dalam format PDF, DOC, atau gambar</li>
                  <li>• Maksimum ukuran file 10MB per dokumen</li>
                  <li>• Proposal akan direview dalam 3-5 hari kerja</li>
                  <li>• Anda akan mendapat notifikasi via email untuk setiap update status</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <form className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <FileText className="h-5 w-5 mr-2 text-gray-600" />
                Informasi Dasar
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Judul Proposal <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Masukkan judul proposal Anda"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kategori <span className="text-red-500">*</span>
                  </label>
                  <select 
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Pilih kategori</option>
                    <option value="taman-kota">Taman Kota</option>
                    <option value="ruang-terbuka-hijau">Ruang Terbuka Hijau</option>
                    <option value="green-building">Green Building</option>
                    <option value="koridor-hijau">Koridor Hijau</option>
                    <option value="urban-farming">Urban Farming</option>
                    <option value="revitalisasi">Revitalisasi</option>
                    <option value="lainnya">Lainnya</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prioritas
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="medium">Sedang</option>
                    <option value="high">Tinggi</option>
                    <option value="low">Rendah</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estimasi Budget (Rp)
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location Information */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-gray-600" />
                Informasi Lokasi
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Provinsi <span className="text-red-500">*</span>
                  </label>
                  <select 
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Pilih provinsi</option>
                    <option value="dki-jakarta">DKI Jakarta</option>
                    <option value="jawa-barat">Jawa Barat</option>
                    <option value="jawa-tengah">Jawa Tengah</option>
                    <option value="jawa-timur">Jawa Timur</option>
                    <option value="banten">Banten</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kota/Kabupaten <span className="text-red-500">*</span>
                  </label>
                  <select 
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Pilih kota/kabupaten</option>
                    <option value="jakarta-pusat">Jakarta Pusat</option>
                    <option value="jakarta-selatan">Jakarta Selatan</option>
                    <option value="jakarta-timur">Jakarta Timur</option>
                    <option value="jakarta-barat">Jakarta Barat</option>
                    <option value="jakarta-utara">Jakarta Utara</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alamat Lengkap <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Masukkan alamat lengkap lokasi proposal"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Koordinat GPS (Latitude)
                  </label>
                  <input
                    type="text"
                    placeholder="-6.2088"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Koordinat GPS (Longitude)
                  </label>
                  <input
                    type="text"
                    placeholder="106.8456"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-gray-600" />
                Timeline Proyek
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tanggal Mulai Direncanakan
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tanggal Selesai Direncanakan
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Durasi (bulan)
                  </label>
                  <input
                    type="number"
                    placeholder="6"
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Deskripsi Proposal <span className="text-red-500">*</span>
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Latar Belakang
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Jelaskan latar belakang dan alasan mengapa proposal ini penting..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tujuan dan Manfaat <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Uraikan tujuan dan manfaat yang akan dicapai dari proposal ini..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Metode Pelaksanaan
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Jelaskan bagaimana proposal ini akan dilaksanakan..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dampak Lingkungan yang Diharapkan
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Jelaskan dampak positif terhadap lingkungan..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* File Upload */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Upload className="h-5 w-5 mr-2 text-gray-600" />
                Dokumen Pendukung
              </h3>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-4">
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <span className="mt-2 block text-sm font-medium text-gray-900">
                          Klik untuk upload file atau drag and drop
                        </span>
                        <span className="mt-1 block text-xs text-gray-500">
                          PDF, DOC, DOCX, JPG, PNG hingga 10MB
                        </span>
                      </label>
                      <input 
                        id="file-upload" 
                        name="file-upload" 
                        type="file" 
                        className="sr-only"
                        multiple
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Proposal Lengkap (PDF) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="file"
                      required
                      accept=".pdf"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Anggaran Rinci (XLS/PDF)
                    </label>
                    <input
                      type="file"
                      accept=".pdf,.xls,.xlsx"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Foto Lokasi
                    </label>
                    <input
                      type="file"
                      multiple
                      accept=".jpg,.jpeg,.png"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dokumen Izin/Pendukung Lainnya
                    </label>
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Terms and Conditions */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <input 
                  type="checkbox" 
                  id="terms" 
                  required
                  className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="terms" className="text-sm text-gray-700">
                  Saya menyatakan bahwa semua informasi yang saya berikan adalah benar dan akurat. 
                  Saya memahami bahwa pengajuan ini akan direview oleh tim ahli dan saya bersedia 
                  memberikan informasi tambahan jika diperlukan. Saya juga setuju dengan{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-800 underline">
                    syarat dan ketentuan
                  </a>{' '}
                  yang berlaku.
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-6 border-t border-gray-200">
            <Button variant="outline">
              <Save className="h-4 w-4 mr-2" />
              Simpan Sebagai Draft
            </Button>
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                Batal
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                <Send className="h-4 w-4 mr-2" />
                Kirim Pengajuan
              </Button>
            </div>
          </div>
        </form>
      </div>
    </NewDashboardLayout>
  );
}
