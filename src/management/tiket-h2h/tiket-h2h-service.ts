import { prismaClient } from "../../application/database";
import { ResponseErrorApiH2h } from "../../error/response-error-api-h2h";
import { generateRandomFrom1To3000 } from "../../utils/genarete-number";
import { Validation } from "../../validation/validation";
import { toTiketResponse } from "../tiket/tiket-model";
import { ValidationH2hService } from "../validation-h2h/validation-h2h-service";
import { RequestTiketH2h, toResponseTiketH2h } from "./tiket-h2h-model";
import { TiketH2hValidation } from "./tiket-h2h-validation";

export class TiketH2hService {
    static async requestTiketH2h(request:RequestTiketH2h):Promise<string>{

        const checkRequest = Validation.validate(TiketH2hValidation.REQUEST,request)
        
        
        await ValidationH2hService.validationH2h(checkRequest.memberid,checkRequest.password,checkRequest.pin,checkRequest.ip)

        const checkNominalTiket = await prismaClient.tiket.findFirst({
            where:{
                kode_resellers:checkRequest.memberid,
                nominal_sama:checkRequest.nominal
            }
        })

        if(checkNominalTiket){
            const response = toResponseTiketH2h(checkNominalTiket.nominal_ticket)
            throw new ResponseErrorApiH2h(response)
        }

        const randomNumber = generateRandomFrom1To3000();
        const totalNominal = Math.ceil(checkRequest.nominal + randomNumber)
        


        const requestTiket = await prismaClient.tiket.create({
            data:{
                nominal_ticket:totalNominal,
                nominal_sama:checkRequest.nominal,
                kode_resellers:checkRequest.memberid
            }
        })

        return toResponseTiketH2h(requestTiket.nominal_ticket)

    }
}