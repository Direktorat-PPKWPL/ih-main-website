'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/app/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  Menu, 
  X, 
  Users, 
  FileText, 
  Upload, 
  Settings, 
  BarChart3, 
  Shield,
  Eye,
  MapPin,
  PenTool,
  BookOpen,
  Edit3,
  TrendingUp,
  Clock,
  User,
  Home
} from 'lucide-react';

interface SidebarItem {
  title: string;
  href: string;
  icon: React.ComponentType<any>;
  description?: string;
}

interface SidebarProps {
  role: string;
  className?: string;
}

const sidebarItems: Record<string, SidebarItem[]> = {
  'High': [
    { title: 'Dashboard', href: '/dashboard/admin', icon: Home },
    { title: 'Manajemen Pengguna', href: '/dashboard/admin/users', icon: Users },
    { title: 'Review Pengajuan', href: '/dashboard/admin/reviews', icon: FileText },
    { title: 'Manajemen Dokumen', href: '/dashboard/admin/documents', icon: Upload },
    { title: 'Laporan & Analytics', href: '/dashboard/admin/analytics', icon: BarChart3 },
    { title: 'Pengaturan Sistem', href: '/dashboard/admin/settings', icon: Settings },
    { title: 'Keamanan & Audit', href: '/dashboard/admin/security', icon: Shield },
  ],
  'Medium': [
    { title: 'Dashboard', href: '/dashboard/user', icon: Home },
    { title: 'Buat Pengajuan Baru', href: '/dashboard/user/pengajuan/new', icon: FileText },
    { title: 'Riwayat Pengajuan', href: '/dashboard/user/pengajuan/history', icon: Clock },
    { title: 'Upload Ulang Dokumen', href: '/dashboard/user/reupload', icon: Upload },
    { title: 'Profil Saya', href: '/dashboard/user/profile', icon: User },
  ],
  'Low': [
    { title: 'Dashboard', href: '/dashboard/viewer', icon: Home },
    { title: 'Lihat Data Infrastruktur', href: '/dashboard/viewer/infrastructure', icon: Eye },
    { title: 'Statistik & Laporan', href: '/dashboard/viewer/reports', icon: BarChart3 },
    { title: 'Peta Infrastruktur', href: '/dashboard/viewer/maps', icon: MapPin },
    { title: 'Dokumentasi', href: '/dashboard/viewer/documents', icon: FileText },
  ],
  'Author': [
    { title: 'Dashboard', href: '/dashboard/author', icon: Home },
    { title: 'Tulis Artikel Baru', href: '/dashboard/author/articles/new', icon: PenTool },
    { title: 'Artikel Saya', href: '/dashboard/author/articles', icon: BookOpen },
    { title: 'Draft Artikel', href: '/dashboard/author/drafts', icon: Edit3 },
    { title: 'Statistik & Analytics', href: '/dashboard/author/analytics', icon: TrendingUp },
  ],
};

export default function Sidebar({ role, className }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const items = sidebarItems[role] || [];

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-full w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:z-auto",
          isOpen ? "translate-x-0" : "-translate-x-full",
          className
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo/Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">IH</span>
              </div>
              <span className="font-semibold text-gray-900">Infrastruktur Hijau</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {items.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-teal-100 text-teal-700 border-r-2 border-teal-600"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  )}
                >
                  <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                  <span className="truncate">{item.title}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="text-xs text-gray-500 text-center">
              © 2025 Infrastruktur Hijau
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
