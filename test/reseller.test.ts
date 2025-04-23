import supertest from "supertest"
import { GrupTest } from "./utils/test-grup-util"
import { web } from "../src/application/web"
import { UserTest } from "./utils/test-utils"
import { ResellerTest } from "./utils/test-reseller-utils"
import { MutasiTest } from "./utils/test-mutasi-utils"

describe("/api/reseller CRATE",()=>{

    beforeEach(async()=>{
        await UserTest.create()
        await GrupTest.create()
        await ResellerTest.crate()
    })

    afterEach(async()=>{
        await UserTest.delete()
        await ResellerTest.delete()
        await GrupTest.delete()
    })
    
    it("should api reseller crate",async()=>{
        const response = await supertest(web)
        .post("/api/reseller")
        .set("X-API-TOKEN", "test")
        .send({
            kode_reseller:"umar",
            nama_reseller:"umarhamdi",
            ip:"192.168.0.1",
            ip_callback:"aaaa",
            password_ip:"",
            is_aktif:true,
            alamat:"cakung",
            nama_pemilik:"hamdi",
            nomer_telefon:"+6285146873132",
            id_telegram:"@hamdi",
            allow_sign:false,
            pin:"wow",
            kode_grups:"umar"
        })
        expect(response.status).toBe(200);
        expect(response.body.data.kode_reseller).toBe("umar")
        expect(response.body.data.nama_reseller).toBe("umarhamdi")
        expect(response.body.data.saldo).toBe(0)
        expect(response.body.data.ip).toBe("192.168.0.1")
        expect(response.body.data.is_aktif).toBe(true)
        expect(response.body.data.alamat).toBe("cakung")
        expect(response.body.data.nama_pemilik).toBe("hamdi")
        expect(response.body.data.nomer_telefon).toBe("+6285146873132")
        expect(response.body.data.id_telegram).toBe("@hamdi")
        expect(response.body.data.allow_sign).toBe(false)
        expect(response.body.data.kode_grups).toBe("umar")
    })

    it("should api reseller vailed kode reseller same",async()=>{
        const response = await supertest(web)
        .post("/api/reseller")
        .set("X-API-TOKEN", "test")
        .send({
            kode_reseller:"hamdi",
            nama_reseller:"umarhamdi",
            ip:"192.168.0.1",
            ip_callback:"aaaa",
            password_ip:"",
            is_aktif:true,
            alamat:"cakung",
            nama_pemilik:"hamdi",
            nomer_telefon:"+6285146873132",
            id_telegram:"@hamdi",
            allow_sign:false,
            pin:"wow",
            kode_grups:"umar"
        })
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    })    
    
    it("should api reseller vailed kode grups wrong",async()=>{
        const response = await supertest(web)
        .post("/api/reseller")
        .set("X-API-TOKEN", "test")
        .send({
            kode_reseller:"hamdi",
            nama_reseller:"umarhamdi",
            ip:"192.168.0.1",
            ip_callback:"aaaa",
            password_ip:"",
            is_aktif:true,
            alamat:"cakung",
            nama_pemilik:"hamdi",
            nomer_telefon:"+6285146873132",
            id_telegram:"@hamdi",
            allow_sign:false,
            pin:"wow",
            kode_grups:"hamdi"
        })
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    })  
    it("should api reseller vailed zod",async()=>{
        const response = await supertest(web)
        .post("/api/reseller")
        .set("X-API-TOKEN", "test")
        .send({
            kode_reseller:"",
            nama_reseller:"",
            ip:"192.168.0.1",
            ip_callback:"aaaa",
            password_ip:"",
            is_aktif:true,
            alamat:"cakung",
            nama_pemilik:"hamdi",
            nomer_telefon:"+6285146873132",
            id_telegram:"@hamdi",
            allow_sign:false,
            pin:"wow",
            kode_grups:"hamdi"
        })
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    })  

}) 


