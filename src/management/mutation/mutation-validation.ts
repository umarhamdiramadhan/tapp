import { z, ZodType } from "zod";

export class MutasiValidation{
    static readonly VIEW:ZodType = z.object({
        kode_reseller:z.string().min(1).max(100).optional(),
        jumlah: z.number().min(1).optional(),
        date_start:z.string().optional(),
        date_end:z.string().optional(),
        page: z.number().min(1).positive(),
        size: z.number().min(1).positive()
    })
}