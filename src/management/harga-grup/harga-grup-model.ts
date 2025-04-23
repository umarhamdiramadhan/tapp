import { HargaGrup } from "@prisma/client"
import { formatRupiah } from "../../utils/format-rupiah"

export type HargaGrupResponse = {
    id:number
    kode_grups:string
    kode_produks:string,
    harga:number
    harga_rupiah:string
    is_gangguan:boolean
}

export type HargaGrupCreateRequest = {
    kode_grups:string
    kode_produks:string
    harga:number
    is_gangguan:boolean
}

export type HargaGrupUpdateRequest = {
    id:number
    kode_grups:string
    kode_produks:string
    harga:number
    is_gangguan:boolean
}
export type HargaGrupUpdateManyRequest = {
    kode_produks:string
    harga:number
}

export type HargaGrupViewRequest = {
    kode_grups:string
    kode_produks:string
    page:number
    size:number
}
export type HargaGrupCreateManyRequest = {
    kode_grups:string
    kode_grup:string
    nama_grup:string
}


export function toHargaGrupResponse(hargaGrup:HargaGrup):HargaGrupResponse{
    return{
        id:hargaGrup.id,
        kode_grups:hargaGrup.kode_grups,
        kode_produks:hargaGrup.kode_produks,
        harga:hargaGrup.harga,
        harga_rupiah:formatRupiah(hargaGrup.harga),
        is_gangguan:hargaGrup.is_gangguan
    }
}
