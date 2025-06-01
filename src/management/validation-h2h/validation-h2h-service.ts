import { prismaClient } from "../../application/database"
import { ResponseErrorApiH2h } from "../../error/response-error-api-h2h"
import bcrypt, { compare } from "bcrypt";
import { ResponseTransaksiBlacklist, ResponseTransaksiGangguanFirst, ResponseTransaksiMenunggu, ResponseTransaksiMulti, ResponseTransaksiProdukTidakAktif, ResponseTransaksiProdukTidakDiTemukan, ResponseTransaksiSaldoTidakCukup, ResponseTransaksiSudahPernah } from "../transaksi-h2h/transaksi-h2h-model";
import { endOfDayUTCNow, startOfDayUTCNow } from "../../utils/date-now-indonesia";

export class ValidationH2hService{

    static async validationH2h(memberid:string,password:string,pin:string,ip:string){
        const checkId = await prismaClient.reseller.findFirst({
            where:{
                kode_reseller:memberid
            }
        })

        if(!checkId){
            throw new ResponseErrorApiH2h("member Id Tidak di temukan")
        }

        if(ip != checkId.ip ){
             throw new ResponseErrorApiH2h("ip yang anda masukan salah")
        }

        const isPasswordInvalid = await bcrypt.compare(password,checkId.password_ip!)

        if(!isPasswordInvalid){
            throw new ResponseErrorApiH2h("pin atau password salah")
        }
        
        const isPinInvalid = await bcrypt.compare(pin,checkId.pin) 

        if(!isPinInvalid){
            throw new ResponseErrorApiH2h("pin atau password salah")
        }

    }

    static async checkTransaction(memberid:string,reffid:string,kode_produks:string,nomer_tujuan:string){
        const check = await prismaClient.transaction.findFirst({
            where:{
                reffid:reffid,
                kode_produks:kode_produks,
                nomer_tujuan:nomer_tujuan,
                kode_resellers:memberid
            }
        })   
        if(check){
            const response = ResponseTransaksiSudahPernah(check)
            throw new ResponseErrorApiH2h(response)
        }
    }

    static async checkProduct(refID:string,memberid:string,product:string,dest:string){
        const reseller  = await prismaClient.reseller.findFirst({
            where:{
                kode_reseller:memberid
            }
        })
        const produk = await prismaClient.hargaGrup.findFirst({
            where:{
                kode_grups : reseller!.kode_grups,
                kode_produks:product
            }
        })

        if(!produk){
            const response = ResponseTransaksiProdukTidakDiTemukan(refID,product,dest)
            throw new ResponseErrorApiH2h(response)
        }


    }

    static async isCheckSaldo(refID:string,memberid:string,product:string,dest:string){
        const reseller  = await prismaClient.reseller.findFirst({
            where:{
                kode_reseller:memberid
            }
        })
        const produk = await prismaClient.hargaGrup.findFirst({
            where:{
                kode_produks:product
            }
        })

        if (reseller!.saldo < produk!.harga) {
            const response = ResponseTransaksiSaldoTidakCukup(refID,product,dest)
            throw new ResponseErrorApiH2h(response)
        }
    }

    static async checkDaftarHitam(refID: string, product: string, dest: string){
        const check = await prismaClient.daftarHitam.findFirst({
            where:{
                nomer_tujuan:dest
            }
        })
    
        if(check){
            const response = ResponseTransaksiBlacklist(refID,product,dest)
            throw new ResponseErrorApiH2h(response)
        }
    }

    static async chekKodeProdukIsActive(refID:string,memberid:string,product:string,dest:string){
        console.log(product)
        const produk = await prismaClient.product.findFirst({
            where:{
                kode_produk:product,
                is_aktif:false
            }
        })
        if(produk){
            const response = ResponseTransaksiProdukTidakAktif(refID,product,dest)
            throw new ResponseErrorApiH2h(response)
        }
    }

    static async chekKodeProdukIsGangguan(refID:string,memberid:string,product:string,dest:string){
        const produk = await prismaClient.product.findFirst({
            where:{
                kode_produk:product
            }
        })
       
        const hargaGrup = await prismaClient.hargaGrup.findFirst({
            where:{
                kode_produks:product
            }
        })

        const provider = await prismaClient.provider.findFirst({
            where:{
                kode_provider:produk!.kode_providers
            }
        })

        if(produk!.is_gangguan === true || hargaGrup!.is_gangguan === true || provider!.is_gangguan === true){
            const response = ResponseTransaksiGangguanFirst(refID,product,dest)
            throw new ResponseErrorApiH2h(response)
        }
    }
    static async checkModul(kode_produk:string,trxid:number,nomer_tujuan:string):Promise<boolean>{

        const checkModul = await prismaClient.parsing.findFirst({
            where:{
                kode_produks:kode_produk,
            },
            orderBy:{
                prioritas:"asc"
            }
        })

        const transaction = await prismaClient.transaction.count({
            where:{
                status:"Menunggu",
                id_moduls:checkModul?.id_moduls,
            }
        })
        
        
    }

    static async checkProdukIsMulti(refID:string,memberid:string,product:string,dest:string){
        console.log("apakah masuk ke multi")
        const produk = await prismaClient.product.findFirst({
            where:{
                kode_produk:product,
                is_multi:true
               
            }
        })
        if(produk){
          const startOfDayUTC = startOfDayUTCNow
          const endOfDayUTC   = endOfDayUTCNow
          const checkTransaksi = await prismaClient.transaction.findFirst({
            where:{
                nomer_tujuan:dest,
                tanggal_entry: {
                    gte: startOfDayUTC,
                    lte: endOfDayUTC
                },
            },
          })
          if(checkTransaksi){
            const response = ResponseTransaksiMulti(refID,product,dest)
            throw new ResponseErrorApiH2h(response)
          }
        }
    }
}