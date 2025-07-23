import { PrismaClient, RoleUser } from '../app/generated/prisma';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Hash password untuk semua user
  const hashedPassword = await bcrypt.hash('supersecurepassword', 12);

  // Create admin user dengan role High
  const adminUser = await prisma.ih_ppkwpl_user.upsert({
    where: { email_or_username: 'admin@example.com' },
    update: {},
    create: {
      email_or_username: 'admin@example.com',
      password: hashedPassword,
      no_telepon: '+621234567890',
      role_user: 'High',
    },
  });

  console.log('✅ Admin user created:', adminUser.email_or_username);

  // Create sample Medium user
  const mediumUser = await prisma.ih_ppkwpl_user.upsert({
    where: { email_or_username: 'user@example.com' },
    update: {},
    create: {
      email_or_username: 'user@example.com',
      password: hashedPassword,
      no_telepon: '+621234567891',
      role_user: 'Medium',
    },
  });

  console.log('✅ Medium user created:', mediumUser.email_or_username);

  // Create sample Low user
  const lowUser = await prisma.ih_ppkwpl_user.upsert({
    where: { email_or_username: 'viewer@example.com' },
    update: {},
    create: {
      email_or_username: 'viewer@example.com',
      password: hashedPassword,
      no_telepon: '+621234567892',
      role_user: 'Low',
    },
  });

  console.log('✅ Low user created:', lowUser.email_or_username);

  // Create sample Author user
  const authorUser = await prisma.ih_ppkwpl_user.upsert({
    where: { email_or_username: 'author@example.com' },
    update: {},
    create: {
      email_or_username: 'author@example.com',
      password: hashedPassword,
      no_telepon: '+621234567893',
      role_user: 'Author',
    },
  });

  console.log('✅ Author user created:', authorUser.email_or_username);

  // Create sample main data
  const sampleData = await prisma.ih_ppkwpl_main_data.createMany({
    data: [
      {
        tahun: 2024,
        nama_anggota: 'PT. Green Infrastructure',
        provinsi: 'DKI Jakarta',
        kab_kota: 'Jakarta Pusat',
        kegiatan: 'Instalasi Taman Atap Hijau',
        lokasi_fisik: 'Gedung Perkantoran Central Park',
        longitude: '106.7922',
        latitude: '-6.1781',
        kapasitas: '500 m²',
        penurunan_beban: 125.5,
        dokumentasi: 'central-park-rooftop.jpg',
      },
      {
        tahun: 2024,
        nama_anggota: 'CV. Hijau Berkelanjutan',
        provinsi: 'Jawa Barat',
        kab_kota: 'Bandung',
        kegiatan: 'Bioswale dan Rain Garden',
        lokasi_fisik: 'Kompleks Perumahan Setiabudhi',
        longitude: '107.5946',
        latitude: '-6.8650',
        kapasitas: '1200 m²',
        penurunan_beban: 300.0,
        dokumentasi: 'bandung-bioswale.jpg',
      },
      {
        tahun: 2023,
        nama_anggota: 'Koperasi Lingkungan Surabaya',
        provinsi: 'Jawa Timur',
        kab_kota: 'Surabaya',
        kegiatan: 'Vertical Garden dan Living Wall',
        lokasi_fisik: 'Mall Tunjungan Plaza',
        longitude: '112.7388',
        latitude: '-7.2504',
        kapasitas: '800 m²',
        penurunan_beban: 200.0,
        dokumentasi: 'surabaya-vertical-garden.jpg',
      },
    ],
    skipDuplicates: true,
  });

  console.log('✅ Sample main data created:', sampleData.count, 'records');

  // Create sample article
  const sampleArticle = await prisma.ih_ppkwpl_article.upsert({
    where: { slug: 'manfaat-infrastruktur-hijau-perkotaan' },
    update: {},
    create: {
      title: 'Manfaat Infrastruktur Hijau untuk Perkotaan Modern',
      slug: 'manfaat-infrastruktur-hijau-perkotaan',
      content: `
# Manfaat Infrastruktur Hijau untuk Perkotaan Modern

Infrastruktur hijau telah menjadi solusi inovatif untuk mengatasi berbagai tantangan perkotaan modern. Dengan pertumbuhan kota yang pesat, kebutuhan akan sistem yang sustainable dan ramah lingkungan semakin mendesak.

## Apa itu Infrastruktur Hijau?

Infrastruktur hijau adalah jaringan ruang hijau yang dirancang dan dikelola untuk memberikan layanan ekosistem yang mendukung kesejahteraan manusia dan lingkungan.

## Manfaat Utama

### 1. Pengelolaan Air Hujan
- Mengurangi risiko banjir
- Menyaring polutan dari air hujan
- Mengisi ulang air tanah

### 2. Kualitas Udara
- Mengurangi polusi udara
- Menyerap karbon dioksida
- Menghasilkan oksigen

### 3. Efisiensi Energi
- Mengurangi efek urban heat island
- Menurunkan kebutuhan pendinginan ruangan
- Isolasi termal alami

## Implementasi di Indonesia

Di Indonesia, infrastruktur hijau mulai diterapkan di berbagai kota besar seperti Jakarta, Surabaya, dan Bandung dengan hasil yang positif.

### Studi Kasus: Jakarta
Jakarta telah mengimplementasikan berbagai jenis infrastruktur hijau:
- Taman atap (green roof)
- Bioswale di sepanjang jalan
- Vertical garden di gedung-gedung

Hasil menunjukkan penurunan suhu udara hingga 2-3°C di area yang memiliki infrastruktur hijau yang baik.

## Kesimpulan

Infrastruktur hijau bukan hanya investasi untuk lingkungan, tetapi juga untuk ekonomi dan kesehatan masyarakat jangka panjang. Dengan perencanaan yang tepat, infrastruktur hijau dapat menjadi kunci pembangunan kota yang berkelanjutan.
      `,
      excerpt: 'Infrastruktur hijau menjadi solusi inovatif untuk mengatasi tantangan perkotaan modern dengan berbagai manfaat untuk lingkungan dan masyarakat.',
      published: true,
      author_id: authorUser.id,
    },
  });

  console.log('✅ Sample article created:', sampleArticle.title);

  console.log('\n🎉 Database seeding completed successfully!');
  console.log('\n📋 Login credentials:');
  console.log('=======================');
  console.log('Admin (High Role):');
  console.log('  Email: admin@example.com');
  console.log('  Password: supersecurepassword');
  console.log('');
  console.log('User (Medium Role):');
  console.log('  Email: user@example.com');
  console.log('  Password: supersecurepassword');
  console.log('');
  console.log('Viewer (Low Role):');
  console.log('  Email: viewer@example.com');
  console.log('  Password: supersecurepassword');
  console.log('');
  console.log('Author (Author Role):');
  console.log('  Email: author@example.com');
  console.log('  Password: supersecurepassword');
  console.log('=======================');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
