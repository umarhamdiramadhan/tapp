import { prismaClient } from "../../application/database";
import { ResponseErrorApi } from "../../error/response-error-api";
import { Validation } from "../../validation/validation";
import { ModulService } from "../modul/modul-service";
import { Pageable } from "../page/page";
import { ProductService } from "../product/product-service";
import { ParsingCreateRequest, ParsingResponse, ParsingUpdateRequest, ParsingViewRequest, toParsingResponse } from "./parsing-model";
import { ParsingValidation } from "./parsing-validation";

export class ParsingService {

    static async crate(request:ParsingCreateRequest):Promise<ParsingResponse>{

        const createRequest = Validation.validate(ParsingValidation.create,request)

        await ModulService.checkIdModul(createRequest.id_moduls)
        await ProductService.checkProductExist(createRequest.kode_produks)

        const response = await prismaClient.parsing.create({
            data:createRequest
        })

        return toParsingResponse(response)
    }


    static async update(request:ParsingUpdateRequest):Promise<ParsingResponse>{

        const updateRequest = Validation.validate(ParsingValidation.update,request)

        await this.checkIdParsing(updateRequest.id)
        await ProductService.checkProductExist(updateRequest.kode_produks)

        const response  = await prismaClient.parsing.update({
            where:{
                id:updateRequest.id
            },
            data:updateRequest
        })

        return toParsingResponse(response)
        
    }

    static async delete(id:number){

        await this.checkIdParsing(id)

        await prismaClient.parsing.delete({
            where:{
                id:id
            }
        })

    }

    static async view(request:ParsingViewRequest):Promise<Pageable<ParsingResponse>>{

        const searchRequest = Validation.validate(ParsingValidation.view,request)

        const skip = (searchRequest.page - 1) * searchRequest.size

        const filters = []

        if(searchRequest.kode_produks){
            filters.push({
                kode_produks:{
                    contains: searchRequest.kode_produks 
                }
             })
        }

        const parsings = await prismaClient.parsing.findMany({
            where:{
                id_moduls:searchRequest.id_moduls,
                AND:filters
            },
            orderBy: {
                kode_produks: 'asc',
              },
            take:searchRequest.size,
            skip:skip
        })

        const total = await prismaClient.parsing.count({
            where:{
                AND:filters
            }
        })

        return{
            data:parsings.map(parsings => toParsingResponse(parsings)),
            paging:{
                current_page: searchRequest.page,
                total_page:Math.ceil(total / searchRequest.size),
                size : searchRequest.size
            }
           }  
        

    }


    static async checkIdParsing(id:number){

        const check = await prismaClient.parsing.findFirst({
            where:{
                id:id
            }
        })

        if(!check){
            throw new ResponseErrorApi(404,"id parsing tidak di temukan")
        }

    }

   

}