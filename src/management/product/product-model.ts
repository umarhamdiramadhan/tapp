import { Product } from "@prisma/client"

export type ProductResponse = {
  kode_produk: string 
  nama_produk: string 
  is_gangguan: boolean
  is_aktif: boolean 
  is_multi: boolean
  kode_providers: string
}

export type ProductCreateRequest = {
    kode_produk: string 
    nama_produk: string 
    is_gangguan: boolean
    is_aktif: boolean 
    is_multi: boolean
    kode_providers: string
}

export type ProductUpdateRequest = {
    kode_produk: string 
    nama_produk: string 
    is_gangguan: boolean
    is_aktif: boolean 
    is_multi: boolean
    kode_providers: string
}

export type ProductViewRequest = {
    kode_produk: string 
     nama_produk: string 
     kode_providers: string
     page:number
     size:number
}

export function toProductResponse(product:Product):ProductResponse{
    return{
        kode_produk: product.kode_produk, 
        nama_produk: product.nama_produk ,
        kode_providers: product.kode_providers,
        is_gangguan: product.is_gangguan,
        is_aktif: product.is_aktif, 
        is_multi: product.is_multi
    }
}
