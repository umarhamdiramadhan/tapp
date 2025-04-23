import supertest from "supertest"
import { JawabanTest } from "./utils/test-jawaban-utils"
import { ModulTets } from "./utils/test-modul-util"
import { UserTest } from "./utils/test-utils"
import { web } from "../src/application/web"

describe("/api/modul CREATE",()=>{
    afterEach(async()=>{
        await JawabanTest.delete()
        await ModulTets.delete()
        await UserTest.delete()
    })

    beforeEach(async()=>{
        await UserTest.create()
        await JawabanTest.create()
        await ModulTets.crete()
   
    })

    it("should success create MODUL",async()=>{
        const response = await supertest(web)
        .post("/api/modul")
        .set("X-API-TOKEN", "test")
        .send({
                nama_moduls:"HAMDI",
                ip:"127",
                jawabans:"UMAR",
                perintah:"PERINTAH",
                antrian_produk:0,
                cek_saldo:"cek saldo",
                memberid:"hamdi",
                password:"parsing",
                pin:"12345",
                tiket:"tiket",
                total_antrian:0,
                username:"hamdi",
        })

        expect(response.status).toBe(200);
        expect(response.body.data.nama_moduls).toBe("HAMDI");
        expect(response.body.data.ip).toBe("127");
        expect(response.body.data.jawabans).toBe("UMAR");
        expect(response.body.data.perintah).toBe("PERINTAH");
        expect(response.body.data.antrian_produk).toBe(0);
        expect(response.body.data.cek_saldo).toBe("cek saldo");
        expect(response.body.data.memberid).toBe("hamdi");
        expect(response.body.data.password).toBe("parsing");
        expect(response.body.data.pin).toBe("12345");
        expect(response.body.data.tiket).toBe("tiket");
        expect(response.body.data.total_antrian).toBe(0);
        expect(response.body.data.username).toBe("hamdi");
    })

    it("should vailed create MODUL NAME JAWABAN NOT FOUND",async()=>{
        const response = await supertest(web)
        .post("/api/modul")
        .set("X-API-TOKEN", "test")
        .send({
                nama_moduls:"HAMDI",
                ip:"127",
                jawabans:"KOTA",
                perintah:"PERINTAH",
                antrian_produk:0,
                cek_saldo:"cek saldo",
                memberid:"hamdi",
                password:"parsing",
                pin:"12345",
                tiket:"tiket",
                total_antrian:0,
                username:"hamdi",
        })

        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    })

    it("should vailed create MODUL ZOD ERROR",async()=>{
        const response = await supertest(web)
        .post("/api/modul")
        .set("X-API-TOKEN", "test")
        .send({
                nama_moduls:"",
                ip:"",
                jawabans:"KOTA",
                perintah:"PERINTAH",
                antrian_produk:0,
                cek_saldo:"cek saldo",
                memberid:"hamdi",
                password:"parsing",
                pin:"12345",
                tiket:"tiket",
                total_antrian:0,
                username:"hamdi",
        })

        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    })

})


    describe("/api/modul UPDATE",()=>{
        afterEach(async()=>{
            await JawabanTest.delete()
            await ModulTets.delete()
            await UserTest.delete()
        })
    
        beforeEach(async()=>{
            await UserTest.create()
            await JawabanTest.create()
            await ModulTets.crete()
       
        })

        it("should success update MODUL",async()=>{
            const modul = await ModulTets.view()
            const response = await supertest(web)
            .put(`/api/modul/${modul.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                    nama_moduls:"HAMDI",
                    ip:"127",
                    jawabans:"UMAR",
                    perintah:"PERINTAH",
                    antrian_produk:0,
                    cek_saldo:"cek saldo",
                    memberid:"hamdi",
                    password:"parsing",
                    pin:"12345",
                    tiket:"tiket",
                    total_antrian:0,
                    username:"hamdi",
            })
    
            expect(response.status).toBe(200);
            expect(response.body.data.nama_moduls).toBe("HAMDI");
            expect(response.body.data.ip).toBe("127");
            expect(response.body.data.jawabans).toBe("UMAR");
            expect(response.body.data.perintah).toBe("PERINTAH");
            expect(response.body.data.antrian_produk).toBe(0);
            expect(response.body.data.cek_saldo).toBe("cek saldo");
            expect(response.body.data.memberid).toBe("hamdi");
            expect(response.body.data.password).toBe("parsing");
            expect(response.body.data.pin).toBe("12345");
            expect(response.body.data.tiket).toBe("tiket");
            expect(response.body.data.total_antrian).toBe(0);
            expect(response.body.data.username).toBe("hamdi");
        })

        it("should vailed update error nama jawaban not found",async()=>{
            const modul = await ModulTets.view()
            const response = await supertest(web)
            .put(`/api/modul/${modul.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                    nama_moduls:"HAMDI",
                    ip:"127",
                    jawabans:"KOTA",
                    perintah:"PERINTAH",
                    antrian_produk:0,
                    cek_saldo:"cek saldo",
                    memberid:"hamdi",
                    password:"parsing",
                    pin:"12345",
                    tiket:"tiket",
                    total_antrian:0,
                    username:"hamdi",
            })
    
            expect(response.status).toBe(404);
            expect(response.body.errors).toBeDefined();
        })


        it("should vailed update MODUL id not found",async()=>{
            const modul = await ModulTets.view()
            const response = await supertest(web)
            .put(`/api/modul/${modul.id+10000}`)
            .set("X-API-TOKEN", "test")
            .send({
                    nama_moduls:"HAMDI",
                    ip:"127",
                    jawabans:"UMAR",
                    perintah:"PERINTAH",
                    antrian_produk:0,
                    cek_saldo:"cek saldo",
                    memberid:"hamdi",
                    password:"parsing",
                    pin:"12345",
                    tiket:"tiket",
                    total_antrian:0,
                    username:"hamdi",
            })
    
            expect(response.status).toBe(404);
            expect(response.body.errors).toBeDefined();
        })

        it("should vailed update MODUL zod error",async()=>{
            const modul = await ModulTets.view()
            const response = await supertest(web)
            .put(`/api/modul/${modul.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                    nama_moduls:"",
                    ip:"",
                    jawabans:"UMAR",
                    perintah:"PERINTAH",
                    antrian_produk:0,
                    cek_saldo:"cek saldo",
                    memberid:"hamdi",
                    password:"parsing",
                    pin:"12345",
                    tiket:"tiket",
                    total_antrian:0,
                    username:"hamdi",
            })
    
            expect(response.status).toBe(400);
            expect(response.body.errors).toBeDefined();
        })


    })

    describe("/api/modul DELETE",()=>{
        afterEach(async()=>{
            await JawabanTest.delete()
            await ModulTets.delete()
            await UserTest.delete()
        })
    
        beforeEach(async()=>{
            await UserTest.create()
            await JawabanTest.create()
            await ModulTets.crete()
       
        })
        it("should vailed update MODUL zod error",async()=>{
            const modul = await ModulTets.view()
            const response = await supertest(web)
            .delete(`/api/modul/${modul.id}`)
            .set("X-API-TOKEN", "test")
            expect(response.status).toBe(200);
            expect(response.body.data).toBeDefined();
        })

        it("should vailed update MODUL zod error",async()=>{
            const modul = await ModulTets.view()
            const response = await supertest(web)
            .delete(`/api/modul/${modul.id+10000}`)
            .set("X-API-TOKEN", "test")
            expect(response.status).toBe(404);
            expect(response.body.errors).toBeDefined();
        })
        
        
    })

    describe("/api/modul VIEW",()=>{
        afterEach(async()=>{
            await JawabanTest.delete()
            await ModulTets.delete()
            await UserTest.delete()
        })
    
        beforeEach(async()=>{
            await UserTest.create()
            await JawabanTest.create()
            await ModulTets.crete()
        })

        it("should vailed update MODUL zod error",async()=>{
            const response = await supertest(web)
            .get(`/api/modul`)
            .set("X-API-TOKEN", "test")
            expect(response.status).toBe(200);
            expect(response.body.data.length).toBe(1);
            expect(response.body.paging.current_page).toBe(1);
            expect(response.body.paging.total_page).toBe(1);
            expect(response.body.paging.size).toBe(500);
        })

        it("should vailed update MODUL zod error",async()=>{
            const response = await supertest(web)
            .get(`/api/modul`)
            .set("X-API-TOKEN", "test")
            .query({
                nama_moduls:"UMAR"
            })
            expect(response.status).toBe(200);
            expect(response.body.data.length).toBe(1);
            expect(response.body.paging.current_page).toBe(1);
            expect(response.body.paging.total_page).toBe(1);
            expect(response.body.paging.size).toBe(500);
        })
    })
    



