"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JawabanValidation = void 0;
const zod_1 = require("zod");
class JawabanValidation {
}
exports.JawabanValidation = JawabanValidation;
JawabanValidation.CREATE = zod_1.z.object({
    nama_jawaban: zod_1.z.string().min(1).max(100),
    kata_kunci: zod_1.z.string().min(1).max(100),
    regex: zod_1.z.string().min(1).max(255),
    prioritas: zod_1.z.number(),
    generate_sn: zod_1.z.string().min(1).max(255),
    is_update: zod_1.z.boolean(),
    status: zod_1.z.enum(["sukses", "gagal", "dibatalkan", "gangguan", "alihkan"]),
});
JawabanValidation.UPDATE = zod_1.z.object({
    id: zod_1.z.number(),
    nama_jawaban: zod_1.z.string().min(1).max(100),
    kata_kunci: zod_1.z.string().min(1).max(100),
    regex: zod_1.z.string().min(1).max(255),
    prioritas: zod_1.z.number(),
    generate_sn: zod_1.z.string().min(1).max(255),
    is_update: zod_1.z.boolean(),
    status: zod_1.z.enum(["sukses", "gagal", "dibatalkan", "gangguan", "alihkan"]),
});
JawabanValidation.VIEW = zod_1.z.object({
    nama_jawaban: zod_1.z.string().max(100).optional(),
    status: zod_1.z.enum(["sukses", "gagal", "dibatalkan", "gangguan", "alihkan"]).optional(),
    page: zod_1.z.number().min(1).positive(),
    size: zod_1.z.number().min(1).positive()
});
