import { prismaClient } from "../../src/application/database"
import bcrypt from "bcrypt"

export class TransaksiH2hTest { 
      
    static async createResellerValidation(){
          await prismaClient.grup.create({
                data:{
                    kode_grup:"test",
                    nama_grup:"test"
                }
            })
            
            await prismaClient.reseller.create({
                    data:{
                        kode_reseller:"TEST",
                        nama_reseller:"TEST",
                        alamat:"TEST",
                        nomer_telefon:"TEST",
                        pin: await bcrypt.hash("test", 10),
                        password_ip:await bcrypt.hash("test", 10),
                        ip:"TEST",
                        allow_sign:false,
                        kode_grups:"test"
                    }
                })
                
                //reseller ada saldo dan lolos validasi
                await prismaClient.reseller.create({
                    data:{
                        kode_reseller:"TEST1",
                        nama_reseller:"TEST1",
                        alamat:"TEST1",
                        nomer_telefon:"TEST1",
                        pin: await bcrypt.hash("test", 10),
                        password_ip:await bcrypt.hash("test", 10),
                        ip:"::ffff:127.0.0.1",
                        allow_sign:false,
                        kode_grups:"test",
                        saldo:1000000
                    }
                })
    }  

    
    static async deleteResellerValidation(){
        
        await prismaClient.reseller.deleteMany({
            where:{
                kode_reseller:"TEST"
            }
        })
        
        await prismaClient.reseller.deleteMany({
            where:{
                kode_reseller:"TEST1"
            }
        })

        await prismaClient.grup.deleteMany({
            where:{
                kode_grup:"test"
            }
        })

    }


    static async productLolosValidation(){
        await prismaClient.provider.create({
            data:{
                kode_provider:"test",
                nama_provider:"test"
            }
        })
        await prismaClient.product.create({
            data:{
                kode_produk:"test",
                kode_providers:"test",
                nama_produk:"test",
                is_aktif:true,
                is_gangguan:false,
                is_multi:false
            }
        })

        await prismaClient.product.create({
            data:{
                kode_produk:"test8",
                kode_providers:"test",
                nama_produk:"test",
                is_aktif:true,
                is_gangguan:false,
                is_multi:true
            }
        })


        await prismaClient.hargaGrup.create({
            data:{
                kode_grups:"test",
                kode_produks:"test",
                harga:5000,
            }
        })

        await prismaClient.hargaGrup.create({
            data:{
                kode_grups:"test",
                kode_produks:"test8",
                harga:5000,
            }
        })
    }

    static async deleteLolosValidation(){
        await prismaClient.hargaGrup.deleteMany({
            where:{
                kode_produks:"test"
            }
        })
        await prismaClient.hargaGrup.deleteMany({
            where:{
                kode_produks:"test8"
            }
        })
        await prismaClient.product.deleteMany({
            where:{
                kode_produk:"test"
            }
        })
        await prismaClient.product.deleteMany({
            where:{
                kode_produk:"test8"
            }
        })
        await prismaClient.provider.deleteMany({
          where:{
            kode_provider:"test"
          }  
        })
    }
    

    static async createDaftarHitam(){
        await prismaClient.daftarHitam.create({
            data:{
                nomer_tujuan:"083191051945"
            }
        })
    }

    static async deleteDaftarHitam(){
        await prismaClient.daftarHitam.deleteMany({
            where:{
                nomer_tujuan:"083191051945"
            }
        })
    }

  

    static async creteGrupAndResellerSaldoTidakCukup(){
        await prismaClient.reseller.create({
            data:{
                kode_reseller:"TEST2",
                nama_reseller:"TEST2",
                alamat:"TEST1",
                nomer_telefon:"TEST2",
                pin: await bcrypt.hash("test", 10),
                password_ip:await bcrypt.hash("test", 10),
                ip:"::ffff:127.0.0.1",
                allow_sign:false,
                kode_grups:"test",
                saldo:200
            }
        })
    }

    static async deleteGrupAndResellerSaldoTidakCukup(){
        await prismaClient.reseller.delete({
            where:{
                kode_reseller:"TEST2"
            }
        })
    }

    static async createProductTidakAktif(){
        await prismaClient.provider.create({
            data:{
                kode_provider:"test3",
                nama_provider:"test", 
            }
        })
        await prismaClient.product.create({
            data:{
                kode_produk:"test3",
                kode_providers:"test3",
                nama_produk:"test",
                is_aktif:false,
                is_gangguan:false,
                is_multi:false
            }
        })

        await prismaClient.hargaGrup.create({
            data:{
                kode_grups:"test",
                kode_produks:"test3",
                harga:1000,
            }
        })
    }

