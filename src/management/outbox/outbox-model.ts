import { Outbox } from "@prisma/client"
import { formatDateTimeIndonesia } from "../../utils/date-indonesia"


export type OutboxViewRequest = {
    date_start:string
    date_end:string
    pesan:string
    page:number
    size:number
}



export type OutboxModelResponse = {
    id:number,
    date:string,
    pesan:string
}


export function toOutboxResponse(outbox:Outbox):OutboxModelResponse{
    return{
        id:outbox.id,
        date:formatDateTimeIndonesia(outbox.date),
        pesan:outbox.pesan
    }

}