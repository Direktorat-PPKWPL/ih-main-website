import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getUserFromToken, getRoleDashboardPath } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = ['/login', '/api/auth/login', '/', '/favicon.ico'];
  
  // Allow public routes
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Get user from token
  const user = await getUserFromToken(request);

  // Redirect to login if no valid token
  if (!user) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Role-based access control for dashboard routes
  if (pathname.startsWith('/dashboard')) {
    const userRole = user.role;
    const allowedPaths = getRoleAccessPaths(userRole);
    
    // Check if current path is allowed for user's role
    const isAllowed = allowedPaths.some(path => pathname.startsWith(path));
    
    if (!isAllowed) {
      // Redirect to appropriate dashboard for user's role
      const correctDashboard = getRoleDashboardPath(userRole);
      const redirectUrl = new URL(correctDashboard, request.url);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // Role-based access control for API routes
  if (pathname.startsWith('/api') && !pathname.startsWith('/api/auth')) {
    const userRole = user.role;
    const isApiAllowed = checkApiAccess(pathname, userRole);
    
    if (!isApiAllowed) {
      return NextResponse.json(
        { error: 'Akses ditolak' },
        { status: 403 }
      );
    }
  }

  return NextResponse.next();
}

function getRoleAccessPaths(role: string): string[] {
  const accessMap: Record<string, string[]> = {
    'High': [
      '/dashboard/admin',
      '/dashboard/user',
      '/dashboard/viewer',
      '/dashboard/author'
    ],
    'Medium': ['/dashboard/user'],
    'Low': ['/dashboard/viewer'],
    'Author': ['/dashboard/author']
  };
  
  return accessMap[role] || [];
}

function checkApiAccess(pathname: string, role: string): boolean {
  // API access rules based on role
  const apiRules: Record<string, string[]> = {
    'High': ['/api/*'], // Full access
    'Medium': ['/api/pengajuan', '/api/upload'],
    'Low': ['/api/data'], // Read-only access
    'Author': ['/api/articles']
  };

  const allowedPatterns = apiRules[role] || [];
  
  return allowedPatterns.some(pattern => {
    if (pattern.endsWith('/*')) {
      return pathname.startsWith(pattern.slice(0, -2));
    }
    return pathname.startsWith(pattern);
  });
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}
