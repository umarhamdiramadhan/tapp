import { prismaClient } from "../../src/application/database";
import bcrypt from "bcrypt";


export class CheckBalanceH2hTets{

    static async createGrupAndReseller(){
        await prismaClient.grup.create({
            data:{
                kode_grup:"test",
                nama_grup:"test"
            }
        })

        await prismaClient.reseller.create({
            data:{
                kode_reseller:"TEST",
                nama_reseller:"TEST",
                alamat:"TEST",
                nomer_telefon:"TEST",
                pin: await bcrypt.hash("test", 10),
                password_ip:await bcrypt.hash("test", 10),
                ip:"TEST",
                allow_sign:false,
                kode_grups:"test"
            }
        })

        await prismaClient.reseller.create({
            data:{
                kode_reseller:"TEST1",
                nama_reseller:"TEST1",
                alamat:"TEST1",
                nomer_telefon:"TEST1",
                pin: await bcrypt.hash("test", 10),
                password_ip:await bcrypt.hash("test", 10),
                ip:"::ffff:127.0.0.1",
                allow_sign:false,
                kode_grups:"test",
            }
        })
    }
    static async deleteAll(){
        await prismaClient.reseller.deleteMany({
            where:{
                kode_reseller:"TEST"
            }
        }) 
        await prismaClient.reseller.deleteMany({
            where:{
                kode_reseller:"TEST1"
            }
        }) 
        
        await prismaClient.grup.deleteMany({
            where:{
                kode_grup:"test"
            }
        })  
     
        
        
    }


}