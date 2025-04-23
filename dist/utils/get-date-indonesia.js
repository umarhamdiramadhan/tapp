"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJakartaDate = getJakartaDate;
function getJakartaDate(dateString) {
    // Jika tidak ada dateString, gunakan tanggal saat ini
    const date = dateString
        ? new Date(dateString)
        : new Date();
    // Konversi ke string ISO untuk menghindari warning
    return new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }));
}
