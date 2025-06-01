import { NextFunction,Response,Request } from "express";
import { ResponseErrorApiH2h } from "../../error/response-error-api-h2h";
import { ZodError } from "zod";
import { logger } from "../../application/logging";
import { PrismaClientUnknownRequestError } from "@prisma/client/runtime/library";
import { RequestTransksaksiH2h } from "./transaksi-h2h-model";
import { TransaksiHh2Service } from "./transaksi-h2h-service";
import { InboxService } from "../inbox/inbox-service";

export class TransaksiH2hController{
     static async transaksi (req:Request,res:Response,next:NextFunction){
        try {
            const request:RequestTransksaksiH2h = {
                product:req.query.product as string,
                qty: Number(req.query.qty),
                dest:req.query.dest as string,
                refID:req.query.refID as string || req.query.refid as string,
                memberID:req.query.memberID as string || req.query.memberid as string,
                pin:req.query.pin as string,
                password:req.query.password as string,
                ip: req.ip as string,
            }
            console.log(request)
             const queryParameters = req.query;
            const queryString = new URLSearchParams(queryParameters as Record<string, string>).toString();
                        
            await InboxService.createInbox(queryString) 

            await TransaksiHh2Service.transaksi(request,res)
            
        } catch (error) {
            if(error instanceof ZodError){
              res.send(`Validation Error Silahkan masukan memberId atau pin atau password`)
            }else if(error instanceof ResponseErrorApiH2h){
              res.send(`${error.message}`)
            }else if(error instanceof PrismaClientUnknownRequestError){
               res.send(`value yang kamu masukan duplikat`)
            }else{
                console.log(error)
                logger.error(error)
                res.send(`terjadi error 500 silahkan kirim ulang`)
            }
        }
    }
}