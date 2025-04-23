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
exports.HargaGrupService = void 0;
const database_1 = require("../../application/database");
const response_error_api_1 = require("../../error/response-error-api");
const validation_1 = require("../../validation/validation");
const grup_service_1 = require("../grup/grup-service");
const product_service_1 = require("../product/product-service");
const harga_grup_model_1 = require("./harga-grup-model");
const harga_grup_validation_1 = require("./harga-grup-validation");
class HargaGrupService {
    static create(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const createRequest = validation_1.Validation.validate(harga_grup_validation_1.HargaGrupValidation.CREATE, request);
            yield grup_service_1.GrupService.checkKodeGrup(createRequest.kode_grups);
            yield product_service_1.ProductService.checkProductExist(createRequest.kode_produks);
            yield this.checkHargaGrupSame(createRequest.kode_grups, createRequest.kode_produks);
            const response = yield database_1.prismaClient.hargaGrup.create({
                data: createRequest
            });
            return (0, harga_grup_model_1.toHargaGrupResponse)(response);
        });
    }
    static createMany(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const createRequest = validation_1.Validation.validate(harga_grup_validation_1.HargaGrupValidation.CREATEMANY, request);
            yield grup_service_1.GrupService.checkKodeGrupSame(createRequest.kode_grup);
            yield grup_service_1.GrupService.checkKodeGrup(createRequest.kode_grups);
            const hargaGrups = yield database_1.prismaClient.hargaGrup.findMany({
                where: {
                    kode_grups: createRequest.kode_grups
                },
                orderBy: {
                    kode_produks: 'asc',
                },
            });
            const results = []; // Array untuk menyimpan hasil
            const kode_grup = createRequest.kode_grup;
            for (let i = 0; i < hargaGrups.length; i++) {
                const dataHargaGrup = {
                    kode_grups: kode_grup,
                    kode_produks: hargaGrups[i].kode_produks,
                    harga: hargaGrups[i].harga,
                    is_gangguan: hargaGrups[i].is_gangguan
                };
                results.push(dataHargaGrup);
            }
            console.log(results);
            yield database_1.prismaClient.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                yield tx.grup.create({
                    data: {
                        kode_grup: createRequest.kode_grup,
                        nama_grup: createRequest.nama_grup
                    }
                });
                yield tx.hargaGrup.createMany({
                    data: results
                });
            }));
            const response = `Berhasil duplikate harga grup`;
            return (response);
        });
    }
    static update(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateRequest = validation_1.Validation.validate(harga_grup_validation_1.HargaGrupValidation.UPDATE, request);
            yield grup_service_1.GrupService.checkKodeGrup(updateRequest.kode_grups);
            yield this.checkHargaGrupExistById(updateRequest.id);
            const response = yield database_1.prismaClient.hargaGrup.update({
                where: {
                    id: updateRequest.id
                },
                data: updateRequest
            });
            return (0, harga_grup_model_1.toHargaGrupResponse)(response);
        });
    }
    static updateMany(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateRequest = validation_1.Validation.validate(harga_grup_validation_1.HargaGrupValidation.UPDATEMANY, request);
            yield this.checkHargaGrupExistByKodeProduks(updateRequest.kode_produks);
            yield database_1.prismaClient.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                yield tx.hargaGrup.updateMany({
                    where: {
                        kode_produks: updateRequest.kode_produks
                    },
                    data: updateRequest
                });
            }));
            const response = `berhasil update harga all grup dengan kode produk ${updateRequest.kode_produks}`;
            return response;
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkHargaGrupExistById(id);
            yield database_1.prismaClient.hargaGrup.delete({
                where: {
                    id: id
                }
            });
        });
    }
    static view(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchRequest = validation_1.Validation.validate(harga_grup_validation_1.HargaGrupValidation.VIEW, request);
            const skip = (searchRequest.page - 1) * searchRequest.size;
            const filters = [];
            if (searchRequest.kode_produks) {
                filters.push({
                    kode_produks: {
                        contains: searchRequest.kode_produks
                    }
                });
            }
            const hargaGrups = yield database_1.prismaClient.hargaGrup.findMany({
                where: {
                    kode_grups: searchRequest.kode_grups,
                    AND: filters
                },
                take: searchRequest.size,
                orderBy: {
                    kode_produks: 'asc',
                },
                skip: skip
            });
            const total = yield database_1.prismaClient.hargaGrup.count({
                where: {
                    AND: filters
                }
            });
            return {
                data: hargaGrups.map(hargaGrups => (0, harga_grup_model_1.toHargaGrupResponse)(hargaGrups)),
                paging: {
                    current_page: searchRequest.page,
                    total_page: Math.ceil(total / searchRequest.size),
                    size: searchRequest.size
                }
            };
        });
    }
    static checkHargaGrupSame(kodeGrups, kodeProduks) {
        return __awaiter(this, void 0, void 0, function* () {
            const check = yield database_1.prismaClient.hargaGrup.count({
                where: {
                    kode_grups: kodeGrups,
                    kode_produks: kodeProduks
                }
            });
            if (check != 0) {
                throw new response_error_api_1.ResponseErrorApi(400, "kode produk sudah di gunakan");
            }
        });
    }
    static checkHargaGrupExistByKodeProduks(kodeProduks) {
        return __awaiter(this, void 0, void 0, function* () {
            const check = yield database_1.prismaClient.hargaGrup.findFirst({
                where: {
                    kode_produks: kodeProduks,
                }
            });
            if (!check) {
                throw new response_error_api_1.ResponseErrorApi(404, "kode produk tidak di temukan");
            }
        });
    }
    static checkHargaGrupExistById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const check = yield database_1.prismaClient.hargaGrup.findUnique({
                where: {
                    id: id,
                }
            });
            if (!check) {
                throw new response_error_api_1.ResponseErrorApi(404, "kode produk tidak di temukan");
            }
        });
    }
    static checkHargaGrupExist(kodeGrups, kodeProduks) {
        return __awaiter(this, void 0, void 0, function* () {
            const check = yield database_1.prismaClient.hargaGrup.findFirst({
                where: {
                    kode_grups: kodeGrups,
                    kode_produks: kodeProduks
                }
            });
            if (!check) {
                throw new response_error_api_1.ResponseErrorApi(400, "kode produk tidak di temukan");
            }
        });
    }
}
exports.HargaGrupService = HargaGrupService;
