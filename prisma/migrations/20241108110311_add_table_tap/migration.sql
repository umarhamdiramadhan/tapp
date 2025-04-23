-- CreateTable
CREATE TABLE `users` (
    `email` VARCHAR(255) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `token` VARCHAR(255) NULL,
    `role` ENUM('administrator', 'admin', 'cs', 'operator') NOT NULL,

    PRIMARY KEY (`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- CreateTable
CREATE TABLE `daftar_hitam` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nomer_tujuan` VARCHAR(100) NOT NULL,
    `keterangan` VARCHAR(100) NULL,

    UNIQUE INDEX `daftar_hitam_nomer_tujuan_key`(`nomer_tujuan`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- CreateTable
CREATE TABLE `grups` (
    `kode_grup` VARCHAR(100) NOT NULL,
    `nama_grup` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`kode_grup`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- CreateTable
CREATE TABLE `providers` (
    `kode_provider` VARCHAR(100) NOT NULL,
    `nama_provider` VARCHAR(100) NOT NULL,
    `is_gangguan` BOOLEAN NOT NULL DEFAULT false,
    `prefix` VARCHAR(100) NULL,
    `minimal` INTEGER NULL,
    `maximal` INTEGER NULL,

    PRIMARY KEY (`kode_provider`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- CreateTable
CREATE TABLE `products` (
    `kode_produk` VARCHAR(100) NOT NULL,
    `nama_produk` VARCHAR(255) NOT NULL,
    `is_gangguan` BOOLEAN NOT NULL DEFAULT false,
    `is_aktif` BOOLEAN NOT NULL DEFAULT true,
    `is_multi` BOOLEAN NOT NULL DEFAULT false,
    `kode_providers` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`kode_produk`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- CreateTable
CREATE TABLE `resellers` (
    `kode_reseller` VARCHAR(100) NOT NULL,
    `nama_reseller` VARCHAR(100) NOT NULL,
    `saldo` INTEGER NOT NULL,
    `ip` VARCHAR(100) NULL,
    `ip_callback` VARCHAR(100) NULL,
    `password_ip` VARCHAR(255) NULL,
    `is_aktif` BOOLEAN NOT NULL DEFAULT true,
    `alamat` VARCHAR(255) NOT NULL,
    `nama_pemilik` VARCHAR(100) NULL,
    `nomer_telefon` INTEGER NOT NULL,
    `id_telegram` VARCHAR(255) NULL,
    `allow_sign` BOOLEAN NOT NULL DEFAULT true,
    `pin` VARCHAR(255) NOT NULL,
    `kode_grups` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `resellers_nomer_telefon_key`(`nomer_telefon`),
    PRIMARY KEY (`kode_reseller`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- CreateTable
CREATE TABLE `outboxs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pesan` TEXT NOT NULL,
    `date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- CreateTable
CREATE TABLE `mutations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL,
    `jumlah` INTEGER NOT NULL,
    `keterangan` VARCHAR(255) NOT NULL,
    `kode_resellers` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- CreateTable
CREATE TABLE `ticket` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT false,
    `kode_resellers` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- CreateTable
CREATE TABLE `price_grups` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kode_grups` VARCHAR(100) NOT NULL,
    `kode_produks` VARCHAR(100) NOT NULL,
    `harga` INTEGER NOT NULL,
    `is_gangguan` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `price_grups_kode_produks_key`(`kode_produks`),
    UNIQUE INDEX `price_grups_kode_produks_kode_grups_key`(`kode_produks`, `kode_grups`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- CreateTable
CREATE TABLE `jawabans` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_jawaban` VARCHAR(100) NOT NULL,
    `kata_kunci` VARCHAR(100) NOT NULL,
    `regex` VARCHAR(255) NOT NULL,
    `prioritas` INTEGER NOT NULL,
    `generate_sn` VARCHAR(255) NOT NULL,
    `is_update` BOOLEAN NOT NULL,
    `status` ENUM('sukses', 'gagal', 'dibatalkan', 'gangguan', 'alihkan') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- CreateTable
CREATE TABLE `moduls` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_moduls` VARCHAR(100) NOT NULL,
    `username` VARCHAR(255) NULL,
    `memberid` VARCHAR(255) NULL,
    `pin` VARCHAR(255) NULL,
    `password` VARCHAR(255) NULL,
    `cek_saldo` VARCHAR(255) NULL,
    `tiket` VARCHAR(255) NULL,
    `ip` VARCHAR(255) NOT NULL,
    `perintah` VARCHAR(255) NOT NULL,
    `antrian_produk` INTEGER NOT NULL DEFAULT 0,
    `total_antrian` INTEGER NOT NULL DEFAULT 0,
    `jawabans` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- CreateTable
CREATE TABLE `parsings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_moduls` INTEGER NOT NULL,
    `kode_produks` VARCHAR(255) NOT NULL,
    `parsing` VARCHAR(255) NOT NULL,
    `harga_beli` INTEGER NOT NULL,
    `prioritas` INTEGER NOT NULL,

    UNIQUE INDEX `parsings_kode_produks_key`(`kode_produks`),
    UNIQUE INDEX `parsings_kode_produks_id_moduls_key`(`kode_produks`, `id_moduls`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- CreateTable
CREATE TABLE `inboxs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL,
    `pesan` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- CreateTable
CREATE TABLE `transactions` (
    `trxid` INTEGER NOT NULL AUTO_INCREMENT,
    `reffid` VARCHAR(255) NOT NULL,
    `tanggal_entry` DATETIME(3) NOT NULL,
    `qty` INTEGER NULL,
    `counter` INTEGER NULL,
    `nomer_tujuan` VARCHAR(255) NOT NULL,
    `tanggal_update` DATETIME(3) NOT NULL,
    `id_moduls` INTEGER NOT NULL,
    `kode_resellers` VARCHAR(255) NOT NULL,
    `harga` INTEGER NOT NULL,
    `harga_beli` INTEGER NULL,
    `perintah` VARCHAR(255) NOT NULL,
    `id_inboxs` INTEGER NOT NULL,
    `sn` VARCHAR(255) NOT NULL,
    `status` ENUM('sukses', 'gagal', 'dibatalkan', 'gangguan', 'alihkan') NOT NULL,

    PRIMARY KEY (`trxid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_kode_providers_fkey` FOREIGN KEY (`kode_providers`) REFERENCES `providers`(`kode_provider`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `resellers` ADD CONSTRAINT `resellers_kode_grups_fkey` FOREIGN KEY (`kode_grups`) REFERENCES `grups`(`kode_grup`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mutations` ADD CONSTRAINT `mutations_kode_resellers_fkey` FOREIGN KEY (`kode_resellers`) REFERENCES `resellers`(`kode_reseller`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ticket` ADD CONSTRAINT `ticket_kode_resellers_fkey` FOREIGN KEY (`kode_resellers`) REFERENCES `resellers`(`kode_reseller`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `price_grups` ADD CONSTRAINT `price_grups_kode_grups_fkey` FOREIGN KEY (`kode_grups`) REFERENCES `grups`(`kode_grup`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `price_grups` ADD CONSTRAINT `price_grups_kode_produks_fkey` FOREIGN KEY (`kode_produks`) REFERENCES `products`(`kode_produk`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `parsings` ADD CONSTRAINT `parsings_id_moduls_fkey` FOREIGN KEY (`id_moduls`) REFERENCES `moduls`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_kode_resellers_fkey` FOREIGN KEY (`kode_resellers`) REFERENCES `resellers`(`kode_reseller`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_id_moduls_fkey` FOREIGN KEY (`id_moduls`) REFERENCES `moduls`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_id_inboxs_fkey` FOREIGN KEY (`id_inboxs`) REFERENCES `inboxs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
