import { Provider } from "@prisma/client"

export type ProviderResponse = {
    kode_provider:string
    nama_provider:string
    is_gangguan:boolean,
    prefix:string | null,
    minimal:number | null,
    maxsimal:number | null
    
}

export type ProviderCreateRequest ={
    kode_provider:string
    nama_provider:string
    is_gangguan:boolean,
    prefix:string | null,
    minimal:number | null,
    maxsimal:number | null
}

export type ProviderUpdateRequest ={
    kode_provider:string
    nama_provider:string
    is_gangguan:boolean,
    prefix:string | null,
    minimal:number | null,
    maxsimal:number | null
}

export type ProviderViewRequest ={
    kode_provider:string
    nama_provider:string
    page:number
    size:number
}

export function toProviderResponse(provider:Provider):ProviderResponse{
    return{
        kode_provider:provider.kode_provider,
        nama_provider:provider.nama_provider,
        is_gangguan:provider.is_gangguan,
        prefix:provider.prefix,
        minimal:provider.minimal,
        maxsimal:provider.maxsimal
    }
}