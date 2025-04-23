"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toOutboxResponse = toOutboxResponse;
const date_indonesia_1 = require("../../utils/date-indonesia");
function toOutboxResponse(outbox) {
    return {
        id: outbox.id,
        date: (0, date_indonesia_1.formatDateTimeIndonesia)(outbox.date),
        pesan: outbox.pesan
    };
}
