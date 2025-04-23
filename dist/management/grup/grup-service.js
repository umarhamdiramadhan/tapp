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
exports.GrupService = void 0;
const database_1 = require("../../application/database");
const response_error_api_1 = require("../../error/response-error-api");
const validation_1 = require("../../validation/validation");
const grup_model_1 = require("./grup-model");
const grup_validation_1 = require("./grup-validation");
class GrupService {
    static create(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const createRequest = validation_1.Validation.validate(grup_validation_1.GrupValidation.CREATE, request);
            yield this.checkKodeGrupSame(createRequest.kode_grup);
            const response = yield database_1.prismaClient.grup.create({
                data: createRequest
            });
            return (0, grup_model_1.toGrupResponse)(response);
        });
    }
    static update(kodeGrup, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateRequest = validation_1.Validation.validate(grup_validation_1.GrupValidation.UPDATE, request);
            yield this.checkKodeGrup(kodeGrup);
            const response = yield database_1.prismaClient.grup.update({
                where: {
                    kode_grup: kodeGrup
                },
                data: updateRequest
            });
            return (response);
        });
    }
    static delete(kodeGrup) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkKodeGrup(kodeGrup);
            yield database_1.prismaClient.grup.delete({
                where: {
                    kode_grup: kodeGrup
                }
            });
        });
    }
    static view(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchRequest = validation_1.Validation.validate(grup_validation_1.GrupValidation.VIEW, request);
            const skip = (searchRequest.page - 1) * searchRequest.size;
            const filters = [];
            if (searchRequest.kode_grup) {
                filters.push({
                    kode_grup: {
                        contains: searchRequest.kode_grup
                    }
                });
            }
            if (searchRequest.nama_grup) {
                filters.push({
                    nama_grup: {
                        contains: searchRequest.nama_grup
                    }
                });
            }
            const grups = yield database_1.prismaClient.grup.findMany({
                where: {
                    AND: filters
                },
                take: searchRequest.size,
                orderBy: {
                    kode_grup: 'asc',
                },
                skip: skip
            });
            const total = yield database_1.prismaClient.grup.count({
                where: {
                    AND: filters
                }
            });
            return {
                data: grups.map(grups => (0, grup_model_1.toGrupResponse)(grups)),
                paging: {
                    current_page: searchRequest.page,
                    total_page: Math.ceil(total / searchRequest.size),
                    size: searchRequest.size
                }
            };
        });
    }
    static checkKodeGrup(kodeGrup) {
        return __awaiter(this, void 0, void 0, function* () {
            const check = yield database_1.prismaClient.grup.findFirst({
                where: {
                    kode_grup: kodeGrup
                }
            });
            if (!check) {
                throw new response_error_api_1.ResponseErrorApi(404, "kode produk not found");
            }
        });
    }
    static checkKodeGrupSame(kodeGrup) {
        return __awaiter(this, void 0, void 0, function* () {
            const check = yield database_1.prismaClient.grup.count({
                where: {
                    kode_grup: kodeGrup
                }
            });
            if (check != 0) {
                throw new response_error_api_1.ResponseErrorApi(400, "id sudah di gunakan");
            }
        });
    }
}
exports.GrupService = GrupService;
