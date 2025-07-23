import { NextRequest, NextResponse } from 'next/server';
import { authenticateUser } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email_or_username, password } = await request.json();

    if (!email_or_username || !password) {
      return NextResponse.json(
        { success: false, message: 'Email/username dan password harus diisi' },
        { status: 400 }
      );
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
        maxAge: 15 * 60, // 15 minutes
        path: '/'
      });

      return response;
    }

    return NextResponse.json(
      { success: false, message: result.message },
      { status: 401 }
    );

  } catch (error) {
    console.error('Login API error:', error);
    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan sistem' },
      { status: 500 }
    );
  }
}
