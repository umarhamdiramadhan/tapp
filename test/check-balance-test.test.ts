import supertest from "supertest"
import { CheckBalanceH2hTets } from "./utils/test-check-balance-h2h"
import { web } from "../src/application/web"

describe("/balance",()=>{

    afterEach(async()=>{
        await CheckBalanceH2hTets.deleteAll()
    })

    beforeEach(async()=>{
        await CheckBalanceH2hTets.createGrupAndReseller()
    })

    it("should check balance h2h vailed ip wrong",async()=>{  
            const response = await supertest(web)
            .get(`/balance`)
            .query({
                memberid:"test",
                password:"test",
                pin:"test"
                
            })
            expect(response.text).toBe("ip yang anda masukan salah");
    })
    it("should check balance h2h vailed zod error",async()=>{  
        const response = await supertest(web)
        .get(`/balance`)
        .query({
            memberid:"",
            password:"",
            pin:""
            
        })
        expect(response.text).toBe("Validation Error Silahkan masukan memberId atau pin atau password");
    })
    it("should check balance h2h memberid wrong",async()=>{  
        const response = await supertest(web)
        .get(`/balance`)
        .query({
            memberid:"test2",
            password:"password",
            pin:"122"
            
        })
        expect(response.text).toBe("member Id Tidak di temukan");
    })
    it("should check balance h2h password wrong",async()=>{  
        const response = await supertest(web)
        .get(`/balance`)
        .query({
            memberid:"TEST1",
            password:"password",
            pin:"122"
            
        })
        expect(response.text).toBe("pin atau password salah");
    })
    it("should check balance h2h password wrong",async()=>{  
        const response = await supertest(web)
        .get(`/balance`)
        .query({
            memberid:"TEST1",
            password:"test",
            pin:"122"
            
        })
        expect(response.text).toBe("pin atau password salah");
    })
    it("should check balance h2h success",async()=>{  
        const response = await supertest(web)
        .get(`/balance`)
        .query({
            memberid:"TEST1",
            password:"test",
            pin:"test"
            
        })
        expect(response.text).toBe("Yth MemberId TEST1 sisa saldo anda 0 dan pemaikan saldo hari ini 0");
    })

})
