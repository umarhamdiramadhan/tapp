"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DaftarHitamValidation = void 0;
const zod_1 = require("zod");
class DaftarHitamValidation {
}
exports.DaftarHitamValidation = DaftarHitamValidation;
DaftarHitamValidation.CREATE = zod_1.z.object({
    nomer_tujuan: zod_1.z.string().min(1).max(100),
    keterangan: zod_1.z.string().min(1).max(100).optional(),
});
DaftarHitamValidation.UPDATE = zod_1.z.object({
    id: zod_1.z.number().min(1),
    nomer_tujuan: zod_1.z.string().min(1).max(100),
    keterangan: zod_1.z.string().min(1).max(100).optional(),
});
DaftarHitamValidation.VIEW = zod_1.z.object({
    nomer_tujuan: zod_1.z.string().min(1).max(100).optional(),
    keterangan: zod_1.z.string().min(1).max(100).optional(),
    page: zod_1.z.number().min(1).positive(),
    size: zod_1.z.number().min(1).positive()
});
