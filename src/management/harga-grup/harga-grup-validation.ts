import { number, z, ZodType } from "zod";

export class HargaGrupValidation{
    static readonly CREATE:ZodType = z.object({
        kode_grups:z.string().min(1).max(100),
        kode_produks:z.string().min(1).max(100),
        harga:z.number().positive(),
        is_gangguan:z.boolean(),
    })

    static readonly UPDATE:ZodType = z.object({
        id:z.number().positive(),
        kode_grups:z.string().min(1).max(100),
        kode_produks:z.string().min(1).max(100),
        harga:z.number().positive(),
        is_gangguan:z.boolean(),
    })

    static readonly UPDATEMANY:ZodType = z.object({
        kode_produks:z.string().min(1).max(100),
        harga:z.number().positive(),
    })
    static readonly CREATEMANY:ZodType = z.object({
        nama_grup:z.string().min(1).max(100),
        kode_grups:z.string().min(1).max(100),   
        kode_grup:z.string().min(1).max(100),     
    })


    static readonly VIEW:ZodType = z.object({
        kode_grups:z.string().min(1).max(100).optional(),
        kode_produks:z.string().min(1).max(100).optional(),
        page: z.number().min(1).positive(),
        size: z.number().min(1).positive()
    })

}