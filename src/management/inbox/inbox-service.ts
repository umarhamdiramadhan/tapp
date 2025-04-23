import { prismaClient } from "../../application/database";
import { endOfDayUTCNow, startOfDayUTCNow } from "../../utils/date-now-indonesia";
import { getJakartaDate } from "../../utils/get-date-indonesia";
import { Validation } from "../../validation/validation";
import { Pageable } from "../page/page";
import { InboxModelResponse, InboxViewRequest, toInboxResponse } from "./inbox-model";
import { InboxValidation } from "./inbox-validation";

export class InboxService {

    static async view(request:InboxViewRequest):Promise<Pageable<InboxModelResponse>>{
        
        
        const searchRequest = Validation.validate(InboxValidation.VIEW,request)
        const skip = (searchRequest.page - 1) * searchRequest.size

        const startDate = getJakartaDate(searchRequest.date_start)


        const startOfDayUTC = searchRequest.date_start ? 
        new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), 0, 0, 0):
        startOfDayUTCNow


        const endDate = getJakartaDate(searchRequest.date_end)
        
        const endOfDayUTC = searchRequest.date_end ?
        new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), 23, 59, 59):
        endOfDayUTCNow

        const filters = []


        if(searchRequest.pesan){
            filters.push({
                pesan:{
                    contains: searchRequest.pesan 
                }
            })
        }

        const inboxs = await prismaClient.inbox.findMany({
            where:{
                date: {
                    gte: startOfDayUTC,
                    lte: endOfDayUTC
                },
                AND:filters
            },
            take:searchRequest.size,
            orderBy: {
                date: 'asc',
            },
            skip:skip
        })

        const total = await prismaClient.inbox.count({
            where:{
                AND:filters
            }
        })

       return{
        data:inboxs.map(inboxs => toInboxResponse(inboxs)),
        paging:{
            current_page: searchRequest.page,
            total_page:Math.ceil(total / searchRequest.size),
            size : searchRequest.size
        }      
        }    
        

    }

    static async createInbox(pesan:string){
        const inboxCreate = await prismaClient.$transaction(async (tx) => {
            await tx.inbox.create({
                data:{
                    pesan:pesan
                }
            })
        })
    }  


}