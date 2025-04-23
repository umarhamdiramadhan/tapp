
import { prismaClient } from "../../application/database";
import { endOfDayUTCNow, startOfDayUTCNow } from "../../utils/date-now-indonesia";
import { getJakartaDate } from "../../utils/get-date-indonesia";
import { Validation } from "../../validation/validation";
import { Pageable } from "../page/page";
import { MutasiResponse, MutasiViewRequest, toMutasiResponse } from "./mutation-model";
import { MutasiValidation } from "./mutation-validation";

export class MutasiService {
    
    static async view(request:MutasiViewRequest):Promise<Pageable<MutasiResponse>>{

        const searchRequest = Validation.validate(MutasiValidation.VIEW,request)
        const skip = (searchRequest.page - 1) * searchRequest.size
        
        const startDate = getJakartaDate(searchRequest.date_start)

        const startOfDayUTC = searchRequest.date_start ? 
        new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), 0, 0, 0):
        startOfDayUTCNow


        const endDate = getJakartaDate(searchRequest.date_end)
        
        const endOfDayUTC = searchRequest.date_end ?
        new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), 23, 59, 59):
        endOfDayUTCNow
      
        
        const mutasi = await prismaClient.mutasi.findMany({
            where:{
                jumlah:searchRequest.jumlah,
                kode_resellers:searchRequest.kode_resellers,
                date: {
                    gte: startOfDayUTC,
                    lte: endOfDayUTC
                },
            },
            take:searchRequest.size,
            orderBy: {
                date: 'asc',
            },
            skip:skip
        })

        const total = await prismaClient.mutasi.count({
            where:{
                jumlah:searchRequest.jumlah,
                kode_resellers:searchRequest.kode_resellers,
            }
        })
        
        return{
            data:mutasi.map(mutasi => toMutasiResponse(mutasi)),
            paging:{
                current_page: searchRequest.page,
                total_page:Math.ceil(total / searchRequest.size),
                size : searchRequest.size
            }
        }

    }

 
      

}