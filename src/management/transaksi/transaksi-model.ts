import { Transaction } from "@prisma/client"
import { formatDateTimeIndonesia } from "../../utils/date-indonesia"

export type TransaksiResponse={
  trxid : number
  reffid : string
  tanggal_entry:string
  qty:number|null
  counter:number|null
  nomer_tujuan:string
  tanggal_update:string
  id_moduls:number|null
  kode_resellers:string
  kode_produks:string
  harga:number
  harga_beli:number|null
  perintah:string|null
  id_inboxs: number|null
  sn:string|null
  status:string
  saldo_awal:number  
  saldo_akhir:number
  jawaban_provider:string|null
  nama_reseller:string
  nama_modul:string|null
}

export type ViewTransaksi = {
    tanggal_entry_start:string
    tanggal_entry_end:string
    nama_resellers:string
    kode_resellers:string
    nomer_tujuan:string
    id_moduls:number
    kode_produks:string
    page:number
    size:number
}

export type TransaksiUpdateSukses={
    trxid:number
    sn:string|null
}

export type TransaksiUpdateGagal={
    trxid:number,
    status:string
}

export function toResponseTransaksi(transaksi:Transaction,jawaban_provider:string|null,nama_reseller:string,nama_modul:string|null):TransaksiResponse{
    return{
        trxid : transaksi.trxid,
        reffid : transaksi.reffid,
        tanggal_entry:formatDateTimeIndonesia(transaksi.tanggal_entry),
        qty:transaksi.qty,
        counter:transaksi.counter,
        nomer_tujuan:transaksi.nomer_tujuan,
        tanggal_update:formatDateTimeIndonesia(transaksi.tanggal_update),
        id_moduls:transaksi.id_moduls,
        kode_resellers:transaksi.kode_resellers,
        kode_produks:transaksi.kode_produks,
        harga:transaksi.harga,
        harga_beli:transaksi.harga_beli,
        perintah:transaksi.perintah,
        id_inboxs: transaksi.id_inboxs,
        sn:transaksi.sn,
        status:transaksi.status,
        saldo_awal:transaksi.saldo_awal, 
        saldo_akhir:transaksi.saldo_akhir,
        jawaban_provider:jawaban_provider,
        nama_reseller:nama_reseller,
        nama_modul:nama_modul
    }
}


