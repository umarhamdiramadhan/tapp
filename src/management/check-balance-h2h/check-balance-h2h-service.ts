import { response } from "express";
import { prismaClient } from "../../application/database";
import { ResponseErrorApiH2h } from "../../error/response-error-api-h2h";
import { Validation } from "../../validation/validation";
import { CheckSaldoH2h, toCheckSaldoH2h } from "./check-balance-h2h-model";
import { CheckSaldoH2hValidation } from "./check-balance-h2h-validation";
import bcrypt, { compare } from "bcrypt";
import {  ValidationH2hService } from "../validation-h2h/validation-h2h-service";
import { endOfDayUTCNow, startOfDayUTCNow } from "../../utils/date-now-indonesia";
import moment from "moment-timezone";


export class CheckSaldoH2hService {

    static async check(request:CheckSaldoH2h):Promise<String>{

        const checkRequest = Validation.validate(CheckSaldoH2hValidation.CHECK,request)
        
        await ValidationH2hService.validationH2h(checkRequest.memberid,checkRequest.password,checkRequest.pin,checkRequest.ip)

        const member = await prismaClient.reseller.findFirst({
            where:{
                kode_reseller:checkRequest.memberid
            }
        })

        const startOfDayUTC = moment.tz('Asia/Jakarta').startOf('day').toDate();
        const endOfDayUTC = moment.tz('Asia/Jakarta').endOf('day').toDate();
        
        const transaksi = await prismaClient.transaction.count({
            where:{
                tanggal_entry: {
                    gte: startOfDayUTC,
                    lte: endOfDayUTC
                },
                kode_resellers:checkRequest.memberid
            }
        })


        
        return toCheckSaldoH2h(member!.kode_reseller,member!.saldo,transaksi)

    }


    
}