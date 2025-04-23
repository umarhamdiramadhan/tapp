import { z, ZodType } from "zod";

export class ModulValidation {

    static readonly CREATE:ZodType=z.object({
        nama_moduls:z.string().min(1).max(100),
        username: z.string().min(1).max(255).optional(),
        memberid: z.string().min(1).max(255).optional(),
        pin: z.string().min(1).max(255).optional(),
        password: z.string().min(1).max(255).optional(),
        cek_saldo: z.string().min(1).max(255).optional(),
        tiket: z.string().min(1).max(255).optional(),
        ip: z.string().min(1).max(255),
        perintah: z.string().min(1).max(255),
        antrian_produk:z.number().optional(),
        total_antrian:z.number().optional(),
        jawabans: z.string().min(1).max(255).optional(),
    })

    static readonly UPDATE:ZodType=z.object({
        id:z.number().optional(),
        nama_moduls:z.string().min(1).max(100),
        username: z.string().min(1).max(255).optional(),
        memberid: z.string().min(1).max(255).optional(),
        pin: z.string().min(1).max(255).optional(),
        password: z.string().min(1).max(255).optional(),
        cek_saldo: z.string().min(1).max(255).optional(),
        tiket: z.string().min(1).max(255).optional(),
        ip: z.string().min(1).max(255),
        perintah: z.string().min(1).max(255),
        antrian_produk:z.number().optional(),
        total_antrian:z.number().optional(),
        jawabans: z.string().min(1).max(255).optional(),
    })

    static readonly VIEW:ZodType=z.object({
        nama_moduls:z.string().min(1).max(100).optional(),
        page: z.number().min(1).positive(),
        size: z.number().min(1).positive()
    })

}