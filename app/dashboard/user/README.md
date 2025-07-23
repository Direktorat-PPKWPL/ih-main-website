# User Dashboard Features - Infrastruktur Hijau

## Overview
Dashboard untuk pengguna dengan role "Medium" yang menyediakan fitur-fitur utama untuk mengelola pengajuan infrastruktur hijau.

## Features Implemented

### 1. Dashboard Utama (`/dashboard/user`)
- **File**: `app/dashboard/user/page.tsx`
- **Fitur**: 
  - Statistik pengajuan pengguna
  - Quick actions untuk fitur utama
  - Recent submissions
  - Status overview

### 2. Buat Pengajuan Baru (`/dashboard/user/pengajuan/new`)
- **File**: `app/dashboard/user/pengajuan/new/page.tsx`
- **Fitur**:
  - Form multi-step untuk pengajuan infrastruktur hijau
  - Upload dokumen pendukung
  - Preview dan validasi data
  - Progress tracking

### 3. Riwayat Pengajuan (`/dashboard/user/pengajuan/history`)
- **File**: `app/dashboard/user/pengajuan/history/page.tsx`
- **Fitur**:
  - Daftar semua pengajuan dengan status
  - Filter dan pencarian
  - Detail pengajuan
  - Timeline dan tracking

### 4. Upload Ulang Dokumen (`/dashboard/user/reupload`)
- **File**: `app/dashboard/user/reupload/page.tsx`
- **Fitur**:
  - Manajemen dokumen yang perlu diupload ulang
  - Status tracking dokumen
  - Feedback dari reviewer
  - Deadline management

### 5. Profil Saya (`/dashboard/user/profile`)
- **File**: `app/dashboard/user/profile/page.tsx`
- **Fitur**:
  - Manajemen informasi pribadi
  - Informasi profesional
  - Pengaturan keamanan
  - Notifikasi dan privasi

## Technical Details

### Authentication & Authorization
- Semua halaman dilindungi dengan JWT token verification
- Role-based access control untuk role "Medium"
- Redirect ke login jika tidak terautentikasi

### Layout & Components
- Menggunakan `NewDashboardLayout` untuk konsistensi
- Responsive design dengan Tailwind CSS
- Custom UI components dari `/app/components/ui/`
- Lucide React icons untuk iconography

### Data Management
- Mock data untuk demonstrasi fungsionalitas
- Siap untuk integrasi dengan API backend
- Prisma schema support untuk database operations

### UI/UX Features
- Mobile-first responsive design
- Consistent color scheme (green theme)
- Interactive forms dengan validation
- Loading states dan error handling
- Accessible components

## Directory Structure
```
app/dashboard/user/
├── page.tsx                    # Dashboard utama
├── pengajuan/
│   ├── new/
│   │   └── page.tsx           # Form pengajuan baru
│   └── history/
│       └── page.tsx           # Riwayat pengajuan
├── reupload/
│   └── page.tsx               # Upload ulang dokumen
└── profile/
    └── page.tsx               # Profil pengguna
```

## Next Steps
1. Integrasi dengan backend API
2. Real-time notifications
3. Advanced filtering dan search
4. File upload dengan cloud storage
5. Email notifications
6. Mobile app version

## Notes
- Semua fitur menggunakan mock data untuk demonstrasi
- Ready untuk production dengan real database integration
- Consistent dengan design patterns admin dashboard
- Fully functional UI components dan navigation
