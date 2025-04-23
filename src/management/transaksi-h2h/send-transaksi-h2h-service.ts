import { prismaClient } from "../../application/database";
import { ResponseErrorApiH2h } from "../../error/response-error-api-h2h";
import { ApiClient } from "../api-client/api-client.service";
import { ResponseTransaksiMenunggu } from "./transaksi-h2h-model";

export class SendTransaksiH2hService{
    static async send(id_modul:number|null,trxid:number,nomer_tujuan:string,kode_produk:string){

        if(id_modul === null){
        throw new ResponseErrorApiH2h("tidak ada modul"); 
        }else{
            const modul = await prismaClient.modul.findFirst({
                where:{
                    id:id_modul
                }
            })
            const replaced = modul!.perintah
            .replace(/[username]/g, `${modul?.username}`)
            .replace(/[password]/g, `${modul?.password}`)
            .replace(/[memberid]/g,`${modul?.memberid}`)
            .replace(/[pin]/g, `${modul?.pin}`)
            .replace(/[tujuan]/g, `${nomer_tujuan}`)
            .replace(/[trxid]/g, `${trxid}`)
             
            await ApiClient.sendApiClient(modul!.ip,replaced)

        

        }
       

       
    }
}