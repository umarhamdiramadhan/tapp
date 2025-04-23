import { prismaClient } from "../../application/database";
import { ResponseErrorApi } from "../../error/response-error-api";
import { Validation } from "../../validation/validation";
import { Pageable } from "../page/page";
import { ProviderService } from "../provider/provider-service";
import { ProductCreateRequest, ProductResponse, ProductUpdateRequest, ProductViewRequest, toProductResponse } from "./product-model";
import { ProductValidation } from "./product-validation";

export class ProductService {
   
    static async create(request:ProductCreateRequest):Promise<ProductResponse>{
        
        const createRequest = Validation.validate(ProductValidation.CREATE,request)
        await ProviderService.checkKodeProviderUpdateAndDelete(createRequest.kode_providers)
        await this.checkProductDouble(createRequest.kode_produk)

        const response = await prismaClient.product.create({
            data:createRequest
        })

        return toProductResponse(response)
    }

    static async update(kodeProduk:string,request:ProductUpdateRequest):Promise<ProductResponse>{
        const updateProduct =  Validation.validate(ProductValidation.UPDATE,request)
        await ProviderService.checkKodeProviderUpdateAndDelete(updateProduct.kode_providers)
        await this.checkProductExist(kodeProduk)

        const response = await prismaClient.product.update({
            where:{
                kode_produk:kodeProduk
            },
            data:updateProduct
        })

        return toProductResponse(response)

    }

    static async delete(kodeProduk:string){
        await this.checkProductExist(kodeProduk)

        await prismaClient.product.delete({
            where:{
                kode_produk:kodeProduk
            }
        })
    }

    static async view(request:ProductViewRequest):Promise<Pageable<ProductResponse>>{
        const searchRequest = Validation.validate(ProductValidation.VIEW,request)

        const skip = (searchRequest.page - 1) * searchRequest.size

        const filters = []

        if(searchRequest.kode_produk){
            filters.push({
                kode_produk:{
                    contains: searchRequest.kode_produk 
                }
             })
        }
        if(searchRequest.nama_produk){
            filters.push({
                nama_produk:{
                    contains: searchRequest.nama_produk 
                }
             })
            }
            const products = await prismaClient.product.findMany({
                where:{
                    kode_providers:request.kode_providers,
                    AND:filters
                },
                orderBy: {
                    kode_produk: 'asc',
                  },
                take:searchRequest.size,
                skip:skip
            })
            
            const total = await prismaClient.product.count({
                where:{
                    AND:filters
                }
            })
    
           return{
            data:products.map(products => toProductResponse(products)),
            paging:{
                current_page: searchRequest.page,
                total_page:Math.ceil(total / searchRequest.size),
                size : searchRequest.size
            }
           }    
    }

    static async checkProductExist(kodeProduk:string){

        const check = await prismaClient.product.findFirst({
            where:{
                kode_produk:kodeProduk
            }
        })

        if(!check){
            throw  new ResponseErrorApi(404,"kode produk tidak di temukan")
        }

    }

    static async checkProductDouble(kodeProduk:string){

        const check = await prismaClient.product.count({
            where:{
                kode_produk:kodeProduk
            }
        })

        if(check != 0){
            throw  new ResponseErrorApi(404,"kode produk sudah di gunakan")
        }

    }



}