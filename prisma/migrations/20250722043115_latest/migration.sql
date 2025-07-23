-- AlterEnum
ALTER TYPE "RoleUser" ADD VALUE 'Author';

-- CreateTable
CREATE TABLE "ih_ppkwpl_article" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "excerpt" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "author_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ih_ppkwpl_article_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ih_ppkwpl_article_slug_key" ON "ih_ppkwpl_article"("slug");

-- AddForeignKey
ALTER TABLE "ih_ppkwpl_article" ADD CONSTRAINT "ih_ppkwpl_article_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "ih_ppkwpl_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
