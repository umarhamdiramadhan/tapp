"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toInboxResponse = toInboxResponse;
const date_indonesia_1 = require("../../utils/date-indonesia");
function toInboxResponse(inbox) {
    return {
        id: inbox.id,
        date: (0, date_indonesia_1.formatDateTimeIndonesia)(inbox.date),
        pesan: inbox.pesan
    };
}
