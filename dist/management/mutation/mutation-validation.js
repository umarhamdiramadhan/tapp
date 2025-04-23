"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MutasiValidation = void 0;
const zod_1 = require("zod");
class MutasiValidation {
}
exports.MutasiValidation = MutasiValidation;
MutasiValidation.VIEW = zod_1.z.object({
    kode_reseller: zod_1.z.string().min(1).max(100).optional(),
    jumlah: zod_1.z.number().min(1).optional(),
    date_start: zod_1.z.string().optional(),
    date_end: zod_1.z.string().optional(),
    page: zod_1.z.number().min(1).positive(),
    size: zod_1.z.number().min(1).positive()
});
