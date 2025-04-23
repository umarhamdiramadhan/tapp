"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResellerController = void 0;
const reseller_service_1 = require("./reseller-service");
class ResellerController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                console.log(req.body);
                const response = yield reseller_service_1.ResellerService.create(request);
                res.status(200).json({
                    data: response
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const kodeReseller = req.params.kodeReseller;
                const request = req.body;
                const response = yield reseller_service_1.ResellerService.update(kodeReseller, request);
                res.status(200).json({
                    data: response
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const kodeReseller = req.params.kodeReseller;
                yield reseller_service_1.ResellerService.delete(kodeReseller);
                res.status(200).json({
                    data: "Berhasil menghapus reseller"
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static view(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = {
                    kode_reseller: req.query.kode_reseller,
                    nama_reseller: req.query.kode_reseller,
                    kode_grups: req.query.kode_grups,
                    nomer_telefon: req.query.nomer_telefon,
                    page: req.query.page ? Number(req.query.page) : 1,
                    size: req.query.size ? Number(req.query.size) : 500,
                };
                const response = yield reseller_service_1.ResellerService.view(request);
                res.status(200).json(response);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static tambahSaldo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                const response = yield reseller_service_1.ResellerService.tambahSaldo(request);
                res.status(200).json({
                    data: response
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static kurangSaldo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                const response = yield reseller_service_1.ResellerService.kurangSaldo(request);
                res.status(200).json({
                    data: response
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.ResellerController = ResellerController;
