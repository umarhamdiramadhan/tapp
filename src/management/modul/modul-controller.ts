import { NextFunction,Request,Response } from "express";
import { ModulCreateRequest, ModulUpdateRequest, ModulViewRequest } from "./modul-model";
import { ModulService } from "./modul-service";

export class ModulController{

    static async create(req:Request,res:Response,next:NextFunction){
        try {

            const request:ModulCreateRequest = req.body as ModulCreateRequest
            const response = await ModulService.create(request)

            res.status(200).json({
                data:response
            })
            
        } catch (error) {
            next(error)
        }
    }

    static async update(req:Request,res:Response,next:NextFunction){
        try {

            const request:ModulUpdateRequest = req.body as ModulUpdateRequest
            request.id = Number(req.params.id)
            const response = await ModulService.update(request)
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
            await ModulService.delete(id)
            res.status(200).json({
                data:"berhasil delete number"
            })
            
        } catch (error) {
            next(error)
        }
    }

    static async view(req:Request,res:Response,next:NextFunction){
        try {
            const request:ModulViewRequest = {
                nama_moduls : req.query.nama_moduls as string,
                page: req.query.page ? Number(req.query.page) : 1,
                size: req.query.size ? Number(req.query.size) : 500,
            }
            const response = await ModulService.view(request)
            res.status(200).json(response)
            
        } catch (error) {
            next(error)
        }
    }

}