import { prismaClient } from "../../src/application/database"

export class TiketTest {

    static async create(){
        await prismaClient.tiket.create({
          data:{
            kode_resellers:"TEST1",
            nominal_ticket:20000,
            nominal_sama:20000
          }
        })          
    }

    static async deleteAll(){
        await prismaClient.tiket.deleteMany({
            where:{
              kode_resellers:"TEST1"
            }
        })
    }
}