import { z, ZodType } from "zod";

export class ResellerValidation {

    static readonly CREATE:ZodType = z.object({
        kode_reseller:z.string().min(1).max(100),
        nama_reseller:z.string().min(1).max(100),
        ip:z.string().min(1).max(100).optional(),
        ip_callback:z.string().min(1).max(100).optional(),
        password_ip:z.string().max(255).optional(),
        is_aktif:z.boolean(),
        alamat:z.string().min(1).max(255),
        nama_pemilik:z.string().min(1).max(255).optional(),
        nomer_telefon:z.string().min(10).max(14).regex(/^\+[1-9]\d{1,14}$/, 'Invalid phone number format'),
        id_telegram:z.string().min(1).max(100).optional(),
        allow_sign:z.boolean(),
        pin:z.string().min(1).max(255),
        kode_grups:z.string().min(1).max(100)
    })
    
    static readonly UPDATE:ZodType = z.object({
        kode_reseller:z.string().min(1).max(100),
        nama_reseller:z.string().min(1).max(100),
        ip:z.string().min(1).max(100).optional(),
        ip_callback:z.string().min(1).max(100).optional(),
        password_ip:z.string().max(255).optional(),
        is_aktif:z.boolean(),
        alamat:z.string().min(1).max(255),
        nama_pemilik:z.string().min(1).max(255).optional(),
        nomer_telefon:z.string().min(10).max(14).regex(/^\+[1-9]\d{1,14}$/, 'Invalid phone number format'),
        id_telegram:z.string().min(1).max(100).optional(),
        allow_sign:z.boolean(),
        pin:z.string().min(1).max(255),
        kode_grups:z.string().min(1).max(100)
    })

    static readonly VIEW:ZodType = z.object({
        kode_reseller:z.string().min(1).max(100).optional(),
        nama_reseller:z.string().min(1).max(100).optional(),
        nomer_telefon:z.string().min(1).max(100).optional(),
        kode_grups:z.string().min(1).max(100).optional(),
        page: z.number().min(1).positive(),
        size: z.number().min(1).positive()
    })

    static readonly TAMBAHSALDO:ZodType = z.object({
        kode_reseller:z.string().min(1).max(100),
        jumlah: z.number().min(1).positive(),
        keterangan:z.string().min(1).max(100)
    })

    static readonly KURANGSALDO:ZodType = z.object({
        kode_reseller:z.string().min(1).max(100),
        jumlah: z.number().min(1).positive(),
        keterangan:z.string().min(1).max(100)
    })
}