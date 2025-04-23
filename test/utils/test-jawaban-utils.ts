import { Jawaban } from "@prisma/client";
import { prismaClient } from "../../src/application/database";
export class JawabanTest{
    static async create(){
        await prismaClient.jawaban.create({
            data:{
                nama_jawaban:"UMAR",
                kata_kunci:"SUKSES",
                generate_sn:"regex",
                is_update:false,
                prioritas:1,
                regex:"regex",
                status:"sukses"
            }
        })
    }
    static async delete(){
        await prismaClient.jawaban.deleteMany({
            where:{
                nama_jawaban:"UMAR"
            }
        })
        await prismaClient.jawaban.deleteMany({
            where:{
                nama_jawaban:"HAMDI"
            }
        })
    }
    static async view():Promise<Jawaban>{
        const jawaban = await prismaClient.jawaban.findFirst({
            where:{
                nama_jawaban:"UMAR"
            }
        })

        if (!jawaban) {
            throw new Error("Contact is not found");
        }

        return jawaban

    }

}