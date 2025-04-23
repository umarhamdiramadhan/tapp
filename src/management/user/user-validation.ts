import { z, ZodType } from "zod";

export class UserValidation {

    static readonly REGISTER:ZodType = z.object({
        email: z.string().min(1).max(100).email(),
        password: z.string().min(1).max(255),
        name: z.string().min(1).max(100),
        role:z.enum(["administrator","admin","cs","operator"]),
        is_aktif:z.boolean()
    })

    static readonly UPDATE:ZodType = z.object({
        email: z.string().min(1).max(100).email(),
        password: z.string().min(1).max(255).optional(),
        name: z.string().min(1).max(100).optional(),
        role:z.enum(["administrator","admin","cs","operator"]).optional(),
        is_aktif:z.boolean().optional()
    })

    static readonly LOGIN:ZodType = z.object({
        email: z.string().min(1).max(100).email(),
        password: z.string().min(1).max(255),
    })

    static readonly DELETE:ZodType = z.object({
        email: z.string().min(1).max(100).email(),
    })

    static readonly VIEW:ZodType = z.object({
        email: z.string().min(1).max(100).optional(),
        name: z.string().min(1).max(100).optional(),
        page: z.number().min(1).positive(),
        size: z.number().min(1).max(100).positive()
    })

}