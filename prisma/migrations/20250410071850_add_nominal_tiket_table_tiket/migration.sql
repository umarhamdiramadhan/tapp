/*
  Warnings:

  - Added the required column `nominal_ticket` to the `ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ticket` ADD COLUMN `nominal_ticket` INTEGER NOT NULL;
