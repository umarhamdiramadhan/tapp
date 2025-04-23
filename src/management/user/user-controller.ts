import e, { NextFunction,request,Request,Response } from "express";
import { UserCreate, UserDelete, UserLogin, UserResponse, UserUpdate, UserView } from "./user-model";
import { UserService } from "./user-service";
import { UserRequest } from "../../type/user-request";

export class UserController {

    static async register(req:UserRequest,res:Response,next:NextFunction){
        try {
            const request:UserCreate = req.body as UserCreate
            const response = await UserService.register(req.user!,request)
            res.status(200).json({
                data:response
            })
        } catch (error) {
            next(error)
        }
    }

    static async login(req:Request,res:Response,next:NextFunction){
        try {

            const request:UserLogin = req.body as UserLogin
            const response = await UserService.login(request)
            res.status(200).json({
                data:response
            })
            
        } catch (error) {
            next(error)
        }
    }

    static async update(req:UserRequest,res:Response,next:NextFunction){
        try {

            const request:UserUpdate = req.body as UserUpdate
            request.email = req.params.email
            request.token = null
            const response = await UserService.update(req.user!,request)
            res.status(200).json({
                data:response
            })
            
        } catch (error) {
            next(error)
        }
    }

    static async delete(req:UserRequest,res:Response,next:NextFunction){
        try {
           
            const request:UserDelete = {
                email:req.params.email
            }
            await UserService.delete(req.user!,request)
            res.status(200).json({
                data:"berhasil menghapus username"
            })
            
        } catch (error) {
            next(error)
        }
    }

    static async logout(req:UserRequest,res:Response,next:NextFunction){
        try {
            await UserService.logout(req.user!)
            res.status(200).json({
                data:"berhasil logout"
            })

        } catch (error) {
            next(error)
        }
    }

    static async get(req:UserRequest,res:Response,next:NextFunction){
        try {

            const request:UserView = {
                name: req.query.name as string,
                email: req.query.email as string,
                page: req.query.page ? Number(req.query.page) : 1,
                size: req.query.size ? Number(req.query.size) : 10,
            }

            const response = await UserService.view(request)
            res.status(200).json(response)
            
        } catch (error) {
            next(error)
        }
    }

}   