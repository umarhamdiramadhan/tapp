import { Modul } from "@prisma/client";
import { prismaClient } from "../../src/application/database";

export class ModulTets{
    static async crete(){
        await prismaClient.modul.create({
            data:{
                nama_moduls:"UMAR",
                ip:"127",
                jawabans:"UMAR",
                perintah:"PERINTAH",
                antrian_produk:0,
                cek_saldo:"cek saldo",
                memberid:"hamdi",
                password:"parsing",
                pin:"12345",
                tiket:"tiket",
                total_antrian:0,
                username:"hamdi",
            }
        })
    }

    static async delete(){
        await prismaClient.modul.deleteMany({
            where:{
                nama_moduls:"UMAR"
            }
        })
        await prismaClient.modul.deleteMany({
            where:{
                nama_moduls:"HAMDI"
            }
        })
    }

    static async view():Promise<Modul>{
        const check = await prismaClient.modul.findFirst({
            where:{
                nama_moduls:"UMAR"
            }
        })

        if (!check) {
            throw new Error("Contact is not found");
        }

        return check
    }

}