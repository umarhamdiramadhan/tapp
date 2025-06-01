import { z, ZodType } from "zod";

export class TransaksiH2hValidation {
    static readonly TRANSAKSI:ZodType = z.object({
        ip:z.string().min(1),
        memberID:z.string().min(1),
        pin:z.string().min(1),
        password:z.string().min(1),
        product:z.string().min(1),
        qty:z.number().optional(),
        dest:z.string().min(1),
        refID:z.string().min(1)
    })
}