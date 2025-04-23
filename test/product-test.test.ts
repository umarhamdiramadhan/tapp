import supertest from "supertest"
import { ProductTest } from "./utils/test-product-utils"
import { UserTest } from "./utils/test-utils"
import { web } from "../src/application/web"
import { ProviderTest } from "./utils/test-provider-utils"

describe("/api/product CREATE",()=>{
    afterEach(async()=>{
        await ProductTest.delete()
        await UserTest.delete()
        await ProviderTest.delete()
    })

    beforeEach(async()=>{
        await UserTest.create()
        await ProviderTest.create()
        await ProductTest.create()
    })

    it("should success create product",async()=>{
        const response = await supertest(web)
        .post("/api/product")
        .set("X-API-TOKEN", "test")
        .send({
            kode_produk:"xl3",
            nama_produk:"xl3",
            kode_providers:"umar",
            is_aktif:true,
            is_gangguan:false,
            is_multi:false
        })

        expect(response.status).toBe(200);
        expect(response.body.data.kode_produk).toBe("xl3");
        expect(response.body.data.nama_produk).toBe("xl3");
        expect(response.body.data.kode_providers).toBe("umar");
        expect(response.body.data.is_aktif).toBe(true);
        expect(response.body.data.is_gangguan).toBe(false);
        expect(response.body.data.is_multi).toBe(false);
    })

    it("should vailed create product kode providers wrong",async()=>{
        const response = await supertest(web)
        .post("/api/product")
        .set("X-API-TOKEN", "test")
        .send({
            kode_produk:"x20",
            nama_produk:"xl3",
            kode_providers:"kiki",
            is_aktif:true,
            is_gangguan:false,
            is_multi:false
        })

       
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    })

    it("should vailed create product kode kode product same",async()=>{
        const response = await supertest(web)
        .post("/api/product")
        .set("X-API-TOKEN", "test")
        .send({
            kode_produk:"xl1",
            nama_produk:"xl3",
            kode_providers:"kiki",
            is_aktif:true,
            is_gangguan:false,
            is_multi:false
        })

       
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    })

    it("should vailed create product kode kode product same",async()=>{
        const response = await supertest(web)
        .post("/api/product")
        .set("X-API-TOKEN", "test")
        .send({
            kode_produk:"xl1",
            nama_produk:"xl3",
            kode_providers:"kiki",
            is_aktif:true,
            is_gangguan:false,
            is_multi:false
        })

       
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    })

    it("should vailed create product zode error",async()=>{
        const response = await supertest(web)
        .post("/api/product")
        .set("X-API-TOKEN", "test")
        .send({
            kode_produk:"",
            nama_produk:"xl3",
            kode_providers:"kiki",
            is_aktif:true,
            is_gangguan:false,
            is_multi:false
        })

       
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    })


})

describe("/api/product UPDATE",()=>{
    afterEach(async()=>{
        await ProductTest.delete()
        await UserTest.delete()
        await ProviderTest.delete()
    })

    beforeEach(async()=>{
        await UserTest.create()
        await ProviderTest.create()
        await ProductTest.create()
    })

     it("should success update product",async()=>{
        const response = await supertest(web)
        .put("/api/product/xl1")
        .set("X-API-TOKEN", "test")
        .send({
            kode_produk:"xl3",
            nama_produk:"xl3",
            kode_providers:"umar",
            is_aktif:true,
            is_gangguan:false,
            is_multi:false
        })

        expect(response.status).toBe(200);
        expect(response.body.data.kode_produk).toBe("xl3");
        expect(response.body.data.nama_produk).toBe("xl3");
        expect(response.body.data.kode_providers).toBe("umar");
        expect(response.body.data.is_aktif).toBe(true);
        expect(response.body.data.is_gangguan).toBe(false);
        
    })

    it("should vailed update product kode providers wrong",async()=>{
        const response = await supertest(web)
        .put("/api/product/xl1")
        .set("X-API-TOKEN", "test")
        .send({
            kode_produk:"x20",
            nama_produk:"xl3",
            kode_providers:"kiki",
            is_aktif:true,
            is_gangguan:false,
            is_multi:false
        })

       
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    })

    it("should vailed update product kode produk wrong",async()=>{
        const response = await supertest(web)
        .put("/api/product/xl20")
        .set("X-API-TOKEN", "test")
        .send({
            kode_produk:"x2",
            nama_produk:"xl3",
            kode_providers:"umar",
            is_aktif:true,
            is_gangguan:false,
            is_multi:false
        })

       
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    })

    it("should vailed update product kode produk same",async()=>{
        const response = await supertest(web)
        .put("/api/product/xl1")
        .set("X-API-TOKEN", "test")
        .send({
            kode_produk:"xl2",
            nama_produk:"xl3",
            kode_providers:"umar",
            is_aktif:true,
            is_gangguan:false,
            is_multi:false
        })

       
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    })

    it("should vailed create product zod error",async()=>{
        const response = await supertest(web)
        .put("/api/product/xl1")
        .set("X-API-TOKEN", "test")
        .send({
            kode_produk:"",
            nama_produk:"",
            kode_providers:"umar",
            is_aktif:true,
            is_gangguan:false,
            is_multi:false
        })

       
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    })

})

describe("/api/product DELETE",()=>{
    afterEach(async()=>{
        await ProductTest.delete()
        await UserTest.delete()
        await ProviderTest.delete()
    })

    beforeEach(async()=>{
        await UserTest.create()
        await ProviderTest.create()
        await ProductTest.create()
    })
    it("should success delete product",async()=>{
        const response = await supertest(web)
        .delete("/api/product/xl1")
        .set("X-API-TOKEN", "test")
       
        expect(response.status).toBe(200);
        expect(response.body.data).toBe("berhasil menghapus produk");

    })
    it("should vailed delete product id wrong",async()=>{
        const response = await supertest(web)
        .delete("/api/product/xl20")
        .set("X-API-TOKEN", "test")
       
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();

    })

})

describe("/api/product VIEW",()=>{
    afterEach(async()=>{
        await ProductTest.delete()
        await UserTest.delete()
        await ProviderTest.delete()
    })

    beforeEach(async()=>{
        await UserTest.create()
        await ProviderTest.create()
        await ProductTest.create()
    })
    it("should success view product",async()=>{
        const response = await supertest(web)
        .get("/api/product")
        .set("X-API-TOKEN", "test")
       
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(3);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(500);

    })
    it("should success view product search kode produk",async()=>{
        const response = await supertest(web)
        .get("/api/product")
        .set("X-API-TOKEN", "test")
        .query({
            kode_produk : "xl1"
        })
       
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(500);

    })
    it("should success view product search kode providers",async()=>{
        const response = await supertest(web)
        .get("/api/product")
        .set("X-API-TOKEN", "test")
        .query({
            kode_providers : "umar"
        })
       
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(2);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(500);

    })
    it("should success view product search name product",async()=>{
        const response = await supertest(web)
        .get("/api/product")
        .set("X-API-TOKEN", "test")
        .query({
            nama_produk : "xl1"
        })
       
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(500);

    })
    it("should success view product search all",async()=>{
        const response = await supertest(web)
        .get("/api/product")
        .set("X-API-TOKEN", "test")
        .query({
            kode_produk : "xl1",
            nama_produk : "xl1",
            kode_providers : "umar"
        })
       
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(500);

    })
})