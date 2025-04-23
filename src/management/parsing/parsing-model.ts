import { Parsing } from "@prisma/client"

export type ParsingResponse = {
    id:number
    id_moduls:number
    kode_produks:string
    parsing:string
    harga_beli:number
    prioritas:number
}



export type ParsingCreateRequest = {
    id_moduls:number
    kode_produks:string
    parsing:string
    harga_beli:number
    prioritas:number
}


export type ParsingUpdateRequest = {
    id:number
    id_moduls:number
    kode_produks:string
    parsing:string
    harga_beli:number
    prioritas:number
}

export type ParsingViewRequest = {
    id_moduls:number|undefined
    kode_produks:string
    page:number
    size:number
}

export function toParsingResponse(parsing:Parsing){
    return{
        id:parsing.id,
        id_moduls:parsing.id_moduls,
        kode_produks:parsing.kode_produks,
        parsing:parsing.parsing,
        harga_beli:parsing.harga_beli,
        prioritas:parsing.prioritas
    }
}
