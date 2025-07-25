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
  Home,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

interface SidebarItem {
  title: string;
  href?: string;
  icon: React.ComponentType<any>;
  description?: string;
  children?: SidebarItem[];
}

interface SidebarProps {
  role: string;
  className?: string;
}

const sidebarItems: Record<string, SidebarItem[]> = {
  'High': [
    { title: 'Dashboard', href: '/dashboard/admin', icon: Home },
    { 
      title: 'Manajemen User', 
      icon: Users,
      children: [
        { title: 'Daftar Pengguna', href: '/dashboard/admin/users', icon: Users },
        { title: 'Review Pengajuan', href: '/dashboard/admin/reviews', icon: FileText }
      ]
    },
    { 
      title: 'Konten & Artikel', 
      icon: BookOpen,
      children: [
        { title: 'Tulis Artikel Baru', href: '/dashboard/admin/articles/new', icon: PenTool },
        { title: 'Kelola Artikel', href: '/dashboard/admin/articles', icon: BookOpen },
        { title: 'Draft Artikel', href: '/dashboard/admin/drafts', icon: Edit3 }
      ]
    },
    { 
      title: 'Sistem & Data', 
      icon: Settings,
      children: [
        { title: 'Manajemen Dokumen', href: '/dashboard/admin/documents', icon: Upload },
        { title: 'Pengaturan', href: '/dashboard/admin/settings', icon: Settings }
      ]
    },
    { title: 'Analytics & Laporan', href: '/dashboard/admin/analytics', icon: BarChart3 }
  ],
  'Medium': [
    { title: 'Dashboard', href: '/dashboard/user', icon: Home },
    { 
      title: 'Pengajuan', 
      icon: FileText,
      children: [
        { title: 'Buat Pengajuan Baru', href: '/dashboard/user/pengajuan/new', icon: FileText },
        { title: 'Riwayat Pengajuan', href: '/dashboard/user/pengajuan/history', icon: Clock }
      ]
    },
    { title: 'Upload Ulang Dokumen', href: '/dashboard/user/reupload', icon: Upload },
    { title: 'Profil Saya', href: '/dashboard/user/profile', icon: User }
  ],
  'Low': [
    { title: 'Dashboard', href: '/dashboard/viewer', icon: Home },
    { 
      title: 'Data & Informasi', 
      icon: Eye,
      children: [
        { title: 'Data Infrastruktur', href: '/dashboard/viewer/infrastructure', icon: Eye },
        { title: 'Peta Infrastruktur', href: '/dashboard/viewer/maps', icon: MapPin },
        { title: 'Dokumentasi', href: '/dashboard/viewer/documents', icon: FileText }
      ]
    },
    { title: 'Laporan & Statistik', href: '/dashboard/viewer/reports', icon: BarChart3 }
  ]
};

export default function Sidebar({ role, className }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const pathname = usePathname();
  const items = sidebarItems[role] || [];

  const toggleExpanded = (title: string) => {
    setExpandedItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  const renderMenuItem = (item: SidebarItem, level = 0) => {
    const Icon = item.icon;
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.title);
    const isActive = item.href ? pathname === item.href : false;
    const hasActiveChild = hasChildren && item.children?.some(child => pathname === child.href);

    if (hasChildren) {
      return (
        <div key={item.title}>
          <button
            onClick={() => toggleExpanded(item.title)}
            className={cn(
              "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              hasActiveChild || isExpanded
                ? "bg-orange-50 text-orange-700 border-l-2 border-orange-600"
                : "text-gray-800 hover:bg-orange-50 hover:text-orange-700",
              level > 0 && "ml-4"
            )}
          >
            <div className="flex items-center">
              <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
              <span className="truncate">{item.title}</span>
            </div>
            {isExpanded ? (
              <ChevronDown className="h-4 w-4 flex-shrink-0" />
            ) : (
              <ChevronRight className="h-4 w-4 flex-shrink-0" />
            )}
          </button>
          {isExpanded && (
            <div className="mt-1 space-y-1">
              {item.children?.map(child => renderMenuItem(child, level + 1))}
            </div>
          )}
        </div>
      );
    }

    if (item.href) {
      return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setIsOpen(false)}
            className={cn(
              "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              isActive
                ? "bg-orange-100 text-orange-800 border-l-2 border-orange-600 font-semibold"
                : "text-gray-800 hover:bg-orange-50 hover:text-orange-700",
              level > 0 && "ml-8"
            )}
        >
          <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
          <span className="truncate">{item.title}</span>
        </Link>
      );
    }

    return null;
  };

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
              <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">IH</span>
              </div>
              <span className="font-semibold text-gray-900">Infrastruktur Hijau</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {items.map(item => renderMenuItem(item))}
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
