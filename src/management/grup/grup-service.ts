import { prismaClient } from "../../application/database";
import { ResponseErrorApi } from "../../error/response-error-api";
import { Validation } from "../../validation/validation";
import { Pageable } from "../page/page";
import { GrupCreateRequest, GrupResponse, GrupUpdateRequest, GrupViewRequest, toGrupResponse } from "./grup-model";
import { GrupValidation } from "./grup-validation";

export class GrupService {

    static async create(request:GrupCreateRequest):Promise<GrupResponse>{
        const createRequest = Validation.validate(GrupValidation.CREATE,request)

        await this.checkKodeGrupSame(createRequest.kode_grup)

        const response = await prismaClient.grup.create({
            data:createRequest
        })
        return toGrupResponse(response)
    }

    static async update(kodeGrup:string,request:GrupUpdateRequest):Promise<GrupResponse>{
        const updateRequest = Validation.validate(GrupValidation.UPDATE,request)

         await this.checkKodeGrup(kodeGrup)

    
        const response = await prismaClient.grup.update({
            where:{
                kode_grup:kodeGrup
            },
            data:updateRequest
        })
        return(response)
    }

    static async delete(kodeGrup:string){
        await this.checkKodeGrup(kodeGrup)

        await prismaClient.grup.delete({
            where:{
                kode_grup:kodeGrup
            }
        })
        
    }

    static async view(request:GrupViewRequest):Promise<Pageable<GrupResponse>>{
        
        const searchRequest = Validation.validate(GrupValidation.VIEW,request)
        const skip = (searchRequest.page - 1) * searchRequest.size

        const filters = []

        if(searchRequest.kode_grup){
            filters.push({
                kode_grup:{
                    contains: searchRequest.kode_grup 
                }
            })
        }

        if(searchRequest.nama_grup){
            filters.push({
                nama_grup:{
                    contains: searchRequest.nama_grup 
                }
            })
        }

        const grups = await prismaClient.grup.findMany({
            where:{
                AND:filters
            },
            take:searchRequest.size,
            orderBy: {
                kode_grup: 'asc',
            },
            skip:skip
        })
        
        const total = await prismaClient.grup.count({
            where:{
                AND:filters
            }
        })

        return{
            data:grups.map(grups => toGrupResponse(grups)),
            paging:{
                current_page: searchRequest.page,
                total_page:Math.ceil(total / searchRequest.size),
                size : searchRequest.size
            }
        }

    }


    static async checkKodeGrup(kodeGrup:string){
        const check = await prismaClient.grup.findFirst({
            where:{
                kode_grup:kodeGrup
            }
        })

        if(!check){
            throw new ResponseErrorApi(404,"kode produk not found")
        }
    }

    static async checkKodeGrupSame(kodeGrup:string){
        const check = await prismaClient.grup.count({
            where:{
                kode_grup:kodeGrup
            }
        })

        if(check != 0){
            throw new ResponseErrorApi(400,"id sudah di gunakan")
        }
    }

    

}