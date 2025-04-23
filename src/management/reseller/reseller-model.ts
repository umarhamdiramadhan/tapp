import { Reseller } from "@prisma/client"

export type ResellerResponse = {
    kode_reseller:string
    nama_reseller:string
    saldo:number
    ip?:string | null
    ip_callback:string | null
    is_aktif:boolean
    alamat:string
    nama_pemilik?:string | null
    nomer_telefon:string
    id_telegram?:string | null
    allow_sign:boolean
   
    kode_grups?:string
}
export type ResellerCreateRequest = {
    kode_reseller:string
    nama_reseller:string
    ip?:string | null
    ip_callback?:string | null
    password_ip?:string | null
    is_aktif:boolean
    alamat:string
    nama_pemilik?:string | null
    nomer_telefon:bigint
    id_telegram?:string | null
    allow_sign:boolean
    pin:string
    kode_grups:string
} 

export type ResellerUpdateRequest = {
    kode_reseller:string
    nama_reseller:string
    ip:string | null
    ip_callback:string | null
    password_ip:string | null
    is_aktif:boolean
    alamat:string
    nama_pemilik:string | null
    nomer_telefon:number
    id_telegram:string | null
    allow_sign:boolean
    pin:string
    kode_grups:string
} 

export type ResellerViewRequest = {
    kode_reseller:string
    nama_reseller:string
    nomer_telefon:string
    kode_grups:string
    page:number
    size:number
} 

export type ResellerTambahSaldo = {
    kode_reseller:string
    jumlah:number
    keterangan:string
}

export type ResellerKurangSaldo = {
    kode_reseller:string,
    jumlah:number,
    keterangan:string
}


export function toResellerResponse(reseller:Reseller):ResellerResponse{
    return{
    kode_reseller:reseller.kode_reseller,
    nama_reseller:reseller.nama_reseller,
    saldo:reseller.saldo,
    ip:reseller.ip,
    ip_callback:reseller.ip_callback,
    is_aktif:reseller.is_aktif,
    alamat:reseller.alamat,
    nama_pemilik:reseller.nama_pemilik,
    nomer_telefon:reseller.nomer_telefon,
    id_telegram:reseller.id_telegram,
    allow_sign:reseller.allow_sign,
    kode_grups:reseller.kode_grups
    }
}