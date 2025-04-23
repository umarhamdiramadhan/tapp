import supertest from "supertest"
import { GrupTest } from "./utils/test-grup-util"
import { HargaGrupTest } from "./utils/test-harga-grup-utils"
import { ProductTest } from "./utils/test-product-utils"
import { UserTest } from "./utils/test-utils"
import { web } from "../src/application/web"
import { ProviderTest } from "./utils/test-provider-utils"

describe("/api/grup CREATE",()=>{
    afterEach(async()=>{
        await UserTest.delete()
        await HargaGrupTest.delete()
        await ProductTest.delete() 
        await ProviderTest.delete()
        await GrupTest.delete()
       
    })

    beforeEach(async()=>{
        await UserTest.create()
        await GrupTest.create()
        await ProviderTest.create()
        await ProductTest.create()
        await HargaGrupTest.create()
    })

    it("should success create harga grup",async()=>{
        const response = await supertest(web)
        .post("/api/harga-grup")
        .set("X-API-TOKEN", "test")
        .send({
            kode_grups:"umar",
            kode_produks:"xl7",
            harga:5000,
            is_gangguan:false
        })
        expect(response.status).toBe(200);
        expect(response.body.data.kode_grups).toBe("umar");
        expect(response.body.data.kode_produks).toBe("xl7");
        expect(response.body.data.harga).toBe(5000);
        expect(response.body.data.harga_rupiah).toBe("5.000");
        expect(response.body.data.is_gangguan).toBe(false);
    })
    
    it("should success vailed harga grup kode same",async()=>{
        const response = await supertest(web)
        .post("/api/harga-grup")
        .set("X-API-TOKEN", "test")
        .send({
            kode_grups:"umar",
            kode_produks:"xl1",
            harga:5000,
            is_gangguan:false
        })
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    })
    it("should success vailed harga grup kode produks not found",async()=>{
        const response = await supertest(web)
        .post("/api/harga-grup")
        .set("X-API-TOKEN", "test")
        .send({
            kode_grups:"umar",
            kode_produks:"xl100",
            harga:5000,
            is_gangguan:false
        })
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    })
    it("should success vailed harga grup kode grups not found",async()=>{
        const response = await supertest(web)
        .post("/api/harga-grup")
        .set("X-API-TOKEN", "test")
        .send({
            kode_grups:"umarrr",
            kode_produks:"xl7",
            harga:5000,
            is_gangguan:false
        })
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    })

    it("should success vailed harga grup error zod",async()=>{
        const response = await supertest(web)
        .post("/api/harga-grup")
        .set("X-API-TOKEN", "test")
        .send({
            kode_grups:"",
            kode_produks:"",
            harga:5000,
            is_gangguan:false
        })
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    })
})
    
describe("/api/harga-grup UPDATE",()=>{
        afterEach(async()=>{
            await UserTest.delete()
            await HargaGrupTest.delete()
            await ProductTest.delete() 
            await ProviderTest.delete()
            await GrupTest.delete()
           
        })
        beforeEach(async()=>{
            await UserTest.create()
            await GrupTest.create()
            await ProviderTest.create()
            await ProductTest.create()
            await HargaGrupTest.create()
        })
  
    it("should success update harga grup",async()=>{
        const hargaGrup = await HargaGrupTest.get();

        const response = await supertest(web)
        .put(`/api/harga-grup/${hargaGrup.id}`)
        .set("X-API-TOKEN", "test")
        .send({
            kode_grups:"umar",
            kode_produks:"xl2",
            harga:5000,
            is_gangguan:false
        })
        expect(response.status).toBe(200);
        expect(response.body.data.kode_grups).toBe("umar");
        expect(response.body.data.kode_produks).toBe("xl2");
        expect(response.body.data.harga).toBe(5000);
        expect(response.body.data.harga_rupiah).toBe("5.000");
        expect(response.body.data.is_gangguan).toBe(false);
    })
    it("should success update harga grup id wrong",async()=>{
        const hargaGrup = await HargaGrupTest.get();

        const response = await supertest(web)
        .put(`/api/harga-grup/${hargaGrup.id+1000}`)
        .set("X-API-TOKEN", "test")
        .send({
            kode_grups:"umar",
            kode_produks:"xl2",
            harga:5000,
            is_gangguan:false
        })
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    })
    it("should vailed update harga grup kode produk same",async()=>{
        const hargaGrup = await HargaGrupTest.get();

        const response = await supertest(web)
        .put(`/api/harga-grup/${hargaGrup.id}`)
        .set("X-API-TOKEN", "test")
        .send({
            kode_grups:"umar",
            kode_produks:"xl1",
            harga:5000,
            is_gangguan:false
        })
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    })
    it("should vailed update harga grup kode grup not found",async()=>{
        const hargaGrup = await HargaGrupTest.get();

        const response = await supertest(web)
        .put(`/api/harga-grup/${hargaGrup.id}`)
        .set("X-API-TOKEN", "test")
        .send({
            kode_grups:"kumarrr",
            kode_produks:"xl1",
            harga:5000,
            is_gangguan:false
        })
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    })
    it("should vailed update harga grup zod error",async()=>{
        const hargaGrup = await HargaGrupTest.get();

        const response = await supertest(web)
        .put(`/api/harga-grup/${hargaGrup.id}`)
        .set("X-API-TOKEN", "test")
        .send({
            kode_grups:"",
            kode_produks:"",
            harga:5000,
            is_gangguan:false
        })
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    })
})

