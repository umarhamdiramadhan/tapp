import { z, ZodType } from "zod";

export class ProviderValidation {

    static readonly CREATE:ZodType = z.object({
        kode_provider:z.string().min(1).max(100),
        nama_provider :z.string().min(1).max(100),
        is_gangguan :z.boolean(),   
        prefix:z.string().min(1).max(100).optional(),
        minimal :z.number().optional(),
        maxsimal : z.number().optional()
    })
    static readonly UPDATE:ZodType = z.object({
        kode_provider:z.string().min(1).max(100),
        nama_provider :z.string().min(1).max(100),
        is_gangguan :z.boolean(),
        prefix:z.string().min(1).max(100).optional(),
        minimal :z.number().optional(),
        maxsimal : z.number().optional()
    })
    static readonly VIEW:ZodType = z.object({
        kode_provider:z.string().min(1).max(100).optional(),
        nama_provider :z.string().min(1).max(100).optional(),
        page: z.number().min(1).positive(),
        size: z.number().min(1).positive()   
    })


}