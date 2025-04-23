/*
  Warnings:

  - The values [sukses,gagal,dibatalkan,gangguan,belum_diproses] on the enum `transactions_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `transactions` MODIFY `status` ENUM('Sukses', 'Gagal', 'Dibatalkan', 'Gangguan', 'Menunggu') NOT NULL;
