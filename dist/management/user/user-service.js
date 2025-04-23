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
exports.UserService = void 0;
const database_1 = require("../../application/database");
const validation_1 = require("../../validation/validation");
const user_model_1 = require("./user-model");
const user_validation_1 = require("./user-validation");
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
const response_error_api_1 = require("../../error/response-error-api");
class UserService {
    static register(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const registerRequest = validation_1.Validation.validate(user_validation_1.UserValidation.REGISTER, request);
            yield this.checkIsAdministrator(user.email);
            const totalEmailWithSameUsername = yield database_1.prismaClient.user.count({
                where: {
                    email: registerRequest.email
                }
            });
            if (totalEmailWithSameUsername != 0) {
                throw new response_error_api_1.ResponseErrorApi(400, "email al ready exist");
            }
            registerRequest.password = yield bcrypt_1.default.hash(registerRequest.password, 12);
            const userCreate = yield database_1.prismaClient.user.create({
                data: registerRequest
            });
            return (0, user_model_1.toUserResponse)(userCreate);
        });
    }
    static login(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const loginRequest = validation_1.Validation.validate(user_validation_1.UserValidation.LOGIN, request);
            let user = yield database_1.prismaClient.user.findUnique({
                where: {
                    email: loginRequest.email
                }
            });
            if (!user) {
                throw new response_error_api_1.ResponseErrorApi(401, "email or password is wrong");
            }
            const isPasswordInvalid = yield bcrypt_1.default.compare(loginRequest.password, user.password);
            if (!isPasswordInvalid) {
                throw new response_error_api_1.ResponseErrorApi(401, "email or password is wrong");
            }
            if (user.is_aktif == false) {
                throw new response_error_api_1.ResponseErrorApi(401, "user anda tidak aktif");
            }
            user = yield database_1.prismaClient.user.update({
                where: {
                    email: loginRequest.email
                },
                data: {
                    token: (0, uuid_1.v4)()
                }
            });
            const response = (0, user_model_1.toUserResponse)(user);
            response.token = user.token;
            return (response);
            console.log(`ini response login${response}`);
        });
    }
    static update(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateRequest = validation_1.Validation.validate(user_validation_1.UserValidation.UPDATE, request);
            yield this.checkIsEmail(updateRequest.email);
            yield this.checkIsAdministrator(user.email);
            if (updateRequest.password != undefined) {
                updateRequest.password = yield bcrypt_1.default.hash(updateRequest.password, 12);
            }
            const result = yield database_1.prismaClient.user.update({
                where: {
                    email: updateRequest.email
                },
                data: updateRequest
            });
            return (0, user_model_1.toUserResponse)(result);
        });
    }
    static delete(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestDelete = validation_1.Validation.validate(user_validation_1.UserValidation.DELETE, request);
            yield this.checkIsEmail(requestDelete.email);
            yield this.checkIsAdministrator(user.email);
            const deleteUser = yield database_1.prismaClient.user.delete({
                where: {
                    email: requestDelete.email
                }
            });
            return (0, user_model_1.toUserResponse)(user);
        });
    }
    static logout(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.prismaClient.user.update({
                where: {
                    email: user.email
                },
                data: {
                    token: null
                }
            });
            return (0, user_model_1.toUserResponse)(result);
        });
    }
    static view(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchRequest = validation_1.Validation.validate(user_validation_1.UserValidation.VIEW, request);
            const skip = (searchRequest.page - 1) * searchRequest.size;
            const filters = [];
            if (searchRequest.email) {
                filters.push({
                    email: {
                        contains: searchRequest.email
                    }
                });
            }
            if (searchRequest.name) {
                filters.push({
                    name: {
                        contains: searchRequest.name
                    }
                });
            }
            const users = yield database_1.prismaClient.user.findMany({
                where: {
                    AND: filters
                },
                take: searchRequest.size,
                skip: skip
            });
            const total = yield database_1.prismaClient.user.count({
                where: {
                    AND: filters
                }
            });
            return {
                data: users.map(users => (0, user_model_1.toUserResponse)(users)),
                paging: {
                    current_page: searchRequest.page,
                    total_page: Math.ceil(total / searchRequest.size),
                    size: searchRequest.size
                }
            };
        });
    }
    static checkIsAdministrator(emailCheck) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkUserRole = yield database_1.prismaClient.user.findFirst({
                where: {
                    email: emailCheck
                }
            });
            if ((checkUserRole === null || checkUserRole === void 0 ? void 0 : checkUserRole.role) != "administrator") {
                throw new response_error_api_1.ResponseErrorApi(400, "gagal user anda bukan reseller");
            }
        });
    }
    static checkIsEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkEmailUser = yield database_1.prismaClient.user.findUnique({
                where: {
                    email: email
                }
            });
            if (!checkEmailUser) {
                throw new response_error_api_1.ResponseErrorApi(400, "email tidak di temukan");
            }
        });
    }
}
exports.UserService = UserService;
