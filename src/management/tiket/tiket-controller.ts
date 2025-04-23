import { NextFunction,Request,Response } from "express";
import { TiketResponse, ViewTiket } from "./tiket-model";
import { TiketService } from "./tiket-service";

export class TiketController{
    
    static async view(req:Request,res:Response,next:NextFunction){
        try {
            const request:ViewTiket = {
                kode_resellers:req.query.kode_resellers as string,
                nama_resellers: req.query.nama_resellers as string,
                date_start: req.query.date_start as string,
                date_end:req.query.date_end as string,
                page: req.query.page ? Number(req.query.page) : 1,
                size: req.query.size ? Number(req.query.size) : 20, 
            }
            const response = await TiketService.view(request)
            res.status(200).json(response)
            
        } catch (error) {
            next(error)
        }
    }


}