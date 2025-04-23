import { Tiket } from "@prisma/client"
import { formatDateTimeIndonesia } from "../../utils/date-indonesia"
import { formatRupiah } from "../../utils/format-rupiah"

export type TiketResponse ={
    id:number
    date:string
    status:boolean
    kode_resellers:string
    nama_resellers:string
    nominal_ticket:number
    nominal_ticket_rupiah:string
}

export type ViewTiket = {
    date_start:string
    date_end:string
    kode_resellers:string
    nama_resellers:string
    page:number
    size:number
}

export function toTiketResponse(tiket:Tiket,nama_reseller:string):TiketResponse{
    return{
        id:tiket.id,
        date:formatDateTimeIndonesia(tiket.date),
        status:tiket.status,
        kode_resellers:tiket.kode_resellers,
        nominal_ticket:tiket.nominal_ticket,
        nama_resellers:nama_reseller,
        nominal_ticket_rupiah:formatRupiah(tiket.nominal_ticket)
    }
}