"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatRupiah = void 0;
const formatRupiah = (amount) => {
    return new Intl.NumberFormat('id-ID', {
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    }).format(amount);
};
exports.formatRupiah = formatRupiah;
