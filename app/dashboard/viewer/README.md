# Viewer Dashboard Features - Infrastruktur Hijau

## Overview
Dashboard untuk pengguna dengan role "Low" (Viewer) yang menyediakan akses untuk melihat dan menganalisis data infrastruktur hijau.

## Features Implemented

### 1. Dashboard Utama (`/dashboard/viewer`)
- **File**: `app/dashboard/viewer/page.tsx` 
- **Fitur**: 
  - Statistik overview infrastruktur hijau
  - Quick access ke fitur utama
  - Welcome section dengan user greeting

### 2. Lihat Data Infrastruktur (`/dashboard/viewer/infrastructure`)
- **File**: `app/dashboard/viewer/infrastructure/page.tsx`
- **Fitur**:
  - Daftar lengkap infrastruktur hijau dengan detail
  - Filter berdasarkan tipe, status, dan lokasi
  - Statistik overview (total infrastruktur, status aktif, pengunjung, cakupan hijau)
  - Card view dengan informasi komprehensif setiap infrastruktur
  - Search dan pagination

### 3. Statistik & Laporan (`/dashboard/viewer/reports`)
- **File**: `app/dashboard/viewer/reports/page.tsx`
- **Fitur**:
  - Key metrics dengan trend analysis
  - Grafik tren pertumbuhan 6 bulan terakhir
  - Distribusi tipe infrastruktur (pie chart representation)
  - Laporan terbaru yang dapat didownload
  - Performance metrics (efisiensi maintenance, kualitas udara, dampak sosial)

### 4. Peta Infrastruktur (`/dashboard/viewer/maps`)
- **File**: `app/dashboard/viewer/maps/page.tsx`
- **Fitur**:
  - Interactive map dengan markers infrastruktur
  - Map controls (zoom, navigation, reset view)
  - Layer management (satelit, terrain, traffic, kualitas udara, cakupan hijau)
  - Search dan filter lokasi
  - Tooltip dengan detail infrastruktur
  - Legend dan informasi peta

### 5. Dokumentasi (`/dashboard/viewer/documents`)
- **File**: `app/dashboard/viewer/documents/page.tsx`
- **Fitur**:
  - Koleksi lengkap dokumentasi (PDF, Video, Gallery)
  - Kategorisasi (Panduan, Tutorial, SOP, Referensi, dll)
  - Search dan filter advanced
  - Preview dan download dokumen
  - Statistik download dan popularitas
  - Tags dan metadata

## Technical Details

### Authentication & Authorization
- Role-based access untuk "Low" (Viewer)
- JWT token verification
- Redirect ke login jika tidak terautentikasi

### UI/UX Features
- Responsive design dengan Tailwind CSS
- Interactive components dan hover effects
- Consistent color scheme (blue/green theme)
- Loading states dan empty states
- Accessible components

### Data Visualization
- Chart representations untuk statistik
- Progress bars dan gauges
- Interactive map dengan markers
- Filterable data grids

---

# Author Dashboard Features - Infrastruktur Hijau

## Overview
Dashboard untuk pengguna dengan role "Author" yang menyediakan fitur lengkap untuk menulis, mengelola, dan menganalisis artikel tentang infrastruktur hijau.

## Features Implemented

### 1. Dashboard Utama (`/dashboard/author`)
- **File**: `app/dashboard/author/page.tsx`
- **Fitur**: 
  - Overview statistik author (total artikel, views, engagement, draft)
  - Recent articles dengan status tracking
  - Quick actions untuk menulis dan mengelola artikel
  - Monthly goals dengan progress tracking
  - Top performing articles
  - Writing tips dan trending topics

### 2. Tulis Artikel Baru (`/dashboard/author/articles/new`)
- **File**: `app/dashboard/author/articles/new/page.tsx`
- **Fitur**:
  - Rich text editor dengan toolbar formatting
  - Meta information (title, subtitle, category, tags)
  - Featured image upload dengan alt text
  - SEO settings (meta description, focus keyword, slug)
  - Publishing options (status, visibility, schedule)
  - Writing guidelines dan checklist
  - Word count dan progress tracking
  - Auto-save draft functionality

### 3. Artikel Saya (`/dashboard/author/articles`)
- **File**: `app/dashboard/author/articles/page.tsx`
- **Fitur**:
  - Comprehensive list semua artikel dengan status
  - Performance metrics (views, likes, comments, shares)
  - Filter dan search artikel
  - SEO score tracking
  - Bulk actions dan quick edit
  - Analytics integration

### 4. Draft Artikel (`/dashboard/author/drafts`)
- **File**: `app/dashboard/author/drafts/page.tsx`
- **Fitur**:
  - Management draft artikel dengan priority
  - Progress tracking dan completion checklist
  - Deadline management dengan alerts
  - Word count targets
  - Quick actions (edit, save, submit, duplicate, delete)
  - Priority categorization (high, medium, low)
  - Completion percentage tracking

### 5. Statistik & Analytics (`/dashboard/author/analytics`)
- **File**: `app/dashboard/author/analytics/page.tsx`
- **Fitur**:
  - Comprehensive analytics dashboard
  - Performance trends (6 bulan terakhir)
  - Audience demographics dan interests
  - Top performing articles ranking
  - Content performance by category
  - Traffic sources analysis
  - Engagement metrics dan insights
  - Export functionality untuk reports

## Technical Details

### Content Management
- Rich text editor dengan Markdown support
- Image upload dan management
- Tag system dengan auto-suggestions
- Category management
- SEO optimization tools

### Analytics Integration
- Real-time statistics tracking
- Trend analysis dengan visualizations
- Audience insights
- Performance benchmarking

### Workflow Management
- Draft system dengan auto-save
- Publishing workflow
- Deadline tracking
- Progress monitoring

## Directory Structure
```
app/dashboard/viewer/
├── page.tsx                    # Dashboard utama
├── infrastructure/
│   └── page.tsx               # Data infrastruktur
├── reports/
│   └── page.tsx               # Statistik & laporan
├── maps/
│   └── page.tsx               # Peta infrastruktur
└── documents/
    └── page.tsx               # Dokumentasi

app/dashboard/author/
├── page.tsx                    # Dashboard utama
├── articles/
│   ├── new/
│   │   └── page.tsx           # Tulis artikel baru
│   └── page.tsx               # Artikel saya
├── drafts/
│   └── page.tsx               # Draft artikel
└── analytics/
    └── page.tsx               # Statistik & analytics
```

## Notes
- Semua fitur menggunakan mock data untuk demonstrasi
- Ready untuk production dengan real API integration
- Consistent design patterns across all dashboards
- Fully responsive dan accessible
