/*
  Warnings:

  - Added the required column `saldo_akhir` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `saldo_awal` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `transactions` ADD COLUMN `saldo_akhir` INTEGER NOT NULL,
    ADD COLUMN `saldo_awal` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `is_aktif` BOOLEAN NOT NULL DEFAULT true;
