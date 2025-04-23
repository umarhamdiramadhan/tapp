import { HargaGrup } from "@prisma/client";
import { prismaClient } from "../../src/application/database";

export class HargaGrupTest {

    static async create(){
        await prismaClient.hargaGrup.create({
            data:{
                kode_grups:"umar",
                kode_produks:"xl1",
                harga:200000,
                is_gangguan:false
            }
        })
        await prismaClient.hargaGrup.create({
            data:{
                kode_grups:"kumar",
                kode_produks:"xl1",
                harga:200000,
                is_gangguan:false
            }
        })
        await prismaClient.product.create({
            data:{
                kode_produk:"xl3",
                nama_produk:"xl3",
                kode_providers:"umar",
                is_aktif:true,
                is_gangguan:false,
                is_multi:false
            }
        }),
        await prismaClient.hargaGrup.create({
            data:{
                kode_grups:"umar",
                kode_produks:"xl3",
                harga:200000,
                is_gangguan:false
            }
        })
    }

    static async delete(){
        await prismaClient.hargaGrup.deleteMany({
            where:{
                kode_produks:"xl1",
            }
        })
        await prismaClient.hargaGrup.deleteMany({
            where:{
                kode_produks:"xl2",
            }
        })
        await prismaClient.hargaGrup.deleteMany({
            where:{
                kode_produks:"xl7",
            }
        })
        await prismaClient.hargaGrup.deleteMany({
            where:{
                kode_produks:"xl2",
            }
        })
        await prismaClient.hargaGrup.deleteMany({
            where:{
                kode_produks:"xl3",
            }
        })
        await prismaClient.grup.deleteMany({
            where:{
                kode_grup:"hammmmdi",
            }
        })
    }

    static async get(): Promise<HargaGrup> {
        const contact = await prismaClient.hargaGrup.findFirst({
            where: {
                kode_produks: "xl1"
            }
        });

        if (!contact) {
            throw new Error("Contact is not found");
        }

        return contact;
    }

}