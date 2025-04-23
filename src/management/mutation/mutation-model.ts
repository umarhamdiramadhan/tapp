import { Mutasi } from "@prisma/client"
import { formatDateTimeIndonesia } from "../../utils/date-indonesia"
import { formatRupiah } from "../../utils/format-rupiah"

export type MutasiResponse = {
    id:number
    date:string
    jumlah:string
    kode_resellers:string|null
}



export type MutasiViewRequest = {
    jumlah:number|undefined
    kode_resellers:string
    date_start:string
    date_end:string
    page:number
    size:number
}



export function toMutasiResponse(mutasi:Mutasi):MutasiResponse{
    return{
        id:mutasi.id,
        date:formatDateTimeIndonesia(mutasi.date),
        jumlah:formatRupiah(mutasi.jumlah),
        kode_resellers:mutasi.kode_resellers
    }
}