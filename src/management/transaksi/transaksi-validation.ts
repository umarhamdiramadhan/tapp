import { ZodType,z } from "zod";


export class TransaksiValidation{
    static readonly TransaksiUpdateSukses:ZodType = z.object({
        trxid:z.number().min(1),
        sn:z.string().min(1).optional()
    })
    
    static readonly TransaksiUpdateGagal:ZodType = z.object({
        trxid:z.number().min(1),
        status:z.string().min(1)
    })

    static readonly TransaksiView:ZodType = z.object({
        tanggal_entry_start:z.string().optional(),
        tanggal_entry_end:z.string().optional(),
        kode_resellers:z.string().min(1).optional(),
        nama_resellers:z.string().min(1).optional(),
        nomer_tujuan:z.string().min(1).optional(),
        id_moduls:z.number().min(1).optional(),
        kode_produks:z.string().min(1).optional(),
        page: z.number().min(1).positive(),
        size: z.number().min(1).positive()
    })
}