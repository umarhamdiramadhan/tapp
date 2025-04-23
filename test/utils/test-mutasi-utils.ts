import { prismaClient } from "../../src/application/database";

export class MutasiTest {


    static async delete(){
        await prismaClient.mutasi.deleteMany({
            where:{
                kode_resellers:"umar"
            }
        })
    }

}