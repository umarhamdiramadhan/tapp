"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toHargaGrupResponse = toHargaGrupResponse;
const format_rupiah_1 = require("../../utils/format-rupiah");
function toHargaGrupResponse(hargaGrup) {
    return {
        id: hargaGrup.id,
        kode_grups: hargaGrup.kode_grups,
        kode_produks: hargaGrup.kode_produks,
        harga: hargaGrup.harga,
        harga_rupiah: (0, format_rupiah_1.formatRupiah)(hargaGrup.harga),
        is_gangguan: hargaGrup.is_gangguan
    };
}
