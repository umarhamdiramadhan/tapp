import  express  from "express"
import { UserController } from "../management/user/user-controller"
import { authMiddleware } from "../middleware/auth-middleware"
import { DaftarHitamController } from "../management/daftar-hitam/daftar-hitam-controller"
import { GrupController } from "../management/grup/grup-controller"
import { ProviderController } from "../management/provider/provider-controller"
import { ProductController } from "../management/product/product-controller"
import { ResellerController } from "../management/reseller/reseller-controller"
import { MutasiController } from "../management/mutation/mutation-controller"
import { HargaGrupContorller } from "../management/harga-grup/harga-grup-controller"
import { JawabanController } from "../management/jawaban/jawaban-controller"
import { ModulController } from "../management/modul/modul-controller"
import { ParsingController } from "../management/parsing/parsing-controller"
import { InboxController } from "../management/inbox/inbox-controller"
import { OutboxController } from "../management/outbox/outbox-controller"
import { TiketController } from "../management/tiket/tiket-controller"
import { TransaksiController } from "../management/transaksi/transaksi-controller"

export const privateRouter = express.Router()
privateRouter.use(authMiddleware)

privateRouter.post("/api/users",UserController.register)
privateRouter.get("/api/users",UserController.get)
privateRouter.patch("/api/users/:email",UserController.update)
privateRouter.delete("/api/users/:email",UserController.delete)
privateRouter.post("/api/users/logout",UserController.logout)


privateRouter.get("/api/daftar-hitam",DaftarHitamController.view)
privateRouter.post("/api/daftar-hitam",DaftarHitamController.cerate)
privateRouter.put("/api/daftar-hitam/:id(\\d+)",DaftarHitamController.update)
privateRouter.delete("/api/daftar-hitam/:id(\\d+)",DaftarHitamController.delete)



privateRouter.get("/api/grup",GrupController.view)
privateRouter.post("/api/grup",GrupController.create)
privateRouter.put("/api/grup/:kodeGrup",GrupController.update)
privateRouter.delete("/api/grup/:kodeGrup",GrupController.delete)

privateRouter.get("/api/provider",ProviderController.view)
privateRouter.post("/api/provider",ProviderController.create)
privateRouter.put("/api/provider/:kodeProvider",ProviderController.update)
privateRouter.delete("/api/provider/:kodeProvider",ProviderController.delete)

privateRouter.get("/api/product",ProductController.view)
privateRouter.post("/api/product",ProductController.create)
privateRouter.put("/api/product/:kodeProduk",ProductController.update)
privateRouter.delete("/api/product/:kodeProduk",ProductController.delete)


privateRouter.get("/api/reseller",ResellerController.view)
privateRouter.post("/api/reseller",ResellerController.create)
privateRouter.put("/api/reseller/:kodeReseller",ResellerController.update)
privateRouter.delete("/api/reseller/:kodeReseller",ResellerController.delete)
privateRouter.post("/api/reseller/tambah-saldo",ResellerController.tambahSaldo)
privateRouter.post("/api/reseller/kurang-saldo",ResellerController.kurangSaldo)

privateRouter.get("/api/mutasi",MutasiController.view)

privateRouter.get("/api/harga-grup",HargaGrupContorller.view)
privateRouter.post("/api/harga-grup",HargaGrupContorller.create)
privateRouter.put("/api/harga-grup/:id(\\d+)",HargaGrupContorller.update)
privateRouter.put("/api/harga-grup",HargaGrupContorller.updateMany)
privateRouter.delete("/api/harga-grup/:id(\\d+)",HargaGrupContorller.delete)
privateRouter.post("/api/harga-grup/created-many",HargaGrupContorller.createMany)


privateRouter.get("/api/jawaban",JawabanController.view)
privateRouter.post("/api/jawaban",JawabanController.create)
privateRouter.put("/api/jawaban/:id(\\d+)",JawabanController.update)
privateRouter.delete("/api/jawaban/:id(\\d+)",JawabanController.delete)

privateRouter.get("/api/modul",ModulController.view)
privateRouter.post("/api/modul",ModulController.create)
privateRouter.put("/api/modul/:id(\\d+)",ModulController.update)
privateRouter.delete("/api/modul/:id(\\d+)",ModulController.delete)


privateRouter.get("/api/parsing",ParsingController.view)
privateRouter.post("/api/parsing",ParsingController.create)
privateRouter.put("/api/parsing/:id(\\d+)",ParsingController.update)
privateRouter.delete("/api/parsing/:id(\\d+)",ParsingController.delete)


privateRouter.get("/api/inbox",InboxController.view)

privateRouter.get("/api/outbox",OutboxController.view)

privateRouter.get("/api/tiket",TiketController.view)


privateRouter.get("/api/transaksi",TransaksiController.view)
privateRouter.get("/api/transaksi/gagal",TransaksiController.updateGagal)
privateRouter.get("/api/transaksi/sukses",TransaksiController.UpdateSukses)