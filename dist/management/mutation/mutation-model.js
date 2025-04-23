"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toMutasiResponse = toMutasiResponse;
const date_indonesia_1 = require("../../utils/date-indonesia");
const format_rupiah_1 = require("../../utils/format-rupiah");
function toMutasiResponse(mutasi) {
    return {
        id: mutasi.id,
        date: (0, date_indonesia_1.formatDateTimeIndonesia)(mutasi.date),
        jumlah: (0, format_rupiah_1.formatRupiah)(mutasi.jumlah),
        kode_resellers: mutasi.kode_resellers
    };
}
