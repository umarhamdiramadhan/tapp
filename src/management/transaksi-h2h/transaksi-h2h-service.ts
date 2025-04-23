import { Transaction } from "@prisma/client";
import { prismaClient } from "../../application/database";
import { Validation } from "../../validation/validation";
import { ValidationH2hService } from "../validation-h2h/validation-h2h-service";
import { SendTransaksiH2hService } from "./send-transaksi-h2h-service";
import { RequestTransksaksiH2h, ResponseTransaksiMenunggu } from "./transaksi-h2h-model";
import { TransaksiH2hValidation } from "./transaksi-h2h-validation";


export class TransaksiHh2Service {
    static async transaksi(request:RequestTransksaksiH2h){
        const checkRequest = Validation.validate(TransaksiH2hValidation.TRANSAKSI,request)

        await ValidationH2hService.validationH2h(checkRequest.memberID,checkRequest.password,checkRequest.pin,checkRequest.ip)

        //chek transaksi
        await ValidationH2hService.checkTransaction(checkRequest.refID,checkRequest.product,checkRequest.dest)
        //check apakah produk  ada
        await ValidationH2hService.checkProduct(checkRequest.refID,checkRequest.memberID,checkRequest.product,checkRequest.dest)
        //check apakah saldo cukup
        await ValidationH2hService.isCheckSaldo(checkRequest.refID,checkRequest.memberID,checkRequest.product,checkRequest.dest)
        //check apakah transaksi ada di nomer hitam
        await ValidationH2hService.checkDaftarHitam(checkRequest.refID,checkRequest.product,checkRequest.dest)
        //check apakah produk aktive
        await ValidationH2hService.chekKodeProdukIsActive(checkRequest.refID,checkRequest.memberID,checkRequest.product,checkRequest.dest)
        //check apakah produk gangguan
        await ValidationH2hService.chekKodeProdukIsGangguan(checkRequest.refID,checkRequest.memberID,checkRequest.product,checkRequest.dest)
        //chek apakah transaksi support multi
        await ValidationH2hService.checkProdukIsMulti(checkRequest.refID,checkRequest.memberID,checkRequest.product,checkRequest.dest)

       
        const prosessTransaksi =  await prismaClient.$transaction(async (tx) => {
            const produk = await tx.hargaGrup.findFirst({
                where:{
                    kode_produks:checkRequest.product
                }
            })
    
            const resellerSearch = await tx.reseller.findFirst({
                where:{
                    kode_reseller:checkRequest.memberID
                }
            })
    
            const penguranganSaldo  = Math.ceil(produk!.harga - resellerSearch!.saldo)
    
            const resellerUpdate = await tx.reseller.update({
                where:{
                    kode_reseller:checkRequest.memberID
                },
                data:{
                    saldo:penguranganSaldo
                }
            })

            const transaksi = await tx.transaction.create({
                data:{
                    reffid:checkRequest.refID,
                    nomer_tujuan:checkRequest.dest,
                    kode_produks:produk!.kode_produks,
                    harga:produk!.harga,
                    saldo_awal:resellerSearch!.saldo,
                    saldo_akhir:resellerUpdate.saldo,
                    status:"Menunggu",
                    qty:checkRequest.qty,
                    kode_resellers:checkRequest.memberID
                }
            })
            
            //check apakah ada modul
            await ValidationH2hService.checkModul(transaksi.kode_produks,transaksi.trxid,transaksi.nomer_tujuan)

            return transaksi
        })

        // await this.responseTransaksi(prosessTransaksi)

        await SendTransaksiH2hService.send(prosessTransaksi.id_moduls,prosessTransaksi.trxid,prosessTransaksi.nomer_tujuan,prosessTransaksi.kode_produks)
        
        
    }

    // static async responseTransaksi(transaction:Transaction):Promise<string>{
    //     return ResponseTransaksiMenunggu(transaction)
    // }
}