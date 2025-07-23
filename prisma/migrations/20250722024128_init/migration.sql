-- CreateEnum
CREATE TYPE "RoleUser" AS ENUM ('High', 'Medium', 'Low');

-- CreateEnum
CREATE TYPE "JenisPengaju" AS ENUM ('Individu', 'Instansi', 'Komunitas');

-- CreateEnum
CREATE TYPE "StatusPengajuan" AS ENUM ('Pending', 'Diterima', 'Revisi');

-- CreateTable
CREATE TABLE "ih_ppkwpl_user" (
    "id" SERIAL NOT NULL,
    "email_or_username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "no_telepon" TEXT,
    "role_user" "RoleUser" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ih_ppkwpl_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ih_ppkwpl_user_token" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "refresh_token" TEXT NOT NULL,
    "is_valid" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expired_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ih_ppkwpl_user_token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ih_ppkwpl_form_pengajuan" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "nama_pengaju" TEXT NOT NULL,
    "jenis_pengaju" "JenisPengaju" NOT NULL,
    "nama_instansi_komunitas" TEXT,
    "upload_foto_ktp" TEXT NOT NULL,
    "upload_surat_pengantar" TEXT NOT NULL,
    "status_pengajuan" "StatusPengajuan" NOT NULL DEFAULT 'Pending',
    "catatan_reviewer" TEXT,
    "reviewer_id" INTEGER,
    "reviewed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ih_ppkwpl_form_pengajuan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ih_ppkwpl_main_data" (
    "id" SERIAL NOT NULL,
    "tahun" INTEGER NOT NULL,
    "nama_anggota" TEXT NOT NULL,
    "provinsi" TEXT NOT NULL,
    "kab_kota" TEXT NOT NULL,
    "kegiatan" TEXT NOT NULL,
    "lokasi_fisik" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "latitude" TEXT NOT NULL,
    "kapasitas" TEXT NOT NULL,
    "penurunan_beban" DOUBLE PRECISION NOT NULL,
    "dokumentasi" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ih_ppkwpl_main_data_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ih_ppkwpl_user_email_or_username_key" ON "ih_ppkwpl_user"("email_or_username");

-- AddForeignKey
ALTER TABLE "ih_ppkwpl_user_token" ADD CONSTRAINT "ih_ppkwpl_user_token_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "ih_ppkwpl_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ih_ppkwpl_form_pengajuan" ADD CONSTRAINT "ih_ppkwpl_form_pengajuan_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "ih_ppkwpl_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ih_ppkwpl_form_pengajuan" ADD CONSTRAINT "ih_ppkwpl_form_pengajuan_reviewer_id_fkey" FOREIGN KEY ("reviewer_id") REFERENCES "ih_ppkwpl_user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
