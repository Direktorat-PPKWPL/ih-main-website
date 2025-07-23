import { cookies } from 'next/headers';
import { verifyAccessToken } from '@/lib/auth';
import { redirect } from 'next/navigation';
import NewDashboardLayout from '@/app/components/NewDashboardLayout';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Shield, AlertTriangle, Eye, Clock, User, Globe, Download, Filter, Search, Lock, Unlock, CheckCircle, XCircle } from 'lucide-react';

// Mock data - dalam implementasi nyata, data ini akan diambil dari database
const mockSecurityLogs = [
  {
    id: 1,
    timestamp: '2025-01-23 10:45:30',
    event: 'login_success',
    user: 'ahmad.setiawan@email.com',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    risk: 'low',
    location: 'Jakarta, Indonesia'
  },
  {
    id: 2,
    timestamp: '2025-01-23 10:42:15',
    event: 'failed_login',
    user: 'unknown@example.com',
    ipAddress: '203.0.113.45',
    userAgent: 'curl/7.68.0',
    risk: 'high',
    location: 'Unknown'
  },
  {
    id: 3,
    timestamp: '2025-01-23 10:30:22',
    event: 'admin_access',
    user: 'admin@infrastrukturhijau.id',
    ipAddress: '192.168.1.10',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    risk: 'medium',
    location: 'Jakarta, Indonesia'
  },
  {
    id: 4,
    timestamp: '2025-01-23 09:15:45',
    event: 'file_upload',
    user: 'siti.nurhaliza@email.com',
    ipAddress: '192.168.1.150',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    risk: 'low',
    location: 'Jakarta, Indonesia'
  },
  {
    id: 5,
    timestamp: '2025-01-23 08:45:12',
    event: 'suspicious_activity',
    user: 'test@test.com',
    ipAddress: '198.51.100.25',
    userAgent: 'Python-requests/2.28.0',
    risk: 'high',
    location: 'Unknown'
  }
];

const mockSecurityStats = {
  totalLogs: 15420,
  todayLogs: 234,
  failedLogins: 12,
  suspiciousActivity: 3,
  blockedIPs: 8,
  activeUsers: 128,
  securityScore: 85
};

const mockBlockedIPs = [
  { ip: '203.0.113.45', reason: 'Multiple failed login attempts', blockedAt: '2025-01-23 08:30', attempts: 15 },
  { ip: '198.51.100.25', reason: 'Suspicious user agent', blockedAt: '2025-01-23 07:15', attempts: 8 },
  { ip: '192.0.2.100', reason: 'Automated requests', blockedAt: '2025-01-22 22:45', attempts: 25 },
  { ip: '203.0.113.200', reason: 'SQL injection attempt', blockedAt: '2025-01-22 15:30', attempts: 3 }
];

export default async function SecurityPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;

  if (!token) {
    redirect('/login');
  }

  const user = verifyAccessToken(token);
  if (!user || user.role !== 'High') {
    redirect('/login');
  }

  const getEventIcon = (event: string) => {
    switch (event) {
      case 'login_success': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed_login': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'admin_access': return <Shield className="h-4 w-4 text-blue-500" />;
      case 'file_upload': return <Eye className="h-4 w-4 text-purple-500" />;
      case 'suspicious_activity': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getEventText = (event: string) => {
    switch (event) {
      case 'login_success': return 'Login Berhasil';
      case 'failed_login': return 'Login Gagal';
      case 'admin_access': return 'Akses Admin';
      case 'file_upload': return 'Upload File';
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
      default: return 'Unknown';
    }
  };

  return (
    <NewDashboardLayout 
      user={{ email: user.email, role: user.role }} 
      title="Keamanan & Audit"
    >
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-red-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Keamanan & Audit</h1>
                <p className="text-gray-600">Monitor keamanan sistem dan log aktivitas</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter Log
              </Button>
              <Button className="bg-red-600 hover:bg-red-700">
                <Download className="h-4 w-4 mr-2" />
                Export Log
              </Button>
            </div>
          </div>
        </div>

        {/* Security Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Security Score</p>
                  <p className="text-2xl font-bold text-gray-900">{mockSecurityStats.securityScore}/100</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${mockSecurityStats.securityScore}%` }}
                    ></div>
                  </div>
                </div>
                <Shield className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Failed Logins</p>
                  <p className="text-2xl font-bold text-gray-900">{mockSecurityStats.failedLogins}</p>
                  <p className="text-sm text-red-600">Hari ini</p>
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
                  <p className="text-sm text-gray-500">Total aktif</p>
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
                  <p className="text-sm text-yellow-600">Hari ini</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Blocked IPs Section */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">IP Address yang Diblokir</h3>
              <Button variant="outline" size="sm">
                Kelola Daftar Blokir
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">IP Address</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Alasan</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Diblokir</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Percobaan</th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {mockBlockedIPs.map((blockedIP, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-mono text-gray-900">{blockedIP.ip}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{blockedIP.reason}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{blockedIP.blockedAt}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{blockedIP.attempts}x</td>
                      <td className="px-4 py-3 text-right">
                        <Button variant="outline" size="sm" className="text-green-600 hover:text-green-700">
                          <Unlock className="h-4 w-4 mr-1" />
                          Unblock
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Security Logs */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Log Keamanan Terbaru</h3>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Cari log..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500">
                  <option value="">Semua Event</option>
                  <option value="login_success">Login Berhasil</option>
                  <option value="failed_login">Login Gagal</option>
                  <option value="admin_access">Akses Admin</option>
                  <option value="suspicious_activity">Aktivitas Mencurigakan</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Event
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      IP Address
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Risk Level
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Timestamp
                    </th>
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
                        <div className="flex items-center">
                          <User className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-900">{log.user}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-mono text-gray-900">{log.ipAddress}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Globe className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-700">{log.location}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskColor(log.risk)}`}>
                          {getRiskText(log.risk)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          {log.timestamp}
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
            <span className="font-medium">{mockSecurityStats.totalLogs}</span> log
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

        {/* Security Recommendations */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Rekomendasi Keamanan</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-800">Update Password Policy</p>
                  <p className="text-sm text-yellow-700">
                    Pertimbangkan untuk mengaktifkan kebijakan password yang lebih ketat dan 2FA mandatory untuk semua admin.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                <Shield className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-800">Monitor Failed Logins</p>
                  <p className="text-sm text-blue-700">
                    Terdapat peningkatan percobaan login gagal. Pertimbangkan untuk mengurangi threshold auto-block.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-green-800">Security Score Good</p>
                  <p className="text-sm text-green-700">
                    Score keamanan sistem saat ini dalam kondisi baik. Lanjutkan monitoring rutin.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </NewDashboardLayout>
  );
}
