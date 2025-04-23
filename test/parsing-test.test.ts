import supertest from "supertest"
import { ModulTets } from "./utils/test-modul-util"
import { ProductTest } from "./utils/test-product-utils"
import { ProviderTest } from "./utils/test-provider-utils"
import { UserTest } from "./utils/test-utils"
import { web } from "../src/application/web"
import { ParsingTest } from "./utils/test-parsing.utils"

describe("/api/parsing CREATE",()=>{
    afterEach(async()=>{
        await ParsingTest.delete()
        await ModulTets.delete()
        await ProductTest.delete()
        await ProviderTest.delete()
        await UserTest.delete()
      
    })

    beforeEach(async()=>{
        await UserTest.create()
        await ProviderTest.create()
        await ProductTest.create()
        await ModulTets.crete()
        await ParsingTest.create()
    })


    it("should success create parsing",async()=>{
        const modul = await ModulTets.view()
        const response = await supertest(web)
        .post("/api/parsing")
        .set("X-API-TOKEN", "test")
        .send({
            kode_produks:"xl2",
            parsing:"hamdi",
            prioritas:1,
            harga_beli:20,
            id_moduls:modul.id,
        })

        expect(response.status).toBe(200);
        expect(response.body.data.kode_produks).toBe("xl2");
        expect(response.body.data.parsing).toBe("hamdi");
        expect(response.body.data.prioritas).toBe(1);
        expect(response.body.data.harga_beli).toBe(20);
        expect(response.body.data.id_moduls).toBeDefined();
    })

    it("should vailed create parsing kode produks duplikate",async()=>{
        const modul = await ModulTets.view()
        const response = await supertest(web)
        .post("/api/parsing")
        .set("X-API-TOKEN", "test")
        .send({
            kode_produks:"xl1",
            parsing:"hamdi",
            prioritas:1,
            harga_beli:20,
            id_moduls:modul.id,
        })

        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    })


    it("should vailed create parsing kode produks not found",async()=>{
        const modul = await ModulTets.view()
        const response = await supertest(web)
        .post("/api/parsing")
        .set("X-API-TOKEN", "test")
        .send({
            kode_produks:"xll",
            parsing:"hamdi",
            prioritas:1,
            harga_beli:20,
            id_moduls:modul.id,
        })

        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    })

    it("should vailed create parsing id modul not found",async()=>{
        const modul = await ModulTets.view()
        const response = await supertest(web)
        .post("/api/parsing")
        .set("X-API-TOKEN", "test")
        .send({
            kode_produks:"xl1",
            parsing:"hamdi",
            prioritas:1,
            harga_beli:20,
            id_moduls:modul.id+1,
        })

        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    })

    it("should vailed create parsing zod error",async()=>{
        const response = await supertest(web)
        .post("/api/parsing")
        .set("X-API-TOKEN","test")
        .send({
            kode_produks:"xl1",
            parsing:"",
            prioritas:1,
            harga_beli:20,
            id_moduls:"",
        })
        console.log(response.body.errors)
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    })

    
})


describe("/api/UPDATE parsing",()=>{
    afterEach(async()=>{
        await ParsingTest.delete()
        await ModulTets.delete()
        await ProductTest.delete()
        await ProviderTest.delete()
        await UserTest.delete()
      
    })

    beforeEach(async()=>{
        await UserTest.create()
        await ProviderTest.create()
        await ProductTest.create()
        await ModulTets.crete()
        await ParsingTest.create()
    })

    it("should success update parsing",async()=>{
        const modul = await ModulTets.view()
        const parsing = await ParsingTest.get()
        const response = await supertest(web)
        .put(`/api/parsing/${parsing.id}`)
        .set("X-API-TOKEN", "test")
        .send({
            kode_produks:"xl1",
            parsing:"hamdi",
            prioritas:1,
            harga_beli:200,
            id_moduls:modul.id,
        })

        expect(response.status).toBe(200);
        expect(response.body.data.kode_produks).toBe("xl1");
        expect(response.body.data.parsing).toBe("hamdi");
        expect(response.body.data.prioritas).toBe(1);
        expect(response.body.data.harga_beli).toBe(200);
        expect(response.body.data.id_moduls).toBeDefined();
    })

    it("should vailed update parsing kode produk same",async()=>{
        const modul = await ModulTets.view()
        const parsing = await ParsingTest.get()
        const response = await supertest(web)
        .put(`/api/parsing/${parsing.id}`)
        .set("X-API-TOKEN", "test")
        .send({
            kode_produks:"xl10",
            parsing:"hamdi",
            prioritas:1,
            harga_beli:200,
            id_moduls:modul.id,
        })

        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    })


    it("should vailed update parsing kode modul not found",async()=>{
        const modul = await ModulTets.view()
        const parsing = await ParsingTest.get()
        const response = await supertest(web)
        .put(`/api/parsing/${parsing.id+1}`)
        .set("X-API-TOKEN", "test")
        .send({
            kode_produks:"xl1",
            parsing:"hamdi",
            prioritas:1,
            harga_beli:200,
            id_moduls:modul.id,
        })

        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    })  
})

describe("/api/DELETE parsing",()=>{
    afterEach(async()=>{
        await ParsingTest.delete()
        await ModulTets.delete()
        await ProductTest.delete()
        await ProviderTest.delete()
        await UserTest.delete()
      
    })

    beforeEach(async()=>{
        await UserTest.create()
        await ProviderTest.create()
        await ProductTest.create()
        await ModulTets.crete()
        await ParsingTest.create()
    })

    it("should success delete parsing",async()=>{
        const modul = await ModulTets.view()
        const parsing = await ParsingTest.get()
        const response = await supertest(web)
        .delete(`/api/parsing/${parsing.id}`)
        .set("X-API-TOKEN", "test")
    
        expect(response.status).toBe(200);
        expect(response.body.data).toBeDefined();
    })

    it("should success delete parsing",async()=>{
        const modul = await ModulTets.view()
        const parsing = await ParsingTest.get()
        const response = await supertest(web)
        .delete(`/api/parsing/${parsing.id+1000}`)
        .set("X-API-TOKEN", "test")
    
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    })



})

describe("/api/VIEW parsing",()=>{
    afterEach(async()=>{
        await ParsingTest.delete()
        await ModulTets.delete()
        await ProductTest.delete()
        await ProviderTest.delete()
        await UserTest.delete()
      
    })

    beforeEach(async()=>{
        await UserTest.create()
        await ProviderTest.create()
        await ProductTest.create()
        await ModulTets.crete()
        await ParsingTest.create()
    })

    it("should success view parsing",async()=>{
        const response = await supertest(web)
        .get(`/api/parsing`)
        .set("X-API-TOKEN", "test")
    
        console.log(response.body.data)
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(500);
    })


    it("should success view parsing",async()=>{
        const modul = await ModulTets.view()
        const response = await supertest(web)
        .get(`/api/parsing`)
        .set("X-API-TOKEN", "test")
        .query({
            id_moduls : modul.id,
        })
    
        
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(500);
    })

    it("should success view parsing",async()=>{
        const modul = await ModulTets.view()
        const response = await supertest(web)
        .get(`/api/parsing`)
        .set("X-API-TOKEN", "test")
        .query({
            kode_produks : "xl11",
        })
    
        
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(500);
    })

    it("should success view parsing",async()=>{
        const modul = await ModulTets.view()
        const response = await supertest(web)
        .get(`/api/parsing`)
        .set("X-API-TOKEN", "test")
        .query({
            id_moduls : modul.id,
            kode_produks : "xl11",
        })
    
        
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(500);
    })



})
