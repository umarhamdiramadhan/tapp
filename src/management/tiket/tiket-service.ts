import { prismaClient } from "../../application/database";
import { endOfDayUTCNow, startOfDayUTCNow } from "../../utils/date-now-indonesia";
import { getJakartaDate } from "../../utils/get-date-indonesia";
import { Validation } from "../../validation/validation";
import { Pageable } from "../page/page";
import { TiketResponse, toTiketResponse, ViewTiket } from "./tiket-model";
import { TiketValidation } from "./tiket-validation";

export class TiketService {

    static async view(request:ViewTiket):Promise<Pageable<TiketResponse>>{
        
        const searchRequest = Validation.validate(TiketValidation.VIEW,request)
        
        const skip = (searchRequest.page -1) * searchRequest.size

        const startDate = getJakartaDate(searchRequest.date_start)
        
        
        const startOfDayUTC = searchRequest.date_start ? 
        new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), 0, 0, 0):
        startOfDayUTCNow
        
        
        const endDate = getJakartaDate(searchRequest.date_end)
                
        const endOfDayUTC = searchRequest.date_end ?
        new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), 23, 59, 59):
        endOfDayUTCNow

        const filters = []

        if(searchRequest.kode_resellers){
            filters.push({
                kode_resellers:{
                    contains: searchRequest.kode_resellers 
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

          const ticket = await prismaClient.tiket.findMany({
                    where:{
                        resellers:{
                            // nama_reseller:{
                            //     contains:searchRequest.nama_reseller,
                            // }
                            AND:filterNames
                        },
                        date: {
                            gte: startOfDayUTC,
                            lte: endOfDayUTC
                        },
                        kode_resellers:searchRequest.kode_resellers,
                            
                
                    },
                    take:searchRequest.size,
                    orderBy: {
                        date: 'asc',
                    },
                    skip:skip,
                    include:{
                        resellers:{
                            select:{
                                nama_reseller:true
                            }
                        }
                    },      
            })

             const total = await prismaClient.tiket.count({
                        where:{
                            resellers:{
                                // nama_reseller:{
                                //     contains:searchRequest.nama_reseller,
                                // }
                                AND:filterNames
                            },
                            AND:filters
                    }
            })

              return{
                    data:ticket.map(tickets => toTiketResponse(tickets,tickets.resellers.nama_reseller)),
                    paging:{
                        current_page: searchRequest.page,
                        total_page:Math.ceil(total / searchRequest.size),
                        size : searchRequest.size
                    } 
        }

    }

    static async ExpiredTiket():Promise<string>{
        const tiket = await prismaClient.tiket.updateMany({
            where:{
                status:true,
            },
            data:{
                status:false
            }
        })
        console.log("berhasil membuat expired")
        return "Berhasil membuat expired tiket"
    }

}