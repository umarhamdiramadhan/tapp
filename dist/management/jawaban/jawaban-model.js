"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toJawabanResponse = toJawabanResponse;
var StatusJawaban;
(function (StatusJawaban) {
    StatusJawaban[StatusJawaban["sukses"] = 0] = "sukses";
    StatusJawaban[StatusJawaban["gagal"] = 1] = "gagal";
    StatusJawaban[StatusJawaban["dibatalkan"] = 2] = "dibatalkan";
    StatusJawaban[StatusJawaban["gangguan"] = 3] = "gangguan";
    StatusJawaban[StatusJawaban["alihkan"] = 4] = "alihkan";
})(StatusJawaban || (StatusJawaban = {}));
function toJawabanResponse(jawaban) {
    return {
        id: jawaban.id,
        nama_jawaban: jawaban.nama_jawaban,
        kata_kunci: jawaban.kata_kunci,
        regex: jawaban.regex,
        prioritas: jawaban.prioritas,
        generate_sn: jawaban.generate_sn,
        is_update: jawaban.is_update,
        status: jawaban.status
    };
}
