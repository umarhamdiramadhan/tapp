import { prismaClient } from "../../application/database";
import { ResponseErrorApi } from "../../error/response-error-api";
import { Validation } from "../../validation/validation";
import { ApiReportClient } from "../api-client/api-report-client";
import { GrupService } from "../grup/grup-service";
import { Pageable } from "../page/page";
import { ResellerCreateRequest, ResellerKurangSaldo, ResellerResponse, ResellerTambahSaldo, ResellerUpdateRequest, ResellerViewRequest, toResellerResponse } from "./reseller-model";
import { ResellerValidation } from "./reseller-validation";
import bcrypt from "bcrypt";
import { Response } from "express";

export class ResellerService{

    static async create(request:ResellerCreateRequest):Promise<ResellerResponse>{

        const createRequest = Validation.validate(ResellerValidation.CREATE,request)

        
        await this.checkKodeResellerCreate(createRequest.kode_reseller)
        await GrupService.checkKodeGrup(createRequest.kode_grups)

        if(createRequest.pin != undefined){
            createRequest.pin = await bcrypt.hash(createRequest.pin,12)
        }

        if(createRequest.password_ip === ""){
            createRequest.password_ip = null
        }
        

        if(createRequest.password_ip != undefined){
            createRequest.password_ip = await bcrypt.hash(createRequest.password_ip,12)
        }

     

        const response = await prismaClient.reseller.create({
            data:createRequest
        })

        return toResellerResponse(response)

    }

    static async update(kodeReseller:string,request:ResellerUpdateRequest):Promise<ResellerResponse>{
        const updateRequest = Validation.validate(ResellerValidation.UPDATE,request)

        await GrupService.checkKodeGrup(updateRequest.kode_grups)
        await this.checkKodeReseller(kodeReseller)

        if(updateRequest.pin != undefined){
            updateRequest.pin = await bcrypt.hash(updateRequest.pin,12)
        }


        if(updateRequest.password_ip === ""){
            updateRequest.password_ip = null
        }

        if(updateRequest.password_ip != undefined){
            updateRequest.password_ip = await bcrypt.hash(updateRequest.password_ip,12)
        }

        const response = await prismaClient.reseller.update({
            where:{
                kode_reseller:kodeReseller
            },
            data:updateRequest
        })
        return toResellerResponse(response)
    }

    static async delete(kodeReseller:string){
        await this.checkKodeReseller(kodeReseller)

        await prismaClient.reseller.delete({
            where:{
                kode_reseller:kodeReseller
            }
        })
    }

    static async view(request:ResellerViewRequest):Promise<Pageable<ResellerResponse>>{
        const searchRequest = Validation.validate(ResellerValidation.VIEW,request)

        const skip = (searchRequest.page - 1) * searchRequest.size

        const filters = []

        if(searchRequest.kode_reseller){
            filters.push({
                kode_reseller:{
                    contains: searchRequest.kode_reseller 
                }
            })
        }
        if(searchRequest.nama_reseller){
            filters.push({
                nama_reseller:{
                    contains: searchRequest.nama_reseller
                }
            })
        }
        if(searchRequest.nomer_telefon){
            filters.push({
                nomer_telefon:{
                    contains: searchRequest.nomer_telefon 
                }
            })
        }

        const resellers = await prismaClient.reseller.findMany({
            where:{
                kode_grups:request.kode_grups,
                AND:filters
            },
            take:searchRequest.size,
            orderBy: {
                kode_reseller: 'asc',
            },
            skip:skip
        })

        const total = await prismaClient.reseller.count({
            where:{
                AND:filters
            }
        })
        return{
            data:resellers.map(resellers => toResellerResponse(resellers)),
            paging:{
                current_page: searchRequest.page,
                total_page:Math.ceil(total / searchRequest.size),
                size : searchRequest.size
            }
        }
    }

    static async tambahSaldo(request:ResellerTambahSaldo,res:Response){

        const tambahSaldoRequest = Validation.validate(ResellerValidation.TAMBAHSALDO,request)
        
        await this.checkKodeReseller(tambahSaldoRequest.kode_reseller)

        const tambahSaldoResult =  await prismaClient.$transaction(async (tx) => {

                const findSaldo = await tx.reseller.findFirst({
                    where:{
                        kode_reseller:tambahSaldoRequest.kode_reseller,
                    }
                })
                 const tambah = Math.ceil(findSaldo!.saldo + tambahSaldoRequest.jumlah)
                
                const reseller = await tx.reseller.update({
                    where:{
                        kode_reseller:tambahSaldoRequest.kode_reseller
                    },
                    data:{
                        saldo:tambah
                    }
                })
    
                await tx.mutasi.create({
                    data:{
                        jumlah:tambahSaldoRequest.jumlah,
                        keterangan:tambahSaldoRequest.keterangan,
                        kode_resellers:tambahSaldoRequest.kode_reseller
                    }
                })
                return reseller ;
            })

            const response =`berhasil tambah saldo kode reseller: ${request.kode_reseller} dengan jumlah ${request.jumlah} sisa saldo ${tambahSaldoResult.saldo}`

            res.status(200).json({
            data: `${response}`
            });

                    
            await ApiReportClient.sendApiClient(tambahSaldoRequest?.ip_callback,response)

    }

    static async kurangSaldo(request:ResellerKurangSaldo,res:Response){

        const kurangSaldo = Validation.validate(ResellerValidation.KURANGSALDO,request)
        
        await this.checkKodeReseller(kurangSaldo.kode_reseller)


        const kurangSaldoResult =  await prismaClient.$transaction(async (tx) => {

            const findSaldo = await tx.reseller.findFirst({
                where:{
                    kode_reseller:kurangSaldo.kode_reseller
                }
            })
            const kurang = Math.ceil(findSaldo!.saldo - kurangSaldo.jumlah)

           const reseller =  await tx.reseller.update({
                where:{
                    kode_reseller:kurangSaldo.kode_reseller
                },
                data:{
                    saldo:kurang
                }
            })

            await tx.mutasi.create({
                data:{
                    jumlah:kurangSaldo.jumlah,
                    keterangan:kurangSaldo.keterangan,
                    kode_resellers:kurangSaldo.kode_reseller
                }
            })
            return reseller
         })
        const response =`berhasil kurang saldo kode reseller: ${request.kode_reseller} dengan jumlah ${request.jumlah} sisa saldo ${kurangSaldoResult.saldo}`

            res.status(200).json({
            data: `${response}`
            });

                    
        await ApiReportClient.sendApiClient(kurangSaldoResult?.ip_callback,response)

    }




    static async checkKodeResellerCreate(kodeReseller:string){
        const check = await prismaClient.reseller.count({
            where:{
                kode_reseller:kodeReseller
            }
        })

        if(check != 0){
            throw new ResponseErrorApi(400,"id sudah di gunakan")
        }
    }

    static async checkKodeReseller(kodeReseller:string){
        const check = await prismaClient.reseller.findFirst({
            where:{
                kode_reseller:kodeReseller
            }
        })

        if(!check){
            throw new ResponseErrorApi(404,"id not found")
        }
    }

}