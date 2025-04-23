import { Request,Response,NextFunction, request, response } from "express";
import { ProductCreateRequest, ProductUpdateRequest, ProductViewRequest } from "./product-model";
import { ProductService } from "./product-service";

export class ProductController {
    static async create(req:Request,res:Response,next:NextFunction){
        try {

            const request:ProductCreateRequest = req.body as ProductCreateRequest
            const response = await ProductService.create(request)
            res.status(200).json({
                data:response
            })
            
        } catch (error) {
            next(error)
        }
    }

    static async update(req:Request,res:Response,next:NextFunction){
        try {

            const kodeProduk = req.params.kodeProduk
            const request:ProductUpdateRequest = req.body 
            const response = await ProductService.update(kodeProduk,request)
            res.status(200).json({
                data:response
            })
            
        } catch (error) {
            next(error)
        }
    }

    static async delete(req:Request,res:Response,next:NextFunction){
        try {
            const kodeProduk = req.params.kodeProduk
            await ProductService.delete(kodeProduk)
            res.status(200).json({
                data:"berhasil menghapus produk"
            })
            
        } catch (error) {
            next(error)
        }
    }

    static async view(req:Request,res:Response,next:NextFunction){
        try {
            const request:ProductViewRequest = {
                kode_produk: req.query.kode_produk as string,
                kode_providers: req.query.kode_providers as string,
                nama_produk: req.query.nama_produk as string,
                page: req.query.page ? Number(req.query.page) : 1,
                size: req.query.size ? Number(req.query.size) : 500,
            }

            const response = await ProductService.view(request)
            res.status(200).json(response)
            
        } catch (error) {
            next(error)
        }
    }

    
}