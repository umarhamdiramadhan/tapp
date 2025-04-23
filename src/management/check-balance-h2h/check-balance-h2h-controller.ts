import { NextFunction,Request,Response } from "express"
import { ZodError } from "zod"
import { CheckSaldoH2h } from "./check-balance-h2h-model"
import { CheckSaldoH2hService } from "./check-balance-h2h-service"
import { ResponseErrorApiH2h } from "../../error/response-error-api-h2h"
import { PrismaClientUnknownRequestError } from "@prisma/client/runtime/library"
import { logger } from "../../application/logging"
import { InboxService } from "../inbox/inbox-service"

export class chekBalanceH2hController {
    static async checkBalanceH2h(req:Request,res:Response,next:NextFunction){
        try {
                const request:CheckSaldoH2h = {
                   memberid: req.query.memberid as string,
                   pin: req.query.pin as string,
                   password: req.query.password as string,
                   ip: req.ip as string
               }
               const queryParameters = req.query;
               const queryString = new URLSearchParams(queryParameters as Record<string, string>).toString();

            const inbox = await InboxService.createInbox(queryString) 
            const response = await CheckSaldoH2hService.check(request)
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