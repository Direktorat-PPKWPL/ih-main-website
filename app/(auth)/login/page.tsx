'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';

export default function LoginPage() {
  const [credentials, setCredentials] = useState({
    email_or_username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (data.success) {
        const dashboardPath = getDashboardPath(data.user.role);
        router.push(dashboardPath);
      } else {
        setError(data.message || 'Login gagal');
      }
    } catch (error) {
      setError('Terjadi kesalahan sistem');
    } finally {
      setLoading(false);
    }
  };

  const getDashboardPath = (role: string) => {
    const roleMap: Record<string, string> = {
      'High': '/dashboard/admin',
      'Medium': '/dashboard/user',
      'Low': '/dashboard/viewer'
    };
    return roleMap[role] || '/dashboard/viewer';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-4">
              <a href="/" className="flex items-center space-x-4 hover:opacity-80 transition-opacity cursor-pointer">
                <Image 
                  src="https://res.cloudinary.com/dwm0tvqar/image/upload/v1752906404/klh_logo.png" 
                  alt="Logo Kementerian Lingkungan Hidup dan Kehutanan Republik Indonesia" 
                  width={120} 
                  height={45}
                  className="h-16 w-auto"
                />
                
                <div className="text-left">
                  <h4 className="text-sm font-medium text-teal-800">
                    Kementerian Lingkungan Hidup/
                  </h4>
                  <h4 className="text-sm font-medium text-teal-800">
                    Badan Pengendalian Lingkungan Hidup
                  </h4>
                  <h4 className="text-sm font-medium text-teal-800">
                    Republik Indonesia
                  </h4>
                </div>
              </a>
            </div>
          
          <div>
            <h2 className="text-3xl font-bold text-slate-800">
              Login ke Sistem
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Infrastruktur Hijau PPKWPL
            </p>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Masuk ke Akun Anda</CardTitle>
            <CardDescription>
              Masukkan email atau username dan password untuk mengakses dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email_or_username">Email atau Username</Label>
                <Input
                  id="email_or_username"
                  type="text"
                  placeholder="Masukkan email atau username"
                  value={credentials.email_or_username}
                  onChange={(e) => setCredentials(prev => ({ 
                    ...prev, 
                    email_or_username: e.target.value 
                  }))}
                  required
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Masukkan password"
                  value={credentials.password}
                  onChange={(e) => setCredentials(prev => ({ 
                    ...prev, 
                    password: e.target.value 
                  }))}
                  required
                  className="w-full"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={loading}
              >
                {loading ? 'Sedang masuk...' : 'Masuk'}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Belum punya akun?{' '}
            <a href="/register" className="text-teal-600 hover:text-teal-800 font-medium hover:underline transition-colors">
              Daftar di sini
            </a>
          </p>
        </div>
        
        <div className="text-center text-sm text-gray-600">
          <p>Sistem Informasi Infrastruktur Hijau</p>
          <address className="text-xs text-gray-500 not-italic mt-2">
            Jl. DI Panjaitan Kav.24, Kebon nanas, Jakarta Timur 13410.
          </address>
          <p className="text-xs text-gray-500">
            Telepon. (021)8580101/(021)8580103 Website: www.kemenlh.go.id
          </p>
        </div>
      </div>
    </div>
  );
}
