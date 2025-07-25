import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { NextRequest } from 'next/server';
import { PrismaClient } from '@/app/generated/prisma';

const prisma = new PrismaClient();

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required');
}

if (!process.env.JWT_REFRESH_SECRET) {
  throw new Error('JWT_REFRESH_SECRET environment variable is required');
}

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

export interface JWTPayload {
  userId: number;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

export interface LoginResponse {
  success: boolean;
  user?: {
    id: number;
    email: string;
    role: string;
  };
  accessToken?: string;
  message?: string;
}

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 12);
}

export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

export function generateAccessToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
  return jwt.sign(payload, JWT_SECRET, { 
    expiresIn: '15m' 
  });
}

export function generateRefreshToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
  return jwt.sign(payload, JWT_REFRESH_SECRET, { 
    expiresIn: '7d' 
  });
}

export function verifyAccessToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    return null;
  }
}

export function verifyRefreshToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET) as JWTPayload;
  } catch (error) {
    return null;
  }
}

export async function authenticateUser(emailOrUsername: string, password: string): Promise<LoginResponse> {
  try {
    const user = await prisma.ih_ppkwpl_user.findFirst({
      where: {
        OR: [
          { email: emailOrUsername },
          { username: emailOrUsername }
        ]
      }
    });

    if (!user) {
      return { 
        success: false, 
        message: 'Email/username atau password tidak valid' 
      };
    }

    const isValidPassword = await comparePassword(password, user.password);
    
    if (!isValidPassword) {
      return { 
        success: false, 
        message: 'Email/username atau password tidak valid' 
      };
    }

    const tokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role_user
    };

    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    // Save refresh token to database
    await prisma.ih_ppkwpl_user_token.create({
      data: {
        user_id: user.id,
        refresh_token: refreshToken,
        expired_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
      }
    });

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role_user
      },
      accessToken
    };

  } catch (error) {
    console.error('Authentication error:', error);
    return { 
      success: false, 
      message: 'Terjadi kesalahan sistem' 
    };
  }
}

export async function getUserFromToken(request: NextRequest): Promise<JWTPayload | null> {
  const token = request.cookies.get('auth-token')?.value;
  
  if (!token) {
    return null;
  }

  return verifyAccessToken(token);
}

export async function refreshAccessToken(refreshToken: string): Promise<string | null> {
  try {
    const payload = verifyRefreshToken(refreshToken);
    if (!payload) return null;

    // Check if refresh token exists and is valid in database
    const tokenRecord = await prisma.ih_ppkwpl_user_token.findFirst({
      where: {
        refresh_token: refreshToken,
        is_valid: true,
        expired_at: {
          gt: new Date()
        }
      }
    });

    if (!tokenRecord) return null;

    // Generate new access token
    const newAccessToken = generateAccessToken({
      userId: payload.userId,
      email: payload.email,
      role: payload.role
    });

    return newAccessToken;
  } catch (error) {
    return null;
  }
}

export async function revokeRefreshToken(refreshToken: string): Promise<void> {
  try {
    await prisma.ih_ppkwpl_user_token.updateMany({
      where: { refresh_token: refreshToken },
      data: { is_valid: false }
    });
  } catch (error) {
    console.error('Error revoking refresh token:', error);
  }
}

export function getRoleDashboardPath(role: string): string {
  const roleMap: Record<string, string> = {
    'High': '/dashboard/admin',
    'Medium': '/dashboard/user',
    'Low': '/dashboard/viewer',
    'Author': '/dashboard/author'
  };
  
  return roleMap[role] || '/dashboard/viewer';
}