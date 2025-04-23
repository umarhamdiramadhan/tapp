import supertest from "supertest"
import {web} from "../src/application/web";
import { UserTest } from "./utils/test-utils";


describe('/api/users',() => {

    afterEach(async() =>{
        await UserTest.delete()
    })

    beforeEach(async() => {
        await UserTest.create()
    })

    it("should create user success test", async()=>{
        const response = await supertest(web)
        .post("/api/users")
        .set("X-API-TOKEN", "test")
        .send({
            email:"umar@gmail.com",
            password:"test",
            name:"test",
            role:"administrator",
            is_aktif:true
        })
        expect(response.status).toBe(200);
        expect(response.body.data.email).toBe("umar@gmail.com");
        expect(response.body.data.name).toBe("test");
        expect(response.body.data.role).toBe("administrator");
        expect(response.body.data.is_aktif).toBe(true);
    })

    it("should create user vailed zod", async()=>{
        const response = await supertest(web)
        .post("/api/users")
        .set("X-API-TOKEN", "test")
        .send({
            email:"",
            password:"",
            name:"",
            role:"",
            is_aktif:true
        })
        
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    })

    it("should create user vailed not login", async()=>{
        const response = await supertest(web)
        .post("/api/users")
        .send({
            email:"umar@gmail.com",
            password:"test",
            name:"test",
            role:"administrator",
            is_aktif:true
        })
        
        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
    })

    it("should create user vailed no administrator", async()=>{
        const response = await supertest(web)
        .post("/api/users")
        .set("X-API-TOKEN", "cs")
        .send({
            email:"umar@gmail.com",
            password:"test",
            name:"test",
            role:"administrator",
            is_aktif:true
        })
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    })



})


describe("/api/users/login",()=>{
    beforeEach(async () => {
        await UserTest.create();
    });

    afterEach(async () => {
        await UserTest.delete();
    });

    it("should login success",async()=>{
        const response = await supertest(web)
        .post("/api/users/login")
        .send({
            email: "admin@gmail.com",
            password: "test"
        });

        expect(response.status).toBe(200);
        expect(response.body.data.email).toBe("admin@gmail.com");
        expect(response.body.data.name).toBe("admin");
        expect(response.body.data.token).toBeDefined();
    })

    it("should login email wrong",async()=>{
        const response = await supertest(web)
        .post("/api/users/login")
        .send({
            email: "rma@gmail.com",
            password: "test"
        });

        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
    })

    it("should login password wrong",async()=>{
        const response = await supertest(web)
        .post("/api/users/login")
        .send({
            email: "admin@gmail.com",
            password: "testa"
        });

        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
    })

    it("should login is aktif false",async()=>{
        const response = await supertest(web)
        .post("/api/users/login")
        .send({
            email: "operator@gmail.com",
            password: "test"
        });

        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
    })

})

