import supertest from "supertest";
import { web } from "../src/application/web";
import { UserTest } from "./utils/test-utils";

describe("/api/mutasi VIEW",()=>{

    afterEach(async()=>{
        await UserTest.delete()
    })

    beforeEach(async()=>{
        await UserTest.create()
    })

    it("should success view grup",async()=>{
      const response = await supertest(web)
        .get("/api/mutasi")
        .set("X-API-TOKEN", "test")
       
       
        console.log(response.body)
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBeDefined();
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(500);
    })

    it("should success view grup",async()=>{
        const response = await supertest(web)
        .get("/api/mutasi")
        .set("X-API-TOKEN", "test")
        .query({
            jumlah:100000
        })
       
       
        console.log(response.body)
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBeDefined();
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(500);
    })

    it("should success view grup",async()=>{
        const response = await supertest(web)
        .get("/api/mutasi")
        .set("X-API-TOKEN", "test")
        .query({
            date_start:"2024-10-1",
            date_end:"2024-11-21",
        })
       
       
        console.log(response.body)
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(6);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(500);
    })

})