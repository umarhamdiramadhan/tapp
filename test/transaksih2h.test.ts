import supertest from "supertest"
import { CheckBalanceH2hTets } from "./utils/test-check-balance-h2h"
import { web } from "../src/application/web"
import { TransaksiH2hTest } from "./utils/test-transaksi-h2h-utils"

describe("/trx",()=>{

    afterEach(async()=>{
        await TransaksiH2hTest.deleteTransaksiTidakSupportMulti()
        await TransaksiH2hTest.deleteTransaksiSudahPernah()
        await TransaksiH2hTest.deleteDaftarHitam()
        await TransaksiH2hTest.deleteHargaGrupGangguan()
        await TransaksiH2hTest.deleteProviderGangguan()
        await TransaksiH2hTest.deleteProductGangguan()
        await TransaksiH2hTest.deleteProductTidakAktif()
        await TransaksiH2hTest.deleteLolosValidation()
        await TransaksiH2hTest.deleteGrupAndResellerSaldoTidakCukup()
        await TransaksiH2hTest.deleteResellerValidation()
        
    })

    beforeEach(async()=>{
        await TransaksiH2hTest.createResellerValidation()
        await TransaksiH2hTest.creteGrupAndResellerSaldoTidakCukup()
        await TransaksiH2hTest.productLolosValidation()
        await TransaksiH2hTest.createProductTidakAktif()
        await TransaksiH2hTest.createProductGangguan()
        await TransaksiH2hTest.createProviderGangguan()
        await TransaksiH2hTest.createHargaGrupGangguan()
        await TransaksiH2hTest.createDaftarHitam()
        await TransaksiH2hTest.createTransaksiSudahPernah()
        await TransaksiH2hTest.createTransaksiTidakSupportMulti()
    })

    it("should transaksi h2h vailed ip wrong",async()=>{  
            const response = await supertest(web)
            .get(`/trx`)
            .query({
                memberid:"TEST",
                password:"TEST",
                pin:"test",
                product:"test2",
                refID:"1234",
                qty:1,
                dest:"085156873132"
            })
            expect(response.text).toBe("ip yang anda masukan salah");
    })
    it("should transaksi h2h vailed zod error",async()=>{  
        const response = await supertest(web)
        .get(`/trx`)
        .query({
            memberid:"",
            password:"",
            pin:"",
            product:"",
            refID:"",
            qty:"",
            dest:""
            
        })
        expect(response.text).toBe("Validation Error Silahkan masukan memberId atau pin atau password");
    })
    it("should transaksi h2h memberid wrong",async()=>{  
        const response = await supertest(web)
        .get(`/trx`)
        .query({
            memberid:"test200",
            password:"password",
            pin:"122",
            product:"test2",
            refID:"1234",
            qty:1,
            dest:"085156873132"
            
        })
        expect(response.text).toBe("member Id Tidak di temukan");
    })
    it("should transaksi h2h password wrong",async()=>{  
        const response = await supertest(web)
        .get(`/trx`)
        .query({
            memberid:"TEST1",
            password:"password",
            pin:"122",
            product:"test2",
            refID:"1234",
            qty:1,
            dest:"085156873132"
            
        })
        expect(response.text).toBe("pin atau password salah");
    })
    it("should transaksi h2h password wrong",async()=>{  
        const response = await supertest(web)
        .get(`/trx`)
        .query({
            memberid:"TEST1",
            password:"test",
            pin:"122",
            product:"test2",
            refID:"1234",
            qty:1,
            dest:"085156873132",
            
            
        })
        expect(response.text).toBe("pin atau password salah");
    })

    it("should transaksi h2h masuk daftar hitam",async()=>{  
            const response = await supertest(web)
            .get(`/trx`)
            .query({
                memberid:"TEST1",
                password:"test",
                pin:"test",
                product:"test",
                refID:"1234",
                qty:1,
                dest:"083191051945",
                
            })
            console.log(response.text)
            expect(response.text).toBe("Transaksi dinomer 083191051945 status gagal, Gagal silahkan di alihkan transaksi test reffid 1234 #Transaksi Normal")
   
    })

    it("should transaksi h2h produk tidak ada",async()=>{  
        const response = await supertest(web)
        .get(`/trx`)
        .query({
            memberid:"TEST1",
            password:"test",
            pin:"test",
            product:"produk tidak ada",
            refID:"1234",
            qty:1,
            dest:"083191051945",
            
        })
        console.log(response.text)
        expect(response.text).toBe("Transaksi dinomer 083191051945 status gagal, kode produk tidak di temukan produk tidak ada reffid 1234 #Transaksi Normal")
    })

    it("should transaksi h2h saldo tidak cukup",async()=>{  
        const response = await supertest(web)
        .get(`/trx`)
        .query({
            memberid:"TEST2",
            password:"test",
            pin:"test",
            product:"test",
            refID:"1234",
            qty:1,
            dest:"0831910519456",
            
        })
        console.log(response.text)
        expect(response.text).toBe("Transaksi dinomer 0831910519456 status gagal, saldo tidak cukup test reffid 1234 #Transaksi Normal")
    })

    it("should transaksi h2h produk tidak aktif",async()=>{  
        const response = await supertest(web)
        .get(`/trx`)
        .query({
            memberid:"TEST1",
            password:"test",
            pin:"test",
            product:"test3",
            refID:"1234",
            qty:1,
            dest:"085156873132",
            
        })
        console.log(response.text)
        expect(response.text).toBe("Transaksi dinomer 085156873132 status gagal, kode produk tidak aktif test3 reffid 1234 #Transaksi Normal")
    })

    it("should transaksi h2h gangguan produk",async()=>{  
        const response = await supertest(web)
        .get(`/trx`)
        .query({
            memberid:"TEST1",
            password:"test",
            pin:"test",
            product:"test5",
            refID:"1234",
            qty:1,
            dest:"085156873132",
            
        })
        console.log(response.text)
        expect(response.text).toBe("Transaksi dinomer 085156873132 status gagal, Gangguan kode produk test5 reffid 1234 #Transaksi Normal")
    })

    it("should transaksi h2h gangguan provider",async()=>{  
        const response = await supertest(web)
        .get(`/trx`)
        .query({
            memberid:"TEST1",
            password:"test",
            pin:"test",
            product:"test6",
            refID:"1234",
            qty:1,
            dest:"085156873132",
            
        })
        console.log(response.text)
        expect(response.text).toBe("Transaksi dinomer 085156873132 status gagal, Gangguan kode produk test6 reffid 1234 #Transaksi Normal")
    })

     it("should transaksi h2h gangguan harga grup",async()=>{  
        const response = await supertest(web)
        .get(`/trx`)
        .query({
            memberid:"TEST1",
            password:"test",
            pin:"test",
            product:"test7",
            refID:"1234",
            qty:1,
            dest:"085156873132",
            
        })
        console.log(response.text)
        expect(response.text).toBe("Transaksi dinomer 085156873132 status gagal, Gangguan kode produk test7 reffid 1234 #Transaksi Normal")
    })


    it("should transaksi h2h sudah pernah transaksi",async()=>{  
        const response = await supertest(web)
        .get(`/trx`)
        .query({
            memberid:"TEST1",
            password:"test",
            pin:"test",
            product:"test",
            refID:"1234",
            qty:1,
            dest:"081111111111",
            
        })
        console.log(response.text)

        expect(response.text).toMatch(/Transaksi dinomer 081111111111 status sudah pernah, Sukses kode produk test reffid 1234 saldo 20.000 - 5.000 = 20.000/)
    })

    it("should transaksi h2h tidak support multi",async()=>{  
        const response = await supertest(web)
        .get(`/trx`)
        .query({
            memberid:"TEST1",
            password:"test",
            pin:"test",
            product:"test8",
            refID:"123422",
            qty:1,
            dest:"0811111",
            
        })
        console.log(response.text)
        expect(response.text).toBe("Transaksi dinomer 0811111 status gagal, tidak support transaksi multi test8 reffid 123422 #Transaksi Normal")
    })

    
    it("should transaksi h2h tidak support multi",async()=>{  
        const response = await supertest(web)
        .get(`/trx`)
        .query({
            memberid:"TEST1",
            password:"test",
            pin:"test",
            product:"test",
            refID:"123456",
            qty:1,
            dest:"0851568731323",
            
        })
        console.log(response.text)
        expect(response.text).toMatch(/Transaksi dinomer 0851568731323 status diproses, Menunggu kode produk test reffid 123456 saldo 1.000.000 - 5.000 = -995.000 TrxId/)
    })
})
