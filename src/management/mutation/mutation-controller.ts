import { Request,Response,NextFunction } from "express";
import { MutasiViewRequest } from "./mutation-model";
import { MutasiService } from "./mutation-service";

export class MutasiController{
    static async view(req:Request,res:Response,next:NextFunction){
        try {
            
            const request:MutasiViewRequest =  {
                jumlah:req.query.jumlah ? Number(req.query.jumlah) : undefined,
                kode_resellers: req.query.kode_reseller as string,
                date_start: req.query.date_start as string,
                date_end:req.query.date_end as string,
                page: req.query.page ? Number(req.query.page) : 1,
                size: req.query.size ? Number(req.query.size) : 500,
            }
            const response = await MutasiService.view(request)
            res.status(200).json(response)
             

        } catch (error) {
            next(error)
        }
    }
}