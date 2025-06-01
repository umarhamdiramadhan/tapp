import { prismaClient } from "../../application/database";
import { ResponseErrorApi } from "../../error/response-error-api";
import { endOfDayUTCNow, startOfDayUTCNow } from "../../utils/date-now-indonesia";
import { getJakartaDate } from "../../utils/get-date-indonesia";
import { Validation } from "../../validation/validation";
import { ApiReportClient } from "../api-client/api-report-client";
import { Pageable } from "../page/page";
import { ResponseTransaksiGagal, ResponseTransaksiGagalManual, ResponseTransaksiSukses } from "../transaksi-h2h/transaksi-h2h-model";
import { toResponseTransaksi, TransaksiResponse, TransaksiUpdateGagal, TransaksiUpdateSukses, ViewTransaksi } from "./transaksi-model";
import { TransaksiValidation } from "./transaksi-validation";
import {  Response } from "express";

export class TransaksiService{
    static async view(request:ViewTransaksi):Promise<Pageable<TransaksiResponse>>{

        const searchRequest = Validation.validate(TransaksiValidation.TransaksiView,request)

        const skip = (searchRequest.page -1) * searchRequest.size

        const startDate = getJakartaDate(searchRequest.date_start)
        
        
        const startOfDayUTC = searchRequest.tanggal_entry_start ? 
        new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), 0, 0, 0):
        startOfDayUTCNow
        
        
        const endDate = getJakartaDate(searchRequest.date_end)
                
        const endOfDayUTC = searchRequest.tanggal_entry_end ?
        new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), 23, 59, 59):
        endOfDayUTCNow

        const filters = []

        if(searchRequest.kode_produks){
            filters.push({
                kode_resellers:{
                    contains: searchRequest.kode_produks 
                }
            })
        }


        const filterNames = []

        if(searchRequest.nama_resellers){
            filterNames.push({
                nama_reseller:{
                    contains: searchRequest.nama_resellers
                }
            })
        }

         const transaction = await prismaClient.transaction.findMany({
                where:{
                    resellers:{
                    AND:filterNames
                },
                
                tanggal_entry: {
                    gte: startOfDayUTC,
                    lte: endOfDayUTC
                },

                kode_resellers:searchRequest.kode_resellers,
                    id_moduls:searchRequest.id_moduls,
                    nomer_tujuan:searchRequest.nomer_tujuan,
                    AND:filters
                },
                            
                take:searchRequest.size,
                            
                orderBy: {            
                    tanggal_entry: 'asc',
                },
                 
                skip:skip,
                            
               include:{
                        inboxs:{
                            select:{
                                pesan:true
                            }
                        },
                        moduls:{
                            select:{
                                nama_moduls:true
                            }
                        },
                        resellers:{
                            select:{
                                nama_reseller:true
                            }
                        }

                },  
                            
                             
        })
           const total = await prismaClient.transaction.count({
                        where:{
                            resellers:{
                                AND:filterNames
                            },
                            AND:filters
                    }
            })

            return{
                data:transaction.map(transactions => toResponseTransaksi(transactions,transactions.inboxs!.pesan,transactions.resellers.nama_reseller,transactions.moduls!.nama_moduls)),
                    paging:{
                        current_page: searchRequest.page,
                        total_page:Math.ceil(total / searchRequest.size),
                        size : searchRequest.size
                }
            }
                    
    }

    static async suksesTransactions(request:TransaksiUpdateSukses,res:Response){
        const suksesRequest = Validation.validate(TransaksiValidation.TransaksiUpdateSukses,request)

        const transaction = await prismaClient.transaction.findFirst({
            where:{
                trxid:suksesRequest.trxid
            },
             include:{
                        resellers:{
                            select:{
                                ip_callback:true
                            }
                    }
            }  
        })

         if(!transaction){
             throw new ResponseErrorApi(404,"transaksi tidak di temukan")
        }


        if(transaction?.status==="Sukses"||transaction?.status==="DiProses"||transaction?.status==="Menunggu"){
           await prismaClient.transaction.update({
                where:{
                    trxid:suksesRequest.trxid
                },
                data:{
                    status:"Sukses",
                    sn:suksesRequest.sn
                }
            })
        }else{
            await prismaClient.$transaction(async (tx) => {

                const transactionFind = await tx.transaction.findFirst({
                    where:{
                        trxid:suksesRequest.trxid
                    }
                })
                const reseller = await tx.reseller.findFirst({
                    where:{
                        kode_reseller:transactionFind?.kode_resellers
                    }
                })

                const penambahanSaldo  = Math.ceil(transaction!.harga + reseller!.saldo)

                await tx.transaction.update({
                where:{
                    trxid:suksesRequest.trxid
                },
                data:{
                    status:"Sukses",
                    sn:suksesRequest.sn
                }
             }) 

              await tx.reseller.update({
                    where:{
                         kode_reseller:transactionFind?.kode_resellers
                    },
                    data:{
                        saldo:penambahanSaldo
                    }
                })
            })         
        }

        res.status(200).json({
            data: "Berhasil Update Transaksi Sukses"
        });

        const response = ResponseTransaksiSukses(transaction)
        
        await ApiReportClient.sendApiClient(transaction?.resellers.ip_callback,response)
    
        
    }

    static async gagalTransactions(request:TransaksiUpdateGagal,res:Response){
        const gagalRequest = Validation.validate(TransaksiValidation.TransaksiUpdateGagal,request)

        
        const transaction = await prismaClient.transaction.findFirst({
            where:{
                trxid:gagalRequest.trxid
            },
              include:{
                        resellers:{
                            select:{
                                ip_callback:true
                            }
                    }
            }
        })

        if(!transaction){
             throw new ResponseErrorApi(404,"transaksi tidak di temukan")
        }

         if(transaction?.status==="Dibatalkan"||transaction?.status==="Gagal"||transaction?.status==="Gangguan"||transaction?.status==="Tujuan_Salah"){
           await prismaClient.transaction.update({
                where:{
                    trxid:gagalRequest.trxid
                },
                data:{
                    status:transaction.status,
                }
            })
        }else{
             await prismaClient.$transaction(async (tx) => {

                const transactionFind = await tx.transaction.findFirst({
                    where:{
                        trxid:gagalRequest.trxid
                    }
                })
                const reseller = await tx.reseller.findFirst({
                    where:{
                        kode_reseller:transactionFind?.kode_resellers
                    }
                })

                const penguranganSaldo  = Math.ceil(transaction!.harga - reseller!.saldo)

                await tx.transaction.update({
                where:{
                    trxid:gagalRequest.trxid
                },
                data:{
                    status:gagalRequest.status,
                    sn:gagalRequest.sn
                }
             }) 

               await tx.reseller.update({
                    where:{
                         kode_reseller:transactionFind?.kode_resellers
                    },
                    data:{
                        saldo:penguranganSaldo
                    }
                })
            })   
        }
         res.status(200).json({
            data: "Berhasil Update Transaksi Gagal"
        });


        const response = ResponseTransaksiGagalManual(transaction)
        
        await ApiReportClient.sendApiClient(transaction?.resellers.ip_callback,response)
     
    }
}