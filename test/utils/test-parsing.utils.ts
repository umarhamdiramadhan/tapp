import { Parsing } from "@prisma/client";
import { prismaClient } from "../../src/application/database";
import { ModulTets } from "./test-modul-util";

export class ParsingTest {
    static async create(){
        const modul = await ModulTets.view()

        await prismaClient.parsing.create({
            data:{
                kode_produks:"xl1",
                parsing:"hamdi",
                prioritas:1,
                harga_beli:20,
                id_moduls:modul.id,
            }
        })
    }


    static async get(): Promise<Parsing> {
        const parsing = await prismaClient.parsing.findFirst({
            where: {
                kode_produks:"xl1",   
            }
        })

        if (!parsing) {
            throw new Error("User is not found");
        }

        return parsing;
    }

    static async delete(){
        await prismaClient.parsing.deleteMany({
            where:{
                kode_produks:"xl1"
            }
        })
        await prismaClient.parsing.deleteMany({
            where:{
                kode_produks:"xl2"
            }
        })
    }


}