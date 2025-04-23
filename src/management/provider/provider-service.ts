import { prismaClient } from "../../application/database";
import { ResponseErrorApi } from "../../error/response-error-api";
import { Validation } from "../../validation/validation";
import { Pageable } from "../page/page";
import { ProviderCreateRequest, ProviderResponse, ProviderUpdateRequest, ProviderViewRequest, toProviderResponse } from "./provider-model";
import { ProviderValidation } from "./provider-validation";

export class ProviderService {
    static async create(request:ProviderCreateRequest):Promise<ProviderResponse>{
        const createRequest = Validation.validate(ProviderValidation.CREATE,request)

       await this.checkKodeProviderCreate(createRequest.kode_provider)

       const response = await prismaClient.provider.create({
            data:createRequest
       })

       return toProviderResponse(response)

    }

    static async update(kodeProvider:string,request:ProviderUpdateRequest):Promise<ProviderResponse>{
        
        const updateRequest = Validation.validate(ProviderValidation.UPDATE,request)
        await this.checkKodeProviderUpdateAndDelete(kodeProvider)

       

        const response = await prismaClient.provider.update({
            where:{
                kode_provider : kodeProvider
            },
            data:updateRequest
        })

        return toProviderResponse(response)

    }

    static async delete(kodeProvider:string){

        await this.checkKodeProviderUpdateAndDelete(kodeProvider)

        await prismaClient.provider.delete({
            where:{
                kode_provider:kodeProvider
            }
        })

    }

    static async view(request:ProviderViewRequest):Promise<Pageable<ProviderResponse>>{

        const searchRequest = Validation.validate(ProviderValidation.VIEW,request)

        const skip = (searchRequest.page - 1) * searchRequest.size

        const filters = []

        if(searchRequest.kode_provider){
            filters.push({
                kode_provider:{
                    contains: searchRequest.kode_provider 
                }
            })
        }

        if(searchRequest.nama_provider){
            filters.push({
                nama_provider:{
                    contains: searchRequest.nama_provider 
                }
            })
        }

        const providers = await prismaClient.provider.findMany({
            where:{
                AND:filters
            },
            orderBy: {
                kode_provider: 'asc',
              },
            take:searchRequest.size,
            skip:skip
        })
        
        const total = await prismaClient.provider.count({
            where:{
                AND:filters
            }
        })

        return{
            data:providers.map(providers => toProviderResponse(providers)),
            paging:{
                current_page: searchRequest.page,
                total_page:Math.ceil(total / searchRequest.size),
                size : searchRequest.size
            }
        }
      
    }

    static async checkKodeProviderUpdateAndDelete(kodeProvider:string){
        const check = await prismaClient.provider.findFirst({
            where:{
                kode_provider:kodeProvider
            }
        })

        if(!check){
            throw new ResponseErrorApi(404,"kode provider double")
        }
    }


    static async checkKodeProviderCreate(kodeProvider:string){
        const check = await prismaClient.provider.count({
            where:{
                kode_provider:kodeProvider
            }
        })

        if(check != 0){
            throw new ResponseErrorApi(404,"id not found")
        }
    }
}

