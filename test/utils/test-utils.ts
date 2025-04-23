import { User } from "@prisma/client";
import {prismaClient} from "../../src/application/database";
import bcrypt from "bcrypt";



export class UserTest{
    
    static async delete(){
        await prismaClient.user.deleteMany({
            where:{
                email:"admin@gmail.com"
            }
        })

        await prismaClient.user.deleteMany({
              where:{
                  email:"umar@gmail.com"
              }
        })
        await prismaClient.user.deleteMany({
            where:{
                email:"cs@gmail.com"
            }
      })
      await prismaClient.user.deleteMany({
        where:{
            email:"operator@gmail.com"
        }
    })
    }

    static async create(){
        await prismaClient.user.create({
            data:{
                email:"admin@gmail.com",
                name:"admin",
                password: await bcrypt.hash("test", 10),
                token: "test",
                role:"administrator",
                is_aktif:true
            }
        })

        await prismaClient.user.create({
            data:{
                email:"cs@gmail.com",
                name:"cs",
                password: await bcrypt.hash("test", 10),
                token: "cs",
                role:"cs",
                is_aktif:true
            }
        })
        await prismaClient.user.create({
            data:{
                email:"operator@gmail.com",
                name:"operator",
                password: await bcrypt.hash("test", 10),
                token: "testing",
                role:"operator",
                is_aktif:false
            }
        })
    }

    static async get(): Promise<User> {
        const user = await prismaClient.user.findFirst({
            where: {
                email: "admin@gmail.com"
            }
        })

        if (!user) {
            throw new Error("User is not found");
        }

        return user;
    }



}