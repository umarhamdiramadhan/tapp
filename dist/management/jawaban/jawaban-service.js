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
exports.JawabanService = void 0;
const database_1 = require("../../application/database");
const response_error_api_1 = require("../../error/response-error-api");
const validation_1 = require("../../validation/validation");
const jawaban_model_1 = require("./jawaban-model");
const jawaban_validation_1 = require("./jawaban-validation");
class JawabanService {
    static create(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const createRequest = validation_1.Validation.validate(jawaban_validation_1.JawabanValidation.CREATE, request);
            const response = yield database_1.prismaClient.jawaban.create({
                data: createRequest
            });
            return (0, jawaban_model_1.toJawabanResponse)(response);
        });
    }
    static update(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateRequest = validation_1.Validation.validate(jawaban_validation_1.JawabanValidation.UPDATE, request);
            yield this.checkIdJawaban(updateRequest.id);
            const response = yield database_1.prismaClient.jawaban.update({
                where: {
                    id: updateRequest.id
                },
                data: updateRequest
            });
            return (0, jawaban_model_1.toJawabanResponse)(response);
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkIdJawaban(id);
            yield database_1.prismaClient.jawaban.delete({
                where: {
                    id: id
                }
            });
        });
    }
    static view(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchRequest = validation_1.Validation.validate(jawaban_validation_1.JawabanValidation.VIEW, request);
            const skip = (searchRequest.page - 1) * searchRequest.size;
            const filters = [];
            if (searchRequest.nama_jawaban) {
                filters.push({
                    nama_jawaban: {
                        contains: searchRequest.nama_jawaban
                    }
                });
            }
            const jawabans = yield database_1.prismaClient.jawaban.findMany({
                where: {
                    status: searchRequest.status,
                    AND: filters
                },
                take: searchRequest.size,
                orderBy: {
                    nama_jawaban: 'asc',
                },
                skip: skip
            });
            const total = yield database_1.prismaClient.jawaban.count({
                where: {
                    AND: filters
                }
            });
            return {
                data: jawabans.map(jawabans => (0, jawaban_model_1.toJawabanResponse)(jawabans)),
                paging: {
                    current_page: searchRequest.page,
                    total_page: Math.ceil(total / searchRequest.size),
                    size: searchRequest.size
                }
            };
        });
    }
    static checkIdJawaban(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const check = yield database_1.prismaClient.jawaban.findFirst({
                where: {
                    id: id
                }
            });
            if (!check) {
                throw new response_error_api_1.ResponseErrorApi(404, "id tidak di temukan");
            }
        });
    }
    static checkNameJawaban(namaJawaban) {
        return __awaiter(this, void 0, void 0, function* () {
            const check = yield database_1.prismaClient.jawaban.findFirst({
                where: {
                    nama_jawaban: namaJawaban
                }
            });
            if (!check) {
                throw new response_error_api_1.ResponseErrorApi(404, "nama jawaban tidak di temukan");
            }
        });
    }
}
exports.JawabanService = JawabanService;
