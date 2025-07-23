'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/app/components/ui/button';
import { LogOut, Menu, X } from 'lucide-react';

interface DashboardHeaderProps {
  user: {
    email: string;
    role: string;
  };
  title: string;
}

export default function DashboardHeader({ user, title }: DashboardHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const getRoleDisplayName = (role: string) => {
    const roleNames: Record<string, string> = {
      'High': 'Administrator',
      'Medium': 'User',
      'Low': 'Viewer',
      'Author': 'Penulis'
    };
    return roleNames[role] || role;
  };

  const getRoleColor = (role: string) => {
    const colors: Record<string, string> = {
      'High': 'bg-red-100 text-red-800',
      'Medium': 'bg-blue-100 text-blue-800',
      'Low': 'bg-gray-100 text-gray-800',
      'Author': 'bg-green-100 text-green-800'
    };
    return colors[role] || 'bg-gray-100 text-gray-800';
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-semibold text-slate-800">{title}</h1>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-700">{user.email}</span>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(user.role)}`}>
                {getRoleDisplayName(user.role)}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="flex items-center space-x-2"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-3">
              <div className="px-4">
                <p className="text-sm text-gray-700">{user.email}</p>
                <span className={`inline-block mt-1 px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(user.role)}`}>
                  {getRoleDisplayName(user.role)}
                </span>
              </div>
              <div className="px-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
