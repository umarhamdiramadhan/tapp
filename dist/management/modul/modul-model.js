"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toModulResponse = toModulResponse;
function toModulResponse(modul) {
    return {
        id: modul.id,
        nama_moduls: modul.nama_moduls,
        username: modul.username,
        memberid: modul.memberid,
        pin: modul.pin,
        password: modul.password,
        cek_saldo: modul.cek_saldo,
        tiket: modul.tiket,
        ip: modul.ip,
        perintah: modul.perintah,
        antrian_produk: modul.antrian_produk,
        total_antrian: modul.total_antrian,
        jawabans: modul.jawabans
    };
}
