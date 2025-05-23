"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.privateRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../management/user/user-controller");
const auth_middleware_1 = require("../middleware/auth-middleware");
const daftar_hitam_controller_1 = require("../management/daftar-hitam/daftar-hitam-controller");
const grup_controller_1 = require("../management/grup/grup-controller");
const provider_controller_1 = require("../management/provider/provider-controller");
const product_controller_1 = require("../management/product/product-controller");
const reseller_controller_1 = require("../management/reseller/reseller-controller");
const mutation_controller_1 = require("../management/mutation/mutation-controller");
const harga_grup_controller_1 = require("../management/harga-grup/harga-grup-controller");
const jawaban_controller_1 = require("../management/jawaban/jawaban-controller");
const modul_controller_1 = require("../management/modul/modul-controller");
const parsing_controller_1 = require("../management/parsing/parsing-controller");
const inbox_controller_1 = require("../management/inbox/inbox-controller");
const outbox_controller_1 = require("../management/outbox/outbox-controller");
const tiket_controller_1 = require("../management/tiket/tiket-controller");
exports.privateRouter = express_1.default.Router();
exports.privateRouter.use(auth_middleware_1.authMiddleware);
exports.privateRouter.post("/api/users", user_controller_1.UserController.register);
exports.privateRouter.get("/api/users", user_controller_1.UserController.get);
exports.privateRouter.patch("/api/users/:email", user_controller_1.UserController.update);
exports.privateRouter.delete("/api/users/:email", user_controller_1.UserController.delete);
exports.privateRouter.post("/api/users/logout", user_controller_1.UserController.logout);
exports.privateRouter.get("/api/daftar-hitam", daftar_hitam_controller_1.DaftarHitamController.view);
exports.privateRouter.post("/api/daftar-hitam", daftar_hitam_controller_1.DaftarHitamController.cerate);
exports.privateRouter.put("/api/daftar-hitam/:id(\\d+)", daftar_hitam_controller_1.DaftarHitamController.update);
exports.privateRouter.delete("/api/daftar-hitam/:id(\\d+)", daftar_hitam_controller_1.DaftarHitamController.delete);
exports.privateRouter.get("/api/grup", grup_controller_1.GrupController.view);
exports.privateRouter.post("/api/grup", grup_controller_1.GrupController.create);
exports.privateRouter.put("/api/grup/:kodeGrup", grup_controller_1.GrupController.update);
exports.privateRouter.delete("/api/grup/:kodeGrup", grup_controller_1.GrupController.delete);
exports.privateRouter.get("/api/provider", provider_controller_1.ProviderController.view);
exports.privateRouter.post("/api/provider", provider_controller_1.ProviderController.create);
exports.privateRouter.put("/api/provider/:kodeProvider", provider_controller_1.ProviderController.update);
exports.privateRouter.delete("/api/provider/:kodeProvider", provider_controller_1.ProviderController.delete);
exports.privateRouter.get("/api/product", product_controller_1.ProductController.view);
exports.privateRouter.post("/api/product", product_controller_1.ProductController.create);
exports.privateRouter.put("/api/product/:kodeProduk", product_controller_1.ProductController.update);
exports.privateRouter.delete("/api/product/:kodeProduk", product_controller_1.ProductController.delete);
exports.privateRouter.get("/api/reseller", reseller_controller_1.ResellerController.view);
exports.privateRouter.post("/api/reseller", reseller_controller_1.ResellerController.create);
exports.privateRouter.put("/api/reseller/:kodeReseller", reseller_controller_1.ResellerController.update);
exports.privateRouter.delete("/api/reseller/:kodeReseller", reseller_controller_1.ResellerController.delete);
exports.privateRouter.post("/api/reseller/tambah-saldo", reseller_controller_1.ResellerController.tambahSaldo);
exports.privateRouter.post("/api/reseller/kurang-saldo", reseller_controller_1.ResellerController.kurangSaldo);
exports.privateRouter.get("/api/mutasi", mutation_controller_1.MutasiController.view);
exports.privateRouter.get("/api/harga-grup", harga_grup_controller_1.HargaGrupContorller.view);
exports.privateRouter.post("/api/harga-grup", harga_grup_controller_1.HargaGrupContorller.create);
exports.privateRouter.put("/api/harga-grup/:id(\\d+)", harga_grup_controller_1.HargaGrupContorller.update);
exports.privateRouter.put("/api/harga-grup", harga_grup_controller_1.HargaGrupContorller.updateMany);
exports.privateRouter.delete("/api/harga-grup/:id(\\d+)", harga_grup_controller_1.HargaGrupContorller.delete);
exports.privateRouter.post("/api/harga-grup/created-many", harga_grup_controller_1.HargaGrupContorller.createMany);
exports.privateRouter.get("/api/jawaban", jawaban_controller_1.JawabanController.view);
exports.privateRouter.post("/api/jawaban", jawaban_controller_1.JawabanController.create);
exports.privateRouter.put("/api/jawaban/:id(\\d+)", jawaban_controller_1.JawabanController.update);
exports.privateRouter.delete("/api/jawaban/:id(\\d+)", jawaban_controller_1.JawabanController.delete);
exports.privateRouter.get("/api/modul", modul_controller_1.ModulController.view);
exports.privateRouter.post("/api/modul", modul_controller_1.ModulController.create);
exports.privateRouter.put("/api/modul/:id(\\d+)", modul_controller_1.ModulController.update);
exports.privateRouter.delete("/api/modul/:id(\\d+)", modul_controller_1.ModulController.delete);
exports.privateRouter.get("/api/parsing", parsing_controller_1.ParsingController.view);
exports.privateRouter.post("/api/parsing", parsing_controller_1.ParsingController.create);
exports.privateRouter.put("/api/parsing/:id(\\d+)", parsing_controller_1.ParsingController.update);
exports.privateRouter.delete("/api/parsing/:id(\\d+)", parsing_controller_1.ParsingController.delete);
exports.privateRouter.get("/api/inbox", inbox_controller_1.InboxController.view);
exports.privateRouter.get("/api/outbox", outbox_controller_1.OutboxController.view);
exports.privateRouter.get("/api/tiket", tiket_controller_1.TiketController.view);
