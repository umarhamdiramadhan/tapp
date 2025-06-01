import { formatRupiah } from "../../utils/format-rupiah"

export type RequestTiketH2h={
    memberid:string,
    pin:string,
    password:string,
    ip:string,
    amount:number
    cmd:string
}

export function toResponseTiketH2h(jumlah_tiket:number):string{
    const convertRupiahJumlahTiket = formatRupiah(jumlah_tiket)
    return`
        silahkan transfer ${convertRupiahJumlahTiket}
        BCA:21222    (MANUAL)
        BNI:2111     (MANUAL)
        BRI:2111     (MANUAL)
        MANDIRI:1112 (MANUAL)
        sebelum jam 22:00    
    `
    
}