"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toDaftarHitamResponse = toDaftarHitamResponse;
function toDaftarHitamResponse(daftarHitam) {
    return {
        id: daftarHitam.id,
        nomer_tujuan: daftarHitam.nomer_tujuan,
        keterangan: daftarHitam.keterangan
    };
}
