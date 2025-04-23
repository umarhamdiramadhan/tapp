"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toResponseTiketH2h = toResponseTiketH2h;
function toResponseTiketH2h(jumlah_tiket) {
    return `
        silahkan transfer ${jumlah_tiket}
        BCA:21222    (MANUAL)
        BNI:2111     (MANUAL)
        BRI:2111     (MANUAL)
        MANDIRI:1112 (MANUAL)
        sebelum jam 22:00    
    `;
}
