import { z, ZodType } from "zod";

export class JawabanValidation{

    static readonly CREATE:ZodType = z.object({
        nama_jawaban:z.string().min(1).max(100),
        kata_kunci:z.string().min(1).max(100),
        regex:z.string().min(1).max(255),
        prioritas:z.number(),
        generate_sn:z.string().min(1).max(255),
        is_update:z.boolean(),
        status:z.enum(["sukses","gagal","dibatalkan","gangguan","alihkan"]),
    })

    static readonly UPDATE:ZodType = z.object({
        id:z.number(),
        nama_jawaban:z.string().min(1).max(100),
        kata_kunci:z.string().min(1).max(100),
        regex:z.string().min(1).max(255),
        prioritas:z.number(),
        generate_sn:z.string().min(1).max(255),
        is_update:z.boolean(),
        status:z.enum(["sukses","gagal","dibatalkan","gangguan","alihkan"]),
    })

    static readonly VIEW:ZodType = z.object({
        nama_jawaban:z.string().max(100).optional(),
        status:z.enum(["sukses","gagal","dibatalkan","gangguan","alihkan"]).optional(),
        page: z.number().min(1).positive(),
        size: z.number().min(1).positive()
    })

}