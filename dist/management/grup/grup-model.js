"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toGrupResponse = toGrupResponse;
function toGrupResponse(grup) {
    return {
        kode_grup: grup.kode_grup,
        nama_grup: grup.nama_grup
    };
}
