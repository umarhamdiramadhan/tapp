import { NextFunction,Request,Response } from "express";
import { TransaksiUpdateGagal, TransaksiUpdateSukses, ViewTransaksi } from "./transaksi-model";
import { TransaksiService } from "./transaksi-service";

export class TransaksiController{
    static async view(req:Request,res:Response,next:NextFunction){
        try {
           const request:ViewTransaksi = {
                kode_resellers:req.query.kode_resellers as string,
                nama_resellers: req.query.nama_resellers as string,
                tanggal_entry_start: req.query.tanggal_entry_start as string,
                tanggal_entry_end:req.query.tanggal_entry_end as string,
                nomer_tujuan:req.query.nomer_tujuan as string,
                id_moduls:Number(req.query.id_moduls),
                kode_produks:req.query.kode_produks as string,
                page: req.query.page ? Number(req.query.page) : 1,
                size: req.query.size ? Number(req.query.size) : 20, 
                }
            const response = await TransaksiService.view(request)
            res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }
    static async updateGagal(req:Request,res:Response,next:NextFunction){
        try {
            const request:TransaksiUpdateGagal = req.body as TransaksiUpdateGagal
            await TransaksiService.gagalTransactions(request,res)
        } catch (error) {
            next(error)
        }
    }
    static async UpdateSukses(req:Request,res:Response,next:NextFunction){
        try {
            const request:TransaksiUpdateSukses = req.body as TransaksiUpdateSukses
            await TransaksiService.suksesTransactions(request,res)
        } catch (error) {
            next(error)           
        }
    }
}