describe("/api/harga-grup UPDATE MANY",()=>{
    afterEach(async()=>{
        await UserTest.delete()
        await HargaGrupTest.delete()
        await ProductTest.delete() 
        await ProviderTest.delete()
        await GrupTest.delete()
       
    })
    beforeEach(async()=>{
        await UserTest.create()
        await GrupTest.create()
        await ProviderTest.create()
        await ProductTest.create()
        await HargaGrupTest.create()
    })
    it("should success update harga grup",async()=>{

        const response = await supertest(web)
        .put(`/api/harga-grup`)
        .set("X-API-TOKEN", "test")
        .send({
            kode_produks:"xl1",
            harga:5000,
        })
        console.log(response.body.data)
        expect(response.status).toBe(200);
        expect(response.body.data).toBeDefined();
    })
    it("should vailed update harga grup many kode produks wrong",async()=>{
        const response = await supertest(web)
        .put(`/api/harga-grup`)
        .set("X-API-TOKEN", "test")
        .send({
            kode_produks:"xl200",
            harga:5000,
        })
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    })
    it("should vailed update harga grup vailed zod",async()=>{
        const response = await supertest(web)
        .put(`/api/harga-grup`)
        .set("X-API-TOKEN", "test")
        .send({
            kode_produks:"",
            harga:"",
        })
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    })
})

describe("/api/harga-grup DELETE",()=>{
    afterEach(async()=>{
        await UserTest.delete()
        await HargaGrupTest.delete()
        await ProductTest.delete() 
        await ProviderTest.delete()
        await GrupTest.delete()
       
    })
    beforeEach(async()=>{
        await UserTest.create()
        await GrupTest.create()
        await ProviderTest.create()
        await ProductTest.create()
        await HargaGrupTest.create()
    })
    it("should success update harga grup",async()=>{
        const hargaGrup = await HargaGrupTest.get();

        const response = await supertest(web)
        .delete(`/api/harga-grup/${hargaGrup.id}`)
        .set("X-API-TOKEN", "test")

        expect(response.status).toBe(200);
        expect(response.body.data).toBeDefined();
    })
    it("should success update harga grup",async()=>{
        const hargaGrup = await HargaGrupTest.get();

        const response = await supertest(web)
        .delete(`/api/harga-grup/${hargaGrup.id+1000}`)
        .set("X-API-TOKEN", "test")
        
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    })
})

describe("/api/harga-grup VIEW",()=>{

    afterEach(async()=>{
        await UserTest.delete()
        await HargaGrupTest.delete()
        await ProductTest.delete() 
        await ProviderTest.delete()
        await GrupTest.delete()
       
    })
    beforeEach(async()=>{
        await UserTest.create()
        await GrupTest.create()
        await ProviderTest.create()
        await ProductTest.create()
        await HargaGrupTest.create()
    })
    it("should success view harga grup",async()=>{
        const response = await supertest(web)
        .get("/api/harga-grup")
        .set("X-API-TOKEN", "test")
       
     
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(3);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(500);
    })
    it("should success view harga grup",async()=>{
        const response = await supertest(web)
        .get("/api/harga-grup")
        .set("X-API-TOKEN", "test")
        .query({
            kode_produks:"xl1"
        })
       
     
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(2);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(500);
    })
    it("should success view harga grup",async()=>{
        const response = await supertest(web)
        .get("/api/harga-grup")
        .set("X-API-TOKEN", "test")
        .query({
            kode_grups:"umar"
        })
       
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(2);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(500);
    })
    it("should success view harga grup",async()=>{
        const response = await supertest(web)
        .get("/api/harga-grup")
        .set("X-API-TOKEN", "test")
        .query({
            kode_grups:"umar",
            kode_produks:"xl1"
        })
       
     
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(500);
    })

})

describe("/api/grup CREATEMANY",()=>{
    afterEach(async()=>{
        await UserTest.delete()
        await HargaGrupTest.delete()
        await ProductTest.delete() 
        await ProviderTest.delete()
        await GrupTest.delete()
       
    })

    beforeEach(async()=>{
        await UserTest.create()
        await GrupTest.create()
        await ProviderTest.create()
        await ProductTest.create()
        await HargaGrupTest.create()
    })

    it("should success create harga grup",async()=>{
        const response = await supertest(web)
        .post("/api/harga-grup/created-many")
        .set("X-API-TOKEN", "test")
        .send({
            kode_grups:"umar",
            kode_grup:"hammmmdi",
            nama_grup:"hamdddi",
        })
        expect(response.status).toBe(200);
        expect(response.body.data).toBeDefined();
    })
    it("should vailed create harga grup kode produk same",async()=>{
        const response = await supertest(web)
        .post("/api/harga-grup/created-many")
        .set("X-API-TOKEN", "test")
        .send({
            kode_grups:"umar",
            //tidak boleh sama
            kode_grup:"umar",
            nama_grup:"hamdddi",
        })
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    })
    it("should vailed create harga grup kode produk not found",async()=>{
        const response = await supertest(web)
        .post("/api/harga-grup/created-many")
        .set("X-API-TOKEN", "test")
        .send({
            kode_grups:"umarh",
            kode_grup:"umarh",
            nama_grup:"hamdddi",
        })
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    })
    it("should vailed create harga zod error",async()=>{
        const response = await supertest(web)
        .post("/api/harga-grup/created-many")
        .set("X-API-TOKEN", "test")
        .send({
            kode_grups:"",
            kode_grup:"",
            nama_grup:"",
        })
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    })
   
})