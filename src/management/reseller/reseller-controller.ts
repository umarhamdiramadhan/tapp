import { NextFunction,Request,Response } from "express";
import { ResellerCreateRequest, ResellerKurangSaldo, ResellerTambahSaldo, ResellerUpdateRequest, ResellerViewRequest } from "./reseller-model";
import { ResellerService } from "./reseller-service";

export class ResellerController {
    static async create(req:Request,res:Response,next:NextFunction){
        try {

            const request:ResellerCreateRequest = req.body as ResellerCreateRequest

            console.log(req.body)
            const response = await ResellerService.create(request)
            res.status(200).json({
                data:response
            })
             
            
        } catch (error) {
            next(error)
        }
    }


    static async update(req:Request,res:Response,next:NextFunction){
        try {

            const kodeReseller = req.params.kodeReseller
            const request:ResellerUpdateRequest = req.body as ResellerUpdateRequest
            const response = await ResellerService.update(kodeReseller,request)
            res.status(200).json({
                data:response
            })
        } catch (error) {
            next(error)
        }
    }

    static async delete(req:Request,res:Response,next:NextFunction){
        try {
            const kodeReseller = req.params.kodeReseller
            await ResellerService.delete(kodeReseller)
            res.status(200).json({
                data:"Berhasil menghapus reseller"
            })
            
        } catch (error) {
            next(error)
        }
    }
    static async view(req:Request,res:Response,next:NextFunction){
        try {

            const request:ResellerViewRequest =  {
                kode_reseller: req.query.kode_reseller as string,
                nama_reseller: req.query.kode_reseller as string,
                kode_grups: req.query.kode_grups as string,
                nomer_telefon: req.query.nomer_telefon as string,
                page: req.query.page ? Number(req.query.page) : 1,
                size: req.query.size ? Number(req.query.size) : 500,
            }
            const response = await ResellerService.view(request)
            res.status(200).json(response)
            
        } catch (error) {
            next(error)
        }
    }

    static async tambahSaldo(req:Request,res:Response,next:NextFunction){
        try {

            const request:ResellerTambahSaldo = req.body as ResellerTambahSaldo
            const response = await ResellerService.tambahSaldo(request)
            res.status(200).json({
                data:response
            })
            
        } catch (error) {
            next(error)
        }
    }
    static async kurangSaldo(req:Request,res:Response,next:NextFunction){
        try {
            const request:ResellerKurangSaldo = req.body as ResellerKurangSaldo
            const response = await ResellerService.kurangSaldo(request)
            res.status(200).json({
                data:response
            })
            
            
        } catch (error) {
            next(error)
        }
    }
    
}