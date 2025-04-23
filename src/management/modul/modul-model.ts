import { Modul } from "@prisma/client"

export type ModulResponse ={
    id:number
    nama_moduls:string
    username:string|null
    memberid:string|null
    pin:string|null
    password:string|null
    cek_saldo:string|null
    tiket:string|null
    ip:string
    perintah:string
    antrian_produk:number
    total_antrian:number
    jawabans:string
}

export type ModulCreateRequest ={
    nama_moduls:string
    username:string|null
    memberid:string|null
    pin:string|null
    password:string|null
    cek_saldo:string|null
    tiket:string|null
    ip:string
    perintah:string
    antrian_produk:string
    total_antrian:string
    jawabans:string
}

export type ModulUpdateRequest ={
    id:number
    nama_moduls:string
    username:string|null
    memberid:string|null
    pin:string|null
    password:string|null
    cek_saldo:string|null
    tiket:string|null
    ip:string
    perintah:string
    antrian_produk:string
    total_antrian:string
    jawabans:string
}

export type ModulViewRequest ={
    nama_moduls:string
    page:number
    size:number
}

export function toModulResponse(modul:Modul):ModulResponse{
    return{
        id:modul.id,
        nama_moduls:modul.nama_moduls,
        username:modul.username,
        memberid:modul.memberid,
        pin:modul.pin,
        password:modul.password,
        cek_saldo:modul.cek_saldo,
        tiket:modul.tiket,
        ip:modul.ip,
        perintah:modul.perintah,
        antrian_produk:modul.antrian_produk,
        total_antrian:modul.total_antrian,
        jawabans:modul.jawabans
    }
}