"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrupValidation = void 0;
const zod_1 = require("zod");
class GrupValidation {
}
exports.GrupValidation = GrupValidation;
GrupValidation.CREATE = zod_1.z.object({
    kode_grup: zod_1.z.string().min(1).max(100),
    nama_grup: zod_1.z.string().min(1).max(100),
});
GrupValidation.UPDATE = zod_1.z.object({
    kode_grup: zod_1.z.string().min(1).max(100),
    nama_grup: zod_1.z.string().min(1).max(100),
});
GrupValidation.VIEW = zod_1.z.object({
    kode_grup: zod_1.z.string().min(1).max(100).optional(),
    nama_grup: zod_1.z.string().min(1).max(100).optional(),
    page: zod_1.z.number().min(1).positive(),
    size: zod_1.z.number().min(1).positive()
});