describe("/api/reseller UPDATE",()=>{
    beforeEach(async()=>{
        await UserTest.create()
        await GrupTest.create()
        await ResellerTest.crate()
    })

    afterEach(async()=>{
        await UserTest.delete()
        await ResellerTest.delete()
        await GrupTest.delete()
    })

    it("should api reseller update",async()=>{
        const response = await supertest(web)
        .put("/api/reseller/roro")
        .set("X-API-TOKEN", "test")
        .send({
            kode_reseller:"umar",
            nama_reseller:"umarhamdi",
            ip:"192.168.0.1.1.1",
            ip_callback:"aaaa",
            password_ip:"",
            is_aktif:true,
            alamat:"cakung",
            nama_pemilik:"hamdi",
            nomer_telefon:"+6285146873139",
            id_telegram:"@hamdi",
            allow_sign:false,
            pin:"wow",
            kode_grups:"umar"
        })
        expect(response.status).toBe(200);
        expect(response.body.data.kode_reseller).toBe("umar")
        expect(response.body.data.nama_reseller).toBe("umarhamdi")
        expect(response.body.data.saldo).toBe(0)
        expect(response.body.data.ip).toBe("192.168.0.1.1.1")
        expect(response.body.data.is_aktif).toBe(true)
        expect(response.body.data.alamat).toBe("cakung")
        expect(response.body.data.nama_pemilik).toBe("hamdi")
        expect(response.body.data.nomer_telefon).toBe("+6285146873139")
        expect(response.body.data.id_telegram).toBe("@hamdi")
        expect(response.body.data.allow_sign).toBe(false)
        expect(response.body.data.kode_grups).toBe("umar")
    })

    it("should api reseller vailed kode reseller same",async()=>{
        const response = await supertest(web)
        .put("/api/reseller/roro")
        .set("X-API-TOKEN", "test")
        .send({
            kode_reseller:"hamdi",
            nama_reseller:"umarhamdi",
            ip:"192.168.0.1",
            ip_callback:"aaaa",
            password_ip:"",
            is_aktif:true,
            alamat:"cakung",
            nama_pemilik:"hamdi",
            nomer_telefon:"+6285146873132",
            id_telegram:"@hamdi",
            allow_sign:false,
            pin:"wow",
            kode_grups:"umar"
        })
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    })

    it("should api reseller vailed kode reseller wrong",async()=>{
        const response = await supertest(web)
        .put("/api/reseller/bbbc")
        .set("X-API-TOKEN", "test")
        .send({
            kode_reseller:"hamdi",
            nama_reseller:"umarhamdi",
            ip:"192.168.0.1",
            ip_callback:"aaaa",
            password_ip:"",
            is_aktif:true,
            alamat:"cakung",
            nama_pemilik:"hamdi",
            nomer_telefon:"+6285146873132",
            id_telegram:"@hamdi",
            allow_sign:false,
            pin:"wow",
            kode_grups:"umar"
        })
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    })

    it("should api reseller update vailed zod",async()=>{
        const response = await supertest(web)
        .put("/api/reseller/hamdi")
        .set("X-API-TOKEN", "test")
        .send({
            kode_reseller:"",
            nama_reseller:"",
            ip:"192.168.0.1.1.1",
            ip_callback:"aaaa",
            password_ip:"",
            is_aktif:true,
            alamat:"cakung",
            nama_pemilik:"hamdi",
            nomer_telefon:"+6285146873139",
            id_telegram:"@hamdi",
            allow_sign:false,
            pin:"wow",
            kode_grups:"umar"
        })
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    })
})

describe("/api/reseller DELETE",()=>{
    beforeEach(async()=>{
        await UserTest.create()
        await GrupTest.create()
        await ResellerTest.crate()
    })

    afterEach(async()=>{
        await UserTest.delete()
        await ResellerTest.delete()
        await GrupTest.delete()
    })

    it("should api reseller delete",async()=>{
        const response = await supertest(web)
        .delete("/api/reseller/hamdi")
        .set("X-API-TOKEN", "test")
        expect(response.status).toBe(200);
        expect(response.body.data).toBeDefined();
    }) 

    it("should api reseller delete wrong",async()=>{
        const response = await supertest(web)
        .delete("/api/reseller/ssaa")
        .set("X-API-TOKEN", "test")
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    }) 
})

