import { NextFunction,Request, Response } from "express";
import { logger } from "../../application/logging";
import { PrismaClientUnknownRequestError } from "@prisma/client/runtime/library";
import { ResponseErrorApiH2h } from "../../error/response-error-api-h2h";
import { number, ZodError } from "zod";
import { RequestTiketH2h } from "./tiket-h2h-model";
import { InboxService } from "../inbox/inbox-service";
import { TiketH2hService } from "./tiket-h2h-service";

export class TiketH2hController{
    static async requestTiket(req:Request,res:Response,next:NextFunction){
        try {
              const request:RequestTiketH2h = {
                    memberid: req.query.memberid as string,
                    pin: req.query.pin as string,
                    password: req.query.password as string,
                    ip: req.ip as string,
                    nominal: Number(req.query.nominal)
                 }
                    const queryParameters = req.query;
                    const queryString = new URLSearchParams(queryParameters as Record<string, string>).toString();
            
                     await InboxService.createInbox(queryString) 
                    const response = await TiketH2hService.requestTiketH2h(request)
                res.send(response)
            
        } catch (error) {
             if(error instanceof ZodError){
                res.send(`Validation Error Silahkan masukan memberId atau pin atau password`)
                    }else if(error instanceof ResponseErrorApiH2h){
                         res.send(`${error.message}`)
                    }else if(error instanceof PrismaClientUnknownRequestError){
                          res.send(`value yang kamu masukan duplikat`)
                    }else{
                         logger.error(error)
                             res.send(`terjadi error 500 silahkan kirim ulang`)
                    }
        }
    }
}