import { prismaClient } from "../../application/database";
import { ResponseErrorApi } from "../../error/response-error-api";
import { Validation } from "../../validation/validation";
import { Pageable } from "../page/page";
import { DaftarHitamCreateRequest, DaftarHitamResponse, DaftarHitamUpdateRequest, DaftarHitamViewRequest, toDaftarHitamResponse } from "./daftar-hitam-model";
import { DaftarHitamValidation } from "./daftar-hitam-validation";

export class DaftarHitamServie{

    static async create(request:DaftarHitamCreateRequest):Promise<DaftarHitamResponse>{
    
        const createRequest = Validation.validate(DaftarHitamValidation.CREATE,request)

        const daftarHitam = await prismaClient.daftarHitam.create({
            data:createRequest
        })

        return toDaftarHitamResponse(daftarHitam)

    }

    static async update(request:DaftarHitamUpdateRequest):Promise<DaftarHitamResponse>{

        const updateRequest = Validation.validate(DaftarHitamValidation.UPDATE,request)

        await this.checkIdDaftarHitam(updateRequest.id)

        const daftarHitam = await prismaClient.daftarHitam.update({
            where: {
                id: updateRequest.id,
            },
            data: updateRequest
        })

        return toDaftarHitamResponse(daftarHitam)
    }

    static async delete(request:number):Promise<DaftarHitamResponse>{
        
       
        await this.checkIdDaftarHitam(request)

        const daftarHitam = await prismaClient.daftarHitam.delete({
            where:{
                id:request
            }
        })

        return toDaftarHitamResponse(daftarHitam)

    }

    static async view(request:DaftarHitamViewRequest):Promise<Pageable<DaftarHitamResponse>>{

        const searchRequest = Validation.validate(DaftarHitamValidation.VIEW,request)
        const skip = (searchRequest.page - 1) * searchRequest.size

        const filters = []

        if(searchRequest.nomer_tujuan){
            filters.push({
                nomer_tujuan:{
                    contains: searchRequest.nomer_tujuan 
                }
            })
        }

        if(searchRequest.keterangan){
            filters.push({
                keterangan:{
                    contains: searchRequest.keterangan 
                }
            })
        }

        const daftarHitam = await prismaClient.daftarHitam.findMany({
            where:{
                AND:filters
            },
            take:searchRequest.size,
            skip:skip
        })

        const total = await prismaClient.daftarHitam.count({
            where:{
                AND:filters
            }
        })

        return{
            data:daftarHitam.map(daftarHitam => toDaftarHitamResponse(daftarHitam)),
            paging:{
                current_page: searchRequest.page,
                total_page:Math.ceil(total / searchRequest.size),
                size : searchRequest.size
            }
        }

    }

    static async checkIdDaftarHitam(id:number){

        const daftarHitamFind = await prismaClient.daftarHitam.findFirst({
            where:{
                id:id
            }
        }) 

        if(!daftarHitamFind){
            throw new ResponseErrorApi(404,"id not found")
        }
    }

    

}