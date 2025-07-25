# Infrastruktur Hijau

Proyek **Infrastruktur Hijau** bertujuan untuk mendukung pembangunan berkelanjutan melalui penerapan teknologi ramah lingkungan. Sistem ini menyediakan fitur seperti pengajuan proyek infrastruktur hijau, akses data dan statistik, serta artikel terkait manfaat infrastruktur hijau.

## Fitur Utama
- **Pengajuan Infrastruktur Hijau**: Ajukan proyek Anda dengan mudah melalui sistem.
- **Peta Infrastruktur Hijau**: Temukan lokasi proyek infrastruktur hijau di seluruh Indonesia.
- **Statistik dan Data**: Akses laporan dan data terkini terkait infrastruktur hijau.
- **Artikel**: Baca artikel tentang manfaat dan implementasi infrastruktur hijau.

## Struktur Proyek
- **Frontend**: Dibangun menggunakan Next.js untuk antarmuka pengguna yang interaktif.
- **Backend**: Menggunakan Prisma untuk pengelolaan database PostgreSQL.
- **Database**: Menyimpan data pengguna, pengajuan, artikel, dan statistik.

## Instalasi

Ikuti langkah-langkah berikut untuk menjalankan proyek ini secara lokal:

### Prasyarat
1. **Node.js** versi 16 atau lebih baru.
2. **PostgreSQL** sebagai database.
3. **Git** untuk mengkloning repositori.

### Langkah Instalasi
1. **Kloning repositori**
   ```bash
   git clone https://github.com/username/infrastruktur-hijau.git
   cd infrastruktur-hijau
   ```

2. **Instal dependensi**
   ```bash
   npm install
   ```

3. **Konfigurasi lingkungan**
   - Buat file `.env` berdasarkan `.env.example`.
   - Isi variabel `DATABASE_URL` dengan URL koneksi PostgreSQL Anda.

4. **Migrasi database**
   ```bash
   npx prisma migrate dev
   ```

5. **Seed database**
   ```bash
   npm run db:seed
   ```

6. **Jalankan aplikasi**
   ```bash
   npm run dev
   ```

Aplikasi akan berjalan di `http://localhost:3000`.

## Skrip Penting
- `npm run dev`: Menjalankan aplikasi dalam mode pengembangan.
- `npm run build`: Membuat build produksi.
- `npm run start`: Menjalankan aplikasi dalam mode produksi.
- `npm run db:seed`: Menambahkan data awal ke database.
- `npm run db:reset`: Menghapus dan mengisi ulang database.