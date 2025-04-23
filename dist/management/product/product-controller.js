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
exports.ProductController = void 0;
const product_service_1 = require("./product-service");
class ProductController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                const response = yield product_service_1.ProductService.create(request);
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
                const kodeProduk = req.params.kodeProduk;
                const request = req.body;
                const response = yield product_service_1.ProductService.update(kodeProduk, request);
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
                const kodeProduk = req.params.kodeProduk;
                yield product_service_1.ProductService.delete(kodeProduk);
                res.status(200).json({
                    data: "berhasil menghapus produk"
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
                    kode_produk: req.query.kode_produk,
                    kode_providers: req.query.kode_providers,
                    nama_produk: req.query.nama_produk,
                    page: req.query.page ? Number(req.query.page) : 1,
                    size: req.query.size ? Number(req.query.size) : 500,
                };
                const response = yield product_service_1.ProductService.view(request);
                res.status(200).json(response);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.ProductController = ProductController;
