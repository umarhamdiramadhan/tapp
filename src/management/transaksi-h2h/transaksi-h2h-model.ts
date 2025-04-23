import { Transaction } from "@prisma/client"
import { formatRupiah } from "../../utils/format-rupiah"

export type RequestTransksaksiH2h ={
    product:string
    qty?:number
    dest:string
    refID:string
    memberID:string
    pin:string
    password:string
}

export type ResponseH2h ={
    nomer_tujuan:string
    kode_produks:string
    reffid:string
    saldo_awal:number
    harga:number
    saldo_akhir:number
    trxid:string
}


export function ResponseTransaksiBlacklist(refID: string, product: string, dest: string):string{
    return `Transaksi dinomer ${dest} status gagal, Gagal silahkan di alihkan transaksi ${product} reffid ${refID} #Transaksi Normal`
}

export function ResponseTransaksiGagal(transaction:ResponseH2h):string{
    return `Transaksi dinomer ${transaction.nomer_tujuan} status gagal, Gagal kode produk ${transaction.kode_produks} reffid ${transaction.reffid} saldo ${formatRupiah(transaction.saldo_awal)} - ${formatRupiah(transaction.harga)} = ${formatRupiah(transaction.saldo_akhir)} TrxId ${transaction.trxid} #Transaksi Normal`
}

export function ResponseTransaksiTujuanSalah(transaction:Transaction):string{
    return `Transaksi dinomer ${transaction.nomer_tujuan} status gagal, Tujuan_Salah kode produk ${transaction.kode_produks} reffid ${transaction.reffid} saldo ${formatRupiah(transaction. saldo_awal)} - ${formatRupiah(transaction.harga)} = ${formatRupiah(transaction.saldo_akhir)} TrxId ${transaction.trxid} #Transaksi Normal`
}

export function ResponseTransaksiDibatalkan(transaction:Transaction):string{
    return `Transaksi dinomer ${transaction.nomer_tujuan} status gagal, Dibatalkan kode produk ${transaction.kode_produks} reffid ${transaction.reffid} saldo ${formatRupiah(transaction.saldo_awal)} - ${formatRupiah(transaction.harga)} = ${formatRupiah(transaction.saldo_akhir)} TrxId ${transaction.trxid} #Transaksi Normal`
}

export function ResponseTransaksiGangguan(transaction:Transaction):string{
    return `Transaksi dinomer ${transaction.nomer_tujuan} status gagal, Gangguan kode produk ${transaction.kode_produks} reffid ${transaction.reffid} saldo ${formatRupiah(transaction.saldo_awal)} - ${formatRupiah(transaction.harga)} = ${formatRupiah(transaction.saldo_akhir)} TrxId ${transaction.trxid} #Transaksi Normal`
}

export function ResponseTransaksiMenunggu(transaction:Transaction):string{
    return `Transaksi dinomer ${transaction.nomer_tujuan} status diproses, Menunggu kode produk ${transaction.kode_produks} reffid ${transaction.reffid} saldo ${formatRupiah(transaction.saldo_awal)} - ${formatRupiah(transaction.harga)} = ${formatRupiah(transaction.saldo_akhir)} TrxId ${transaction.trxid} #Transaksi Normal`
}

export function ResponseTransaksiSukses(transaction:Transaction):string{
    return `Transaksi dinomer ${transaction.nomer_tujuan} status sukses, Sukses kode produk ${transaction.kode_produks} reffid ${transaction.reffid} saldo ${formatRupiah(transaction.saldo_awal)} - ${formatRupiah(transaction.harga)} = ${formatRupiah(transaction.saldo_akhir)} TrxId ${transaction.trxid} #Transaksi Normal`
}

export function ResponseTransaksiSudahPernah(transaction:Transaction):string{
    return `Transaksi dinomer ${transaction.nomer_tujuan} status sudah pernah, ${transaction.status} kode produk ${transaction.kode_produks} reffid ${transaction.reffid} saldo ${formatRupiah(transaction.saldo_awal)} - ${formatRupiah(transaction.harga)} = ${formatRupiah(transaction.saldo_akhir)} TrxId ${transaction.trxid} #Transaksi Normal`
}

export function ResponseTransaksiSaldoTidakCukup(refID: string, product: string, dest: string):string{
    return `Transaksi dinomer ${dest} status gagal, saldo tidak cukup ${product} reffid ${refID} #Transaksi Normal`
}

export function ResponseTransaksiProdukTidakDiTemukan(refID: string, product: string, dest: string):string{
    return `Transaksi dinomer ${dest} status gagal, kode produk tidak di temukan ${product} reffid ${refID} #Transaksi Normal`
}

export function ResponseTransaksiProdukTidakAktif(refID: string, product: string, dest: string):string{
    return `Transaksi dinomer ${dest} status gagal, kode produk tidak aktif ${product} reffid ${refID} #Transaksi Normal`
}

export function ResponseTransaksiGangguanFirst(refID: string, product: string, dest: string):string{
    return `Transaksi dinomer ${dest} status gagal, Gangguan kode produk ${product} reffid ${refID} #Transaksi Normal`
}
export function ResponseTransaksiMulti(refID: string, product: string, dest: string):string{
    return `Transaksi dinomer ${dest} status gagal, tidak support transaksi multi ${product} reffid ${refID} #Transaksi Normal`
}