import { z, ZodType } from "zod";

export class CheckSaldoH2hValidation{

    static readonly CHECK:ZodType = z.object({
        ip:z.string().min(1),
        memberid:z.string().min(1),
        pin:z.string().min(1),
        password:z.string().min(1),
    })

}