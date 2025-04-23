import { Inbox } from "@prisma/client"
import { formatDateTimeIndonesia } from "../../utils/date-indonesia"


export type InboxViewRequest = {
    date_start:string
    date_end:string
    pesan:string
    page:number
    size:number
}



export type InboxModelResponse = {
    id:number,
    date:string,
    pesan:string
}


export function toInboxResponse(inbox:Inbox):InboxModelResponse{
    return{
        id:inbox.id,
        date:formatDateTimeIndonesia(inbox.date),
        pesan:inbox.pesan
    }

}