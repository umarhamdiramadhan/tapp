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
exports.ParsingController = void 0;
const parsing_services_1 = require("./parsing-services");
class ParsingController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                const response = yield parsing_services_1.ParsingService.crate(request);
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
                const request = req.body;
                request.id = Number(req.params.id);
                const response = yield parsing_services_1.ParsingService.update(request);
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
                const id = Number(req.params.id);
                yield parsing_services_1.ParsingService.delete(id);
                res.status(200).json({
                    data: "berhasil delete parsing"
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
                    id_moduls: req.query.id_moduls ? Number(req.query.id_moduls) : undefined,
                    kode_produks: req.query.nama_produk,
                    page: req.query.page ? Number(req.query.page) : 1,
                    size: req.query.size ? Number(req.query.size) : 500,
                };
                const response = yield parsing_services_1.ParsingService.view(request);
                res.status(200).json(response);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.ParsingController = ParsingController;
