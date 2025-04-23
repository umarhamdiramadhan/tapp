"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDateTimeIndonesia = void 0;
const formatDateTimeIndonesia = (date) => {
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false, // Menggunakan format 24 jam
        timeZone: 'Asia/Jakarta',
    };
    // Menggunakan toLocaleString dengan opsi yang ditentukan
    const formattedDateTime = date.toLocaleString('id-ID', options);
    // Memisahkan tanggal dan waktu
    const [datePart, timePart] = formattedDateTime.split(', ');
    // Mengubah pemisah tanggal menjadi '/'
    const formattedDate = datePart.replace(/\//g, '-');
    ;
    return `${formattedDate} ${timePart}`;
};
exports.formatDateTimeIndonesia = formatDateTimeIndonesia;
