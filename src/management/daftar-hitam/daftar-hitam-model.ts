import { DaftarHitam } from "@prisma/client"

export type DaftarHitamResponse = {
    id:number
    nomer_tujuan : string
    keterangan: string | null
}

export type DaftarHitamCreateRequest = {
    nomer_tujuan : string
    keterangan: string | null
}

export type DaftarHitamUpdateRequest = {
    id:number,
    nomer_tujuan : string
    keterangan: string | null
}



export type DaftarHitamViewRequest = {
    nomer_tujuan : string,
    keterangan: string | null
    page: number
    size: number
}

export function toDaftarHitamResponse(daftarHitam:DaftarHitam):DaftarHitam{
    return{
        id:daftarHitam.id,
        nomer_tujuan : daftarHitam.nomer_tujuan,
        keterangan: daftarHitam.keterangan
    }
}