describe("/api/reseller VIEW",()=>{
    beforeEach(async()=>{
        await UserTest.create()
        await GrupTest.create()
        await ResellerTest.crate()
    })

    afterEach(async()=>{
        await UserTest.delete()
        await ResellerTest.delete()
        await GrupTest.delete()
    })

    it("should api reseller view",async()=>{
        const response = await supertest(web)
        .get("/api/reseller")
        .set("X-API-TOKEN", "test")
        
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(2);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(500);
    }) 

    it("should api reseller view",async()=>{
        const response = await supertest(web)
        .get("/api/reseller")
        .set("X-API-TOKEN", "test")
        .query({
            kode_reseller:"hamdi",
        })
        
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(500);
    }) 
    it("should api reseller view",async()=>{
        const response = await supertest(web)
        .get("/api/reseller")
        .set("X-API-TOKEN", "test")
        .query({
            nama_reseller:"umarhamdi",
        })
        
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(2);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(500);
    }) 
    it("should api reseller view",async()=>{
        const response = await supertest(web)
        .get("/api/reseller")
        .set("X-API-TOKEN", "test")
        .query({
            nomer_telefon:"3133",
        })
        
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(500);
    }) 
    it("should api reseller view",async()=>{
        const response = await supertest(web)
        .get("/api/reseller")
        .set("X-API-TOKEN", "test")
        .query({
            kode_grups:"umar",
        })
        
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(2);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(500);
    }) 
    it("should api reseller view",async()=>{
        const response = await supertest(web)
        .get("/api/reseller")
        .set("X-API-TOKEN", "test")
        .query({
            kode_reseller:"hamdi",
            nama_reseller:"umarhamdi",
            nomer_telefon:"3133",
            kode_grups:"umar",
        })
        
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(500);
    }) 
    
})

describe("/api/reseller TAMBAH SALDO",()=>{
    beforeEach(async()=>{
        await UserTest.create()
        await GrupTest.create()
        await ResellerTest.tambahSaldo()
    })

    afterEach(async()=>{
        await UserTest.delete()
        // await MutasiTest.delete()
        await ResellerTest.delete()
        await GrupTest.delete()
    })


    it("should api reseller tambah saldo vailed id wrong",async()=>{
        const response = await supertest(web)
        .post("/api/reseller/tambah-saldo")
        .set("X-API-TOKEN", "test")
        .send({
            kode_reseller:"jokoo",
            jumlah:1000000,
            keterangan:"deposit BCA"
        })
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    })

    it("should api reseller tambah saldo",async()=>{
        const response = await supertest(web)
        .post("/api/reseller/tambah-saldo")
        .set("X-API-TOKEN", "test")
        .send({
            kode_reseller:"joko",
            jumlah:1000000,
            keterangan:"deposit BCA"
        })
        console.log(response.body.data)
        expect(response.status).toBe(200);
        expect(response.body.data).toBe("berhasil tambah saldo kode reseller: joko dengan jumlah 1000000 sisa saldo 1200000");
    })
})

describe("/api/reseller KURANG SALDO",()=>{
    beforeEach(async()=>{
        await UserTest.create()
        await GrupTest.create()
        await ResellerTest.tambahSaldo()
    })

    afterEach(async()=>{
        await UserTest.delete()
        await MutasiTest.delete()
        await ResellerTest.delete()
        await GrupTest.delete()
    })

    it("should api reseller kurang saldo vailed id wrong",async()=>{
        const response = await supertest(web)
        .post("/api/reseller/kurang-saldo")
        .set("X-API-TOKEN", "test")
        .send({
            kode_reseller:"jokoo",
            jumlah:1000000,
            keterangan:"deposit BCA"
        })
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    })

    it("should api reseller kurang saldo",async()=>{
        const response = await supertest(web)
        .post("/api/reseller/kurang-saldo")
        .set("X-API-TOKEN", "test")
        .send({
            kode_reseller:"joko",
            jumlah:50000,
            keterangan:"Tarik Saldo"
        })
        console.log(response.body.data)
        expect(response.status).toBe(200);
        expect(response.body.data).toBe("berhasil kurang saldo kode reseller: joko dengan jumlah 50000 sisa saldo 150000");
    })

})
