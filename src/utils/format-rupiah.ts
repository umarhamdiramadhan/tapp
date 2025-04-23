export const formatRupiah = (amount: number): string => {
    return new Intl.NumberFormat('id-ID', {
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    }).format(amount);
};