    static async deleteProductTidakAktif(){

        await prismaClient.hargaGrup.deleteMany({
            where:{
                kode_produks:"test3"
            }
        })
    
        await prismaClient.product.deleteMany({
            where:{
                kode_produk:"test3"
            }
        })
    

        await prismaClient.provider.deleteMany({
            where:{
                kode_provider:"test3"
            }
        })

    }

    static async createProductGangguan(){
        await prismaClient.provider.create({
            data:{
                kode_provider:"test5",
                nama_provider:"test5"
            }
        })

        await prismaClient.product.create({
            data:{
                kode_providers:"test5",
                kode_produk:"test5",
                nama_produk:"test5",
                is_gangguan:true
            }
        })

        await prismaClient.hargaGrup.create({
            data:{
                kode_grups:"test",
                kode_produks:"test5",
                harga:10000
            }
        })
        
    }

    static async deleteProductGangguan(){
        await prismaClient.hargaGrup.deleteMany({
            where:{
                kode_produks:"test5"
            }
        })
        await prismaClient.product.deleteMany({
            where:{
                kode_produk:"test5"
            }
        })
        
        await prismaClient.provider.deleteMany({
            where:{
                kode_provider:"test5"
            }
        })
    }

    static async createProviderGangguan(){
        await prismaClient.provider.create({
            data:{
                kode_provider:"test6",
                nama_provider:"test6",
                is_gangguan:true
            }
        })

        await prismaClient.product.create({
            data:{
                kode_providers:"test6",
                kode_produk:"test6",
                nama_produk:"test6",
            }
        })

        await prismaClient.hargaGrup.create({
            data:{
                kode_grups:"test",
                kode_produks:"test6",
                harga:10000
            }
        })
    }

    static async deleteProviderGangguan(){
        await prismaClient.hargaGrup.deleteMany({
            where:{
                kode_produks:"test6"
            }
        })
        await prismaClient.product.deleteMany({
            where:{
                kode_produk:"test6"
            }
        })
        
        await prismaClient.provider.deleteMany({
            where:{
                kode_provider:"test6"
            }
        })
    }

    static async createHargaGrupGangguan(){
        await prismaClient.provider.create({
            data:{
                kode_provider:"test7",
                nama_provider:"test7",
            }
        })

        await prismaClient.product.create({
            data:{
                kode_providers:"test7",
                kode_produk:"test7",
                nama_produk:"test7",
            }
        })

        await prismaClient.hargaGrup.create({
            data:{
                kode_grups:"test",
                kode_produks:"test7",
                harga:10000,
                is_gangguan:true
            }
        })
    }

    static async deleteHargaGrupGangguan(){
        await prismaClient.hargaGrup.deleteMany({
            where:{
                kode_produks:"test7"
            }
        })
        await prismaClient.product.deleteMany({
            where:{
                kode_produk:"test7"
            }
        })
        
        await prismaClient.provider.deleteMany({
            where:{
                kode_provider:"test7"
            }
        })
    }

    static async createTransaksiSudahPernah(){
        await prismaClient.transaction.create({
            data:{
                reffid:"1234",
                kode_produks:"test",
                harga:5000,
                nomer_tujuan:"081111111111",
                saldo_akhir:20000,
                saldo_awal:20000,
                status:"Sukses",
                counter:1,
                kode_resellers:"TEST1"
            }
        })

    }

    static async deleteTransaksiSudahPernah(){
        await prismaClient.transaction.deleteMany({
            where:{
                reffid:"1234"
            }
        })
    }

    static async createTransaksiTidakSupportMulti(){
        await prismaClient.transaction.create({
            data:{
                reffid:"12345",
                kode_produks:"test8",
                harga:5000,
                nomer_tujuan:"0811111",
                saldo_akhir:20000,
                saldo_awal:20000,
                status:"Sukses",
                counter:1,
                kode_resellers:"TEST1"

            }
        })
    }   
    static async deleteTransaksiTidakSupportMulti(){
        await prismaClient.transaction.deleteMany({
            where:{
                reffid:"12345"
            }
        })

        await prismaClient.transaction.deleteMany({
            where:{
                reffid:"123456"
            }
        })
    }

}