import { NextFunction,Request,Response} from "express";
import { DaftarHitamCreateRequest, DaftarHitamUpdateRequest, DaftarHitamViewRequest } from "./daftar-hitam-model";
import { DaftarHitamServie } from "./daftar-hitam-service";


export class DaftarHitamController{

    static async cerate(req:Request,res:Response,next:NextFunction){
        try {

            const request:DaftarHitamCreateRequest =  req.body as DaftarHitamCreateRequest
            const response = await DaftarHitamServie.create(request)
            res.status(200).json({
                data:response
            })

            
        } catch (error) {
            next(error)
        }
    }

    static async update(req:Request,res:Response,next:NextFunction){

        try {

            const request:DaftarHitamUpdateRequest = req.body as DaftarHitamUpdateRequest
            request.id = Number(req.params.id)


            const response = await DaftarHitamServie.update(request)
            res.status(200).json({
                data:response
            })


            
        } catch (error) {
            next(error)
        }

    }

    static async delete(req:Request,res:Response,next:NextFunction){
        try {
          const request:number =  Number(req.params.id)
          const response = await DaftarHitamServie.delete(request)
          res.status(200).json({
            data:"berhasil menghapus daftar hitam"
          })
            
        } catch (error) {
            next(error)
        }

    }
    
    static async view(req:Request,res:Response,next:NextFunction){
        try {

            const request:DaftarHitamViewRequest = {
                nomer_tujuan: req.query.nomer_tujuan as string,
                keterangan: req.query.keterangan as string,
                page: req.query.page ? Number(req.query.page) : 1,
                size: req.query.size ? Number(req.query.size) : 500,
            }

            const response = await DaftarHitamServie.view(request)
            res.status(200).json(response)

            
        } catch (error) {
            next(error)
        }
    }

}