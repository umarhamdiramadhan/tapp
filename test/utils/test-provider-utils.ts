
import { Provider } from "@prisma/client";
import { prismaClient } from "../../src/application/database";

export class ProviderTest {

    static async create(){
        await prismaClient.provider.create({
          data:{
            kode_provider:"umar",
            nama_provider:"hamdi",
            is_gangguan:false,
            prefix:"0815,0816",
            minimal:1,
            maxsimal:1
          }
        })
        await prismaClient.provider.create({
            data:{
              kode_provider:"hamdi",
              nama_provider:"hamdi",
              is_gangguan:false,
              prefix:"0815,0816",
              minimal:1,
              maxsimal:1
            }
          })
          await prismaClient.provider.create({
            data:{
              kode_provider:"umar1",
              nama_provider:"hamdi",
              is_gangguan:false,
              prefix:"0815,0816",
              minimal:1,
              maxsimal:1
            }
          })
    }

    

    static async get():Promise<Provider>{
        const grup = await prismaClient.provider.findFirst({
            where: {
                kode_provider: "umar"
            }
        })

        if (!grup) {
            throw new Error("User is not found");
        }

        return grup;
    }

    static async delete(){
        await prismaClient.provider.deleteMany({
            where:{
                kode_provider:"umar"
            }
        })
        await prismaClient.provider.delete({
            where:{
              kode_provider:"hamdi",
            }
          })
        await prismaClient.provider.deleteMany({
            where:{
                kode_provider:"ramadhan"
            }
        })
        await prismaClient.provider.deleteMany({
            where:{
                kode_provider:"mmmm"
            }
        })
        await prismaClient.provider.deleteMany({
            where:{
                kode_provider:"umar1"
            }
        })
    }

}