import { NextFunction,request,Request,response,Response } from "express";
import { InboxViewRequest } from "./inbox-model";
import { InboxService } from "./inbox-service";

export class InboxController{

    static async view(req:Request,res:Response,next:NextFunction){
        try {
            const request:InboxViewRequest ={
                pesan: req.query.pesan as string,
                date_start: req.query.date_start as string,
                date_end:req.query.date_end as string,
                page: req.query.page ? Number(req.query.page) : 1,
                size: req.query.size ? Number(req.query.size) : 20,
            }

            const response = await InboxService.view(request)
            res.status(200).json(response)
        
       } catch (error) {
            next(error)
       }

    }

}