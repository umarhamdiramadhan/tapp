import supertest from "supertest"
import { UserTest } from "./utils/test-utils"
import { web } from "../src/application/web"
import { InboxTest } from "./utils/test-inbox-utils"

describe("/api/inbox VIEW",()=>{

    afterEach(async()=>{
        await InboxTest.deleteAll()
        await UserTest.delete()
    })

    beforeEach(async()=>{
        await UserTest.create()
        await InboxTest.create()
    })

    it("should success view grup",async()=>{
      const response = await supertest(web)
        .get("/api/inbox")
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
          .get("/api/inbox")
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
          .get("/api/inbox")
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
          .get("/api/inbox")
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