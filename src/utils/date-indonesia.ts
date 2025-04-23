export const formatDateTimeIndonesia = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
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
    const formattedDate = datePart.replace(/\//g, '-');;

    return `${formattedDate} ${timePart}`;
};
