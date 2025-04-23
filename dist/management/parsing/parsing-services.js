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
exports.ParsingService = void 0;
const database_1 = require("../../application/database");
const response_error_api_1 = require("../../error/response-error-api");
const validation_1 = require("../../validation/validation");
const modul_service_1 = require("../modul/modul-service");
const product_service_1 = require("../product/product-service");
const parsing_model_1 = require("./parsing-model");
const parsing_validation_1 = require("./parsing-validation");
class ParsingService {
    static crate(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const createRequest = validation_1.Validation.validate(parsing_validation_1.ParsingValidation.create, request);
            yield modul_service_1.ModulService.checkIdModul(createRequest.id_moduls);
            yield product_service_1.ProductService.checkProductExist(createRequest.kode_produks);
            const response = yield database_1.prismaClient.parsing.create({
                data: createRequest
            });
            return (0, parsing_model_1.toParsingResponse)(response);
        });
    }
    static update(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateRequest = validation_1.Validation.validate(parsing_validation_1.ParsingValidation.update, request);
            yield this.checkIdParsing(updateRequest.id);
            yield product_service_1.ProductService.checkProductExist(updateRequest.kode_produks);
            const response = yield database_1.prismaClient.parsing.update({
                where: {
                    id: updateRequest.id
                },
                data: updateRequest
            });
            return (0, parsing_model_1.toParsingResponse)(response);
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkIdParsing(id);
            yield database_1.prismaClient.parsing.delete({
                where: {
                    id: id
                }
            });
        });
    }
    static view(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchRequest = validation_1.Validation.validate(parsing_validation_1.ParsingValidation.view, request);
            const skip = (searchRequest.page - 1) * searchRequest.size;
            const filters = [];
            if (searchRequest.kode_produks) {
                filters.push({
                    kode_produks: {
                        contains: searchRequest.kode_produks
                    }
                });
            }
            const parsings = yield database_1.prismaClient.parsing.findMany({
                where: {
                    id_moduls: searchRequest.id_moduls,
                    AND: filters
                },
                orderBy: {
                    kode_produks: 'asc',
                },
                take: searchRequest.size,
                skip: skip
            });
            const total = yield database_1.prismaClient.parsing.count({
                where: {
                    AND: filters
                }
            });
            return {
                data: parsings.map(parsings => (0, parsing_model_1.toParsingResponse)(parsings)),
                paging: {
                    current_page: searchRequest.page,
                    total_page: Math.ceil(total / searchRequest.size),
                    size: searchRequest.size
                }
            };
        });
    }
    static checkIdParsing(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const check = yield database_1.prismaClient.parsing.findFirst({
                where: {
                    id: id
                }
            });
            if (!check) {
                throw new response_error_api_1.ResponseErrorApi(404, "id parsing tidak di temukan");
            }
        });
    }
}
exports.ParsingService = ParsingService;
