import { prismaClient } from "../../application/database";
import { ResponseErrorApi } from "../../error/response-error-api";
import { Validation } from "../../validation/validation";
import { JawabanService } from "../jawaban/jawaban-service";
import { Pageable } from "../page/page";
import { ModulCreateRequest, ModulResponse, ModulUpdateRequest, ModulViewRequest, toModulResponse } from "./modul-model";
import { ModulValidation } from "./modul-validation";

export class ModulService{
    static async create(request:ModulCreateRequest):Promise<ModulResponse>{

        const createRequest = Validation.validate(ModulValidation.CREATE,request)

        await JawabanService.checkNameJawaban(createRequest.jawabans)

        const response = await prismaClient.modul.create({
            data:createRequest
        })

        return toModulResponse(response)
    }



    static async update(request:ModulUpdateRequest):Promise<ModulResponse>{

        const updateRequest = Validation.validate(ModulValidation.UPDATE,request)

        await JawabanService.checkNameJawaban(updateRequest.jawabans)
        await this.checkIdModul(updateRequest.id)

        const response = await prismaClient.modul.update({
            where:{
                id:updateRequest.id
            },
            data:updateRequest
        })
        

        return toModulResponse(response)
    }


    static async delete(id:number){
        await this.checkIdModul(id)

        await prismaClient.modul.delete({
            where:{
                id:id
            }
        })
    }


    static async view(request:ModulViewRequest):Promise<Pageable<ModulResponse>>{

        const searchRequest = Validation.validate(ModulValidation.VIEW,request)

        const skip = (searchRequest.page - 1) * searchRequest.size

        const filters = []

        if(searchRequest.nama_moduls){
            filters.push({
                nama_moduls:{
                    contains: searchRequest.nama_moduls 
                }
            })
        }

        const moduls = await prismaClient.modul.findMany({
            where:{
                AND:filters
            },
            take:searchRequest.size,
            orderBy: {
                nama_moduls: 'asc',
            },
            skip:skip
        })
        const total = await prismaClient.modul.count({
            where:{
                AND:filters
            }
        })

        return{
            data:moduls.map(moduls => toModulResponse(moduls)),
            paging:{
                current_page: searchRequest.page,
                total_page:Math.ceil(total / searchRequest.size),
                size : searchRequest.size
            }
        }

    }


    static async checkIdModul(id:number){
        const check = await prismaClient.modul.findFirst({
            where:{
                id:id
            }
        })

        if(!check){
            throw new ResponseErrorApi(404,"id module tidak di temukan")
        }
    }
}


