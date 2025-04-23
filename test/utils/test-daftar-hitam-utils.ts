import { DaftarHitam } from "@prisma/client";
import { prismaClient } from "../../src/application/database";

export class DaftarHitamTest {

    static async delete(){
        await prismaClient.daftarHitam.deleteMany({
            where:{
                nomer_tujuan:"085156873132"
            }
        })

    }

    static async create(){
        await prismaClient.daftarHitam.create({
            data:{
                nomer_tujuan:"085156873132",
                keterangan:"fraud"
            }
        })


    }

    static async get(): Promise<DaftarHitam> {
        const daftarHitam = await prismaClient.daftarHitam.findFirst({
            where: {
                nomer_tujuan: "085156873132"
            }
        })

        if (!daftarHitam) {
            throw new Error("User is not found");
        }

        return daftarHitam;
    }





    

}