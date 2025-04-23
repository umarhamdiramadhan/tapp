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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResellerService = void 0;
const database_1 = require("../../application/database");
const response_error_api_1 = require("../../error/response-error-api");
const validation_1 = require("../../validation/validation");
const grup_service_1 = require("../grup/grup-service");
const reseller_model_1 = require("./reseller-model");
const reseller_validation_1 = require("./reseller-validation");
const bcrypt_1 = __importDefault(require("bcrypt"));
class ResellerService {
    static create(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const createRequest = validation_1.Validation.validate(reseller_validation_1.ResellerValidation.CREATE, request);
            yield this.checkKodeResellerCreate(createRequest.kode_reseller);
            yield grup_service_1.GrupService.checkKodeGrup(createRequest.kode_grups);
            if (createRequest.pin != undefined) {
                createRequest.pin = yield bcrypt_1.default.hash(createRequest.pin, 12);
            }
            if (createRequest.password_ip === "") {
                createRequest.password_ip = null;
            }
            if (createRequest.password_ip != undefined) {
                createRequest.password_ip = yield bcrypt_1.default.hash(createRequest.password_ip, 12);
            }
            const response = yield database_1.prismaClient.reseller.create({
                data: createRequest
            });
            return (0, reseller_model_1.toResellerResponse)(response);
        });
    }
    static update(kodeReseller, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateRequest = validation_1.Validation.validate(reseller_validation_1.ResellerValidation.UPDATE, request);
            yield grup_service_1.GrupService.checkKodeGrup(updateRequest.kode_grups);
            yield this.checkKodeReseller(kodeReseller);
            if (updateRequest.pin != undefined) {
                updateRequest.pin = yield bcrypt_1.default.hash(updateRequest.pin, 12);
            }
            if (updateRequest.password_ip === "") {
                updateRequest.password_ip = null;
            }
            if (updateRequest.password_ip != undefined) {
                updateRequest.password_ip = yield bcrypt_1.default.hash(updateRequest.password_ip, 12);
            }
            const response = yield database_1.prismaClient.reseller.update({
                where: {
                    kode_reseller: kodeReseller
                },
                data: updateRequest
            });
            return (0, reseller_model_1.toResellerResponse)(response);
        });
    }
    static delete(kodeReseller) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkKodeReseller(kodeReseller);
            yield database_1.prismaClient.reseller.delete({
                where: {
                    kode_reseller: kodeReseller
                }
            });
        });
    }
    static view(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchRequest = validation_1.Validation.validate(reseller_validation_1.ResellerValidation.VIEW, request);
            const skip = (searchRequest.page - 1) * searchRequest.size;
            const filters = [];
            if (searchRequest.kode_reseller) {
                filters.push({
                    kode_reseller: {
                        contains: searchRequest.kode_reseller
                    }
                });
            }
            if (searchRequest.nama_reseller) {
                filters.push({
                    nama_reseller: {
                        contains: searchRequest.nama_reseller
                    }
                });
            }
            if (searchRequest.nomer_telefon) {
                filters.push({
                    nomer_telefon: {
                        contains: searchRequest.nomer_telefon
                    }
                });
            }
            const resellers = yield database_1.prismaClient.reseller.findMany({
                where: {
                    kode_grups: request.kode_grups,
                    AND: filters
                },
                take: searchRequest.size,
                orderBy: {
                    kode_reseller: 'asc',
                },
                skip: skip
            });
            const total = yield database_1.prismaClient.reseller.count({
                where: {
                    AND: filters
                }
            });
            return {
                data: resellers.map(resellers => (0, reseller_model_1.toResellerResponse)(resellers)),
                paging: {
                    current_page: searchRequest.page,
                    total_page: Math.ceil(total / searchRequest.size),
                    size: searchRequest.size
                }
            };
        });
    }
    static tambahSaldo(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const tambahSaldoRequest = validation_1.Validation.validate(reseller_validation_1.ResellerValidation.TAMBAHSALDO, request);
            yield this.checkKodeReseller(tambahSaldoRequest.kode_reseller);
            const findSaldo = yield database_1.prismaClient.reseller.findFirst({
                where: {
                    kode_reseller: tambahSaldoRequest.kode_reseller,
                }
            });
            const tambah = Math.ceil(findSaldo.saldo + tambahSaldoRequest.jumlah);
            yield database_1.prismaClient.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                const updateSaldo = yield tx.reseller.update({
                    where: {
                        kode_reseller: tambahSaldoRequest.kode_reseller
                    },
                    data: {
                        saldo: tambah
                    }
                });
                yield tx.mutasi.create({
                    data: {
                        jumlah: tambahSaldoRequest.jumlah,
                        keterangan: tambahSaldoRequest.keterangan,
                        kode_resellers: tambahSaldoRequest.kode_reseller
                    }
                });
            }));
            const response = `berhasil tambah saldo kode reseller: ${request.kode_reseller} dengan jumlah ${request.jumlah} sisa saldo ${tambah}`;
            return response;
        });
    }
    static kurangSaldo(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const tambahSaldoRequest = validation_1.Validation.validate(reseller_validation_1.ResellerValidation.KURANGSALDO, request);
            yield this.checkKodeReseller(tambahSaldoRequest.kode_reseller);
            const findSaldo = yield database_1.prismaClient.reseller.findFirst({
                where: {
                    kode_reseller: tambahSaldoRequest.kode_reseller
                }
            });
            const kurang = Math.ceil(findSaldo.saldo - tambahSaldoRequest.jumlah);
            yield database_1.prismaClient.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                const updateSaldo = yield tx.reseller.update({
                    where: {
                        kode_reseller: tambahSaldoRequest.kode_reseller
                    },
                    data: {
                        saldo: kurang
                    }
                });
                yield tx.mutasi.create({
                    data: {
                        jumlah: tambahSaldoRequest.jumlah,
                        keterangan: tambahSaldoRequest.keterangan,
                        kode_resellers: tambahSaldoRequest.kode_reseller
                    }
                });
            }));
            const response = `berhasil kurang saldo kode reseller: ${request.kode_reseller} dengan jumlah ${request.jumlah} sisa saldo ${kurang}`;
            return response;
        });
    }
    static checkKodeResellerCreate(kodeReseller) {
        return __awaiter(this, void 0, void 0, function* () {
            const check = yield database_1.prismaClient.reseller.count({
                where: {
                    kode_reseller: kodeReseller
                }
            });
            if (check != 0) {
                throw new response_error_api_1.ResponseErrorApi(400, "id sudah di gunakan");
            }
        });
    }
    static checkKodeReseller(kodeReseller) {
        return __awaiter(this, void 0, void 0, function* () {
            const check = yield database_1.prismaClient.reseller.findFirst({
                where: {
                    kode_reseller: kodeReseller
                }
            });
            if (!check) {
                throw new response_error_api_1.ResponseErrorApi(404, "id not found");
            }
        });
    }
}
exports.ResellerService = ResellerService;
