"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toResellerResponse = toResellerResponse;
function toResellerResponse(reseller) {
    return {
        kode_reseller: reseller.kode_reseller,
        nama_reseller: reseller.nama_reseller,
        saldo: reseller.saldo,
        ip: reseller.ip,
        ip_callback: reseller.ip_callback,
        is_aktif: reseller.is_aktif,
        alamat: reseller.alamat,
        nama_pemilik: reseller.nama_pemilik,
        nomer_telefon: reseller.nomer_telefon,
        id_telegram: reseller.id_telegram,
        allow_sign: reseller.allow_sign,
        kode_grups: reseller.kode_grups
    };
}
