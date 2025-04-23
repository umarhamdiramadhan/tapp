/*
  Warnings:

  - The values [sukses,gagal,dibatalkan,gangguan,alihkan] on the enum `jawabans_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `jawabans` MODIFY `status` ENUM('Sukses', 'Gagal', 'Tujuan_Salah', 'Dibatalkan', 'Gangguan', 'Menunggu', 'Alihkan') NOT NULL;

-- AlterTable
ALTER TABLE `transactions` MODIFY `status` ENUM('Sukses', 'Gagal', 'Tujuan_Salah', 'Dibatalkan', 'Gangguan', 'Menunggu') NOT NULL;
