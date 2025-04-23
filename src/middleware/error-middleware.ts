import { NextFunction,Request,Response } from "express";
import { ZodError } from "zod";
import { ResponseErrorApi } from "../error/response-error-api";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { logger } from "../application/logging";


export const errorMiddleware = async(error:Error,req:Request,res:Response,next:NextFunction)=>{
    if(error instanceof ZodError){
        res.status(400).json({
            errors: `Validation Error : ${JSON.stringify(error)}`
        });
    }else if(error instanceof ResponseErrorApi){
        res.status(error.status).json({
            errors: error.message
        })

    }else if(error instanceof PrismaClientKnownRequestError){
        res.status(400).json({
            errors: "value yang kamu masukan duplikat"
        });
    }else{
       logger.error(`eror 500 ${error}`)
        res.status(500).json({
            errors: error.message
        });
    }
}