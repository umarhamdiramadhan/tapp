import { prismaClient } from "../../src/application/database";

export class ResellerTest{


    static async delete(){
        await prismaClient.reseller.deleteMany({
            where:{
                kode_reseller:"umar"
            }
        })
        await prismaClient.reseller.deleteMany({
            where:{
                kode_reseller:"hamdi"
            }
        })
        await prismaClient.reseller.deleteMany({
            where:{
                kode_reseller:"roro"
            }
        })
        await prismaClient.reseller.deleteMany({
            where:{
                kode_reseller:"joko"
            }
        })
        
    }

    static async crate(){
        await prismaClient.reseller.create({
           data:{
            kode_reseller:"hamdi",
            nama_reseller:"umarhamdi",
            ip:"192.168.0.1",
            ip_callback:"aaaa",
            password_ip:"",
            is_aktif:true,
            alamat:"cakung",
            nama_pemilik:"hamdi",
            nomer_telefon:"+6285146873133",
            id_telegram:"@hamdi",
            allow_sign:false,
            pin:"wow",
            kode_grups:"umar"
           }
        })
        await prismaClient.reseller.create({
            data:{
             kode_reseller:"roro",
             nama_reseller:"umarhamdi",
             ip:"192.168.0.1",
             ip_callback:"aaaa",
             password_ip:"",
             is_aktif:true,
             alamat:"cakung",
             nama_pemilik:"hamdi",
             nomer_telefon:"+6285146873139",
             id_telegram:"@hamdi",
             allow_sign:false,
             pin:"wow",
             kode_grups:"umar"
            }
         })
    }

    static async tambahSaldo(){
        await prismaClient.reseller.create({
            data:{
             kode_reseller:"joko",
             nama_reseller:"umarhamdi",
             ip:"192.168.0.1",
             ip_callback:"aaaa",
             password_ip:"",
             is_aktif:true,
             saldo:200000,
             alamat:"cakung",
             nama_pemilik:"hamdi",
             nomer_telefon:"+6285146873139",
             id_telegram:"@hamdi",
             allow_sign:false,
             pin:"wow",
             kode_grups:"umar"
            }
         })
    }


}