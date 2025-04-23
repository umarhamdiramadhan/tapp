import { z, ZodType } from "zod";

export class DaftarHitamValidation{


   static readonly CREATE:ZodType = z.object({
        nomer_tujuan:z.string().min(1).max(100),
        keterangan:z.string().min(1).max(100).optional(),
    })

    static readonly UPDATE:ZodType = z.object({
        id:z.number().min(1),
        nomer_tujuan:z.string().min(1).max(100),
        keterangan:z.string().min(1).max(100).optional(),
    })

   
    static readonly VIEW:ZodType = z.object({
        nomer_tujuan:z.string().min(1).max(100).optional(),
        keterangan:z.string().min(1).max(100).optional(),
        page: z.number().min(1).positive(),
        size: z.number().min(1).positive()
    })

 
}