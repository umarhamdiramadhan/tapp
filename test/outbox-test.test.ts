import supertest from "supertest"
import { UserTest } from "./utils/test-utils"
import { web } from "../src/application/web"
import { OutboxTest } from "./utils/test-outbox-utils"

describe("/api/mutasi VIEW",()=>{

    afterEach(async()=>{
        await OutboxTest.deleteAll()
        await UserTest.delete()
    })

    beforeEach(async()=>{
        await UserTest.create()
        await OutboxTest.create()
    })

    it("should success view grup",async()=>{
      const response = await supertest(web)
        .get("/api/outbox")
        .set("X-API-TOKEN", "test")
       
       
        console.log(response.body)
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBeDefined();
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(20);
    })

    it("should success view grup",async()=>{
        const response = await supertest(web)
          .get("/api/outbox")
          .set("X-API-TOKEN", "test")
          .query({
            pesan:"0895385779558"
          })
         
         
          console.log(response.body)
          expect(response.status).toBe(200);
          expect(response.body.data.length).toBeDefined();
          expect(response.body.paging.current_page).toBe(1);
          expect(response.body.paging.total_page).toBe(1);
          expect(response.body.paging.size).toBe(20);
      })

      it("should success view grup",async()=>{
        const response = await supertest(web)
          .get("/api/outbox")
          .set("X-API-TOKEN", "test")
          .query({
            start_date:"3-01-2025",
            end_date:"3-01-2025"
          })
         
         
          console.log(response.body)
          expect(response.status).toBe(200);
          expect(response.body.data.length).toBeDefined();
          expect(response.body.paging.current_page).toBe(1);
          expect(response.body.paging.total_page).toBe(1);
          expect(response.body.paging.size).toBe(20);
      })

      it("should success view grup",async()=>{
        const response = await supertest(web)
          .get("/api/outbox")
          .set("X-API-TOKEN", "test")
          .query({
            pesan:"dfj429du0roju512",
            start_date:"3-01-2025",
            end_date:"3-01-2025"
          })
         
         
          console.log(response.body)
          expect(response.status).toBe(200);
          expect(response.body.data.length).toBeDefined();
          expect(response.body.paging.current_page).toBe(1);
          expect(response.body.paging.total_page).toBe(1);
          expect(response.body.paging.size).toBe(20);
      })
})