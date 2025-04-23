import { NextFunction ,Request, Response } from "express";
import { ProviderCreateRequest, ProviderUpdateRequest, ProviderViewRequest } from "./provider-model";
import { ProviderService } from "./provider-service";
import { GrupUpdateRequest } from "../grup/grup-model";

export class ProviderController {
    
    static async create(req:Request,res:Response,next:NextFunction){
        try {
            
            const request:ProviderCreateRequest = req.body as ProviderCreateRequest
            const response = await ProviderService.create(request)
            res.status(200).json({
                data:response
            })

        } catch (error) {
            next(error)
        }
    }

    static async update(req:Request,res:Response,next:NextFunction){
        try {

            const kodeProvider = req.params.kodeProvider
            const request:ProviderUpdateRequest = req.body as ProviderUpdateRequest
            const response = await ProviderService.update(kodeProvider,request)
            res.status(200).json({
                data:response
            })
            
        } catch (error) {
            next(error)
        }
    }

    static async delete(req:Request,res:Response,next:NextFunction){
        try {
            const kodeProvider = req.params.kodeProvider
            await ProviderService.delete(kodeProvider)
            res.json({
                data:"berhasil delete provider"
            })
            
        } catch (error) {
            next(error)
        }
    }

    static async view(req:Request,res:Response,next:NextFunction){
        try {

            const request:ProviderViewRequest = {
                kode_provider: req.query.kode_provider as string,
                nama_provider: req.query.nama_provider as string,
                page: req.query.page ? Number(req.query.page) : 1,
                size: req.query.size ? Number(req.query.size) : 500,
            }

            const response = await ProviderService.view(request)
            res.status(200).json(response)
            
        } catch (error) {
            next(error)
        }
    }





}