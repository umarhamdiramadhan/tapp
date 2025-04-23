/*
  Warnings:

  - Made the column `harga_beli` on table `transactions` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `parsings` MODIFY `harga_beli` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `transactions` MODIFY `harga_beli` INTEGER NOT NULL DEFAULT 0;
