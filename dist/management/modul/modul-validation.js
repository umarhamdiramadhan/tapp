"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModulValidation = void 0;
const zod_1 = require("zod");
class ModulValidation {
}
exports.ModulValidation = ModulValidation;
ModulValidation.CREATE = zod_1.z.object({
    nama_moduls: zod_1.z.string().min(1).max(100),
    username: zod_1.z.string().min(1).max(255).optional(),
    memberid: zod_1.z.string().min(1).max(255).optional(),
    pin: zod_1.z.string().min(1).max(255).optional(),
    password: zod_1.z.string().min(1).max(255).optional(),
    cek_saldo: zod_1.z.string().min(1).max(255).optional(),
    tiket: zod_1.z.string().min(1).max(255).optional(),
    ip: zod_1.z.string().min(1).max(255),
    perintah: zod_1.z.string().min(1).max(255),
    antrian_produk: zod_1.z.number().optional(),
    total_antrian: zod_1.z.number().optional(),
    jawabans: zod_1.z.string().min(1).max(255).optional(),
});
ModulValidation.UPDATE = zod_1.z.object({
    id: zod_1.z.number().optional(),
    nama_moduls: zod_1.z.string().min(1).max(100),
    username: zod_1.z.string().min(1).max(255).optional(),
    memberid: zod_1.z.string().min(1).max(255).optional(),
    pin: zod_1.z.string().min(1).max(255).optional(),
    password: zod_1.z.string().min(1).max(255).optional(),
    cek_saldo: zod_1.z.string().min(1).max(255).optional(),
    tiket: zod_1.z.string().min(1).max(255).optional(),
    ip: zod_1.z.string().min(1).max(255),
    perintah: zod_1.z.string().min(1).max(255),
    antrian_produk: zod_1.z.number().optional(),
    total_antrian: zod_1.z.number().optional(),
    jawabans: zod_1.z.string().min(1).max(255).optional(),
});
ModulValidation.VIEW = zod_1.z.object({
    nama_moduls: zod_1.z.string().min(1).max(100).optional(),
    page: zod_1.z.number().min(1).positive(),
    size: zod_1.z.number().min(1).positive()
});
