import { z, ZodType } from "zod";

export class TiketH2hValidation{

    static readonly REQUEST:ZodType = z.object({
        ip:z.string().min(1),
        memberid:z.string().min(1),
        pin:z.string().min(1),
        password:z.string().min(1),
        nominal:z.number().min(1),
    })

}