describe("/api/users UPDATE",()=>{

    afterEach(async() =>{
        await UserTest.delete()
    })

    beforeEach(async() => {
        await UserTest.create()
    })


    it("should sucess update name",async()=>{
        const response = await supertest(web)
        .patch("/api/users/admin@gmail.com")
        .set("X-API-TOKEN", "test")
        .send({
            name: "hamdi ganteng",
        });

        expect(response.status).toBe(200);
        expect(response.body.data.email).toBe("admin@gmail.com");
        expect(response.body.data.name).toBe("hamdi ganteng");
        expect(response.body.data.role).toBe("administrator");
        expect(response.body.data.is_aktif).toBe(true);

    })

    it("should sucess update password",async()=>{
        const response = await supertest(web)
        .patch("/api/users/admin@gmail.com")
        .set("X-API-TOKEN", "test")
        .send({
            password:"hammm"
        });

        expect(response.status).toBe(200);
        expect(response.body.data.email).toBe("admin@gmail.com");
        expect(response.body.data.name).toBe("admin");
        expect(response.body.data.role).toBe("administrator");
        expect(response.body.data.is_aktif).toBe(true);
    })

    it("should sucess update role",async()=>{
        const response = await supertest(web)
        .patch("/api/users/admin@gmail.com")
        .set("X-API-TOKEN", "test")
        .send({
            role:"cs"
        });

        expect(response.status).toBe(200);
        expect(response.body.data.email).toBe("admin@gmail.com");
        expect(response.body.data.name).toBe("admin");
        expect(response.body.data.role).toBe("cs");
        expect(response.body.data.is_aktif).toBe(true);
    })

    it("should sucess update is_aktif",async()=>{
        const response = await supertest(web)
        .patch("/api/users/admin@gmail.com")
        .set("X-API-TOKEN", "test")
        .send({
            is_aktif:false
        });

        expect(response.status).toBe(200);
        expect(response.body.data.email).toBe("admin@gmail.com");
        expect(response.body.data.name).toBe("admin");
        expect(response.body.data.role).toBe("administrator");
        expect(response.body.data.is_aktif).toBe(false);
    })

    it("should sucess update all",async()=>{
        const response = await supertest(web)
        .patch("/api/users/admin@gmail.com")
        .set("X-API-TOKEN", "test")
        .send({
            name:"hahah",
            role:"cs",
            is_aktif:false
        });

        expect(response.status).toBe(200);
        expect(response.body.data.email).toBe("admin@gmail.com");
        expect(response.body.data.name).toBe("hahah");
        expect(response.body.data.role).toBe("cs");
        expect(response.body.data.is_aktif).toBe(false);
    })

    it("should vailed update email wrong",async()=>{
        const response = await supertest(web)
        .patch("/api/users/adminaas@gmail.com")
        .set("X-API-TOKEN", "test")
        .send({
            name:"hahah",
            role:"cs",
            is_aktif:false
        });

      
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    })


    it("should vailed update not administrator",async()=>{
        const response = await supertest(web)
        .patch("/api/users/admin@gmail.com")
        .set("X-API-TOKEN", "cs")
        .send({
            name:"hahah",
            role:"cs",
            is_aktif:false
        });

      
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    })

    it("should vailed update not login",async()=>{
        const response = await supertest(web)
        .patch("/api/users/admin@gmail.com")
        .send({
            name:"hahah",
            role:"cs",
            is_aktif:false
        });

      
        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
    })


})

describe("/api/users/logout",()=>{
    beforeEach(async () => {
        await UserTest.create();
    });

    afterEach(async () => {
        await UserTest.delete();
    });

    it('should success logout', async () => {
        const response = await supertest(web)
            .post("/api/users/logout")
            .set("X-API-TOKEN", "test");

        expect(response.status).toBe(200);
        expect(response.body.data).toBe("berhasil logout");

        const user = await UserTest.get();
        expect(user.token).toBeNull();

    });

    it('should vailed logout wrong token', async () => {
        const response = await supertest(web)
            .post("/api/users/logout")
            .set("X-API-TOKEN", "testaaa");

        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();

    });

})

describe("/api/users LOGOUT",()=>{

    beforeEach(async () => {
        await UserTest.create();
    });

    afterEach(async () => {
        await UserTest.delete();
    });


    it("should succes delete user",async()=>{

        const response = await supertest(web)
        .delete("/api/users/admin@gmail.com")
        .set("X-API-TOKEN", "test")
     
        expect(response.status).toBe(200);
        expect(response.body.data).toBe("berhasil menghapus username");

    })

    it("should vailed delete user wrong email",async()=>{

        const response = await supertest(web)
        .delete("/api/users/admin@gmaail.com")
        .set("X-API-TOKEN", "test")
     
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();

    })


    it("should vailed delete user not adminstrator",async()=>{

        const response = await supertest(web)
        .delete("/api/users/admin@gmail.com")
        .set("X-API-TOKEN", "cs")
     
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();

    })

})

describe("/api/users View",()=>{

    beforeEach(async () => {
        await UserTest.create();
    });

    afterEach(async () => {
        await UserTest.delete();
    });

    it("should search no query",async() => {
        const response = await supertest(web)
        .get("/api/users")
        .set("X-API-TOKEN", "test")


        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(3);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(10);
    })

    it("should search user by name",async() => {
        const response = await supertest(web)
        .get("/api/users")
        .query({
            name:"cs"
        })
        .set("X-API-TOKEN", "test")
      

        console.log(response.body.data)


        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(10);
    })

    it("should search user by email",async() => {
        const response = await supertest(web)
        .get("/api/users")
        .query({
            email:"cs@gmail.com"
        })
        .set("X-API-TOKEN", "test")
      



        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(10);
    })

    it("should search user by email and email",async() => {
        const response = await supertest(web)
        .get("/api/users")
        .query({
            name:"cs",
            email:"cs@gmail.com"
        })
        .set("X-API-TOKEN", "test")
      


        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(10);
    })

    it("should search user by email and email",async() => {
        const response = await supertest(web)
        .get("/api/users")
        .query({
            name:"cs",
            email:"cs@gmail.com",
            size:20
        })
        .set("X-API-TOKEN", "test")
      


        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(20);
    })

})