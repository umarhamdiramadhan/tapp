/*
  Warnings:

  - Added the required column `kode_produks` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `transactions` ADD COLUMN `kode_produks` VARCHAR(100) NOT NULL;
