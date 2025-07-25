import { NextRequest, NextResponse } from 'next/server';
import { authenticateUser } from '@/lib/auth';
import { Logger } from '@/lib/logger';

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    const { email_or_username, password } = await request.json();

    if (!email_or_username || !password) {
      const response = NextResponse.json(
        { success: false, message: 'Email/username dan password harus diisi' },
        { status: 400 }
      );
      Logger.logApiResponse(request, 400, startTime, undefined, 'Missing credentials');
      return response;
    }

    const result = await authenticateUser(email_or_username, password);

    if (result.success && result.accessToken) {
      const response = NextResponse.json({
        success: true,
        user: result.user,
        message: 'Login berhasil'
      });

      // Set httpOnly cookie for security
      response.cookies.set('auth-token', result.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 15 * 60, 
        path: '/'
      });

      Logger.logSuccess(request, `User ${result.user?.email} logged in successfully`, startTime, result.user?.id?.toString());
      return response;
    }

    const response = NextResponse.json(
      { success: false, message: result.message },
      { status: 401 }
    );
    Logger.logApiResponse(request, 401, startTime, undefined, 'Authentication failed');
    return response;

  } catch (error) {
    Logger.logError(request, error, startTime);
    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan sistem' },
      { status: 500 }
    );
  }
}
