import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getUserFromToken, getRoleDashboardPath } from '@/lib/auth';

// Logging utility function
function logRequest(request: NextRequest, response: NextResponse, status: number) {
  const timestamp = new Date().toISOString();
  const method = request.method;
  const url = request.url;
  const userAgent = request.headers.get('user-agent') || 'Unknown';
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'Unknown';
  
  // Color coding for different status codes
  let statusColor = '';
  if (status >= 200 && status < 300) {
    statusColor = '\x1b[32m'; // Green for 2xx
  } else if (status >= 300 && status < 400) {
    statusColor = '\x1b[33m'; // Yellow for 3xx
  } else if (status >= 400 && status < 500) {
    statusColor = '\x1b[31m'; // Red for 4xx
  } else if (status >= 500) {
    statusColor = '\x1b[35m'; // Magenta for 5xx
  }
  const resetColor = '\x1b[0m';
  
  console.log(`[${timestamp}] ${statusColor}${status}${resetColor} ${method} ${url} - IP: ${ip} - UA: ${userAgent.substring(0, 50)}...`);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const startTime = Date.now();

  // Public routes that don't require authentication
  const publicRoutes = ['/login', '/api/auth/login', '/', '/favicon.ico'];
  
  // Allow public routes
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    const response = NextResponse.next();
    logRequest(request, response, 200);
    return response;
  }

  // Get user from token
  const user = await getUserFromToken(request);

  // Redirect to login if no valid token
  if (!user) {
    const loginUrl = new URL('/login', request.url);
    const response = NextResponse.redirect(loginUrl);
    logRequest(request, response, 302);
    return response;
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
      const response = NextResponse.redirect(redirectUrl);
      logRequest(request, response, 302);
      return response;
    }
  }

  // Role-based access control for API routes
  if (pathname.startsWith('/api') && !pathname.startsWith('/api/auth')) {
    const userRole = user.role;
    const isApiAllowed = checkApiAccess(pathname, userRole);
    
    if (!isApiAllowed) {
      const response = NextResponse.json(
        { error: 'Akses ditolak' },
        { status: 403 }
      );
      logRequest(request, response, 403);
      return response;
    }
  }

  const response = NextResponse.next();
  const endTime = Date.now();
  const duration = endTime - startTime;
  
  // Log successful requests with duration
  console.log(`[${new Date().toISOString()}] \x1b[32m200\x1b[0m ${request.method} ${request.url} - Duration: ${duration}ms`);
  logRequest(request, response, 200);
  
  return response;
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
