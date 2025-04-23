-- DropForeignKey
ALTER TABLE `mutations` DROP FOREIGN KEY `mutations_kode_resellers_fkey`;

-- AlterTable
ALTER TABLE `mutations` MODIFY `kode_resellers` VARCHAR(100) NULL;

-- AddForeignKey
ALTER TABLE `mutations` ADD CONSTRAINT `mutations_kode_resellers_fkey` FOREIGN KEY (`kode_resellers`) REFERENCES `resellers`(`kode_reseller`) ON DELETE SET NULL ON UPDATE CASCADE;
