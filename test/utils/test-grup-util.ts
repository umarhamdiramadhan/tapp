import { Grup } from "@prisma/client";
import { prismaClient } from "../../src/application/database";

export class GrupTest {

    static async create(){
        await prismaClient.grup.create({
          data:{
            kode_grup:"umar",
            nama_grup:"hamdi"
          }
        })
        await prismaClient.grup.create({
            data:{
              kode_grup:"kumar",
              nama_grup:"hamdi"
            }
          })
          
    }

    

    static async get():Promise<Grup>{
        const grup = await prismaClient.grup.findFirst({
            where: {
                kode_grup: "umar"
            }
        })

        if (!grup) {
            throw new Error("User is not found");
        }

        return grup;
    }

    static async delete(){
        await prismaClient.grup.deleteMany({
            where:{
                kode_grup:"umar"
            }
        })
        await prismaClient.grup.deleteMany({
            where:{
              kode_grup:"kumar",
            }
          })
        await prismaClient.grup.deleteMany({
            where:{
                kode_grup:"hamdi"
            }
        })
        await prismaClient.grup.deleteMany({
            where:{
                kode_grup:"ramadhan"
            }
        })
    }

}