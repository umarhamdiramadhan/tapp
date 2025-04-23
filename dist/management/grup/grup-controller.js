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
exports.GrupController = void 0;
const grup_service_1 = require("./grup-service");
class GrupController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                const response = yield grup_service_1.GrupService.create(request);
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
                const kodeGrup = req.params.kodeGrup;
                console.log(kodeGrup);
                const request = req.body;
                const response = yield grup_service_1.GrupService.update(kodeGrup, request);
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
                const kodeGrup = req.params.kodeGrup;
                const response = yield grup_service_1.GrupService.delete(kodeGrup);
                res.status(200).json({
                    data: "Berhasil menghapus kode grup"
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
                    kode_grup: req.query.kode_grup,
                    nama_grup: req.query.nama_grup,
                    page: req.query.page ? Number(req.query.page) : 1,
                    size: req.query.size ? Number(req.query.size) : 500,
                };
                const response = yield grup_service_1.GrupService.view(request);
                res.status(200).json(response);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.GrupController = GrupController;
