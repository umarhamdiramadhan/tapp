/*
  Warnings:

  - You are about to drop the column `maximal` on the `providers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `providers` DROP COLUMN `maximal`,
    ADD COLUMN `maxsimal` INTEGER NULL;
