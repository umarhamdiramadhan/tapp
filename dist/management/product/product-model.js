"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toProductResponse = toProductResponse;
function toProductResponse(product) {
    return {
        kode_produk: product.kode_produk,
        nama_produk: product.nama_produk,
        kode_providers: product.kode_providers,
        is_gangguan: product.is_gangguan,
        is_aktif: product.is_aktif,
        is_multi: product.is_multi
    };
}
