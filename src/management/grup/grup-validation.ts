import { ZodType,z } from "zod";

export class GrupValidation {

    static readonly CREATE:ZodType = z.object({
        kode_grup:z.string().min(1).max(100),
        nama_grup :z.string().min(1).max(100),
    })

    static readonly UPDATE:ZodType = z.object({
        kode_grup:z.string().min(1).max(100),
        nama_grup :z.string().min(1).max(100),
    })

    static readonly VIEW:ZodType = z.object({
        kode_grup:z.string().min(1).max(100).optional(),
        nama_grup :z.string().min(1).max(100).optional(),
        page: z.number().min(1).positive(),
        size: z.number().min(1).positive()
    })
    
    

}