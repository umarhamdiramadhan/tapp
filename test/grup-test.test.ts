import supertest from "supertest"
import { web } from "../src/application/web"
import { GrupTest } from "./utils/test-grup-util"
import { UserTest } from "./utils/test-utils"

describe("/api/grup CREATE",()=>{
    afterEach(async()=>{
        await GrupTest.delete()
        await UserTest.delete()
    })

    beforeEach(async()=>{
        await UserTest.create()
        await GrupTest.create()
        
    })


    it("should success create grup",async()=>{
        const response = await supertest(web)
        .post("/api/grup")
        .set("X-API-TOKEN", "test")
        .send({
            kode_grup:"hamdi",
            nama_grup:"hamdi"
        })

        expect(response.status).toBe(200);
        expect(response.body.data.kode_grup).toBe("hamdi");
        expect(response.body.data.nama_grup).toBe("hamdi");
    })

    it("should vailed create grup kode grup same",async()=>{
        const response = await supertest(web)
        .post("/api/grup")
        .set("X-API-TOKEN", "test")
        .send({
            kode_grup:"umar",
            nama_grup:"hamdi"
        })

        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    })

    it("should vailed create grup error zod",async()=>{
        const response = await supertest(web)
        .post("/api/grup")
        .set("X-API-TOKEN", "test")
        .send({
            kode_grup:"",
            nama_grup:""
        })

        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    })

})

describe("/api/grup UPDATE",()=>{
    afterEach(async()=>{
        await GrupTest.delete()
        await UserTest.delete()
    })

    beforeEach(async()=>{
        await GrupTest.create()
        await UserTest.create()
    })

    it("should success update grup",async()=>{
        const response = await supertest(web)
        .put("/api/grup/umar")
        .set("X-API-TOKEN", "test")
        .send({
            kode_grup:"umar",
            nama_grup:"hamdi"
        })

        console.log(response.body)

        expect(response.status).toBe(200);
        expect(response.body.data.kode_grup).toBe("umar");
        expect(response.body.data.nama_grup).toBe("hamdi");
    })

    it("should vailed vailed update grup kode grup same",async()=>{
        const response = await supertest(web)
        .put("/api/grup/umar")
        .set("X-API-TOKEN", "test")
        .send({
            kode_grup:"kumar",
            nama_grup:"hamdi"
        })

        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    })

    it("should vailed update grup zod",async()=>{
        const response = await supertest(web)
        .put("/api/grup/umar")
        .set("X-API-TOKEN", "test")
        .send({
            kode_grup:"",
            nama_grup:""
        })

        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    })

    it("should vailed  update wrong id",async()=>{
        const response = await supertest(web)
        .delete("/api/grup/koko")
        .set("X-API-TOKEN", "test")
        .send({
            kode_grup:"umar",
            nama_grup:"hamdi"
        })

        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    })


})

describe("/api/grup DELETE",()=>{
    afterEach(async()=>{
        await GrupTest.delete()
        await UserTest.delete()
    })

    beforeEach(async()=>{
        await GrupTest.create()
        await UserTest.create()
    })

    it("should success delete grup",async()=>{
        const response = await supertest(web)
        .delete("/api/grup/umar")
        .set("X-API-TOKEN", "test")
       
        expect(response.status).toBe(200);
        expect(response.body.data).toBe("Berhasil menghapus kode grup");
    })

    it("should vailed vailed delete wrong id",async()=>{
        const response = await supertest(web)
        .delete("/api/grup/koko")
        .set("X-API-TOKEN", "test")

        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    })

})

describe("/api/grup VIEW",()=>{
    afterEach(async()=>{
        await GrupTest.delete()
        await UserTest.delete()
    })

    beforeEach(async()=>{
        await GrupTest.create()
        await UserTest.create()
    })

    it("should success view grup",async()=>{
        const response = await supertest(web)
        .get("/api/grup")
        .set("X-API-TOKEN", "test")
       
       
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(2);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(500);
    })


    it("should success view grup",async()=>{
        const response = await supertest(web)
        .get("/api/grup")
        .set("X-API-TOKEN", "test")
        .query({
            kode_grup:"kumar"
        })

        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(500);
    })


    it("should success view grup",async()=>{
        const response = await supertest(web)
        .get("/api/grup")
        .set("X-API-TOKEN", "test")
        .query({
            nama_grup:"hamdi"
        })
       
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(2);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(500);
    })

    it("should success view grup",async()=>{
        const response = await supertest(web)
        .get("/api/grup")
        .set("X-API-TOKEN", "test")
        .query({
            kode_grup:"kumar",
            nama_grup:"hamdi"
        })
       
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(500);
    })




})