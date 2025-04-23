/*
  Warnings:

  - Added the required column `nominal_sama` to the `ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ticket` ADD COLUMN `nominal_sama` INTEGER NOT NULL;
