"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../management/user/user-controller");
const check_balance_h2h_controller_1 = require("../management/check-balance-h2h/check-balance-h2h-controller");
const tiket_h2h_controller_1 = require("../management/tiket-h2h/tiket-h2h-controller");
exports.publicRouter = express_1.default.Router();
exports.publicRouter.post("/api/users/login", user_controller_1.UserController.login);
exports.publicRouter.get("/balance", check_balance_h2h_controller_1.chekBalanceH2hController.checkBalanceH2h);
exports.publicRouter.get('/ticket', tiket_h2h_controller_1.TiketH2hController.requestTiket);
