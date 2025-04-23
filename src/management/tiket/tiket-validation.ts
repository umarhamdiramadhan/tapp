import { z, ZodType } from "zod";


export class TiketValidation{

    static readonly VIEW:ZodType = z.object({
        date_start:z.string().optional(),
        date_end:z.string().optional(),
        kode_resellers:z.string().min(1).optional(),
        nama_resellers:z.string().min(1).optional(),
        page: z.number().min(1).positive(),
        size: z.number().min(1).positive()
    })

}