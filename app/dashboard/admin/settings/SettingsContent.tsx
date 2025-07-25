'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { 
  Settings, 
  Shield, 
  User,
  Database, 
  Mail, 
  Globe, 
  Bell, 
  Server, 
  Save, 
  RotateCcw,
  AlertTriangle,
  Clock,
  Search,
  Lock,
  CheckCircle,
  XCircle
} from 'lucide-react';

// Mock data untuk security logs
const mockSecurityLogs = [
  {
    id: 1,
    timestamp: '2025-01-23 10:45:30',
    event: 'login_success',
    user: 'ahmad.setiawan@email.com',
    ipAddress: '192.168.1.100',
    risk: 'low'
  },
  {
    id: 2,
    timestamp: '2025-01-23 10:42:15',
    event: 'failed_login',
    user: 'unknown@example.com',
    ipAddress: '203.0.113.45',
    risk: 'high'
  },
  {
    id: 3,
    timestamp: '2025-01-23 10:30:22',
    event: 'admin_access',
    user: 'admin@infrastrukturhijau.id',
    ipAddress: '192.168.1.10',
    risk: 'medium'
  }
];

const mockSecurityStats = {
  totalLogs: 15420,
  failedLogins: 12,
  blockedIPs: 8,
  suspiciousActivity: 3
};

