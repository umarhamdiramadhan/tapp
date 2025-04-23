import { NextFunction,Request,response,Response } from "express";
import { JawabanCreateRequest, JawabanUpdateRequest, JawabanViewRequest } from "./jawaban-model";
import { JawabanService } from "./jawaban-service";

export class JawabanController {
    static async create(req:Request,res:Response,next:NextFunction){
        try {
            const request:JawabanCreateRequest = req.body as JawabanCreateRequest
            const response = await JawabanService.create(request)
            res.status(200).json({
                data:response
            })
        } catch (error) {
            next(error)
        }
    }

    static async update(req:Request,res:Response,next:NextFunction){
        try {

            const request:JawabanUpdateRequest = req.body as JawabanUpdateRequest
            request.id = Number(req.params.id)
            const response = await JawabanService.update(request)
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
            await JawabanService.delete(id)
            res.status(200).json({
               data:"berhasil delete jawaban"
            })
            
        } catch (error) {
            next(error)
        }
    }

    static async view(req:Request,res:Response,next:NextFunction){
        try {

            const request:JawabanViewRequest = {
                nama_jawaban : req.query.nama_jawaban as string,
                status : req.query.status as string,
                page: req.query.page ? Number(req.query.page) : 1,
                size: req.query.size ? Number(req.query.size) : 500,
            }
            const response = await JawabanService.view(request)
            res.status(200).json(response)
            
        } catch (error) {
            next(error)
        }
    }
}