"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParsingValidation = void 0;
const zod_1 = require("zod");
class ParsingValidation {
}
exports.ParsingValidation = ParsingValidation;
ParsingValidation.create = zod_1.z.object({
    id_moduls: zod_1.z.number().min(1),
    kode_produks: zod_1.z.string().min(1).max(255),
    parsing: zod_1.z.string().min(1).max(255),
    harga_beli: zod_1.z.number().min(1),
    prioritas: zod_1.z.number().min(1),
});
ParsingValidation.update = zod_1.z.object({
    id: zod_1.z.number().min(1),
    id_moduls: zod_1.z.number().min(1),
    kode_produks: zod_1.z.string().min(1).max(255),
    parsing: zod_1.z.string().min(1).max(255),
    harga_beli: zod_1.z.number().min(1),
    prioritas: zod_1.z.number().min(1),
});
ParsingValidation.view = zod_1.z.object({
    id_moduls: zod_1.z.number().min(1).optional(),
    kode_produks: zod_1.z.string().min(1).max(255).optional(),
    page: zod_1.z.number().min(1).positive(),
    size: zod_1.z.number().min(1).positive()
});
