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
exports.ProductService = void 0;
const database_1 = require("../../application/database");
const response_error_api_1 = require("../../error/response-error-api");
const validation_1 = require("../../validation/validation");
const provider_service_1 = require("../provider/provider-service");
const product_model_1 = require("./product-model");
const product_validation_1 = require("./product-validation");
class ProductService {
    static create(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const createRequest = validation_1.Validation.validate(product_validation_1.ProductValidation.CREATE, request);
            yield provider_service_1.ProviderService.checkKodeProviderUpdateAndDelete(createRequest.kode_providers);
            yield this.checkProductDouble(createRequest.kode_produk);
            const response = yield database_1.prismaClient.product.create({
                data: createRequest
            });
            return (0, product_model_1.toProductResponse)(response);
        });
    }
    static update(kodeProduk, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateProduct = validation_1.Validation.validate(product_validation_1.ProductValidation.UPDATE, request);
            yield provider_service_1.ProviderService.checkKodeProviderUpdateAndDelete(updateProduct.kode_providers);
            yield this.checkProductExist(kodeProduk);
            const response = yield database_1.prismaClient.product.update({
                where: {
                    kode_produk: kodeProduk
                },
                data: updateProduct
            });
            return (0, product_model_1.toProductResponse)(response);
        });
    }
    static delete(kodeProduk) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkProductExist(kodeProduk);
            yield database_1.prismaClient.product.delete({
                where: {
                    kode_produk: kodeProduk
                }
            });
        });
    }
    static view(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchRequest = validation_1.Validation.validate(product_validation_1.ProductValidation.VIEW, request);
            const skip = (searchRequest.page - 1) * searchRequest.size;
            const filters = [];
            if (searchRequest.kode_produk) {
                filters.push({
                    kode_produk: {
                        contains: searchRequest.kode_produk
                    }
                });
            }
            if (searchRequest.nama_produk) {
                filters.push({
                    nama_produk: {
                        contains: searchRequest.nama_produk
                    }
                });
            }
            const products = yield database_1.prismaClient.product.findMany({
                where: {
                    kode_providers: request.kode_providers,
                    AND: filters
                },
                orderBy: {
                    kode_produk: 'asc',
                },
                take: searchRequest.size,
                skip: skip
            });
            const total = yield database_1.prismaClient.product.count({
                where: {
                    AND: filters
                }
            });
            return {
                data: products.map(products => (0, product_model_1.toProductResponse)(products)),
                paging: {
                    current_page: searchRequest.page,
                    total_page: Math.ceil(total / searchRequest.size),
                    size: searchRequest.size
                }
            };
        });
    }
    static checkProductExist(kodeProduk) {
        return __awaiter(this, void 0, void 0, function* () {
            const check = yield database_1.prismaClient.product.findFirst({
                where: {
                    kode_produk: kodeProduk
                }
            });
            if (!check) {
                throw new response_error_api_1.ResponseErrorApi(404, "kode produk tidak di temukan");
            }
        });
    }
    static checkProductDouble(kodeProduk) {
        return __awaiter(this, void 0, void 0, function* () {
            const check = yield database_1.prismaClient.product.count({
                where: {
                    kode_produk: kodeProduk
                }
            });
            if (check != 0) {
                throw new response_error_api_1.ResponseErrorApi(404, "kode produk sudah di gunakan");
            }
        });
    }
}
exports.ProductService = ProductService;
