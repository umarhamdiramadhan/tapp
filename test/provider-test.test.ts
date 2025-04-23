import supertest from "supertest"
import { web } from "../src/application/web"
import { ProviderTest } from "./utils/test-provider-utils"
import { UserTest } from "./utils/test-utils"

describe("/api/provider CREATE",()=>{
    afterEach(async()=>{
        await ProviderTest.delete()
        await UserTest.delete()
    })

    beforeEach(async()=>{
        await ProviderTest.create()
        await UserTest.create()
    })

    it("should success create provider",async()=>{
        const response = await supertest(web)
        .post("/api/provider")
        .set("X-API-TOKEN", "test")
        .send({
            kode_provider:"ramadhan",
            nama_provider:"hamdi",
            is_gangguan:false,
            prefix:"0815,0816",
            minimal:1,
            maxsimal:2
        })

        expect(response.status).toBe(200);
        expect(response.body.data.kode_provider).toBe("ramadhan");
        expect(response.body.data.nama_provider).toBe("hamdi");
        expect(response.body.data.is_gangguan).toBe(false)
        expect(response.body.data.prefix).toBe("0815,0816")
        expect(response.body.data.minimal).toBe(1)
        expect(response.body.data.maxsimal).toBe(2)
        
    })

    it("should success create provider",async()=>{
        const response = await supertest(web)
        .post("/api/provider")
        .set("X-API-TOKEN", "test")
        .send({
            kode_provider:"mmmm",
            nama_provider:"hamdi",
            is_gangguan:false,
           
        })

        expect(response.status).toBe(200);
        expect(response.body.data.kode_provider).toBe("mmmm");
        expect(response.body.data.nama_provider).toBe("hamdi");
        expect(response.body.data.is_gangguan).toBe(false)
        
    })

    it("should success vailed provider id same",async()=>{
        const response = await supertest(web)
        .post("/api/provider")
        .set("X-API-TOKEN", "test")
        .send({
            kode_provider:"umar",
            nama_provider:"hamdi",
            is_gangguan:false,
            prefix:"0815,0816",
            minimal:1,
            maxsimal:2
           
        })

        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
        
    })

    it("should success vailed provider zode",async()=>{
        const response = await supertest(web)
        .post("/api/provider")
        .set("X-API-TOKEN", "test")
        .send({
            kode_provider:"ramadhan",
            nama_provider:"",
            is_gangguan:false,
            prefix:"0815,0816",
            minimal:1,
            maxsimal:2
           
        })

        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
        
    })

   
})

describe("/api/provider UPDATE",()=>{
    afterEach(async()=>{
        await ProviderTest.delete()
        await UserTest.delete()
    })

    beforeEach(async()=>{
        await ProviderTest.create()
        await UserTest.create()
    })

    it("should success update provider",async()=>{
        const response = await supertest(web)
        .put("/api/provider/umar")
        .set("X-API-TOKEN", "test")
        .send({
            kode_provider:"mmmm",
            nama_provider:"hamdi",
            is_gangguan:false,
            prefix:"0815,0816",
            minimal:1,
            maxsimal:2
        })

        expect(response.status).toBe(200);
        expect(response.body.data.kode_provider).toBe("mmmm");
        expect(response.body.data.nama_provider).toBe("hamdi");
        expect(response.body.data.is_gangguan).toBe(false)
        expect(response.body.data.prefix).toBe("0815,0816")
        expect(response.body.data.minimal).toBe(1)
        expect(response.body.data.maxsimal).toBe(2)
        
    })

    it("should success update provider",async()=>{
        const response = await supertest(web)
        .put("/api/provider/umar")
        .set("X-API-TOKEN", "test")
        .send({
            kode_provider:"umar",
            nama_provider:"kemal",
            is_gangguan:false,
            prefix:"0815,0816",
            minimal:1,
            maxsimal:2
        })

        expect(response.status).toBe(200);
        expect(response.body.data.kode_provider).toBe("umar");
        expect(response.body.data.nama_provider).toBe("kemal");
        expect(response.body.data.is_gangguan).toBe(false)
        expect(response.body.data.prefix).toBe("0815,0816")
        expect(response.body.data.minimal).toBe(1)
        expect(response.body.data.maxsimal).toBe(2)
        
    })

    

    it("should  vailed update provider id wrong",async()=>{
        const response = await supertest(web)
        .put("/api/provider/kuku")
        .set("X-API-TOKEN", "test")
        .send({
            kode_provider:"umar",
            nama_provider:"hamdi",
            is_gangguan:false,
            prefix:"0815,0816",
            minimal:1,
            maxsimal:2
        })
       
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
        
    })

    it("should  vailed update provider id same",async()=>{
        const response = await supertest(web)
        .put("/api/provider/umar")
        .set("X-API-TOKEN", "test")
        .send({
            kode_provider:"hamdi",
            nama_provider:"hamdi",
            is_gangguan:false,
            prefix:"0815,0816",
            minimal:1,
            maxsimal:2
        })

       
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
        
    })
    it("should vailed update provider ZOD error",async()=>{
        const response = await supertest(web)
        .put("/api/provider/umar")
        .set("X-API-TOKEN", "test")
        .send({
            kode_provider:"umar",
            nama_provider:"",
            is_gangguan:false,
            prefix:"0815,0816",
            minimal:1,
            maxsimal:2
        })

       
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
        
    })

    
})

describe("/api/provider DELETE",()=>{
    afterEach(async()=>{
        await ProviderTest.delete()
        await UserTest.delete()
    })

    beforeEach(async()=>{
        await ProviderTest.create()
        await UserTest.create()
    })

    it("should delete success",async()=>{
        const response = await supertest(web)
        .delete("/api/provider/umar")
        .set("X-API-TOKEN", "test")
       
        expect(response.status).toBe(200);
        expect(response.body.data).toBe("berhasil delete provider");
        
    })


    it("should delete vailed provider id wrong",async()=>{
        const response = await supertest(web)
        .delete("/api/provider/kuku")
        .set("X-API-TOKEN", "test")
       
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
        
    })

})

describe("/api/provider view",()=>{
    afterEach(async()=>{
        await ProviderTest.delete()
        await UserTest.delete()
    })

    beforeEach(async()=>{
        await ProviderTest.create()
        await UserTest.create()
    })

    it("should view success all",async()=>{
        const response = await supertest(web)
        .get("/api/provider")
        .set("X-API-TOKEN", "test")
       
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(3);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(500);
        
    })

    it("should view success seacrh kode",async()=>{
        const response = await supertest(web)
        .get("/api/provider")
        .set("X-API-TOKEN", "test")
        .query({
            kode_provider:"hamdi"
        })
        
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(500);
        
    })

    it("should view success seacrh kode",async()=>{
        const response = await supertest(web)
        .get("/api/provider")
        .set("X-API-TOKEN", "test")
        .query({
            nama_provider:"hamdi"
        })
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(3);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(500);
        
    })
    it("should view success seacrh kode",async()=>{
        const response = await supertest(web)
        .get("/api/provider")
        .set("X-API-TOKEN", "test")
        .query({
            kode_provider: "umar",
            nama_provider:"hamdi"
        })

        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(2);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(500);
        
    })
})