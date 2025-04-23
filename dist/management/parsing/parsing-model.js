"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toParsingResponse = toParsingResponse;
function toParsingResponse(parsing) {
    return {
        id: parsing.id,
        id_moduls: parsing.id_moduls,
        kode_produks: parsing.kode_produks,
        parsing: parsing.parsing,
        harga_beli: parsing.harga_beli,
        prioritas: parsing.prioritas
    };
}
