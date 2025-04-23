import { prismaClient } from "../../application/database";
import { ResponseErrorApi } from "../../error/response-error-api";
import { Validation } from "../../validation/validation";
import { Pageable } from "../page/page";
import { JawabanCreateRequest, JawabanResponse, JawabanUpdateRequest, JawabanViewRequest, toJawabanResponse } from "./jawaban-model";
import { JawabanValidation } from "./jawaban-validation";

export class JawabanService {
    static async create(request:JawabanCreateRequest):Promise<JawabanResponse>{
        const createRequest = Validation.validate(JawabanValidation.CREATE,request)

        const response = await prismaClient.jawaban.create({
            data:createRequest
        })

        return toJawabanResponse(response)     
    }

    static async update(request:JawabanUpdateRequest):Promise<JawabanResponse>{
        const updateRequest = Validation.validate(JawabanValidation.UPDATE,request)
        await this.checkIdJawaban(updateRequest.id)
        const response = await prismaClient.jawaban.update({
            where:{
                id:updateRequest.id
            },
            data:updateRequest
        })

        return toJawabanResponse(response)
    }

    static async delete(id:number){
        await this.checkIdJawaban(id)

        await prismaClient.jawaban.delete({
            where:{
                id:id
            }
        })
    }
    
    static async view(request:JawabanViewRequest):Promise<Pageable<JawabanResponse>>{
        const searchRequest = Validation.validate(JawabanValidation.VIEW,request)
        const skip = (searchRequest.page - 1) * searchRequest.size

        const filters = []

        if(searchRequest.nama_jawaban){
            filters.push({
                nama_jawaban:{
                    contains: searchRequest.nama_jawaban 
                }
            })
        }

        const jawabans = await prismaClient.jawaban.findMany({
            where:{
                status:searchRequest.status,
                AND:filters
            },
            take:searchRequest.size,
            orderBy: {
                nama_jawaban: 'asc',
            },
            skip:skip
        })

        const total = await prismaClient.jawaban.count({
            where:{
                AND:filters
            }
        })


        return{
            data:jawabans.map(jawabans => toJawabanResponse(jawabans)),
            paging:{
                current_page: searchRequest.page,
                total_page:Math.ceil(total / searchRequest.size),
                size : searchRequest.size
            }
        }

    }

    static async checkIdJawaban(id:number){
        const check = await prismaClient.jawaban.findFirst({
            where:{
                id:id
            }
        })

        if(!check){
            throw new ResponseErrorApi(404,"id tidak di temukan")
        }
    }
    static async checkNameJawaban(namaJawaban:string){
        const check = await prismaClient.jawaban.findFirst({
            where:{
                nama_jawaban:namaJawaban
            }
        })

        if(!check){
            throw new ResponseErrorApi(404,"nama jawaban tidak di temukan")
        }
    }

}