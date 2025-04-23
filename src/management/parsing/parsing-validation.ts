import { z, ZodType } from "zod";

export class ParsingValidation {

    static readonly create:ZodType = z.object({
        id_moduls: z.number().min(1),
        kode_produks: z.string().min(1).max(255),
        parsing:z.string().min(1).max(255),
        harga_beli:z.number().min(1),
        prioritas:z.number().min(1),
    }) 

    static readonly update:ZodType = z.object({
        id: z.number().min(1),
        id_moduls: z.number().min(1),
        kode_produks: z.string().min(1).max(255),
        parsing:z.string().min(1).max(255),
        harga_beli:z.number().min(1),
        prioritas:z.number().min(1),
    }) 

    static readonly view:ZodType = z.object({
        id_moduls: z.number().min(1).optional(),
        kode_produks: z.string().min(1).max(255).optional(),
        page: z.number().min(1).positive(),
        size: z.number().min(1).positive() 
    }) 


}