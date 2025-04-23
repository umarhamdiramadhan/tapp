"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResellerValidation = void 0;
const zod_1 = require("zod");
class ResellerValidation {
}
exports.ResellerValidation = ResellerValidation;
ResellerValidation.CREATE = zod_1.z.object({
    kode_reseller: zod_1.z.string().min(1).max(100),
    nama_reseller: zod_1.z.string().min(1).max(100),
    ip: zod_1.z.string().min(1).max(100).optional(),
    ip_callback: zod_1.z.string().min(1).max(100).optional(),
    password_ip: zod_1.z.string().max(255).optional(),
    is_aktif: zod_1.z.boolean(),
    alamat: zod_1.z.string().min(1).max(255),
    nama_pemilik: zod_1.z.string().min(1).max(255).optional(),
    nomer_telefon: zod_1.z.string().min(10).max(14).regex(/^\+[1-9]\d{1,14}$/, 'Invalid phone number format'),
    id_telegram: zod_1.z.string().min(1).max(100).optional(),
    allow_sign: zod_1.z.boolean(),
    pin: zod_1.z.string().min(1).max(255),
    kode_grups: zod_1.z.string().min(1).max(100)
});
ResellerValidation.UPDATE = zod_1.z.object({
    kode_reseller: zod_1.z.string().min(1).max(100),
    nama_reseller: zod_1.z.string().min(1).max(100),
    ip: zod_1.z.string().min(1).max(100).optional(),
    ip_callback: zod_1.z.string().min(1).max(100).optional(),
    password_ip: zod_1.z.string().max(255).optional(),
    is_aktif: zod_1.z.boolean(),
    alamat: zod_1.z.string().min(1).max(255),
    nama_pemilik: zod_1.z.string().min(1).max(255).optional(),
    nomer_telefon: zod_1.z.string().min(10).max(14).regex(/^\+[1-9]\d{1,14}$/, 'Invalid phone number format'),
    id_telegram: zod_1.z.string().min(1).max(100).optional(),
    allow_sign: zod_1.z.boolean(),
    pin: zod_1.z.string().min(1).max(255),
    kode_grups: zod_1.z.string().min(1).max(100)
});
ResellerValidation.VIEW = zod_1.z.object({
    kode_reseller: zod_1.z.string().min(1).max(100).optional(),
    nama_reseller: zod_1.z.string().min(1).max(100).optional(),
    nomer_telefon: zod_1.z.string().min(1).max(100).optional(),
    kode_grups: zod_1.z.string().min(1).max(100).optional(),
    page: zod_1.z.number().min(1).positive(),
    size: zod_1.z.number().min(1).positive()
});
ResellerValidation.TAMBAHSALDO = zod_1.z.object({
    kode_reseller: zod_1.z.string().min(1).max(100),
    jumlah: zod_1.z.number().min(1).positive(),
    keterangan: zod_1.z.string().min(1).max(100)
});
ResellerValidation.KURANGSALDO = zod_1.z.object({
    kode_reseller: zod_1.z.string().min(1).max(100),
    jumlah: zod_1.z.number().min(1).positive(),
    keterangan: zod_1.z.string().min(1).max(100)
});
