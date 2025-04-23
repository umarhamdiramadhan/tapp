import { Request,Response,NextFunction } from "express";
import { HargaGrupCreateManyRequest, HargaGrupCreateRequest, HargaGrupUpdateManyRequest, HargaGrupUpdateRequest, HargaGrupViewRequest } from "./harga-grup-model";
import { HargaGrupService } from "./harga-grup-service";

export class HargaGrupContorller {

    static async create(req:Request,res:Response,next:NextFunction){
        try {
            
            const request:HargaGrupCreateRequest = req.body as HargaGrupCreateRequest
            const response = await HargaGrupService.create(request)
            res.status(200).json({
                data:response
            })

        } catch (error) {
            next(error)
        }
    }
    static async createMany(req:Request,res:Response,next:NextFunction){
        try {
            
            const request:HargaGrupCreateManyRequest = req.body as HargaGrupCreateManyRequest
            const response = await HargaGrupService.createMany(request)
            res.status(200).json({
                data:response
            })

        } catch (error) {
            next(error)
        }
    }

    static async update(req:Request,res:Response,next:NextFunction){
        try {
            const request:HargaGrupUpdateRequest = req.body as HargaGrupUpdateRequest
            request.id = Number(req.params.id)
            const response = await HargaGrupService.update(request)
            res.status(200).json({
                data:response
            })

            
        } catch (error) {
            next(error)
        }
    }

    static async updateMany(req:Request,res:Response,next:NextFunction){
        try {
            const request:HargaGrupUpdateManyRequest = req.body as HargaGrupUpdateManyRequest
            const response = await HargaGrupService.updateMany(request)
            res.status(200).json({
                data:response
            })
        } catch (error) {
            next(error)
        }
    }

    static async delete(req:Request,res:Response,next:NextFunction){
        try {
            const id = Number(req.params.id)
            await HargaGrupService.delete(id)
            res.status(200).json({
                data:"berhasil delete harga grup"
            })
            
        } catch (error) {
            next(error)
        }
    }

    static async view(req:Request,res:Response,next:NextFunction){
        try {
            const request:HargaGrupViewRequest = {
                kode_grups : req.query.kode_grups as string,
                kode_produks : req.query.kode_produks as string,
                page: req.query.page ? Number(req.query.page) : 1,
                size: req.query.size ? Number(req.query.size) : 500,
            }
            const response = await HargaGrupService.view(request)
            res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }

}