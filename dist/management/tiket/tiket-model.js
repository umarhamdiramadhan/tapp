"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toTiketResponse = toTiketResponse;
const date_indonesia_1 = require("../../utils/date-indonesia");
const format_rupiah_1 = require("../../utils/format-rupiah");
function toTiketResponse(tiket, nama_reseller) {
    return {
        id: tiket.id,
        date: (0, date_indonesia_1.formatDateTimeIndonesia)(tiket.date),
        status: tiket.status,
        kode_resellers: tiket.kode_resellers,
        nominal_ticket: tiket.nominal_ticket,
        nama_resellers: nama_reseller,
        nominal_ticket_rupiah: (0, format_rupiah_1.formatRupiah)(tiket.nominal_ticket)
    };
}
