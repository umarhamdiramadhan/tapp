-- DropForeignKey
ALTER TABLE `mutations` DROP FOREIGN KEY `mutations_kode_resellers_fkey`;

-- AddForeignKey
ALTER TABLE `mutations` ADD CONSTRAINT `mutations_kode_resellers_fkey` FOREIGN KEY (`kode_resellers`) REFERENCES `resellers`(`kode_reseller`) ON DELETE NO ACTION ON UPDATE CASCADE;
