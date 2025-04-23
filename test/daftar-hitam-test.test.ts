import supertest from "supertest"
import {web} from "../src/application/web";
import { DaftarHitamTest } from "./utils/test-daftar-hitam-utils";
import { UserTest } from "./utils/test-utils";

describe("/api/daftar-hitam CREATE",()=>{
    afterEach(async()=>{
        await DaftarHitamTest.delete()
        await UserTest.delete()
    })

    beforeEach(async()=>{
        await UserTest.create()
    })


    it("should success create daftar hitam",async()=>{
        const response = await supertest(web)
        .post("/api/daftar-hitam")
        .set("X-API-TOKEN", "test")
        .send({
            nomer_tujuan:"085156873132",
            keterangan:"fraud"
        })

        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.nomer_tujuan).toBe("085156873132");
        expect(response.body.data.keterangan).toBe("fraud");
    })

    it("should success vailed daftar hitam zod",async()=>{
        const response = await supertest(web)
        .post("/api/daftar-hitam")
        .set("X-API-TOKEN", "test")
        .send({
            nomer_tujuan:"",
            keterangan:"fraud"
        })

        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    })

})

describe("/api/daftar-hitam UPDATE",()=>{
    afterEach(async()=>{
        await DaftarHitamTest.delete()
        await UserTest.delete()
    })

    beforeEach(async()=>{
        await UserTest.create()
        await DaftarHitamTest.create()
    })


    it("should success update daftar hitam",async()=>{
        const daftarHitam = await DaftarHitamTest.get();
        const response = await supertest(web)
        .put(`/api/daftar-hitam/${daftarHitam.id}`)
        .set("X-API-TOKEN", "test")
        .send({
            nomer_tujuan:"085156873132",
            keterangan:"fraudd"
        })


        
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.nomer_tujuan).toBe("085156873132");
        expect(response.body.data.keterangan).toBe("fraudd");
    })

    it("should vailed update daftar hitam zod",async()=>{
        const daftarHitam = await DaftarHitamTest.get();
        const response = await supertest(web)
        .put(`/api/daftar-hitam/${daftarHitam.id}`)
        .set("X-API-TOKEN", "test")
        .send({
            nomer_tujuan:"",
            keterangan:"fraud"
        })

        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    })

    it("should vailed update daftar hitam wrong id",async()=>{
        const daftarHitam = await DaftarHitamTest.get();
        const response = await supertest(web)
        .put(`/api/daftar-hitam/${daftarHitam.id+1}`)
        .set("X-API-TOKEN", "test")
        .send({
            nomer_tujuan:"085156873132",
            keterangan:"fraud"
        })

        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    })


})

describe("/api/daftar-hitam DELETE",()=>{
    afterEach(async()=>{
        await DaftarHitamTest.delete()
        await UserTest.delete()
    })

    beforeEach(async()=>{
        await UserTest.create()
        await DaftarHitamTest.create()
    })


    it("should success delete daftar hitam",async()=>{
        const daftarHitam = await DaftarHitamTest.get();
        const response = await supertest(web)
        .delete(`/api/daftar-hitam/${daftarHitam.id}`)
        .set("X-API-TOKEN", "test")
       
        expect(response.status).toBe(200);
        expect(response.body.data).toBe("berhasil menghapus daftar hitam");
    })

    it("should vailed delete daftar hitam wrong id",async()=>{
        const daftarHitam = await DaftarHitamTest.get();
        const response = await supertest(web)
        .delete(`/api/daftar-hitam/${daftarHitam.id+1}`)
        .set("X-API-TOKEN", "test")

        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    })


})

describe("/api/daftar-hitam GET",()=>{
    afterEach(async()=>{
        await DaftarHitamTest.delete()
        await UserTest.delete()
    })

    beforeEach(async()=>{
        await UserTest.create()
        await DaftarHitamTest.create()
    })


    it("should success get all daftar hitam",async()=>{  
        const response = await supertest(web)
        .get(`/api/daftar-hitam`)
        .set("X-API-TOKEN", "test")
       
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(500);
    })

    it("should success get nomer tujuan daftar hitam",async()=>{  
        const response = await supertest(web)
        .get(`/api/daftar-hitam`)
        .set("X-API-TOKEN", "test")
        .query({
            nomer_tujuan:"085156873132"
        })
       
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(500);
    })

    it("should success get keterangan daftar hitam",async()=>{  
        const response = await supertest(web)
        .get(`/api/daftar-hitam`)
        .set("X-API-TOKEN", "test")
        .query({
            keterangan:"fraud"
        })
       
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(500);
    })

    it("should success get keterangan daftar hitam",async()=>{  
        const response = await supertest(web)
        .get(`/api/daftar-hitam`)
        .set("X-API-TOKEN", "test")
        .query({
            nomer_tujuan:"085156873132",
            keterangan:"fraud"
        })
       
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(500);
    })
})