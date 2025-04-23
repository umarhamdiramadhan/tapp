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
exports.ModulService = void 0;
const database_1 = require("../../application/database");
const response_error_api_1 = require("../../error/response-error-api");
const validation_1 = require("../../validation/validation");
const jawaban_service_1 = require("../jawaban/jawaban-service");
const modul_model_1 = require("./modul-model");
const modul_validation_1 = require("./modul-validation");
class ModulService {
    static create(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const createRequest = validation_1.Validation.validate(modul_validation_1.ModulValidation.CREATE, request);
            yield jawaban_service_1.JawabanService.checkNameJawaban(createRequest.jawabans);
            const response = yield database_1.prismaClient.modul.create({
                data: createRequest
            });
            return (0, modul_model_1.toModulResponse)(response);
        });
    }
    static update(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateRequest = validation_1.Validation.validate(modul_validation_1.ModulValidation.UPDATE, request);
            yield jawaban_service_1.JawabanService.checkNameJawaban(updateRequest.jawabans);
            yield this.checkIdModul(updateRequest.id);
            const response = yield database_1.prismaClient.modul.update({
                where: {
                    id: updateRequest.id
                },
                data: updateRequest
            });
            return (0, modul_model_1.toModulResponse)(response);
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkIdModul(id);
            yield database_1.prismaClient.modul.delete({
                where: {
                    id: id
                }
            });
        });
    }
    static view(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchRequest = validation_1.Validation.validate(modul_validation_1.ModulValidation.VIEW, request);
            const skip = (searchRequest.page - 1) * searchRequest.size;
            const filters = [];
            if (searchRequest.nama_moduls) {
                filters.push({
                    nama_moduls: {
                        contains: searchRequest.nama_moduls
                    }
                });
            }
            const moduls = yield database_1.prismaClient.modul.findMany({
                where: {
                    AND: filters
                },
                take: searchRequest.size,
                orderBy: {
                    nama_moduls: 'asc',
                },
                skip: skip
            });
            const total = yield database_1.prismaClient.modul.count({
                where: {
                    AND: filters
                }
            });
            return {
                data: moduls.map(moduls => (0, modul_model_1.toModulResponse)(moduls)),
                paging: {
                    current_page: searchRequest.page,
                    total_page: Math.ceil(total / searchRequest.size),
                    size: searchRequest.size
                }
            };
        });
    }
    static checkIdModul(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const check = yield database_1.prismaClient.modul.findFirst({
                where: {
                    id: id
                }
            });
            if (!check) {
                throw new response_error_api_1.ResponseErrorApi(404, "id module tidak di temukan");
            }
        });
    }
}
exports.ModulService = ModulService;
