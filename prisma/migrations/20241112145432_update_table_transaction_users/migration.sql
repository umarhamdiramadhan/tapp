/*
  Warnings:

  - The values [alihkan] on the enum `transactions_status` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[token]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `transactions` MODIFY `status` ENUM('sukses', 'gagal', 'dibatalkan', 'gangguan', 'belum_diproses') NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `users_token_key` ON `users`(`token`);
