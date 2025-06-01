import  express  from "express"
import { UserController } from "../management/user/user-controller"
import { chekBalanceH2hController } from "../management/check-balance-h2h/check-balance-h2h-controller"
import { TiketH2hController } from "../management/tiket-h2h/tiket-h2h-controller"
import { TransaksiH2hController } from "../management/transaksi-h2h/transaksi-h2h-controller"

export const publicRouter = express.Router()
publicRouter.post("/api/users/login",UserController.login)

publicRouter.get("/balance",chekBalanceH2hController.checkBalanceH2h)
publicRouter.get('/ticket',TiketH2hController.requestTiket)
publicRouter.get('/trx',TransaksiH2hController.transaksi)