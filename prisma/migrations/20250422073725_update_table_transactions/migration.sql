-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `transactions_id_inboxs_fkey`;

-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `transactions_id_moduls_fkey`;

-- AlterTable
ALTER TABLE `transactions` MODIFY `id_moduls` INTEGER NULL,
    MODIFY `id_inboxs` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_id_moduls_fkey` FOREIGN KEY (`id_moduls`) REFERENCES `moduls`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_id_inboxs_fkey` FOREIGN KEY (`id_inboxs`) REFERENCES `inboxs`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
