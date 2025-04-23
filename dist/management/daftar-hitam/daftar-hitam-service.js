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
exports.DaftarHitamServie = void 0;
const database_1 = require("../../application/database");
const response_error_api_1 = require("../../error/response-error-api");
const validation_1 = require("../../validation/validation");
const daftar_hitam_model_1 = require("./daftar-hitam-model");
const daftar_hitam_validation_1 = require("./daftar-hitam-validation");
class DaftarHitamServie {
    static create(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const createRequest = validation_1.Validation.validate(daftar_hitam_validation_1.DaftarHitamValidation.CREATE, request);
            const daftarHitam = yield database_1.prismaClient.daftarHitam.create({
                data: createRequest
            });
            return (0, daftar_hitam_model_1.toDaftarHitamResponse)(daftarHitam);
        });
    }
    static update(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateRequest = validation_1.Validation.validate(daftar_hitam_validation_1.DaftarHitamValidation.UPDATE, request);
            yield this.checkIdDaftarHitam(updateRequest.id);
            const daftarHitam = yield database_1.prismaClient.daftarHitam.update({
                where: {
                    id: updateRequest.id,
                },
                data: updateRequest
            });
            return (0, daftar_hitam_model_1.toDaftarHitamResponse)(daftarHitam);
        });
    }
    static delete(request) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkIdDaftarHitam(request);
            const daftarHitam = yield database_1.prismaClient.daftarHitam.delete({
                where: {
                    id: request
                }
            });
            return (0, daftar_hitam_model_1.toDaftarHitamResponse)(daftarHitam);
        });
    }
    static view(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchRequest = validation_1.Validation.validate(daftar_hitam_validation_1.DaftarHitamValidation.VIEW, request);
            const skip = (searchRequest.page - 1) * searchRequest.size;
            const filters = [];
            if (searchRequest.nomer_tujuan) {
                filters.push({
                    nomer_tujuan: {
                        contains: searchRequest.nomer_tujuan
                    }
                });
            }
            if (searchRequest.keterangan) {
                filters.push({
                    keterangan: {
                        contains: searchRequest.keterangan
                    }
                });
            }
            const daftarHitam = yield database_1.prismaClient.daftarHitam.findMany({
                where: {
                    AND: filters
                },
                take: searchRequest.size,
                skip: skip
            });
            const total = yield database_1.prismaClient.daftarHitam.count({
                where: {
                    AND: filters
                }
            });
            return {
                data: daftarHitam.map(daftarHitam => (0, daftar_hitam_model_1.toDaftarHitamResponse)(daftarHitam)),
                paging: {
                    current_page: searchRequest.page,
                    total_page: Math.ceil(total / searchRequest.size),
                    size: searchRequest.size
                }
            };
        });
    }
    static checkIdDaftarHitam(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const daftarHitamFind = yield database_1.prismaClient.daftarHitam.findFirst({
                where: {
                    id: id
                }
            });
            if (!daftarHitamFind) {
                throw new response_error_api_1.ResponseErrorApi(404, "id not found");
            }
        });
    }
}
exports.DaftarHitamServie = DaftarHitamServie;
