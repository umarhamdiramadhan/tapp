import { z, ZodType } from "zod";

export class ProductValidation {
    static readonly CREATE:ZodType = z.object({
        kode_produk: z.string().min(1).max(100), 
        nama_produk: z.string().min(1).max(255),
        is_gangguan: z.boolean(),
        is_aktif: z.boolean(), 
        is_multi: z.boolean(),
        kode_providers: z.string().min(1).max(100)
    })

    static readonly UPDATE:ZodType = z.object({
        kode_produk: z.string().min(1).max(100), 
        nama_produk: z.string().min(1).max(255),
        is_gangguan: z.boolean(),
        is_aktif: z.boolean(), 
        is_multi: z.boolean(),
        kode_providers: z.string().min(1).max(100)
    })
    static readonly VIEW:ZodType = z.object({
        kode_produk: z.string().min(1).max(100).optional(), 
        nama_produk: z.string().min(1).max(255).optional(),
        kode_providers: z.string().min(1).max(100).optional(),
        page: z.number().min(1).positive(),
        size: z.number().min(1).positive() 
    })
}