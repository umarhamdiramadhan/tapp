"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TiketValidation = void 0;
const zod_1 = require("zod");
class TiketValidation {
}
exports.TiketValidation = TiketValidation;
TiketValidation.VIEW = zod_1.z.object({
    date_start: zod_1.z.string().optional(),
    date_end: zod_1.z.string().optional(),
    kode_resellers: zod_1.z.string().min(1).optional(),
    nama_resellers: zod_1.z.string().min(1).optional(),
    page: zod_1.z.number().min(1).positive(),
    size: zod_1.z.number().min(1).positive()
});
