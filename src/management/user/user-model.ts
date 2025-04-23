import { User } from "@prisma/client"

export type UserResponse = {
    email:string
    name:string
    token?:string
    is_aktif:boolean
    role:string,
}

enum Status{
    administrator,
    admin,
    cs,
    operator
}

export type UserCreate = {
    email:string
    name:string
    password:string
    role:Status
    is_aktif:boolean
}

export type UserLogin = {
    email:string
    password:string
}

export type UserUpdate = {
    email:string
    name:string
    password:string
    role:Status
    is_aktif:boolean
    token?:string | null
}

export type UserDelete = {
    email:string
}

export type UserView = {
    email:string
    name:string
    page: number
    size: number
}


export function toUserResponse(user:User):UserResponse{
    return{
        email:user.email,
        name:user.name,
        role:user.role,
        is_aktif:user.is_aktif
    }
}

