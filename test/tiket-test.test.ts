import supertest from "supertest"
import { CheckBalanceH2hTets } from "./utils/test-check-balance-h2h"
import { UserTest } from "./utils/test-utils"
import { TiketTest } from "./utils/test.tiket"
import { web } from "../src/application/web"

describe("/api/TIKET VIEW",()=>{

    afterEach(async()=>{
        await TiketTest.deleteAll()
        await CheckBalanceH2hTets.deleteAll()
        await UserTest.delete()
    })

    beforeEach(async()=>{
        await UserTest.create()
        await CheckBalanceH2hTets.createGrupAndReseller()
        await TiketTest.create()
    })

it("should success view tiket",async()=>{
      const response = await supertest(web)
        .get("/api/tiket")
        .set("X-API-TOKEN", "test")
       
       
        console.log(response.body)
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBeDefined();
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(20);
    })

    it("should success view tiket search kode reseller",async()=>{
        const response = await supertest(web)
          .get("/api/tiket")
          .set("X-API-TOKEN", "test")
          .query({
            kode_resellers:"TEST1"
          })
         
         
          console.log(response.body)
          expect(response.status).toBe(200);
          expect(response.body.data.length).toBeDefined();
          expect(response.body.paging.current_page).toBe(1);
          expect(response.body.paging.total_page).toBe(1);
          expect(response.body.paging.size).toBe(20);
      })

      it("should success view tiket search nama reseller",async()=>{
        const response = await supertest(web)
          .get("/api/tiket")
          .set("X-API-TOKEN", "test")
          .query({
            nama_resellers:"TEST1"
          })
         
         
          console.log(response.body)
          expect(response.status).toBe(200);
          expect(response.body.data.length).toBeDefined();
          expect(response.body.paging.current_page).toBe(1);
          expect(response.body.paging.total_page).toBe(1);
          expect(response.body.paging.size).toBe(20);
      })

      it("should success view tiket search date",async()=>{
        const response = await supertest(web)
          .get("/api/tiket")
          .set("X-API-TOKEN", "test")
          .query({
             start_date:"9-04-2025",
             end_date:"10-04-2025"
          })
         
         
          console.log(response.body)
          expect(response.status).toBe(200);
          expect(response.body.data.length).toBeDefined();
          expect(response.body.paging.current_page).toBe(1);
          expect(response.body.paging.total_page).toBe(1);
          expect(response.body.paging.size).toBe(20);
      })
    

})
