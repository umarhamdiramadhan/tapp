import { DaftarHitam, Product } from "@prisma/client";
import { prismaClient } from "../../src/application/database";

export class ProductTest {

    static async delete(){
        await prismaClient.product.deleteMany({
            where:{
                kode_produk:"xl1"
            }
        })
        await prismaClient.product.deleteMany({
            where:{
                kode_produk:"xl2"
            }
        })
         const xl13 =   await prismaClient.product.deleteMany({
            where:{
                kode_produk:"xl3"
            }
        })
        await prismaClient.product.deleteMany({
            where:{
                kode_produk:"xl7"
            }
        })

    }

    static async create(){
        await prismaClient.product.create({
            data:{
                kode_produk:"xl1",
                nama_produk:"xl1",
                kode_providers:"umar",
                is_aktif:true,
                is_gangguan:false,
                is_multi:false
            }
        }),
        await prismaClient.product.create({
            data:{
                kode_produk:"xl2",
                nama_produk:"xl2",
                kode_providers:"umar",
                is_aktif:true,
                is_gangguan:false,
                is_multi:false
            }
        })
        await prismaClient.product.create({
            data:{
                kode_produk:"xl7",
                nama_produk:"xl2",
                kode_providers:"umar1",
                is_aktif:true,
                is_gangguan:false,
                is_multi:false
            }
        })

    }

    static async get(): Promise<Product> {
        const product = await prismaClient.product.findFirst({
            where: {
                kode_produk: "085156873132"
            }
        })

        if (!product) {
            throw new Error("User is not found");
        }

        return product;
    }





    

}