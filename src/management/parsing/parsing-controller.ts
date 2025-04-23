import { NextFunction,Request,response,Response } from "express";
import { ParsingCreateRequest, ParsingUpdateRequest, ParsingViewRequest } from "./parsing-model";
import { ParsingService } from "./parsing-services";

export class ParsingController{

    static async create(req:Request,res:Response,next:NextFunction){
        try {
            const request:ParsingCreateRequest = req.body as ParsingCreateRequest
            const response = await ParsingService.crate(request)
            res.status(200).json({
                data:response
            })
            
        } catch (error) {
            next(error)
        }
    }

    static async update(req:Request,res:Response,next:NextFunction){
        try {
            const request:ParsingUpdateRequest = req.body as ParsingUpdateRequest
            request.id = Number(req.params.id)
            const response = await ParsingService.update(request)
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
            await ParsingService.delete(id)

            res.status(200).json({
                data:"berhasil delete parsing"
            })
        } catch (error) {
            next(error)
        }
    }

    static async view(req:Request,res:Response,next:NextFunction){
        try {

            const request:ParsingViewRequest = {
                id_moduls:req.query.id_moduls ? Number(req.query.id_moduls) : undefined,
                kode_produks: req.query.nama_produk as string,
                page: req.query.page ? Number(req.query.page) : 1,
                size: req.query.size ? Number(req.query.size) : 500,
            }

            const response = await ParsingService.view(request)
            res.status(200).json(response)
            
        } catch (error) {
            next(error)
        }
    }

}