import { date, z, ZodType } from "zod";

export class OutboxValidation{

    static readonly VIEW:ZodType = z.object({
        date_start:z.string().optional(),
        date_end:z.string().optional(),
        pesan:z.string().optional(),
        page: z.number().min(1).positive(),
        size: z.number().min(1).positive()
    })

}