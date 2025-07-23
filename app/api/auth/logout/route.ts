import { NextRequest, NextResponse } from 'next/server';
import { revokeRefreshToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const refreshToken = request.cookies.get('refresh-token')?.value;
    
    if (refreshToken) {
      await revokeRefreshToken(refreshToken);
    }

    const response = NextResponse.json({
      success: true,
      message: 'Logout berhasil'
    });

    // Clear auth cookies
    response.cookies.set('auth-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0,
      path: '/'
    });

    response.cookies.set('refresh-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0,
      path: '/'
    });

    return response;

  } catch (error) {
    console.error('Logout API error:', error);
    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan sistem' },
      { status: 500 }
    );
  }
}
