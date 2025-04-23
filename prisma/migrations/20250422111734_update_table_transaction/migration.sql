-- AlterTable
ALTER TABLE `transactions` MODIFY `status` ENUM('Sukses', 'Gagal', 'Tujuan_Salah', 'Dibatalkan', 'Gangguan', 'Menunggu', 'DiProses') NOT NULL;
