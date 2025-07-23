import { cookies } from 'next/headers';
import { verifyAccessToken } from '@/lib/auth';
import { redirect } from 'next/navigation';
import NewDashboardLayout from '@/app/components/NewDashboardLayout';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Settings, Database, Mail, Globe, Shield, Bell, Palette, Server, Save, RotateCcw } from 'lucide-react';

export default async function SettingsPage() {
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
      title="Pengaturan Sistem"
    >
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Settings className="h-8 w-8 text-gray-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Pengaturan Sistem</h1>
                <p className="text-gray-600">Konfigurasi dan pengaturan sistem infrastruktur hijau</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline">
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset Default
              </Button>
              <Button className="bg-gray-600 hover:bg-gray-700">
                <Save className="h-4 w-4 mr-2" />
                Simpan Semua
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* General Settings */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Globe className="h-6 w-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Pengaturan Umum</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Sistem
                  </label>
                  <input
                    type="text"
                    defaultValue="Infrastruktur Hijau"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Deskripsi Sistem
                  </label>
                  <textarea
                    rows={3}
                    defaultValue="Sistem manajemen infrastruktur hijau untuk pengelolaan taman kota dan ruang hijau"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Zona Waktu
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="Asia/Jakarta">Asia/Jakarta (WIB)</option>
                    <option value="Asia/Makassar">Asia/Makassar (WITA)</option>
                    <option value="Asia/Jayapura">Asia/Jayapura (WIT)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bahasa Default
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="id">Indonesia</option>
                    <option value="en">English</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Database Settings */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Database className="h-6 w-6 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">Pengaturan Database</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Auto Backup
                  </label>
                  <div className="flex items-center space-x-3">
                    <input type="checkbox" defaultChecked className="h-4 w-4 text-green-600 border-gray-300 rounded" />
                    <span className="text-sm text-gray-700">Aktifkan backup otomatis harian</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Waktu Backup (WIB)
                  </label>
                  <input
                    type="time"
                    defaultValue="02:00"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Retensi Backup (hari)
                  </label>
                  <input
                    type="number"
                    defaultValue="30"
                    min="1"
                    max="365"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Connection Pool Size
                  </label>
                  <input
                    type="number"
                    defaultValue="10"
                    min="1"
                    max="100"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Email Settings */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Mail className="h-6 w-6 text-red-600" />
                <h3 className="text-lg font-semibold text-gray-900">Pengaturan Email</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SMTP Server
                  </label>
                  <input
                    type="text"
                    defaultValue="smtp.gmail.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SMTP Port
                  </label>
                  <input
                    type="number"
                    defaultValue="587"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Pengirim
                  </label>
                  <input
                    type="email"
                    defaultValue="noreply@infrastrukturhijau.id"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Pengirim
                  </label>
                  <input
                    type="text"
                    defaultValue="Infrastruktur Hijau System"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <div>
                  <div className="flex items-center space-x-3">
                    <input type="checkbox" defaultChecked className="h-4 w-4 text-red-600 border-gray-300 rounded" />
                    <span className="text-sm text-gray-700">Aktifkan notifikasi email</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="h-6 w-6 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-900">Pengaturan Keamanan</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Session Timeout (menit)
                  </label>
                  <input
                    type="number"
                    defaultValue="60"
                    min="5"
                    max="1440"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Login Attempts
                  </label>
                  <input
                    type="number"
                    defaultValue="5"
                    min="1"
                    max="10"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password Min Length
                  </label>
                  <input
                    type="number"
                    defaultValue="8"
                    min="4"
                    max="32"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <input type="checkbox" defaultChecked className="h-4 w-4 text-purple-600 border-gray-300 rounded" />
                    <span className="text-sm text-gray-700">Require strong passwords</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input type="checkbox" defaultChecked className="h-4 w-4 text-purple-600 border-gray-300 rounded" />
                    <span className="text-sm text-gray-700">Enable 2FA untuk admin</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input type="checkbox" className="h-4 w-4 text-purple-600 border-gray-300 rounded" />
                    <span className="text-sm text-gray-700">Force password change every 90 days</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Bell className="h-6 w-6 text-yellow-600" />
                <h3 className="text-lg font-semibold text-gray-900">Pengaturan Notifikasi</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Notifikasi Email
                  </label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <input type="checkbox" defaultChecked className="h-4 w-4 text-yellow-600 border-gray-300 rounded" />
                      <span className="text-sm text-gray-700">Pengajuan baru</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <input type="checkbox" defaultChecked className="h-4 w-4 text-yellow-600 border-gray-300 rounded" />
                      <span className="text-sm text-gray-700">Status persetujuan berubah</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <input type="checkbox" className="h-4 w-4 text-yellow-600 border-gray-300 rounded" />
                      <span className="text-sm text-gray-700">User baru registrasi</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <input type="checkbox" defaultChecked className="h-4 w-4 text-yellow-600 border-gray-300 rounded" />
                      <span className="text-sm text-gray-700">Error sistem</span>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Admin Utama
                  </label>
                  <input
                    type="email"
                    defaultValue="admin@infrastrukturhijau.id"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Frekuensi Notifikasi
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500">
                    <option value="immediate">Segera</option>
                    <option value="hourly">Setiap Jam</option>
                    <option value="daily">Harian</option>
                    <option value="weekly">Mingguan</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* File Upload Settings */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Server className="h-6 w-6 text-indigo-600" />
                <h3 className="text-lg font-semibold text-gray-900">Pengaturan Upload File</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maksimum ukuran file (MB)
                  </label>
                  <input
                    type="number"
                    defaultValue="50"
                    min="1"
                    max="500"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Format file yang diizinkan
                  </label>
                  <input
                    type="text"
                    defaultValue="pdf,doc,docx,xls,xlsx,jpg,jpeg,png,zip,rar"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Pisahkan dengan koma, tanpa spasi</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Storage Path
                  </label>
                  <input
                    type="text"
                    defaultValue="/uploads"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <div className="flex items-center space-x-3">
                    <input type="checkbox" defaultChecked className="h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <span className="text-sm text-gray-700">Scan file untuk virus</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Theme Settings */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Palette className="h-6 w-6 text-pink-600" />
                <h3 className="text-lg font-semibold text-gray-900">Pengaturan Tampilan</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Color
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      defaultValue="#0d9488"
                      className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      defaultValue="#0d9488"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Secondary Color
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      defaultValue="#6b7280"
                      className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      defaultValue="#6b7280"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Logo URL
                  </label>
                  <input
                    type="url"
                    defaultValue="/images/icon/logo.png"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  />
                </div>
                <div>
                  <div className="flex items-center space-x-3">
                    <input type="checkbox" className="h-4 w-4 text-pink-600 border-gray-300 rounded" />
                    <span className="text-sm text-gray-700">Enable dark mode</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-end space-x-4">
          <Button variant="outline">
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset ke Default
          </Button>
          <Button className="bg-gray-600 hover:bg-gray-700">
            <Save className="h-4 w-4 mr-2" />
            Simpan Pengaturan
          </Button>
        </div>
      </div>
    </NewDashboardLayout>
  );
}
