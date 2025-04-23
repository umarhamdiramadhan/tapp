import { User } from "@prisma/client";
import { prismaClient } from "../../application/database";
import { Validation } from "../../validation/validation";
import { toUserResponse, UserCreate, UserDelete, UserLogin, UserResponse, UserUpdate, UserView } from "./user-model";
import { UserValidation } from "./user-validation";
import bcrypt from "bcrypt";
import {v4 as uuid} from "uuid";
import { ResponseErrorApi } from "../../error/response-error-api";
import { Pageable } from "../page/page";

export class UserService {

    
    static async register(user:User,request:UserCreate):Promise<UserResponse>{
   
        const registerRequest = Validation.validate(UserValidation.REGISTER,request)
        await this.checkIsAdministrator(user.email)
        

        const totalEmailWithSameUsername = await prismaClient.user.count({
           where:{
            email:registerRequest.email
           }
        })

        if(totalEmailWithSameUsername != 0){
            throw new ResponseErrorApi(400,"email al ready exist")
        }

        registerRequest.password = await bcrypt.hash(registerRequest.password,12)

        const userCreate = await prismaClient.user.create({
            data:registerRequest
        })

        return toUserResponse(userCreate)

    }

    static async login(request:UserLogin):Promise<UserResponse>{
        
    const loginRequest = Validation.validate(UserValidation.LOGIN,request)

        let user = await prismaClient.user.findUnique({
            where:{
                email:loginRequest.email
            }
        })

        if(!user){
            throw new ResponseErrorApi(401,"email or password is wrong")
        }

        const isPasswordInvalid = await bcrypt.compare(loginRequest.password,user.password)
        
        if(!isPasswordInvalid){
            throw new ResponseErrorApi(401,"email or password is wrong")
        }


        if(user.is_aktif == false){
            throw new ResponseErrorApi(401,"user anda tidak aktif")
        }


        user = await prismaClient.user.update({
            where:{
                email:loginRequest.email
            },
            data:{
                token:uuid()
            }
        })

        const response = toUserResponse(user)
        response.token = user.token!
        return(response)
        console.log(`ini response login${response}`)

 

    }

    static async update(user:User,request:UserUpdate):Promise<UserResponse>{
        
        const updateRequest = Validation.validate(UserValidation.UPDATE,request)

        await this.checkIsEmail(updateRequest.email)
        
        await this.checkIsAdministrator(user.email)
        
        if(updateRequest.password != undefined){
            updateRequest.password = await bcrypt.hash(updateRequest.password,12)
        }
        

        const result = await prismaClient.user.update({
            where:{
                email:updateRequest.email
            },
            data:updateRequest
        })

        return toUserResponse(result)
    }

    static async delete(user:User,request:UserDelete):Promise<UserResponse>{

        const requestDelete = Validation.validate(UserValidation.DELETE,request)


        await this.checkIsEmail(requestDelete.email)
    
        await this.checkIsAdministrator(user.email)
        
       
        const deleteUser = await prismaClient.user.delete({
            where:{
                email:requestDelete.email
            }
        })
        return toUserResponse(user)
    }

    static async logout(user:User):Promise<UserResponse>{
        const result = await prismaClient.user.update({
            where:{
                email:user.email
            },
            data:{
                token:null
            }
        })
        return toUserResponse(result)
    }


    static async view(request:UserView):Promise<Pageable<UserResponse>>{

        const searchRequest = Validation.validate(UserValidation.VIEW,request)
        const skip = (searchRequest.page - 1) * searchRequest.size
        

        const filters = []

        if(searchRequest.email){
            filters.push({
                email:{
                    contains:searchRequest.email
                }
            })
        }

        if(searchRequest.name){
            filters.push({
                name:{
                    contains:searchRequest.name
                }
            })
        }

        const users = await prismaClient.user.findMany({
            where:{
                AND:filters
            },
            take:searchRequest.size,
            skip:skip
        })

        const total = await prismaClient.user.count({
            where:{
                AND:filters
            }
        })

        return{
            data:users.map(users => toUserResponse(users)),
            paging:{
                current_page:searchRequest.page,
                total_page:Math.ceil(total / searchRequest.size),
                size:searchRequest.size
            }   
        }

    }


    static async checkIsAdministrator(emailCheck:string){

        const checkUserRole = await prismaClient.user.findFirst({
            where:{
                email:emailCheck
            }
        })

        if(checkUserRole?.role != "administrator" ){
           throw new ResponseErrorApi(400,"gagal user anda bukan reseller")
        }
        
    }

    static async checkIsEmail(email:string){
        const checkEmailUser = await prismaClient.user.findUnique({
            where:{
                email:email
            }
        })
        if(!checkEmailUser){
            throw new ResponseErrorApi(400,"email tidak di temukan")
        }
    }

}