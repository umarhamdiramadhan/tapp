import { Request,Response,NextFunction, request, response } from "express";
import { GrupCreateRequest, GrupUpdateRequest, GrupViewRequest } from "./grup-model";
import { GrupService } from "./grup-service";

export class GrupController {

    static async create(req:Request,res:Response,next:NextFunction){
        try {
            
            const request:GrupCreateRequest = req.body as GrupCreateRequest
            const response = await GrupService.create(request)

            res.status(200).json({
                data:response
            })


        } catch (error) {
            next(error)
        }
    }


    static async update(req:Request,res:Response,next:NextFunction){
        try {

            const kodeGrup = req.params.kodeGrup
            console.log(kodeGrup)
            const request:GrupUpdateRequest = req.body as GrupUpdateRequest
            const response = await GrupService.update(kodeGrup,request)
            res.status(200).json({
                data:response
            }) 

            
        } catch (error) {
            next(error)
        }
    }


    static async delete(req:Request,res:Response,next:NextFunction){
        try {
            const kodeGrup = req.params.kodeGrup
            const response = await GrupService.delete(kodeGrup)
            res.status(200).json({
                data:"Berhasil menghapus kode grup"
            })
            
        } catch (error) {
            next(error)
        }
    }


    static async view(req:Request,res:Response,next:NextFunction){
        try {
            const request:GrupViewRequest = {
                kode_grup: req.query.kode_grup as string,
                nama_grup: req.query.nama_grup as string,
                page: req.query.page ? Number(req.query.page) : 1,
                size: req.query.size ? Number(req.query.size) : 500,
            }

            const response = await GrupService.view(request)
            res.status(200).json(response)

            
        } catch (error) {
            next(error)
        }
    }

    

}