"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValidation = void 0;
const zod_1 = require("zod");
class ProductValidation {
}
exports.ProductValidation = ProductValidation;
ProductValidation.CREATE = zod_1.z.object({
    kode_produk: zod_1.z.string().min(1).max(100),
    nama_produk: zod_1.z.string().min(1).max(255),
    is_gangguan: zod_1.z.boolean(),
    is_aktif: zod_1.z.boolean(),
    is_multi: zod_1.z.boolean(),
    kode_providers: zod_1.z.string().min(1).max(100)
});
ProductValidation.UPDATE = zod_1.z.object({
    kode_produk: zod_1.z.string().min(1).max(100),
    nama_produk: zod_1.z.string().min(1).max(255),
    is_gangguan: zod_1.z.boolean(),
    is_aktif: zod_1.z.boolean(),
    is_multi: zod_1.z.boolean(),
    kode_providers: zod_1.z.string().min(1).max(100)
});
ProductValidation.VIEW = zod_1.z.object({
    kode_produk: zod_1.z.string().min(1).max(100).optional(),
    nama_produk: zod_1.z.string().min(1).max(255).optional(),
    kode_providers: zod_1.z.string().min(1).max(100).optional(),
    page: zod_1.z.number().min(1).positive(),
    size: zod_1.z.number().min(1).positive()
});
