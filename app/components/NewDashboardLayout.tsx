'use client';

import { useRouter } from 'next/navigation';
import Sidebar from './Sidebar';
import { Button } from '@/app/components/ui/button';
import { LogOut } from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  user: {
    email: string;
    role: string;
  };
  title: string;
}

export default function DashboardLayout({ children, user, title }: DashboardLayoutProps) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', { 
        method: 'POST',
        credentials: 'include'
      });
      
      if (response.ok) {
        // Clear any client-side storage if needed
        localStorage.clear();
        sessionStorage.clear();
        
        // Redirect to login
        router.push('/login');
        router.refresh(); // Force a refresh to clear any cached data
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
      // Even if logout fails, redirect to login as a fallback
      router.push('/login');
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
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar role={user.role} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-0 overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 shadow-sm z-30">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Title - with margin for mobile menu button */}
              <div className="ml-12 md:ml-0">
                <h1 className="text-xl font-semibold text-slate-800">{title}</h1>
              </div>

              {/* User info and logout */}
              <div className="flex items-center space-x-4">
                <div className="hidden sm:flex items-center space-x-3">
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
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
