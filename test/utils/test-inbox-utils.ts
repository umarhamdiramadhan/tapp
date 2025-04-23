import { prismaClient } from "../../src/application/database"

export class InboxTest {

    static async create(){
        await prismaClient.inbox.create({
          data:{
            pesan:"report?serverid=dfj429du0roju512&clientid=4139582&statuscode=1&kp=ttp10&msisdn=0895385779558&sn=Selamat, kirim pulsa berhasil dilakukan ke 0895385779558 senilai Rp.10000 pada 04/01 18.00.24. SENDER = 089677553601&msg=TRX ttp10.0895385779558 BERHASIL, HRG:10505 SN:Selamat, kirim pulsa berhasil dilakukan ke 0895385779558 senilai Rp.10000 pada 04/01 18.00.24. SENDER = 089677553601. SISA SALDO:3138...",
          }
        })          
    }

    static async deleteAll(){
        await prismaClient.inbox.deleteMany({
            where:{
                pesan:"report?serverid=dfj429du0roju512&clientid=4139582&statuscode=1&kp=ttp10&msisdn=0895385779558&sn=Selamat, kirim pulsa berhasil dilakukan ke 0895385779558 senilai Rp.10000 pada 04/01 18.00.24. SENDER = 089677553601&msg=TRX ttp10.0895385779558 BERHASIL, HRG:10505 SN:Selamat, kirim pulsa berhasil dilakukan ke 0895385779558 senilai Rp.10000 pada 04/01 18.00.24. SENDER = 089677553601. SISA SALDO:3138...",
            }
        })
    }
}