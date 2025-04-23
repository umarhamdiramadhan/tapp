import { Grup } from "@prisma/client"

export type GrupResponse = {
    kode_grup : string
    nama_grup : string
}

export type GrupCreateRequest = {
    kode_grup : string
    nama_grup : string
}

export type GrupUpdateRequest = {
    kode_grup : string
    nama_grup : string
}
export type GrupViewRequest = {
    kode_grup : string
    nama_grup : string
    page : number
    size : number
}

export function toGrupResponse(grup:Grup):GrupResponse{
    return{
        kode_grup:grup.kode_grup,
        nama_grup:grup.nama_grup
    }
}