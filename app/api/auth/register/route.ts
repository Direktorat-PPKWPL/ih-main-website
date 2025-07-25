import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@/app/generated/prisma';
import { Logger } from '@/lib/logger';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    const { name, username, email, password, phoneNumber } = await request.json();

    // Validasi input
    if (!name) {
      const response = NextResponse.json({
        success: false,
        message: 'Nama harus diisi'
      }, { status: 400 });
      Logger.logApiResponse(request, 400, startTime, undefined, 'Missing name field');
      return response;
    }

    if (!username) {
      const response = NextResponse.json({
        success: false,
        message: 'Username harus diisi'
      }, { status: 400 });
      Logger.logApiResponse(request, 400, startTime, undefined, 'Missing username field');
      return response;
    }

    if (!email) {
      const response = NextResponse.json({
        success: false,
        message: 'Email harus diisi'
      }, { status: 400 });
      Logger.logApiResponse(request, 400, startTime, undefined, 'Missing email field');
      return response;
    }

    if (!password) {
      const response = NextResponse.json({
        success: false,
        message: 'Password harus diisi'
      }, { status: 400 });
      Logger.logApiResponse(request, 400, startTime, undefined, 'Missing password field');
      return response;
    }

    // Validasi panjang password
    if (password.length < 6) {
      const response = NextResponse.json({
        success: false,
        message: 'Password minimal 6 karakter'
      }, { status: 400 });
      Logger.logApiResponse(request, 400, startTime, undefined, 'Password too short');
      return response;
    }

    // Cek apakah username sudah ada
    const existingUsername = await prisma.ih_ppkwpl_user.findFirst({
      where: {
        username: username
      }
    });

    if (existingUsername) {
      const response = NextResponse.json({
        success: false,
        message: 'Username sudah terdaftar'
      }, { status: 400 });
      Logger.logApiResponse(request, 400, startTime, undefined, 'Username already exists');
      return response;
    }

    // Cek apakah email sudah ada
    const existingEmail = await prisma.ih_ppkwpl_user.findFirst({
      where: {
        email: email
      }
    });

    if (existingEmail) {
      const response = NextResponse.json({
        success: false,
        message: 'Email sudah terdaftar'
      }, { status: 400 });
      Logger.logApiResponse(request, 400, startTime, undefined, 'Email already exists');
      return response;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Buat user baru dengan role default 'Low' (viewer)
    const newUser = await prisma.ih_ppkwpl_user.create({
      data: {
        name: name,
        username: username,
        email: email,
        password: hashedPassword,
        no_telepon: phoneNumber || null,
        role_user: 'Low', // Default role untuk user baru
      }
    });

    const response = NextResponse.json({
      success: true,
      message: 'Pendaftaran berhasil',
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role_user
      }
    });

    Logger.logSuccess(request, `New user registered: ${email}`, startTime, newUser.id.toString());
    return response;

  } catch (error) {
    Logger.logError(request, error, startTime);
    return NextResponse.json({
      success: false,
      message: 'Terjadi kesalahan server'
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
