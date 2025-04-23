"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HargaGrupValidation = void 0;
const zod_1 = require("zod");
class HargaGrupValidation {
}
exports.HargaGrupValidation = HargaGrupValidation;
HargaGrupValidation.CREATE = zod_1.z.object({
    kode_grups: zod_1.z.string().min(1).max(100),
    kode_produks: zod_1.z.string().min(1).max(100),
    harga: zod_1.z.number().positive(),
    is_gangguan: zod_1.z.boolean(),
});
HargaGrupValidation.UPDATE = zod_1.z.object({
    id: zod_1.z.number().positive(),
    kode_grups: zod_1.z.string().min(1).max(100),
    kode_produks: zod_1.z.string().min(1).max(100),
    harga: zod_1.z.number().positive(),
    is_gangguan: zod_1.z.boolean(),
});
HargaGrupValidation.UPDATEMANY = zod_1.z.object({
    kode_produks: zod_1.z.string().min(1).max(100),
    harga: zod_1.z.number().positive(),
});
HargaGrupValidation.CREATEMANY = zod_1.z.object({
    nama_grup: zod_1.z.string().min(1).max(100),
    kode_grups: zod_1.z.string().min(1).max(100),
    kode_grup: zod_1.z.string().min(1).max(100),
});
HargaGrupValidation.VIEW = zod_1.z.object({
    kode_grups: zod_1.z.string().min(1).max(100).optional(),
    kode_produks: zod_1.z.string().min(1).max(100).optional(),
    page: zod_1.z.number().min(1).positive(),
    size: zod_1.z.number().min(1).positive()
});
