import { cookies } from 'next/headers';
import { verifyAccessToken } from '@/lib/auth';
import { redirect } from 'next/navigation';
import NewDashboardLayout from '@/app/components/NewDashboardLayout';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { User, Mail, Phone, MapPin, Calendar, Lock, Save, Edit, Camera, Bell, Shield, Eye, EyeOff } from 'lucide-react';

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;

  if (!token) {
    redirect('/login');
  }

  const user = verifyAccessToken(token);
  if (!user || user.role !== 'Medium') {
    redirect('/login');
  }

  // Mock user data - dalam implementasi nyata akan diambil dari database
  const userData = {
    id: 1,
    name: 'Ahmad Setiawan',
    email: user.email,
    phone: '+62 812-3456-7890',
    avatar: null,
    birthDate: '1990-05-15',
    gender: 'Laki-laki',
    address: 'Jl. Raya Menteng No. 25, Jakarta Pusat',
    profession: 'Arsitek Lansekap',
    organization: 'PT. Green Architecture Indonesia',
    experience: '8 tahun',
    education: 'S1 Arsitektur Lansekap - Universitas Indonesia',
    bio: 'Arsitek lansekap dengan pengalaman 8 tahun dalam bidang infrastruktur hijau dan desain taman kota. Passionate dalam menciptakan ruang hijau yang berkelanjutan.',
    joinedAt: '2024-06-15',
    lastLogin: '2025-01-23 10:30',
    submissionCount: 5,
    approvedCount: 3,
    notifications: {
      email: true,
      browser: true,
      submission: true,
      newsletter: false
    },
    privacy: {
      profilePublic: false,
      showEmail: false,
      showPhone: false
    }
  };

  return (
    <NewDashboardLayout 
      user={{ email: user.email, role: user.role }} 
      title="Profil Saya"
    >
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3">
            <User className="h-8 w-8 text-green-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Profil Saya</h1>
              <p className="text-gray-600">Kelola informasi pribadi dan pengaturan akun Anda</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Overview */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card>
              <CardContent className="p-6 text-center">
                <div className="relative inline-block mb-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {userData.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full shadow-lg border-2 border-gray-100 flex items-center justify-center hover:bg-gray-50">
                    <Camera className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{userData.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{userData.profession}</p>
                <p className="text-sm text-gray-500 mb-4">{userData.organization}</p>
                <div className="flex justify-center space-x-4 text-sm">
                  <div className="text-center">
                    <div className="font-semibold text-gray-900">{userData.submissionCount}</div>
                    <div className="text-gray-500">Pengajuan</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-gray-900">{userData.approvedCount}</div>
                    <div className="text-gray-500">Disetujui</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-gray-900">{userData.experience}</div>
                    <div className="text-gray-500">Pengalaman</div>
                  </div>
                </div>
                <Button variant="outline" className="mt-4 w-full">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profil
                </Button>
              </CardContent>
            </Card>

            {/* Account Stats */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistik Akun</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Bergabung sejak</span>
                    <span className="font-medium text-gray-900">
                      {new Date(userData.joinedAt).toLocaleDateString('id-ID', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Login terakhir</span>
                    <span className="font-medium text-gray-900">{userData.lastLogin}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total pengajuan</span>
                    <span className="font-medium text-gray-900">{userData.submissionCount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tingkat approval</span>
                    <span className="font-medium text-green-600">
                      {Math.round((userData.approvedCount / userData.submissionCount) * 100)}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Informasi Pribadi</h3>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </div>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        defaultValue={userData.name}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        defaultValue={userData.email}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nomor Telepon
                      </label>
                      <input
                        type="tel"
                        defaultValue={userData.phone}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tanggal Lahir
                      </label>
                      <input
                        type="date"
                        defaultValue={userData.birthDate}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Jenis Kelamin
                      </label>
                      <select
                        defaultValue={userData.gender}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      >
                        <option value="Laki-laki">Laki-laki</option>
                        <option value="Perempuan">Perempuan</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Profesi
                      </label>
                      <input
                        type="text"
                        defaultValue={userData.profession}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Alamat
                    </label>
                    <textarea
                      rows={3}
                      defaultValue={userData.address}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Professional Information */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Informasi Profesional</h3>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </div>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Organisasi/Perusahaan
                      </label>
                      <input
                        type="text"
                        defaultValue={userData.organization}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Pengalaman Kerja
                      </label>
                      <input
                        type="text"
                        defaultValue={userData.experience}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pendidikan
                    </label>
                    <input
                      type="text"
                      defaultValue={userData.education}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bio/Deskripsi
                    </label>
                    <textarea
                      rows={4}
                      defaultValue={userData.bio}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Lock className="h-5 w-5 mr-2" />
                    Keamanan
                  </h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password Saat Ini
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        placeholder="Masukkan password saat ini"
                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 px-3 flex items-center"
                      >
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password Baru
                      </label>
                      <input
                        type="password"
                        placeholder="Masukkan password baru"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Konfirmasi Password Baru
                      </label>
                      <input
                        type="password"
                        placeholder="Konfirmasi password baru"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                  </div>
                  <Button variant="outline">
                    <Shield className="h-4 w-4 mr-2" />
                    Update Password
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Pengaturan Notifikasi
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Notifikasi Email</p>
                      <p className="text-sm text-gray-500">Terima notifikasi melalui email</p>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked={userData.notifications.email}
                      className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Notifikasi Browser</p>
                      <p className="text-sm text-gray-500">Terima notifikasi push browser</p>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked={userData.notifications.browser}
                      className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Update Pengajuan</p>
                      <p className="text-sm text-gray-500">Notifikasi untuk status pengajuan</p>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked={userData.notifications.submission}
                      className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Newsletter</p>
                      <p className="text-sm text-gray-500">Berita dan update terbaru</p>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked={userData.notifications.newsletter}
                      className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Privacy Settings */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Eye className="h-5 w-5 mr-2" />
                  Pengaturan Privasi
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Profil Publik</p>
                      <p className="text-sm text-gray-500">Izinkan orang lain melihat profil Anda</p>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked={userData.privacy.profilePublic}
                      className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Tampilkan Email</p>
                      <p className="text-sm text-gray-500">Email terlihat di profil publik</p>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked={userData.privacy.showEmail}
                      className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Tampilkan Telepon</p>
                      <p className="text-sm text-gray-500">Nomor telepon terlihat di profil publik</p>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked={userData.privacy.showPhone}
                      className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Save Changes */}
            <div className="flex justify-end space-x-4">
              <Button variant="outline">
                Batal
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">
                <Save className="h-4 w-4 mr-2" />
                Simpan Perubahan
              </Button>
            </div>
          </div>
        </div>
      </div>
    </NewDashboardLayout>
  );
}
