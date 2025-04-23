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
exports.ProviderService = void 0;
const database_1 = require("../../application/database");
const response_error_api_1 = require("../../error/response-error-api");
const validation_1 = require("../../validation/validation");
const provider_model_1 = require("./provider-model");
const provider_validation_1 = require("./provider-validation");
class ProviderService {
    static create(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const createRequest = validation_1.Validation.validate(provider_validation_1.ProviderValidation.CREATE, request);
            yield this.checkKodeProviderCreate(createRequest.kode_provider);
            const response = yield database_1.prismaClient.provider.create({
                data: createRequest
            });
            return (0, provider_model_1.toProviderResponse)(response);
        });
    }
    static update(kodeProvider, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateRequest = validation_1.Validation.validate(provider_validation_1.ProviderValidation.UPDATE, request);
            yield this.checkKodeProviderUpdateAndDelete(kodeProvider);
            const response = yield database_1.prismaClient.provider.update({
                where: {
                    kode_provider: kodeProvider
                },
                data: updateRequest
            });
            return (0, provider_model_1.toProviderResponse)(response);
        });
    }
    static delete(kodeProvider) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkKodeProviderUpdateAndDelete(kodeProvider);
            yield database_1.prismaClient.provider.delete({
                where: {
                    kode_provider: kodeProvider
                }
            });
        });
    }
    static view(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchRequest = validation_1.Validation.validate(provider_validation_1.ProviderValidation.VIEW, request);
            const skip = (searchRequest.page - 1) * searchRequest.size;
            const filters = [];
            if (searchRequest.kode_provider) {
                filters.push({
                    kode_provider: {
                        contains: searchRequest.kode_provider
                    }
                });
            }
            if (searchRequest.nama_provider) {
                filters.push({
                    nama_provider: {
                        contains: searchRequest.nama_provider
                    }
                });
            }
            const providers = yield database_1.prismaClient.provider.findMany({
                where: {
                    AND: filters
                },
                orderBy: {
                    kode_provider: 'asc',
                },
                take: searchRequest.size,
                skip: skip
            });
            const total = yield database_1.prismaClient.provider.count({
                where: {
                    AND: filters
                }
            });
            return {
                data: providers.map(providers => (0, provider_model_1.toProviderResponse)(providers)),
                paging: {
                    current_page: searchRequest.page,
                    total_page: Math.ceil(total / searchRequest.size),
                    size: searchRequest.size
                }
            };
        });
    }
    static checkKodeProviderUpdateAndDelete(kodeProvider) {
        return __awaiter(this, void 0, void 0, function* () {
            const check = yield database_1.prismaClient.provider.findFirst({
                where: {
                    kode_provider: kodeProvider
                }
            });
            if (!check) {
                throw new response_error_api_1.ResponseErrorApi(404, "kode provider double");
            }
        });
    }
    static checkKodeProviderCreate(kodeProvider) {
        return __awaiter(this, void 0, void 0, function* () {
            const check = yield database_1.prismaClient.provider.count({
                where: {
                    kode_provider: kodeProvider
                }
            });
            if (check != 0) {
                throw new response_error_api_1.ResponseErrorApi(404, "id not found");
            }
        });
    }
}
exports.ProviderService = ProviderService;
