"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderValidation = void 0;
const zod_1 = require("zod");
class ProviderValidation {
}
exports.ProviderValidation = ProviderValidation;
ProviderValidation.CREATE = zod_1.z.object({
    kode_provider: zod_1.z.string().min(1).max(100),
    nama_provider: zod_1.z.string().min(1).max(100),
    is_gangguan: zod_1.z.boolean(),
    prefix: zod_1.z.string().min(1).max(100).optional(),
    minimal: zod_1.z.number().optional(),
    maxsimal: zod_1.z.number().optional()
});
ProviderValidation.UPDATE = zod_1.z.object({
    kode_provider: zod_1.z.string().min(1).max(100),
    nama_provider: zod_1.z.string().min(1).max(100),
    is_gangguan: zod_1.z.boolean(),
    prefix: zod_1.z.string().min(1).max(100).optional(),
    minimal: zod_1.z.number().optional(),
    maxsimal: zod_1.z.number().optional()
});
ProviderValidation.VIEW = zod_1.z.object({
    kode_provider: zod_1.z.string().min(1).max(100).optional(),
    nama_provider: zod_1.z.string().min(1).max(100).optional(),
    page: zod_1.z.number().min(1).positive(),
    size: zod_1.z.number().min(1).positive()
});
