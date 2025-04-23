-- DropIndex
DROP INDEX `parsings_kode_produks_key` ON `parsings`;

-- AlterTable
ALTER TABLE `transactions` MODIFY `sn` TEXT NOT NULL;
