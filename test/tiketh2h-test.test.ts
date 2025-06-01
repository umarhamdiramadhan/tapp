import supertest from "supertest"
import { CheckBalanceH2hTets } from "./utils/test-check-balance-h2h"
import { UserTest } from "./utils/test-utils"
import { TiketTest } from "./utils/test.tiket"
import { web } from "../src/application/web"

describe("/api/TIKET VIEW",()=>{

    afterEach(async()=>{
        await TiketTest.deleteAll()
        await CheckBalanceH2hTets.deleteAll()
    })

    beforeEach(async()=>{
        await CheckBalanceH2hTets.createGrupAndReseller()
    })
       it("should check balance h2h vailed ip wrong",async()=>{  
                const response = await supertest(web)
                .get(`/ticket`)
                .query({
                    memberid:"test",
                    password:"test",
                    pin:"test",
                    amount:20000,
                    cmd:"tiket"
                })
                expect(response.text).toBe("ip yang anda masukan salah");
        })
        it("should check balance h2h vailed zod error",async()=>{  
            const response = await supertest(web)
            .get(`/ticket`)
            .query({
                memberid:"",
                password:"",
                pin:"",
                amount:"",
                cmd:""
            })
           expect(response.text).toBe("Validation Error Silahkan masukan memberId atau pin atau password");
        }) 
        it("should check balance h2h memberid wrong",async()=>{  
            const response = await supertest(web)
            .get(`/ticket`)
            .query({
                memberid:"test2",
                password:"password",
                pin:"122",
                amount:20000,
                cmd:"tiket"
                
            })
            expect(response.text).toBe("member Id Tidak di temukan");
        })
        it("should check balance h2h password wrong",async()=>{  
            const response = await supertest(web)
            .get(`/ticket`)
            .query({
                memberid:"TEST1",
                password:"password",
                pin:"122",
                amount:20000,
                cmd:"tiket"
                
            })
            expect(response.text).toBe("pin atau password salah");
        })
        it("should check balance h2h password wrong",async()=>{  
            const response = await supertest(web)
            .get(`/ticket`)
            .query({
                memberid:"TEST1",
                password:"test",
                pin:"122",
                amount:20000,
                cmd:"tiket"
                
            })
            expect(response.text).toBe("pin atau password salah");
        })

        it("should check balance h2h password wrong",async()=>{  
            const response = await supertest(web)
            .get(`/ticket`)
            .query({
                memberid:"TEST1",
                password:"test",
                pin:"122",
                amount:"abc",
                cmd:"tiket"
                
            })
            console.log(response.text)
            expect(response.text).toBe("Validation Error Silahkan masukan memberId atau pin atau password");
        })
        it("should check balance h2h password wrong",async()=>{  
            const response = await supertest(web)
            .get(`/ticket`)
            .query({
                memberid:"TEST1",
                password:"test",
                pin:"test",
                amount:20000,
                cmd:"tiket"
                
            })
            console.log(response.text)
            expect(response.text).toMatch(/silahkan transfer/);
        })

})