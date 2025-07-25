/*
  Warnings:

  - You are about to drop the column `email_or_username` on the `ih_ppkwpl_user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `ih_ppkwpl_user` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `ih_ppkwpl_user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `ih_ppkwpl_user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `ih_ppkwpl_user` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "ih_ppkwpl_user_email_or_username_key";

-- AlterTable
ALTER TABLE "ih_ppkwpl_user" DROP COLUMN "email_or_username",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ih_ppkwpl_user_username_key" ON "ih_ppkwpl_user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "ih_ppkwpl_user_email_key" ON "ih_ppkwpl_user"("email");
