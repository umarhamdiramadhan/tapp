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
exports.ValidationH2hService = void 0;
const database_1 = require("../../application/database");
const response_error_api_h2h_1 = require("../../error/response-error-api-h2h");
const bcrypt_1 = __importDefault(require("bcrypt"));
class ValidationH2hService {
    static validationH2h(memberid, password, pin, ip) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkId = yield database_1.prismaClient.reseller.findFirst({
                where: {
                    kode_reseller: memberid
                }
            });
            if (!checkId) {
                throw new response_error_api_h2h_1.ResponseErrorApiH2h("member Id Tidak di temukan");
            }
            if (ip != checkId.ip) {
                throw new response_error_api_h2h_1.ResponseErrorApiH2h("ip yang anda masukan salah");
            }
            const isPasswordInvalid = yield bcrypt_1.default.compare(password, checkId.password_ip);
            if (!isPasswordInvalid) {
                throw new response_error_api_h2h_1.ResponseErrorApiH2h("pin atau password salah");
            }
            const isPinInvalid = yield bcrypt_1.default.compare(pin, checkId.pin);
            if (!isPinInvalid) {
                throw new response_error_api_h2h_1.ResponseErrorApiH2h("pin atau password salah");
            }
        });
    }
}
exports.ValidationH2hService = ValidationH2hService;
