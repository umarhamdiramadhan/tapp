import supertest from "supertest"
import { JawabanTest } from "./utils/test-jawaban-utils"
import { UserTest } from "./utils/test-utils"
import { web } from "../src/application/web"

describe("/api/jawaban CREATE",()=>{
    afterEach(async()=>{
        await JawabanTest.delete()
        await UserTest.delete()
    })

    beforeEach(async()=>{
        await JawabanTest.create()
        await UserTest.create()
    })


    it("should success create jawaban",async()=>{
        const response = await supertest(web)
        .post("/api/jawaban")
        .set("X-API-TOKEN", "test")
        .send({
            nama_jawaban:"HAMDI",
            kata_kunci:"SUKSES",
            generate_sn:"regex",
            is_update:false,
            prioritas:1,
            regex:"regex",
            status:"sukses"
        })

        expect(response.status).toBe(200);
        expect(response.body.data.nama_jawaban).toBe("HAMDI");
        expect(response.body.data.kata_kunci).toBe("SUKSES");
        expect(response.body.data.generate_sn).toBe("regex");
        expect(response.body.data.is_update).toBe(false);
        expect(response.body.data.prioritas).toBe(1);
        expect(response.body.data.regex).toBe("regex");
        expect(response.body.data.status).toBe("sukses");
    })

    it("should vailed create jawaban zod",async()=>{
        const response = await supertest(web)
        .post("/api/jawaban")
        .set("X-API-TOKEN", "test")
        .send({
            nama_jawaban:"",
            kata_kunci:"",
            generate_sn:"regex",
            is_update:false,
            prioritas:1,
            regex:"regex",
            status:"sukses"
        })

        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    })
})

describe("/api/jawaban UPDATE",()=>{
    afterEach(async()=>{
        await JawabanTest.delete()
        await UserTest.delete()
    })

    beforeEach(async()=>{
        await JawabanTest.create()
        await UserTest.create()
    })


    it("should success Jawaban Update",async()=>{

        const jawaban = await JawabanTest.view()
        const response = await supertest(web)
        .put(`/api/jawaban/${jawaban.id}`)
        .set("X-API-TOKEN", "test")
        .send({
            nama_jawaban:"UMAR",
            kata_kunci:"SUKSES",
            generate_sn:"regex",
            is_update:false,
            prioritas:1,
            regex:"regex",
            status:"sukses"
        })

        expect(response.status).toBe(200);
        expect(response.body.data.nama_jawaban).toBe("UMAR");
        expect(response.body.data.kata_kunci).toBe("SUKSES");
        expect(response.body.data.generate_sn).toBe("regex");
        expect(response.body.data.is_update).toBe(false);
        expect(response.body.data.prioritas).toBe(1);
        expect(response.body.data.regex).toBe("regex");
        expect(response.body.data.status).toBe("sukses");
    })

    it("should vailed update jawaban zod",async()=>{
        const jawaban = await JawabanTest.view()
        const response = await supertest(web)
        .put(`/api/jawaban/${jawaban.id}`)
        .set("X-API-TOKEN", "test")
        .send({
            nama_jawaban:"",
            kata_kunci:"",
            generate_sn:"regex",
            is_update:false,
            prioritas:1,
            regex:"regex",
            status:"sukses"
        })

        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    })
    it("should vailed update jawaban error id not found",async()=>{
        const jawaban = await JawabanTest.view()
        const response = await supertest(web)
        .put(`/api/jawaban/${jawaban.id+10000}`)
        .set("X-API-TOKEN", "test")
        .send({
            nama_jawaban:"HAMDI",
            kata_kunci:"umar",
            generate_sn:"regex",
            is_update:false,
            prioritas:1,
            regex:"regex",
            status:"sukses"
        })
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    })
})



describe("/api/jawaban DELETE",()=>{
    afterEach(async()=>{
        await JawabanTest.delete()
        await UserTest.delete()
    })

    beforeEach(async()=>{
        await JawabanTest.create()
        await UserTest.create()
    })


    it("should success delete jawaban ",async()=>{
        const jawaban = await JawabanTest.view()
        const response = await supertest(web)
        .delete(`/api/jawaban/${jawaban.id}`)
        .set("X-API-TOKEN", "test")
        expect(response.status).toBe(200);
        expect(response.body.data).toBeDefined();
    })

    it("should vailed delete jawaban error id not found",async()=>{
        const jawaban = await JawabanTest.view()
        const response = await supertest(web)
        .delete(`/api/jawaban/${jawaban.id+10000}`)
        .set("X-API-TOKEN", "test")
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    })

})


describe("/api/jawaban VIEW",()=>{
    afterEach(async()=>{
        await JawabanTest.delete()
        await UserTest.delete()
    })

    beforeEach(async()=>{
        await JawabanTest.create()
        await UserTest.create()
    })

    it("should success delete jawaban ",async()=>{
        const response = await supertest(web)
        .get(`/api/jawaban`)
        .set("X-API-TOKEN", "test")
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(500);
    })
    it("should success delete jawaban ",async()=>{
        const response = await supertest(web)
        .get(`/api/jawaban`)
        .set("X-API-TOKEN", "test")
        .query({
            nama_jawaban:"umar"
        })
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(500);
    })
    it("should success delete jawaban ",async()=>{
        const response = await supertest(web)
        .get(`/api/jawaban`)
        .set("X-API-TOKEN", "test")
        .query({
            status:"sukses"
        })
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(500);
    })
    it("should success delete jawaban ",async()=>{
        const response = await supertest(web)
        .get(`/api/jawaban`)
        .set("X-API-TOKEN", "test")
        .query({
            nama_jawaban:"umar",
            status:"sukses"
        })
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(500);
    })
})