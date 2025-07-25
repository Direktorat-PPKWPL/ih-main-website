'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validasi input
    if (!formData.name.trim()) {
      setError('Nama harus diisi');
      setLoading(false);
      return;
    }

    if (!formData.username.trim()) {
      setError('Username harus diisi');
      setLoading(false);
      return;
    }

    if (!formData.email.trim()) {
      setError('Email harus diisi');
      setLoading(false);
      return;
    }

    // Validasi password
    if (formData.password !== formData.confirmPassword) {
      setError('Password dan konfirmasi password tidak cocok');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password minimal 6 karakter');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          username: formData.username,
          email: formData.email,
          password: formData.password,
          phoneNumber: formData.phoneNumber
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Pendaftaran berhasil! Anda akan dialihkan ke halaman login...');
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        setError(data.message || 'Pendaftaran gagal');
      }
    } catch (error) {
      setError('Terjadi kesalahan sistem');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
              Daftar Akun Baru
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Infrastruktur Hijau PPKWPL
            </p>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Buat Akun Anda</CardTitle>
            <CardDescription>
              Lengkapi formulir di bawah untuk membuat akun baru
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}
              
              {success && (
                <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md text-sm">
                  {success}
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Masukkan nama lengkap"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Masukkan username"
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  required
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Masukkan email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Nomor Telepon (Opsional)</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="Masukkan nomor telepon"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Masukkan password (minimal 6 karakter)"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  required
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Masukkan ulang password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  required
                  className="w-full"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={loading}
              >
                {loading ? 'Sedang mendaftar...' : 'Daftar'}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Sudah punya akun?{' '}
            <a href="/login" className="text-teal-600 hover:text-teal-800 font-medium hover:underline transition-colors">
              Masuk di sini
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
