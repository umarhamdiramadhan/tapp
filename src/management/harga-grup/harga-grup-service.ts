import { prismaClient } from "../../application/database";
import { ResponseErrorApi } from "../../error/response-error-api";
import { Validation } from "../../validation/validation";
import { GrupService } from "../grup/grup-service";
import { Pageable } from "../page/page";
import { ProductService } from "../product/product-service";
import { HargaGrupCreateManyRequest, HargaGrupCreateRequest, HargaGrupResponse, HargaGrupUpdateManyRequest, HargaGrupUpdateRequest, HargaGrupViewRequest, toHargaGrupResponse } from "./harga-grup-model";
import { HargaGrupValidation } from "./harga-grup-validation";

export class HargaGrupService {

    static async create(request:HargaGrupCreateRequest):Promise<HargaGrupResponse>{
        const createRequest = Validation.validate(HargaGrupValidation.CREATE,request)
        await GrupService.checkKodeGrup(createRequest.kode_grups)
        await ProductService.checkProductExist(createRequest.kode_produks)
        await this.checkHargaGrupSame(createRequest.kode_grups,createRequest.kode_produks)

        const response = await prismaClient.hargaGrup.create({
            data:createRequest
        })

        return toHargaGrupResponse(response)
        
    }

    static async createMany(request:HargaGrupCreateManyRequest):Promise<String>{
        const createRequest = Validation.validate(HargaGrupValidation.CREATEMANY,request)
        await GrupService.checkKodeGrupSame(createRequest.kode_grup)
        await GrupService.checkKodeGrup(createRequest.kode_grups)
     
        interface DataHargaGrup {
            kode_grups:string
            kode_produks: string;
            harga: number;
            is_gangguan:boolean
          }
          

        const hargaGrups = await prismaClient.hargaGrup.findMany({
            where:{
                kode_grups:createRequest.kode_grups
            },
            orderBy: {
                kode_produks: 'asc',
            },
        })

        const results: any = []; // Array untuk menyimpan hasil
        const kode_grup = createRequest.kode_grup
        
        for(let i= 0; i < hargaGrups.length;i++){
            const dataHargaGrup: DataHargaGrup = {
                kode_grups: kode_grup,
                kode_produks: hargaGrups[i].kode_produks,
                harga:hargaGrups[i].harga,
                is_gangguan:hargaGrups[i].is_gangguan
            
            };
            results.push(dataHargaGrup);
        }
        console.log(results)
        await prismaClient.$transaction(async (tx) => {

            await tx.grup.create({
                data:{
                    kode_grup:createRequest.kode_grup,
                    nama_grup:createRequest.nama_grup
                }
            })

            await tx.hargaGrup.createMany({
            data:results
        })
     })
        const response = `Berhasil duplikate harga grup`
        return (response)
        
    }


    static async update(request:HargaGrupUpdateRequest):Promise<HargaGrupResponse>{
        const updateRequest = Validation.validate(HargaGrupValidation.UPDATE,request)
        await GrupService.checkKodeGrup(updateRequest.kode_grups)
        await this.checkHargaGrupExistById(updateRequest.id)
        
        const response = await prismaClient.hargaGrup.update({
            where:{
                id:updateRequest.id
            },
            data:updateRequest
        })
        

        return toHargaGrupResponse(response)
    }

    static async updateMany(request:HargaGrupUpdateManyRequest):Promise<string>{
        const updateRequest = Validation.validate(HargaGrupValidation.UPDATEMANY,request)
        await this.checkHargaGrupExistByKodeProduks(updateRequest.kode_produks)
        
        await prismaClient.$transaction(async (tx) => {
            await tx.hargaGrup.updateMany({
            where:{
                kode_produks:updateRequest.kode_produks
            },
            data:updateRequest
        })
     })
    const response = `berhasil update harga all grup dengan kode produk ${updateRequest.kode_produks}` 

        return response 
    }

    static async delete(id:number){
        await this.checkHargaGrupExistById(id)
        
        await prismaClient.hargaGrup.delete({
            where:{
                id:id
            }
        })

       
    }

    static async view(request:HargaGrupViewRequest):Promise<Pageable<HargaGrupResponse>>{
        const searchRequest = Validation.validate(HargaGrupValidation.VIEW,request)
        const skip = (searchRequest.page - 1) * searchRequest.size

        const filters = []

        if(searchRequest.kode_produks){
            filters.push({
                kode_produks:{
                    contains: searchRequest.kode_produks 
                }
            })
        }

        const hargaGrups = await prismaClient.hargaGrup.findMany({
            where:{
                kode_grups:searchRequest.kode_grups,
                AND:filters
            },
            take:searchRequest.size,
            orderBy: {
                kode_produks: 'asc',
            },
            skip:skip
        })

        const total = await prismaClient.hargaGrup.count({
            where:{
                AND:filters
            }
        })

        return{
            data:hargaGrups.map(hargaGrups => toHargaGrupResponse(hargaGrups)),
            paging:{
                current_page: searchRequest.page,
                total_page:Math.ceil(total / searchRequest.size),
                size : searchRequest.size
            }
        }

    }



    static async checkHargaGrupSame(kodeGrups:string,kodeProduks:string){
        const check = await prismaClient.hargaGrup.count({
            where:{
                kode_grups:kodeGrups,
                kode_produks:kodeProduks
            }
        })

        if(check != 0){
            throw new ResponseErrorApi(400,"kode produk sudah di gunakan")
        }
    }

    static async checkHargaGrupExistByKodeProduks(kodeProduks:string){
        const check = await prismaClient.hargaGrup.findFirst({
            where:{
                kode_produks:kodeProduks,
            }
        })

        if(!check){
            throw new ResponseErrorApi(404,"kode produk tidak di temukan")
        }
    }

    static async checkHargaGrupExistById(id:number){
        const check = await prismaClient.hargaGrup.findUnique({
            where:{
                id:id,
            }
        })

        if(!check){
            throw new ResponseErrorApi(404,"kode produk tidak di temukan")
        }
    }

    static async checkHargaGrupExist(kodeGrups:string,kodeProduks:string){
        const check = await prismaClient.hargaGrup.findFirst({
            where:{
                kode_grups:kodeGrups,
                kode_produks:kodeProduks
            }
        })

        if(!check){
            throw new ResponseErrorApi(400,"kode produk tidak di temukan")
        }
    }

   
}