export default function SettingsContent() {
  const getEventIcon = (event: string) => {
    switch (event) {
      case 'login_success': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed_login': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'admin_access': return <Shield className="h-4 w-4 text-blue-500" />;
      case 'suspicious_activity': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getEventText = (event: string) => {
    switch (event) {
      case 'login_success': return 'Login Berhasil';
      case 'failed_login': return 'Login Gagal';
      case 'admin_access': return 'Akses Admin';
      case 'suspicious_activity': return 'Aktivitas Mencurigakan';
      default: return event;
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskText = (risk: string) => {
    switch (risk) {
      case 'high': return 'Tinggi';
      case 'medium': return 'Sedang';
      case 'low': return 'Rendah';
      default: return risk;
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Settings className="h-8 w-8 text-orange-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Pengaturan</h1>
              <p className="text-gray-600">Kelola pengaturan sistem, keamanan, dan profil</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset Default
            </Button>
            <Button className="bg-orange-600 hover:bg-orange-700">
              <Save className="h-4 w-4 mr-2" />
              Simpan Semua
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="system" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="system" className="flex items-center space-x-2">
            <Settings className="h-4 w-4" />
            <span>Pengaturan Sistem</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center space-x-2">
            <Shield className="h-4 w-4" />
            <span>Keamanan & Audit</span>
          </TabsTrigger>
          <TabsTrigger value="profile" className="flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span>Pengaturan Profil</span>
          </TabsTrigger>
        </TabsList>

        {/* System Settings Tab */}
        <TabsContent value="system" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* System Configuration */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Globe className="h-6 w-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Konfigurasi Sistem</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nama Aplikasi</label>
                    <input type="text" defaultValue="Infrastruktur Hijau" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Domain Aplikasi</label>
                    <input type="text" defaultValue="https://infrastrukturhijau.id" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option value="Asia/Jakarta">Asia/Jakarta (WIB)</option>
                      <option value="Asia/Makassar">Asia/Makassar (WITA)</option>
                      <option value="Asia/Jayapura">Asia/Jayapura (WIT)</option>
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
                  <div className="flex items-center space-x-3">
                    <input type="checkbox" defaultChecked className="h-4 w-4 text-green-600 border-gray-300 rounded" />
                    <span className="text-sm text-gray-700">Aktifkan backup otomatis harian</span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Waktu Backup (WIB)</label>
                    <input type="time" defaultValue="02:00" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Retensi Backup (hari)</label>
                    <input type="number" defaultValue="30" min="1" max="365" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" />
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Server</label>
                    <input type="text" defaultValue="smtp.gmail.com" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Pengirim</label>
                    <input type="email" defaultValue="noreply@infrastrukturhijau.id" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" />
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Maksimum ukuran file (MB)</label>
                    <input type="number" defaultValue="50" min="1" max="500" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Format file yang diizinkan</label>
                    <input type="text" defaultValue="pdf,doc,docx,xls,xlsx,jpg,jpeg,png" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Security & Audit Tab */}
        <TabsContent value="security" className="space-y-6">
          {/* Security Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Logs</p>
                    <p className="text-2xl font-bold text-gray-900">{mockSecurityStats.totalLogs}</p>
                  </div>
                  <Clock className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Failed Logins</p>
                    <p className="text-2xl font-bold text-gray-900">{mockSecurityStats.failedLogins}</p>
                  </div>
                  <XCircle className="h-8 w-8 text-red-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Blocked IPs</p>
                    <p className="text-2xl font-bold text-gray-900">{mockSecurityStats.blockedIPs}</p>
                  </div>
                  <Lock className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Suspicious Activity</p>
                    <p className="text-2xl font-bold text-gray-900">{mockSecurityStats.suspiciousActivity}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Security Settings */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="h-6 w-6 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-900">Pengaturan Keamanan</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (menit)</label>
                  <input type="number" defaultValue="60" min="5" max="1440" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Login Attempts</label>
                  <input type="number" defaultValue="5" min="1" max="10" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <div className="flex items-center space-x-3">
                    <input type="checkbox" defaultChecked className="h-4 w-4 text-purple-600 border-gray-300 rounded" />
                    <span className="text-sm text-gray-700">Require strong passwords</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input type="checkbox" defaultChecked className="h-4 w-4 text-purple-600 border-gray-300 rounded" />
                    <span className="text-sm text-gray-700">Enable 2FA untuk admin</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Logs */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Log Keamanan Terbaru</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input type="text" placeholder="Cari log..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500" />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Event</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">IP Address</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Risk Level</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockSecurityLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {getEventIcon(log.event)}
                            <span className="ml-2 text-sm text-gray-900">{getEventText(log.event)}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-900">{log.user}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-mono text-gray-900">{log.ipAddress}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskColor(log.risk)}`}>
                            {getRiskText(log.risk)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-500">{log.timestamp}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Profile Settings Tab */}
        <TabsContent value="profile" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Profile Information */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <User className="h-6 w-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Informasi Profil</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="h-10 w-10 text-gray-400" />
                    </div>
                    <div>
                      <Button variant="outline" size="sm">Upload Photo</Button>
                      <p className="text-xs text-gray-500 mt-1">JPG, GIF or PNG. 1MB max.</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                    <input type="text" defaultValue="Administrator" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input type="email" defaultValue="admin@infrastrukturhijau.id" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nomor Telepon</label>
                    <input type="tel" defaultValue="+62 812 3456 7890" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Change Password */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Lock className="h-6 w-6 text-purple-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Ubah Password</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password Saat Ini</label>
                    <input type="password" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password Baru</label>
                    <input type="password" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Konfirmasi Password Baru</label>
                    <input type="password" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500" />
                  </div>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">Update Password</Button>
                </div>
              </CardContent>
            </Card>

            {/* Notification Preferences */}
            <Card className="lg:col-span-2">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Bell className="h-6 w-6 text-yellow-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Preferensi Notifikasi</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Email Notifications</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <input type="checkbox" defaultChecked className="h-4 w-4 text-yellow-600 border-gray-300 rounded" />
                        <span className="text-sm text-gray-700">Pengajuan baru</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <input type="checkbox" defaultChecked className="h-4 w-4 text-yellow-600 border-gray-300 rounded" />
                        <span className="text-sm text-gray-700">Security alerts</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <input type="checkbox" className="h-4 w-4 text-yellow-600 border-gray-300 rounded" />
                        <span className="text-sm text-gray-700">Weekly reports</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Admin Utama</label>
                    <input type="email" defaultValue="admin@infrastrukturhijau.id" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
